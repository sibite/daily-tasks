import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Task } from '../../store/tasks/tasks-types';
import TaskItem from './TaskItem';
import classes from './TaskPicker.module.scss';

interface PropsType {
  selectedTaskId: number;
  onPickTask: (id: number) => void;
}

const TaskPicker: React.FC<PropsType> = ({
  selectedTaskId, onPickTask,
}) => {
  const tasksState = useSelector((state: RootState) => state.tasks.tasks);

  const pickHandler = (id: number) => {
    onPickTask(id);
  };

  const taskItems = (Object.values(tasksState) as Task[]).map(
    (task, i) => (
      <TaskItem
        key={task.id}
        task={task}
        index={i}
        onPick={pickHandler}
        isActive={selectedTaskId === task.id}
      />
    ),
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
