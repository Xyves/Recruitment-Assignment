export type MonthDay = {
  day: string;
  date: string;
  today: boolean;
  offer: boolean;
  order: boolean;
  isCurrentMonth: boolean;
};
export interface MonthNavigator {
  month: string;
  year: string;
  nextMonth: () => void;
  prevMonth: () => void;
}
export interface WeekViewProps {
  from: Date;
  offerDays: string[];
  orderDays: string[];
}
export interface CalendarDayProps {
  selectedDate: string | null;
  onOrder: (date: string) => void;
}
