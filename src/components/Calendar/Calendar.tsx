import moment, { Moment } from 'moment';
import React, { CSSProperties, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../store';
import { TaskUnit } from '../../store/tasks/tasks-types';
import getDateKeyString from '../../utilities/getDateKeyString.function';
import getTaskColor from '../../utilities/getTaskColor';
import classes from './Calendar.module.scss';
import CalendarCell from './CalendarCell';
import getCalendarTable, { MonthDayType } from './getCalendarTable';

interface PropsType {
  monthDate: Moment;
  taskId: number;
}

const Calendar: React.FC<PropsType> = ({
  monthDate, taskId,
}) => {
  const tasksState = useSelector((state: RootState) => state.tasks.tasks);
  const daysState = useSelector((state: RootState) => state.tasks.days);

  const today = moment().startOf('day');

  const calendarTable = getCalendarTable(monthDate);
  const task = tasksState[taskId];
  const taskColor = getTaskColor(Object.values(tasksState).indexOf(task));

  const getFill = useCallback((monthDay: MonthDayType) => {
    const dateKey = getDateKeyString(monthDay.date.toDate());
    const unit = daysState[dateKey]?.tasks[taskId]?.unit ?? tasksState[taskId].unit;
    const target = tasksState[taskId][unit === TaskUnit.Timestamp ? 'timestamp' : 'count'];
    const progress = daysState[dateKey]?.tasks[taskId]?.progress ?? 0;

    return progress / target;
  }, [daysState, tasksState, taskId]);

  const getFields = useCallback((weekTable: (MonthDayType | null)[]) => weekTable.map(
    (day, index) => {
      const fill = day === null ? 0 : getFill(day);
      const label = day?.dateNumber ? day.dateNumber.toString() : '';
      const key = `${label}-${index}`;
      const isSelected = day?.date.clone().startOf('day').isSame(today);
      const link = day !== null ? `/day/${getDateKeyString(day.date.toDate())}` : '';

      return (
        <CalendarCell
          linkTo={link}
          fill={fill}
          key={key}
          label={label}
          isSelected={isSelected}
        />
      );
    },
  ), [getFill, today]);

  const getRows = () => (
    calendarTable.map((weekTable, index) => (
      <tr key={index.toString()}>
        {getFields(weekTable)}
      </tr>
    ))
  );

  const tableContent = getRows();

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
