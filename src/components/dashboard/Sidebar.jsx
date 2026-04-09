import React from 'react';
import { format, isSameDay, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';

export default function Sidebar({
  events = [],
  currentDate,
  onPrevMonth,
  onNextMonth,
  activeAlarmEvent,
  onRsvpResponse,
  onEventClick
}) {

  const calculateHoursLeft = (dateObj, timeStr) => {
    const nowLocal = new Date();
    if (!timeStr) return null;

    const [hours, minutes] = timeStr.split(':').map(Number);
    const eventTime = new Date(dateObj);
    eventTime.setHours(hours, minutes, 0, 0);

    const diffMs = eventTime - nowLocal;
    if (diffMs < 0 || diffMs > 24 * 60 * 60 * 1000) return null;

    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''}`;
    return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`;
  };

  const now = new Date();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingReminders = events
    .filter(e => {
      const eDate = new Date(e.dateFull);
      const eventDay = new Date(eDate);
      eventDay.setHours(0, 0, 0, 0);
      
      const isCurrentMonth = eDate.getMonth() === currentDate.getMonth() && 
                             eDate.getFullYear() === currentDate.getFullYear();
                             
      return eventDay >= today && e.type !== 'holiday' && isCurrentMonth;
    })
    .sort((a, b) => new Date(a.dateFull) - new Date(b.dateFull))
    .slice(0, 3);

  const monthlyEvents = events
    .filter(e => {
      const eDate = new Date(e.dateFull);
      return eDate.getMonth() === currentDate.getMonth() && 
             eDate.getFullYear() === currentDate.getFullYear();
    })
    .sort((a, b) => new Date(a.dateFull) - new Date(b.dateFull));

  const renderEventItem = (evt) => {
    const timeLeft = isSameDay(new Date(evt.dateFull), new Date())
      ? calculateHoursLeft(evt.dateFull, evt.timeStart)
      : null;

    return (
      <div 
        key={evt.id} 
        onClick={() => onEventClick && onEventClick(evt)}
        className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow border-l-4 cursor-pointer hover:-translate-y-1 hover:shadow-md active:scale-95 transition-all duration-200" 
        style={{ borderLeftColor: evt.type === 'holiday' ? 'rgb(244 63 94)' : 'var(--theme-accent)' }}
      >
        <div className="flex justify-between text-xs items-center">
          <span className="font-medium flex items-center gap-1">
            {evt.emoji && <span>{evt.emoji}</span>}
            {evt.title}
          </span>
          <span className="text-[10px] text-gray-500">
            {format(new Date(evt.dateFull), 'MMM d')} {evt.timeStart || ''}
          </span>
        </div>
        {timeLeft && evt.type !== 'holiday' && !evt.rsvp && (
          <div className="flex gap-1 mt-2">
            <button
              onClick={(e) => { e.stopPropagation(); onRsvpResponse?.('yes', evt); }}
              className="flex-1 bg-[var(--theme-accent)] transition-colors duration-500 text-white text-xs py-1 rounded hover:opacity-90"
            >
              Yes
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onRsvpResponse?.('no', evt); }}
              className="flex-1 border border-gray-200 dark:border-gray-700 text-xs py-1 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              No
            </button>
          </div>
        )}
        {evt.rsvp && (
          <div className="text-[10px] mt-2 font-medium bg-gray-50 dark:bg-gray-700/50 p-1.5 rounded text-center text-gray-500 dark:text-gray-400">
            RSVP: <span className={evt.rsvp === 'yes' ? 'text-green-500 font-bold' : 'text-red-500 font-bold'}>{evt.rsvp.toUpperCase()}</span>
          </div>
        )}
      </div>
    );
  };

  const [notes, setNotes] = React.useState('');
  
  const monthKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}`;
  
  React.useEffect(() => {
    const savedNotes = localStorage.getItem(`calendarNotes_${monthKey}`);
    setNotes(savedNotes || '');
  }, [monthKey]);

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
    localStorage.setItem(`calendarNotes_${monthKey}`, e.target.value);
  };

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);

  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const gridDays = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd
  });

  return (
    <aside className="w-64 h-full flex flex-col gap-6 p-4 bg-gray-50 dark:bg-gray-900 border-r">

      {/* Profile */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-10 h-10 rounded-full bg-[var(--theme-accent)] transition-colors duration-500 text-white flex items-center justify-center font-bold">
          SS
        </div>
        <div>
          <div className="font-semibold text-sm">Shyam Sundar Sharma</div>
          <div className="text-xs text-gray-500">Student Developer</div>
        </div>
      </div>

      {/* Scrollable Event Lists */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-6 pr-1 custom-scrollbar">

        {/* Upcoming Reminders */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-gray-500 uppercase">
            Upcoming Reminders
          </span>
          {upcomingReminders.length > 0 ? (
            upcomingReminders.map(evt => renderEventItem(evt))
          ) : (
            <div className="text-sm text-gray-400">
              No upcoming reminders
            </div>
          )}
        </div>

        {/* Monthly Events & Holidays */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-gray-500 uppercase">
            {format(currentDate, 'MMM')} Events & Holidays
          </span>
          {monthlyEvents.length > 0 ? (
            monthlyEvents.map(evt => renderEventItem(evt))
          ) : (
            <div className="text-sm text-gray-400">
              No events this month
            </div>
          )}
        </div>

        {/* Integrated Notes Section */}
        <div className="flex flex-col gap-2 shrink-0 mt-2">
          <span className="text-xs font-semibold text-gray-500 uppercase flex justify-between items-center">
            Month Notes
            <span className="text-[9px] bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-gray-500 font-medium">Auto-saved</span>
          </span>
          <textarea
            value={notes}
            onChange={handleNotesChange}
            placeholder="Jot down general memos for the month..."
            className="w-full h-36 text-sm p-3 bg-[#fdfbf2] dark:bg-yellow-900/10 border border-yellow-200/60 dark:border-yellow-800/30 rounded-lg focus:ring-1 focus:ring-[var(--theme-accent)]/50 outline-none resize-none text-gray-700 dark:text-gray-300 placeholder-gray-400/70"
            style={{
              backgroundImage: 'repeating-linear-gradient(transparent, transparent 23px, rgba(0,0,0,0.06) 24px)',
              lineHeight: '24px',
              paddingTop: '6px'
            }}
          />
        </div>

      </div>

      {/* Mini Calendar */}

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">

        <div className="flex justify-between mb-4 items-center">

          <span className="font-bold text-sm">
            {format(currentDate, 'MMMM yyyy')}
          </span>

          <div className="flex gap-2">

            <button onClick={onPrevMonth} className="hover:text-[var(--theme-accent)] transition-colors">{'<'}</button>
            <button onClick={onNextMonth} className="hover:text-[var(--theme-accent)] transition-colors">{'>'}</button>

          </div>

        </div>

        <div className="grid grid-cols-7 text-center text-xs mb-2 text-gray-500">
          <span>S</span><span>M</span><span>T</span><span>W</span>
          <span>T</span><span>F</span><span>S</span>
        </div>

        <div className="grid grid-cols-7 text-center text-xs">

          {gridDays.map((dayObj, i) => {

            const isToday = isSameDay(dayObj, new Date());

            return (
              <div
                key={i}
                className={`p-1 w-6 h-6 mx-auto rounded transition-colors duration-500
                ${isToday ? 'bg-[var(--theme-accent)] text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              >
                {format(dayObj, 'd')}
              </div>
            );

          })}

        </div>

      </div>

    </aside>
  );
}