import React, { useCallback, useMemo, useState } from 'react';
import {
  TasksContext, TasksListType, TasksStoreType, TaskUnit,
} from './TasksContext';

const TasksContextProvider: React.FC = ({ children }) => {
  const defaultList: TasksListType = {
    0: {
      id: 0,
      name: 'Test task',
      unit: TaskUnit.Count,
      target: 5,
    },
    1: {
      id: 1,
      name: 'Second task',
      unit: TaskUnit.Timestamp,
      target: 130 * 60e3,
    },
    2: {
      id: 2,
      name: 'Test task',
      unit: TaskUnit.Count,
      target: 10,
    },
    3: {
      id: 3,
      name: 'Second task',
      unit: TaskUnit.Timestamp,
      target: 20 * 60e3,
    },
    4: {
      id: 4,
      name: 'Test task',
      unit: TaskUnit.Count,
      target: 1,
    },
    5: {
      id: 5,
      name: 'Second task',
      unit: TaskUnit.Timestamp,
      target: 50 * 60e3,
    },
  };

  const [list, setList] = useState(defaultList);

  const updateTask = useCallback((id: number, name: string, target: number, unit: TaskUnit) => {
    setList((oldList) => {
      const newList = { ...oldList };
      const oldTask = oldList[id];

      if (!oldTask) return oldList;

      const updatedTask = {
        ...oldTask, name, unit, target,
      };

      newList[id] = updatedTask;

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
