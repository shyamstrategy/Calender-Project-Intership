import React from 'react';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format, isSameMonth, isSameDay, startOfDay, endOfDay } from 'date-fns';
import CalendarCell from './CalendarCell';
import EventCard from './EventCard';

export default function CalendarGrid({ currentDate, events, onCellClick, onAddClick, onDeleteEvent, rangeStart, rangeEnd }) {
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  // Calculate the grid for the month
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);

  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 }); // start on Sunday
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const gridDays = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd
  });

  return (
    <div key={currentDate.toISOString()} className="flex flex-col bg-white dark:bg-gray-950 h-full transition-colors duration-200 animate-month-change">
      {/* Days Header */}
      <div className="grid grid-cols-7 border-b border-gray-100 dark:border-gray-800">
        {daysOfWeek.map((day) => (
          <div key={day} className="py-2 px-1 sm:py-3 sm:px-4 text-[10px] sm:text-xs font-semibold text-gray-400 dark:text-gray-500 text-center">
            <span className="sm:hidden">{day.charAt(0)}</span>
            <span className="hidden sm:inline">{day}</span>
          </div>
        ))}
      </div>

      {/* Grid Cells */}
      <div className="grid grid-cols-7 border-l border-gray-100 dark:border-gray-800 flex-1">
        {gridDays.map((dayObj, i) => {
          const isCurrentMonth = isSameMonth(dayObj, currentDate);
          const isWeekend = dayObj.getDay() === 0 || dayObj.getDay() === 6;

          let isRangeStart = false;
          let isRangeEnd = false;
          let isInRange = false;

          if (rangeStart && isSameDay(dayObj, rangeStart)) isRangeStart = true;
          if (rangeEnd && isSameDay(dayObj, rangeEnd)) isRangeEnd = true;

          if (rangeStart && rangeEnd) {
            const startStr = startOfDay(rangeStart).getTime();
            const endStr = startOfDay(rangeEnd).getTime();
            const currentStr = startOfDay(dayObj).getTime();
            if (currentStr > startStr && currentStr < endStr) {
              isInRange = true;
            }
          }

          // Find real events for this cell date
          const cellEvents = events.filter(e => {
            const start = startOfDay(new Date(e.dateFull));
            const end = e.dateEndFull ? endOfDay(new Date(e.dateEndFull)) : endOfDay(start);
            const check = new Date(dayObj);
            return check >= start && check <= end;
          });

          return (
            <CalendarCell
              key={dayObj.toISOString()}
              date={format(dayObj, 'd')}
              isWeekend={isWeekend}
              isCurrentMonth={isCurrentMonth}
              isToday={isSameDay(dayObj, new Date())}
              isRangeStart={isRangeStart}
              isRangeEnd={isRangeEnd}
              isInRange={isInRange}
              onClick={() => onCellClick && onCellClick(dayObj)}
              onAddClick={() => onAddClick && onAddClick(dayObj)}
            >
              {cellEvents.map((evt) => (
                <EventCard
                  key={evt.id}
                  title={evt.title}
                  time={`${evt.timeStart}-${evt.timeEnd}`}
                  type={evt.type}
                  avatars={evt.avatars}
                  onDelete={(e) => {
                    e.stopPropagation();
                    if (onDeleteEvent) onDeleteEvent(evt.id);
                  }}
                />
              ))}
            </CalendarCell>
          );
        })}
      </div>
    </div>
  );
}
