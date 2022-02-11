import React, { useContext } from 'react';
import { DaysContext } from '../../../store/DaysContext';
import { TasksContext } from '../../../store/TasksContext';
import getTodayTasks from './getTodayTasks.function';
import Task from './Task';
import classes from './TasksList.module.scss';

const TasksList: React.FC = () => {
  const daysCtx = useContext(DaysContext);
  const tasksCtx = useContext(TasksContext);

  const todayTasksList = getTodayTasks(tasksCtx, daysCtx);

  const tasks = todayTasksList.map(({ task, progress }, index) => (
    <Task
      key={task.id}
      name={task.name}
      unit={task.unit}
      progress={progress}
      target={task.target}
      color={`hsl(${(220 + index * 145) % 360}, 70%, 50%)`}
    />
  ));

  return (
    <ul className={classes['tasks-list']}>
      {tasks}
    </ul>
  );
};

export default TasksList;
