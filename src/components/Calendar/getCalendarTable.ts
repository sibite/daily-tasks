import { Moment } from 'moment';

function getDayNumber(date: Moment, monthStart: Moment): number | null {
  const monthEnd = monthStart.clone().endOf('month');
  if (date.isBefore(monthStart) || date.isAfter(monthEnd)) return null;
  return date.get('date');
}

function getWeekTable(date: Moment, monthStart: Moment): (number | null)[] {
  const weekStart = date.clone().startOf('isoWeek');

  const weekTable = new Array(7).fill(null).map((_, index) => getDayNumber(
    weekStart.clone().add(index, 'days'),
    monthStart,
  ));
  return weekTable;
}

function getCalendarTable(date: Moment): (number | null)[][] {
  const monthStart = date.clone().startOf('month');
  const calendarTable = [];
  const currentDate = monthStart.clone();
  let weekTable;

  do {
    weekTable = getWeekTable(currentDate, monthStart);
    calendarTable.push(weekTable);
    currentDate.add(1, 'week');
  } while (weekTable[6] !== null);

  return calendarTable;
}

export default getCalendarTable;
