import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Task } from '../../store/tasks/tasks-types';
import TaskItem from './TaskItem';
import classes from './TaskPicker.module.scss';

const TaskPicker = () => {
  const tasksState = useSelector((state: RootState) => state.tasks.tasks);

  const taskItems = (Object.values(tasksState) as Task[]).map(
    (task, i) => <TaskItem key={task.id} task={task} index={i} />,
  );

  return (
    <div className={classes['task-picker']}>
      <div className={classes['task-picker__inner']}>
        {taskItems}
      </div>
    </div>
  );
};

export default TaskPicker;
