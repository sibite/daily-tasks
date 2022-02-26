import { EditFilled } from '@fluentui/react-icons';
import React from 'react';
import { useDispatch } from 'react-redux';
import { tasksActions } from '../../../store';
import { TaskUnit } from '../../../store/tasks/tasks-types';
import getDateKeyString from '../../../utilities/getDateKeyString.function';
import Button from '../../UI/Button';
import Card from '../../UI/Card';
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
  onEditStart: (taskId: number) => void;
}

const Task: React.FC<TaskProps> = ({
  id, name, unit, target, progress, color, onEditStart,
}) => {
  const dispatch = useDispatch();

  const incrementHandler = () => {
    const updatedProgress = progress + (unit === TaskUnit.Count ? 1 : 60e3);
    dispatch(tasksActions.updateTaskProgress({
      dateKeyString: getDateKeyString(new Date()),
      taskId: id,
      progress: updatedProgress,
    }));
  };

  const decrementHandler = () => {
    const updatedProgress = progress - (unit === TaskUnit.Count ? 1 : 60e3);
    dispatch(tasksActions.updateTaskProgress({
      dateKeyString: getDateKeyString(new Date()),
      taskId: id,
      progress: updatedProgress,
    }));
  };

  const editStartHandler = () => {
    onEditStart(id);
  };

  return (
    <Card className={classes.task}>
      <header className={classes.task__header}>
        <h2>{name}</h2>
        <Button icon={EditFilled} onClick={editStartHandler} className={classes['task__edit-button']} />
      </header>
      <div className={classes['task__fulfill-container']}>
        <TaskBar max={target} current={progress} color={color} unit={unit} />
        <TaskForm
          unit={unit}
          progress={progress}
          decrementHandler={decrementHandler}
          incrementHandler={incrementHandler}
        />
      </div>
    </Card>
  );
};

export default Task;
