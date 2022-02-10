import React from 'react';
import classes from './Task.module.scss';
import TaskBar from './TaskBar';
import TaskStatusForm from './TaskStatusForm';

const Task: React.FC = () => (
  <li className={classes.task}>
    <h2>Task Title</h2>
    <div className={classes['task__bar-container']}>
      <TaskBar />
      <TaskStatusForm />
    </div>
  </li>
);

export default Task;
