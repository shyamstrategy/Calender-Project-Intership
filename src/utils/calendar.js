import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isWithinInterval,
  isWeekend
} from "date-fns";

export function getCalendarDays(currentDate) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  // For standard Western calendars, Sunday is week start. 
  // date-fns default startOfWeek is Sunday.
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  return eachDayOfInterval({
    start: startDate,
    end: endDate
  });
}

export { isSameMonth, isSameDay, isWithinInterval, isWeekend };
