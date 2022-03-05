import { EditFilled } from '@fluentui/react-icons';
import React from 'react';
import { Task } from '../../store/tasks/tasks-types';
import getTaskColor from '../../utilities/getTaskColor';
import Button from '../UI/Button';
import Card from '../UI/Card';
import classes from './TaskItem.module.scss';

interface PropsType {
  task: Task;
  index: number;
}

const TaskItem: React.FC<PropsType> = ({
  task, index,
}) => {
  const taskColor = getTaskColor(index);

  return (
    <Card className={classes['task-item']}>
      <div className={classes['task-item__bar']} style={{ backgroundColor: taskColor }} />
      <header className={classes['task-item__header']}>
        <h2>{task.name}</h2>
      </header>
    </Card>
  );
};

export default TaskItem;
