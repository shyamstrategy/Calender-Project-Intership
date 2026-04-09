import DateCell from "./DateCell";

export default function CalendarGrid({
  days,
  currentMonth,
  today,
  selectionRange,
  onDateSelect,
  isWeekend,
  isSameMonth,
  isSameDay,
  isWithinInterval
}) {

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="flex flex-col border-b border-gray-100 dark:border-gray-700">

      {/* Week Day Header */}
      <div className="grid grid-cols-7 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/90">
        {weekDays.map((day) => (
          <div
            key={day}
            className="py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 border-l border-gray-100 dark:border-gray-700">

        {days.map((day, index) => {

          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isToday = isSameDay(day, today);
          const weekend = isWeekend(day);

          let isSelectedStart = false;
          let isSelectedEnd = false;
          let isInRange = false;

          if (selectionRange?.start) {
            isSelectedStart = isSameDay(day, selectionRange.start);
          }

          if (selectionRange?.end) {
            isSelectedEnd = isSameDay(day, selectionRange.end);

            if (selectionRange.start) {
              isInRange = isWithinInterval(day, {
                start: selectionRange.start,
                end: selectionRange.end
              });
            }
          }

          return (
            <DateCell
              key={index}
              date={day}
              isCurrentMonth={isCurrentMonth}
              isToday={isToday}
              isWeekend={weekend}
              isSelectedStart={isSelectedStart}
              isSelectedEnd={isSelectedEnd}
              isInRange={isInRange}
              onSelect={onDateSelect}
            />
          );
        })}

      </div>
    </div>
  );
}