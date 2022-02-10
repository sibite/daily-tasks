import React from 'react';
import classes from './TasksList.module.scss';
import Task from './Task';

const TasksList: React.FC = () => (
  <ul className={classes['tasks-list']}>
    <Task />
    <Task />
    <Task />
  </ul>
);

export default TasksList;
