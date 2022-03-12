import React, { useState } from 'react';
import moment from 'moment';
import { ArrowLeftFilled, ArrowRightFilled } from '@fluentui/react-icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, tasksActions } from '../store';

import Page from '../components/Layout/Page';
import PageSegment from '../components/Layout/PageSegment';
import TasksList from '../components/TasksList/TasksList';
import Button from '../components/UI/Button';

import getDayTasksArray from '../components/TasksList/getDayTasksArray.function';
import classes from './DayPage.module.scss';
import { TaskUnit } from '../store/tasks/tasks-types';
import TaskEdit from '../components/TasksList/TaskEdit';

const Day: React.FC = () => {
  const today = moment().startOf('day');
  const [dayDate, setDayDate] = useState(today);
  const [isAdding, setIsAdding] = useState(false);
  const dispatch = useDispatch();

  const canForward = dayDate.clone().add(1, 'days').isSameOrBefore(today);

  const tasksState = useSelector((state: RootState) => state.tasks.tasks);
  const daysState = useSelector((state: RootState) => state.tasks.days);

  const DayTasks = getDayTasksArray(dayDate.toDate(), tasksState, daysState);

  const dateString = dayDate.format('dddd, MMMM Do YYYY');

  const switchIsAdding = () => setIsAdding((value) => !value);

  const getChangeDayHandler = (numberOfDays: number) => () => setDayDate(
    (currentDayDate) => moment.min(currentDayDate.clone().add(numberOfDays, 'days'), today),
  );

  const finishAddingHandler = (name: string, target: number, unit: TaskUnit) => {
    if (typeof name === 'string' && target > 0) {
      dispatch(tasksActions.addTask({ name, target, unit }));
      setIsAdding(false);
    }
  };

  const cancelAddingHandler = () => setIsAdding(false);

  return (
    <Page>
      <PageSegment>
        <h1 className={classes.title}>Tasks</h1>
        <header className={classes.header}>
          <div className={classes.header__control}>
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
          </div>
          <div>
            <Button
              icon={false}
              className={classes.button}
              onClick={switchIsAdding}
            >
              {isAdding ? 'Cancel adding' : 'New task'}
            </Button>
          </div>
        </header>
      </PageSegment>
      <PageSegment>
        {isAdding && (
          <div className={classes['new-task']}>
            <TaskEdit
              onSave={finishAddingHandler}
              onCancel={cancelAddingHandler}
              name="New task"
              count={10}
              timestamp={600e3}
              unit={TaskUnit.Count}
            />
          </div>
        )}
        <TasksList items={DayTasks} date={dayDate} />
      </PageSegment>
    </Page>
  );
};

export default Day;
