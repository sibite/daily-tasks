import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Page from '../Layout/Page';
import PageSegment from '../Layout/PageSegment';
import getTodayTasksArray from './TasksList/getTodayTasksArray.function';
import TasksList from './TasksList/TasksList';

const Day: React.FC = () => {
  const tasksState = useSelector((state: RootState) => state.tasks.tasks);
  const daysState = useSelector((state: RootState) => state.tasks.days);
  const todayTasks = getTodayTasksArray(tasksState, daysState);

  return (
    <Page title="Today's daily tasks">
      <PageSegment>
        <TasksList items={todayTasks} />
      </PageSegment>
    </Page>
  );
};

export default Day;
