import React, { useContext } from 'react';
import { DaysContext } from '../../store/DaysContext';
import { TasksContext } from '../../store/TasksContext';
import Page from '../Layout/Page';
import PageSegment from '../Layout/PageSegment';
import getTodayTasksArray from './TasksList/getTodayTasksArray.function';
import TasksList from './TasksList/TasksList';

const Day: React.FC = () => {
  const daysCtx = useContext(DaysContext);
  const tasksCtx = useContext(TasksContext);

  const todayTasks = getTodayTasksArray(tasksCtx, daysCtx);

  return (
    <Page title="Today's daily tasks">
      <PageSegment>
        <TasksList items={todayTasks} />
      </PageSegment>
    </Page>
  );
};

export default Day;
