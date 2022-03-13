import { ArrowLeftFilled, ArrowRightFilled } from '@fluentui/react-icons';
import moment from 'moment';
import React, {
  useCallback, useEffect, useState,
} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Calendar from '../components/Calendar/Calendar';
import Page from '../components/Layout/Page';
import PageSegment from '../components/Layout/PageSegment';
import TaskPicker from '../components/TaskPicker/TaskPicker';
import Button from '../components/UI/Button';
import { RootState } from '../store';
import classes from './CalendarPage.module.scss';

const CalendarPage: React.FC = () => {
  const tasksState = useSelector((state: RootState) => state.tasks.tasks);

  const navigate = useNavigate();
  const params = useParams();

  const thisMonth = moment().startOf('month');
  const firstTaskId = Object.values(tasksState)[0].id;

  let monthDate = moment(params.monthKey);
  if (!monthDate.isValid()) monthDate = thisMonth;
  const [taskId, setTaskId] = useState(firstTaskId);

  const pickTaskHandler = setTaskId;

  const canForward = monthDate.clone().add(1, 'months').isSameOrBefore(thisMonth);

  const dateString = monthDate.format('MMMM YYYY');

  const getChangeMonthHandler = useCallback(
    (numberOfMonths: number) => () => {
      const newDate = moment.min(monthDate.clone().add(numberOfMonths, 'months'), thisMonth);
      navigate(`/calendar/${newDate.format('YYYY-MM')}`);
    },
    [navigate, thisMonth, monthDate],
  );

  const keyPressHandler = useCallback((event: KeyboardEvent) => {
    if (event.key === 'a') getChangeMonthHandler(-1)();
    else if (event.key === 'd') getChangeMonthHandler(1)();
  }, [getChangeMonthHandler]);

  useEffect(() => {
    document.addEventListener('keypress', keyPressHandler);
    return function cleanup() {
      document.removeEventListener('keypress', keyPressHandler);
    };
  }, [keyPressHandler]);

  return (
    <Page type="horizontal">
      <PageSegment className={classes['task-picker-container']}>
        <PageSegment>
          <h1 className={classes.title}>Calendar</h1>
          <header className={classes.header}>
            <Button
              icon={ArrowLeftFilled}
              className={classes.button}
              onClick={getChangeMonthHandler(-1)}
            />
            <Button
              icon={ArrowRightFilled}
              className={classes.button}
              onClick={getChangeMonthHandler(1)}
              disabled={!canForward}
            />
            <h2>{dateString}</h2>
          </header>
        </PageSegment>
        <PageSegment>
          <TaskPicker onPickTask={pickTaskHandler} selectedTaskId={taskId} />
        </PageSegment>
      </PageSegment>
      <PageSegment>
        <Calendar monthDate={monthDate} taskId={taskId} />
      </PageSegment>
    </Page>
  );
};

export default CalendarPage;
