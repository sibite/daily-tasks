import {
  AddFilled, PauseFilled, PlayFilled, SubtractFilled,
} from '@fluentui/react-icons';
import React, { ChangeEvent } from 'react';
import { TaskUnit } from '../../../store/tasks/tasks-types';
import Button from '../../UI/Button';
import classes from './TaskForm.module.scss';

interface TaskFormProps {
  unit: TaskUnit;
  progress?: number;
  decrementHandler: () => void;
  incrementHandler: () => void;
  onPlay: () => void;
  onStop: () => void;
  onUpdateProgress: (progress: number) => void;
  isPlaying: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({
  unit, progress, decrementHandler, incrementHandler, onPlay, onStop, isPlaying, onUpdateProgress,
}) => {
  let mainControl;

  const countChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    onUpdateProgress(+event.target.value);
  };

  if (unit === TaskUnit.Count) {
    mainControl = (
      <input
        className={classes['task__form-input']}
        type="number"
        name="task-fill"
        id="task-fill"
        value={progress}
        onChange={countChangeHandler}
        step="1"
        min="0"
        max="100"
      />
    );
  } else {
    mainControl = (
      <Button
        icon={isPlaying ? PauseFilled : PlayFilled}
        onClick={isPlaying ? onStop : onPlay}
        wide
      />
    );
  }

  return (
    <form className={classes.task__form}>
      <Button
        icon={SubtractFilled}
        onClick={decrementHandler}
        disabled={progress === 0}
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
