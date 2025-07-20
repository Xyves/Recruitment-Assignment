import { Moment } from "moment";

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
  from: Moment;
  offerDays: string[];
  orderDays: string[];
}
