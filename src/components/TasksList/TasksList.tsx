import { Moment } from 'moment';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { tasksActions } from '../../store';
import { TaskUnit } from '../../store/tasks/tasks-types';
import getDateKeyString from '../../utilities/getDateKeyString.function';
import getTaskColor from '../../utilities/getTaskColor';
import { DayTasksType } from './getDayTasksArray.function';
import Task from './Task';
import TaskEdit from './TaskEdit';
import classes from './TasksList.module.scss';

interface TasksListProps {
  items: DayTasksType;
  date: Moment;
}

const TasksList: React.FC<TasksListProps> = ({ items, date }) => {
  const [editedTaskId, setEditedTaskId] = useState<number | null>(null);
  const dispatch = useDispatch();

  const dateKey = getDateKeyString(date.toDate());

  const editSaveHandler = (name: string, target: number, unit: TaskUnit) => {
    if (editedTaskId === null || editedTaskId < 0) return;
    dispatch(tasksActions.updateTask({
      id: editedTaskId, name, target, unit,
    }));
    dispatch(tasksActions.updateDayUnit({
      dateKeyString: dateKey, taskId: editedTaskId, unit,
    }));
    setEditedTaskId(null);
  };

  const editStartHandler = (taskId: number) => {
    setEditedTaskId(taskId);
  };

  const editCancelHandler = () => {
    setEditedTaskId(null);
  };

  const tasks = items.map(({ task, progress, unit }, index) => {
    const target = unit === TaskUnit.Count ? task.count : task.timestamp;

    if (task.id !== editedTaskId) {
      return (
        <Task
          date={date}
          id={task.id}
          key={`${dateKey}_${task.id}`}
          name={task.name}
          unit={unit}
          progress={progress}
          target={target}
          onEditStart={editStartHandler}
          color={getTaskColor(index)}
        />
      );
    }
    return (
      <TaskEdit
        key={task.id}
        onSave={editSaveHandler}
        onCancel={editCancelHandler}
        name={task.name}
        count={task.count}
        timestamp={task.timestamp}
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
