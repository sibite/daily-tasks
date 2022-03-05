import { ArrowLeftFilled, ArrowRightFilled } from '@fluentui/react-icons';
import moment from 'moment';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Page from '../components/Layout/Page';
import PageSegment from '../components/Layout/PageSegment';
import Button from '../components/UI/Button';
import classes from './CalendarPage.module.scss';
import TaskPicker from '../components/TaskPicker/TaskPicker';
import Calendar from '../components/Calendar/Calendar';

const CalendarPage: React.FC = () => {
  const thisMonth = moment().startOf('month');
  const [monthDate, setDayDate] = useState(thisMonth);

  const canForward = monthDate.clone().add(1, 'months').isSameOrBefore(thisMonth);

  const tasksState = useSelector((state: RootState) => state.tasks.tasks);
  const daysState = useSelector((state: RootState) => state.tasks.days);

  const dateString = monthDate.format('MMMM YYYY');

  const getChangeMonthHandler = (numberOfMonths: number) => () => setDayDate(
    (currentMonthDate) => moment.min(currentMonthDate.clone().add(numberOfMonths, 'months'), thisMonth),
  );

  return (
    <Page type="horizontal">
      <PageSegment>
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
          <TaskPicker />
        </PageSegment>
      </PageSegment>
      <PageSegment>
        <Calendar monthDate={monthDate} />
      </PageSegment>
    </Page>
  );
};

export default CalendarPage;
