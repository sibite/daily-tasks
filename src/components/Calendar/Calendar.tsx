import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import classes from './Calendar.module.scss';

const Calendar = () => {
  const tasksState = useSelector((state: RootState) => state.tasks.tasks);

  return (
    <div className={classes.calendar}>
      <h2>Calendar</h2>
    </div>
  );
};

export default Calendar;
