import React, { useState } from 'react';
import moment from 'moment';
import { ArrowLeftFilled, ArrowRightFilled } from '@fluentui/react-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

import Page from '../Layout/Page';
import PageSegment from '../Layout/PageSegment';
import TasksList from './TasksList/TasksList';
import Button from '../UI/Button';

import getDayTasksArray from './TasksList/getDayTasksArray.function';
import classes from './Day.module.scss';

const Day: React.FC = () => {
  const today = moment().startOf('day');
  const [dayDate, setDayDate] = useState(today);

  const canForward = dayDate.clone().add(1, 'days').isSameOrBefore(today);

  const tasksState = useSelector((state: RootState) => state.tasks.tasks);
  const daysState = useSelector((state: RootState) => state.tasks.days);

  const DayTasks = getDayTasksArray(dayDate.toDate(), tasksState, daysState);

  const dateString = dayDate.format('dddd, MMMM Do YYYY');

  const getChangeDayHandler = (numberOfDays: number) => () => setDayDate(
    (currentDayDate) => moment.min(currentDayDate.clone().add(numberOfDays, 'days'), today),
  );

  return (
    <Page>
      <PageSegment>
        <h1 className={classes.title}>Tasks</h1>
        <header className={classes.header}>
          <Button
            icon={ArrowLeftFilled}
            className={classes.button}
            onClick={getChangeDayHandler(-1)}
          />
          <Button
            icon={ArrowRightFilled}
            className={classes.button}
            onClick={getChangeDayHandler(1)}
            disabled={!canForward}
          />
          <h2>{dateString}</h2>
        </header>
        <TasksList items={DayTasks} date={dayDate} />
      </PageSegment>
    </Page>
  );
};

export default Day;
