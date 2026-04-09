import { cn } from "@/utils/cn";

export default function DateCell({
  date,
  isCurrentMonth,
  isToday,
  isWeekend,
  isSelectedStart,
  isSelectedEnd,
  isInRange,
  onSelect
}) {

  const handleClick = () => {
    onSelect(date);
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "relative flex flex-col p-2 h-24 md:h-32 border-b border-r border-gray-100 dark:border-gray-700 cursor-pointer overflow-hidden transition-colors group",

        !isCurrentMonth && "bg-gray-50/50 dark:bg-gray-800/30",
        isCurrentMonth && "bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700/80",

        isInRange && "bg-blue-50 dark:bg-blue-900/30",

        (isSelectedStart || isSelectedEnd) &&
          "bg-blue-100 dark:bg-blue-800/50"
      )}
    >
      {/* Date number */}
      <span
        className={cn(
          "text-sm font-medium w-8 h-8 flex items-center justify-center rounded-full z-10",

          isToday && "bg-blue-600 text-white shadow-md",

          !isToday && isCurrentMonth && "text-gray-700 dark:text-gray-200",

          !isToday && !isCurrentMonth && "text-gray-400 dark:text-gray-500",

          isWeekend &&
            !isToday &&
            isCurrentMonth &&
            "text-red-500 dark:text-red-400"
        )}
      >
        {date.getDate()}
      </span>

      {/* Selected Border */}
      {(isSelectedStart || isSelectedEnd) && (
        <div className="absolute inset-0 border-[3px] border-blue-500 rounded-lg scale-[0.98]"></div>
      )}

      {/* Hover line effect */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </div>
  );
}