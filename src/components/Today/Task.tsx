import React from 'react';
import { TaskUnit } from '../../store/TasksContext';
import classes from './Task.module.scss';
import TaskBar from './TaskBar';
import TaskStatusForm from './TaskStatusForm';

interface TaskProps {
  name: string;
  unit: TaskUnit;
  target: number;
  progress: number;
  color: string;
}

const Task: React.FC<TaskProps> = ({
  name, unit, target, progress, color,
}) => (
  <li className={classes.task}>
    <h2>{name}</h2>
    <div className={classes['task__fulfill-container']}>
      <TaskBar max={target} current={progress} color={color} unit={unit} />
      <TaskStatusForm />
    </div>
  </li>
);

export default Task;
