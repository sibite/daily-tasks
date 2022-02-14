import React, { useCallback, useMemo, useState } from 'react';
import {
  Task,
  TasksContext, TasksListType, TasksStoreType, TaskUnit,
} from './TasksContext';

const TasksContextProvider: React.FC = ({ children }) => {
  const defaultList: TasksListType = {
    0: {
      id: 0,
      name: 'Test task',
      unit: TaskUnit.Count,
      count: 5,
      timestamp: 60e3,
    },
    1: {
      id: 1,
      name: 'Second task',
      unit: TaskUnit.Timestamp,
      count: 1,
      timestamp: 130 * 60e3,
    },
    2: {
      id: 2,
      name: 'Test task',
      unit: TaskUnit.Count,
      count: 10,
      timestamp: 60e3,
    },
    3: {
      id: 3,
      name: 'Second task',
      unit: TaskUnit.Timestamp,
      count: 1,
      timestamp: 20 * 60e3,
    },
    4: {
      id: 4,
      name: 'Test task',
      unit: TaskUnit.Count,
      count: 1,
      timestamp: 60e3,
    },
    5: {
      id: 5,
      name: 'Second task',
      unit: TaskUnit.Timestamp,
      count: 1,
      timestamp: 50 * 60e3,
    },
  };

  const [list, setList] = useState(defaultList);

  const updateTask = useCallback((id: number, name: string, target: number, unit: TaskUnit) => {
    setList((oldList) => {
      const newList = { ...oldList };
      const oldTask: Task = oldList[id];

      if (!oldTask) return oldList;
      let updatedTask: Partial<Task> = {};

      if (unit === TaskUnit.Count) {
        updatedTask = {
          ...oldTask, name, unit, count: target,
        };
      } else {
        updatedTask = {
          ...oldTask, name, unit, timestamp: target,
        };
      }

      newList[id] = updatedTask as Task;

      return newList;
    });
  }, []);

  const value = useMemo(() => ({
    list, updateTask,
  }), [list, updateTask]);

  return (
    <TasksContext.Provider value={value}>
      {children}
    </TasksContext.Provider>
  );
};

export default TasksContextProvider;
