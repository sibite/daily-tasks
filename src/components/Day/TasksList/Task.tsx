import { EditFilled } from '@fluentui/react-icons';
import React, { useContext } from 'react';
import { DaysContext } from '../../../store/DaysContext';
import { TaskUnit } from '../../../store/TasksContext';
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
  const daysCtx = useContext(DaysContext);

  const incrementHandler = () => {
    const updatedProgress = progress + (unit === TaskUnit.Count ? 1 : 60e3);
    daysCtx.updateTaskProgress(getDateKeyString(new Date()), id, updatedProgress);
  };

  const decrementHandler = () => {
    const updatedProgress = progress - (unit === TaskUnit.Count ? 1 : 60e3);
    daysCtx.updateTaskProgress(getDateKeyString(new Date()), id, updatedProgress);
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
