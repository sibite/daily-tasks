import { Moment } from 'moment';

export interface MonthDayType {
  date: Moment;
  dateNumber: number;
}

function getDayNumber(date: Moment, monthStart: Moment): MonthDayType | null {
  const monthEnd = monthStart.clone().endOf('month');
  if (date.isBefore(monthStart) || date.isAfter(monthEnd)) return null;
  return {
    date,
    dateNumber: date.get('date'),
  };
}

function getWeekTable(date: Moment, monthStart: Moment): (MonthDayType | null)[] {
  const weekStart = date.clone().startOf('isoWeek');

  const weekTable = new Array(7).fill(null).map((_, index) => getDayNumber(
    weekStart.clone().add(index, 'days'),
    monthStart,
  ));
  return weekTable;
}

function getCalendarTable(date: Moment): (MonthDayType | null)[][] {
  const monthStart = date.clone().startOf('month');
  const calendarTable = [];
  const currentDate = monthStart.clone();

  while (true) {
    const weekTable = getWeekTable(currentDate, monthStart);
    if (weekTable[0] === null && weekTable[6] === null) break;
    calendarTable.push(weekTable);
    currentDate.add(1, 'week');
  }

  return calendarTable;
}

export default getCalendarTable;
