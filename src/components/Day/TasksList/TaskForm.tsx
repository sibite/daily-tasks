import React from 'react';
import { AddFilled, PlayFilled, SubtractFilled } from '@fluentui/react-icons';
import classes from './TaskForm.module.scss';
import { TaskUnit } from '../../../store/TasksContext';
import Button from '../../UI/Button';

interface TaskStatusFormProps {
  unit: TaskUnit;
}

const TaskStatusForm: React.FC<TaskStatusFormProps> = ({
  unit,
}) => {
  let mainControl;

  if (unit === TaskUnit.Count) {
    mainControl = (
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
    );
  } else {
    mainControl = (
      <Button
        id="task-fill-timer-switch"
        icon={PlayFilled}
        wide
      />
    );
  }

  return (
    <form className={classes.task__form}>
      <Button
        id="task-fill-decrement"
        icon={SubtractFilled}
      />
      {mainControl}
      <Button
        id="task-fill-increment"
        icon={AddFilled}
      />
    </form>
  );
};

export default TaskStatusForm;
