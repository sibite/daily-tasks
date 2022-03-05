import { Moment } from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import classes from './Calendar.module.scss';
import getCalendarTable from './getCalendarTable';

const getFields = (weekTable: (number | null)[]) => weekTable.map((day) => <td>{day}</td>);

const getRows = (calendarTable: ReturnType<typeof getCalendarTable>) => (
  calendarTable.map((weekTable) => (
    <tr>
      {getFields(weekTable)}
    </tr>
  ))
);

interface PropsType {
  monthDate: Moment
}

const Calendar: React.FC<PropsType> = ({
  monthDate,
}) => {
  const tasksState = useSelector((state: RootState) => state.tasks.tasks);
  const calendarTable = getCalendarTable(monthDate);

  const tableContent = getRows(calendarTable);

  return (
    <div className={classes.calendar}>
      <table>
        {tableContent}
      </table>
    </div>
  );
};

export default Calendar;
