import React from 'react';
import classes from './TaskStatusForm.module.scss';

const TaskStatusForm: React.FC = () => (
  <form>
    <button type="button" id="task-fill-decrement">-</button>
    <input type="number" name="task-fill" id="task-fill" />
    <button type="button" id="task-fill-increment">+</button>
  </form>
);

export default TaskStatusForm;
