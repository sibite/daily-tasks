import React, { useContext } from 'react';
import classes from './TasksList.module.scss';
import Task from './Task';
import { TasksContext } from '../../store/TasksContext';

const TasksList: React.FC = () => {
  const tasksCtx = useContext(TasksContext);
  const tasks = Object.values(tasksCtx.list).map((task, index) => (
    <Task
      name={task.name}
      unit={task.unit}
      progress={Math.round(Math.random() * task.target)}
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
