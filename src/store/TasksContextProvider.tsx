import React from 'react';
import { TasksContext, TasksContextType, TaskUnit } from './TasksContext';

const defaultValue: TasksContextType = {
  list: {
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
      target: 5,
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
      target: 5,
    },
    5: {
      id: 5,
      name: 'Second task',
      unit: TaskUnit.Timestamp,
      target: 20 * 60e3,
    },
  },
};

const TasksContextProvider: React.FC = ({ children }) => {
  const value = defaultValue;

  return (
    <TasksContext.Provider value={value}>
      {children}
    </TasksContext.Provider>
  );
};

export default TasksContextProvider;
