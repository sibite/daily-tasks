import moment, { Moment } from 'moment';
import React, { CSSProperties } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { TaskUnit } from '../../store/tasks/tasks-types';
import getDateKeyString from '../../utilities/getDateKeyString.function';
import getTaskColor from '../../utilities/getTaskColor';
import classes from './Calendar.module.scss';
import CalendarCell from './CalendarCell';
import getCalendarTable, { MonthDayType } from './getCalendarTable';

const getFields = (
  weekTable: (MonthDayType | null)[],
  getFill: (arg0: MonthDayType) => number,
) => weekTable.map(
  (day) => {
    let fill = 0;

    if (day !== null) {
      fill = getFill(day);
    }

    return (
      <CalendarCell fill={fill} label={day?.dateNumber ? day.dateNumber.toString() : ''} />
    );
  },
);

const getRows = (
  calendarTable: ReturnType<typeof getCalendarTable>,
  getFill: (arg0: MonthDayType) => number,
) => (
  calendarTable.map((weekTable) => (
    <tr>
      {getFields(weekTable, getFill)}
    </tr>
  ))
);

interface PropsType {
  monthDate: Moment;
  taskId: number;
}

const Calendar: React.FC<PropsType> = ({
  monthDate, taskId,
}) => {
  const tasksState = useSelector((state: RootState) => state.tasks.tasks);
  const daysState = useSelector((state: RootState) => state.tasks.days);

  const calendarTable = getCalendarTable(monthDate);
  const task = tasksState[taskId];
  const taskColor = getTaskColor(Object.values(tasksState).indexOf(task));

  console.log(calendarTable);

  const getFill = (monthDay: MonthDayType) => {
    const dateKey = getDateKeyString(monthDay.date.toDate());
    const unit = daysState[dateKey]?.tasks[taskId]?.unit ?? tasksState[taskId].unit;
    const target = tasksState[taskId][unit === TaskUnit.Timestamp ? 'timestamp' : 'count'];
    const progress = daysState[dateKey]?.tasks[taskId]?.progress ?? 0;

    return progress / target;
  };

  const tableContent = getRows(calendarTable, getFill);

  return (
    <div className={classes.calendar} style={{ '--task-color': taskColor } as CSSProperties}>
      <table className={classes.calendar__table}>
        <thead>
          <tr>
            <td>Mon</td>
            <td>Tue</td>
            <td>Wed</td>
            <td>Thu</td>
            <td>Fri</td>
            <td>Sat</td>
            <td>Sun</td>
          </tr>
        </thead>
        <tbody>
          {tableContent}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
