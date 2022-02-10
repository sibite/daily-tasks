import React from 'react';
import { AddFilled, SubtractFilled } from '@fluentui/react-icons';
import classes from './TaskStatusForm.module.scss';

const iconSize = '20px';

const TaskStatusForm: React.FC = () => (
  <form className={classes.task__form}>
    <button
      className={classes['task__form-button']}
      type="button"
      id="task-fill-decrement"
    >
      <SubtractFilled width={iconSize} height={iconSize} />
    </button>
    <input
      className={classes['task__form-input']}
      type="text"
      name="task-fill"
      id="task-fill"
      defaultValue="0"
      step="1"
      min="0"
      max="100"
    />
    <button
      className={classes['task__form-button']}
      type="button"
      id="task-fill-increment"
    >
      <AddFilled width={iconSize} height={iconSize} />
    </button>
  </form>
);

export default TaskStatusForm;
