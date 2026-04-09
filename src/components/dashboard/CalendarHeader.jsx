import { ChevronLeft, ChevronRight, Moon, Sun, Menu } from "lucide-react";
import { format } from "date-fns";

export default function CalendarHeader({
  currentDate,
  onPrevMonth,
  onNextMonth,
  onToday,
  isDarkMode,
  toggleDarkMode,
  toggleMobileMenu
}) {
  return (
    <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 gap-4 sm:gap-0">

      {/* Left Section */}
      <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">

        <button
          onClick={toggleMobileMenu}
          className="lg:hidden p-2 -ml-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition"
        >
          <Menu className="w-5 h-5" />
        </button>

        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100 tracking-tight">
          {format(currentDate, "MMMM yyyy")}
        </h2>

      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end">

        <button
          onClick={onPrevMonth}
          className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          onClick={onToday}
          className="px-4 py-2 text-sm font-medium rounded-full border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
        >
          Today
        </button>

        <button
          onClick={onNextMonth}
          className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-2"></div>

        <button
          onClick={toggleDarkMode}
          className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300"
        >
          {isDarkMode ? (
            <Sun className="w-4 h-4" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
        </button>

      </div>
    </header>
  );
}