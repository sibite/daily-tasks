import { AddFilled, PlayFilled, SubtractFilled } from '@fluentui/react-icons';
import React from 'react';
import { TaskUnit } from '../../../store/TasksContext';
import Button from '../../UI/Button';
import classes from './TaskForm.module.scss';

interface TaskFormProps {
  unit: TaskUnit;
  progress?: number;
  decrementHandler: () => void;
  incrementHandler: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({
  unit, progress, decrementHandler, incrementHandler,
}) => {
  let mainControl;

  if (unit === TaskUnit.Count) {
    mainControl = (
      <input
        className={classes['task__form-input']}
        type="number"
        name="task-fill"
        id="task-fill"
        value={progress}
        readOnly
        step="1"
        min="0"
        max="100"
      />
    );
  } else {
    mainControl = (
      <Button
        icon={PlayFilled}
        wide
      />
    );
  }

  return (
    <form className={classes.task__form}>
      <Button
        icon={SubtractFilled}
        onClick={decrementHandler}
      />
      {mainControl}
      <Button
        icon={AddFilled}
        onClick={incrementHandler}
      />
    </form>
  );
};

TaskForm.defaultProps = {
  progress: 0,
};

export default TaskForm;
