import { EditFilled } from '@fluentui/react-icons';
import { Moment } from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { tasksActions } from '../../store';
import { TaskUnit } from '../../store/tasks/tasks-types';
import getDateKeyString from '../../utilities/getDateKeyString.function';
import Button from '../UI/Button';
import Card from '../UI/Card';
import classes from './Task.module.scss';
import TaskBar from './TaskBar';
import TaskForm from './TaskForm';

interface TaskProps {
  id: number;
  name: string;
  unit: TaskUnit;
  target: number;
  progress: number;
  color: string;
  date: Moment;
  onEditStart: (taskId: number) => void;
}

const Task: React.FC<TaskProps> = ({
  id, name, unit, target, progress, color, date, onEditStart,
}) => {
  const dispatch = useDispatch();

  const incrementHandler = () => {
    const updatedProgress = progress + (unit === TaskUnit.Count ? 1 : 60e3);
    dispatch(tasksActions.updateTaskProgress({
      dateKeyString: getDateKeyString(date.toDate()),
      taskId: id,
      progress: updatedProgress,
    }));
  };

  const decrementHandler = () => {
    const updatedProgress = progress - (unit === TaskUnit.Count ? 1 : 60e3);
    dispatch(tasksActions.updateTaskProgress({
      dateKeyString: getDateKeyString(date.toDate()),
      taskId: id,
      progress: updatedProgress,
    }));
  };

  const updateProgressHandler = useCallback((updatedProgress: number) => {
    dispatch(tasksActions.updateTaskProgress({
      dateKeyString: getDateKeyString(date.toDate()),
      taskId: id,
      progress: updatedProgress,
    }));
  }, [dispatch, date, id]);

  const editStartHandler = () => {
    onEditStart(id);
  };

  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    if (!isPlaying) return () => {};

    const addSecondToProgress = () => {
      updateProgressHandler((progress ?? 0) + 1000);
    };

    const timeoutId = setTimeout(addSecondToProgress, 1000);

    return function cleanup() {
      clearTimeout(timeoutId);
    };
  }, [isPlaying, updateProgressHandler, progress]);

  const playHandler = () => setIsPlaying(true);

  const stopHandler = () => setIsPlaying(false);

  return (
    <Card className={classes.task}>
      <header className={classes.task__header}>
        <h2>{name}</h2>
        <Button icon={EditFilled} onClick={editStartHandler} className={classes['task__edit-button']} freeMargin />
      </header>
      <div className={classes['task__fulfill-container']}>
        <TaskBar
          max={target}
          current={progress}
          color={color}
          unit={unit}
          onUpdateProgress={updateProgressHandler}
        />
        <TaskForm
          unit={unit}
          progress={progress}
          decrementHandler={decrementHandler}
          incrementHandler={incrementHandler}
          onUpdateProgress={updateProgressHandler}
          onPlay={playHandler}
          onStop={stopHandler}
          isPlaying={isPlaying}
        />
      </div>
    </Card>
  );
};

export default Task;
