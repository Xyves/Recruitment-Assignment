import { MonthDay } from "@/types/Calendar";
import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { useMemo, useState } from "react";

const DayFormat = "yyyy-MM-dd";
export const useCalendarMonth = (
  initialDate: Date = new Date(),
  offerDays: string[] = [],
  orderDays: string[] = []
) => {
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(initialDate));

  const weeks = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);

    const firstMonday = startOfWeek(monthStart, { weekStartsOn: 1 });
    const lastSunday = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const days: MonthDay[] = [];
    let day = firstMonday;

    while (day <= lastSunday) {
      const formatted = format(day, DayFormat);

      days.push({
        day: format(day, "dd"),
        date: formatted,
        today: isSameDay(day, new Date()),
        offer: offerDays.includes(formatted),
        order: orderDays.includes(formatted),
        isCurrentMonth: isSameMonth(day, currentMonth),
      });

      day = addDays(day, 1);
    }

    const weeks: MonthDay[][] = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }

    return weeks;
  }, [currentMonth, offerDays, orderDays]);

  return {
    currentMonth,
    weeks,
    monthLabel: format(currentMonth, "MMMM"),
    yearLabel: format(currentMonth, "yyyy"),
    nextMonth: () => setCurrentMonth((prev) => addMonths(prev, 1)),
    prevMonth: () => setCurrentMonth((prev) => subMonths(prev, 1)),
  };
};
