import { addMonths, format, subMonths } from "date-fns";
import { useState } from "react";
export const useMonthNavigator = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const month = format(currentDate, "MMMM");
  const year = format(currentDate, "yyyy");

  const nextMonth = () => {
    setCurrentDate((prev) => addMonths(prev, 1));
  };

  const prevMonth = () => {
    setCurrentDate((prev) => subMonths(prev, 1));
  };

  return {
    month,
    year,
    nextMonth,
    prevMonth,
    date: currentDate,
  };
};
