/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { CSSProperties } from 'react';
import { Task } from '../../store/tasks/tasks-types';
import getTaskColor from '../../utilities/getTaskColor';
import Card from '../UI/Card';
import classes from './TaskItem.module.scss';

interface PropsType {
  task: Task;
  index: number;
  isActive: boolean;
  onPick: (...arg: any) => void;
}

const TaskItem: React.FC<PropsType> = ({
  task, index, onPick, isActive,
}) => {
  const taskColor = getTaskColor(index);

  const pickHandler = () => {
    onPick(index);
  };

  return (
    <Card
      className={`${classes['task-item']} ${isActive ? classes['task-item--active'] : ''}`}
      forwardedProps={{
        onClick: pickHandler,
        style: { '--task-color': taskColor } as CSSProperties,
      }}
    >
      <div className={classes['task-item__bar']} />
      <header className={classes['task-item__header']}>
        <h2>{task.name}</h2>
      </header>
    </Card>
  );
};

export default TaskItem;
