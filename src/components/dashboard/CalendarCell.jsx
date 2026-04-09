import React from 'react';

export default function CalendarCell({
  date,
  isWeekend,
  isCurrentMonth,
  isToday,
  isRangeStart,
  isRangeEnd,
  isInRange,
  children,
  onClick,
  onAddClick
}) {

  let bgClass = !isCurrentMonth ? 'bg-gray-50/50 dark:bg-gray-900/50' : isWeekend ? 'bg-gray-50/30 dark:bg-gray-900/80' : 'bg-white dark:bg-gray-950';
  let ringClass = 'border-b border-r border-gray-100 dark:border-gray-800';

  if (isInRange) {
    bgClass = 'bg-[var(--theme-accent)]/10 dark:bg-[var(--theme-accent)]/20';
  }
  if (isRangeStart || isRangeEnd) {
    bgClass = 'bg-[var(--theme-accent)]/20 dark:bg-[var(--theme-accent)]/30';
    ringClass += ' ring-inset ring-2 ring-[var(--theme-accent)]';
  }

  return (
    <div
      onClick={onClick}
      className={`min-h-[80px] sm:min-h-[140px] p-1 sm:p-2 transition duration-200 cursor-pointer flex flex-col gap-0.5 sm:gap-1 relative group hover:bg-[var(--theme-accent)]/5 dark:hover:bg-[var(--theme-accent)]/10 ${bgClass} ${ringClass}`}
    >
      <div className="flex items-center justify-between">
        <span className={`text-[10px] sm:text-sm font-medium 
          ${isToday ? 'bg-[var(--theme-accent)] transition-colors duration-500 text-white w-5 h-5 sm:w-7 sm:h-7 flex items-center justify-center rounded-full shadow-sm' :
            isCurrentMonth ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-gray-600'}`}>
          {date}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto mt-1 scrollbar-hide">
        {children}
      </div>

      <div className="absolute top-1 right-1 sm:top-2 sm:right-2 opacity-0 group-hover:opacity-100 transition z-10 hidden sm:block">
        <button
          onClick={(e) => { e.stopPropagation(); onAddClick && onAddClick(); }}
          className="w-5 h-5 sm:w-6 sm:h-6 rounded-md border border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500 bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center hover:text-gray-600 dark:hover:text-gray-300"
        >
          +
        </button>
      </div>
    </div>
  );
}
