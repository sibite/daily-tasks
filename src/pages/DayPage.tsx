import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import { ArrowLeftFilled, ArrowRightFilled } from '@fluentui/react-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState, tasksActions } from '../store';

import Page from '../components/Layout/Page';
import PageSegment from '../components/Layout/PageSegment';
import TasksList from '../components/TasksList/TasksList';
import Button from '../components/UI/Button';

import getDayTasksArray from '../components/TasksList/getDayTasksArray.function';
import classes from './DayPage.module.scss';
import { TaskUnit } from '../store/tasks/tasks-types';
import TaskEdit from '../components/TasksList/TaskEdit';
import getDateKeyString from '../utilities/getDateKeyString.function';

const Day: React.FC = () => {
  const today = moment().startOf('day');
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isAdding, setIsAdding] = useState(false);
  let dayDate = moment(params.dateKey);
  if (!dayDate.isValid()) dayDate = today;

  const canForward = dayDate.clone().add(1, 'days').isSameOrBefore(today);

  const tasksState = useSelector((state: RootState) => state.tasks.tasks);
  const daysState = useSelector((state: RootState) => state.tasks.days);

  const DayTasks = getDayTasksArray(dayDate.toDate(), tasksState, daysState);

  const dateString = dayDate.format('dddd, MMMM Do YYYY');

  const switchIsAdding = () => setIsAdding((value) => !value);

  const getChangeDayHandler = useCallback(
    (numberOfDays: number) => () => {
      const newDate = moment.min(dayDate.clone().add(numberOfDays, 'days'), today);
      navigate(`/day/${getDateKeyString(newDate.toDate())}`);
    },
    [navigate, today, dayDate],
  );

  const finishAddingHandler = (name: string, target: number, unit: TaskUnit) => {
    if (typeof name === 'string' && target > 0) {
      dispatch(tasksActions.addTask({ name, target, unit }));
      setIsAdding(false);
    }
  };

  const cancelAddingHandler = () => setIsAdding(false);

  const keyPressHandler = useCallback((event: KeyboardEvent) => {
    if (event.key === 'a') getChangeDayHandler(-1)();
    else if (event.key === 'd') getChangeDayHandler(1)();
  }, [getChangeDayHandler]);

  useEffect(() => {
    document.addEventListener('keypress', keyPressHandler);
    return function cleanup() {
      document.removeEventListener('keypress', keyPressHandler);
    };
  }, [keyPressHandler]);

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
