import React from 'react';
import classes from './Task.module.scss';

const TaskBar: React.FC = () => (
  <div className={classes.task__bar}>
    <div className={classes['task__bar-fill']} />
  </div>
);

export default TaskBar;
