import React, { useContext, useState } from 'react';
import { TasksContext, TaskUnit } from '../../../store/TasksContext';
import { TodayTasksType } from './getTodayTasksArray.function';
import Task from './Task';
import TaskEdit from './TaskEdit';
import classes from './TasksList.module.scss';

interface TasksListProps {
  items: TodayTasksType
}

const TasksList: React.FC<TasksListProps> = ({ items }) => {
  const [editedTaskId, setEditedTaskId] = useState<number | null>(null);
  const tasksCtx = useContext(TasksContext);

  const editSaveHandler = (name: string, target: number, unit: TaskUnit) => {
    if (editedTaskId === null || editedTaskId < 0) return;
    tasksCtx.updateTask(editedTaskId, name, target, unit);
    setEditedTaskId(null);
  };

  const editStartHandler = (taskId: number) => {
    setEditedTaskId(taskId);
  };

  const editCancelHandler = () => {
    setEditedTaskId(null);
  };

  const tasks = items.map(({ task, progress }, index) => {
    if (task.id !== editedTaskId) {
      return (
        <Task
          id={task.id}
          key={task.id}
          name={task.name}
          unit={task.unit}
          progress={progress}
          target={task.target}
          onEditStart={editStartHandler}
          color={`hsl(${(220 + index * 145) % 360}, 70%, 50%)`}
        />
      );
    }
    return (
      <TaskEdit
        key={task.id}
        onSave={editSaveHandler}
        onCancel={editCancelHandler}
        name={task.name}
        target={task.target}
        unit={task.unit}
      />
    );
  });

  return (
    <div className={classes['tasks-list']}>
      {tasks}
    </div>
  );
};

export default TasksList;
