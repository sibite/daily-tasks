import React, {
  useCallback, useContext, useMemo, useState,
} from 'react';
import getDateKeyString, { DateKeyString } from '../utilities/getDateKeyString.function';
import { Day, DaysContext, DaysStoreType } from './DaysContext';
import { TasksContext } from './TasksContext';

const DaysContextProvider: React.FC = ({ children }) => {
  const defaultDays: { [key: DateKeyString]: Day } = {
    [getDateKeyString(new Date())]: {
      tasks: {
        0: { progress: 3 },
        1: { progress: 3e6 },
        2: { progress: 7 },
        3: { progress: 8e5 },
        4: { progress: 0 },
        5: { progress: 4e5 },
      },
    },
  };

  const [days, setDays] = useState(defaultDays);
  const tasksCtx = useContext(TasksContext);

  const updateTaskProgress = useCallback((
    dateKeyString: DateKeyString,
    taskId: number,
    progress: number,
  ) => {
    setDays((oldDays) => {
      const newDays = {
        ...oldDays,
      };

      if (!newDays[dateKeyString]) {
        newDays[dateKeyString] = { tasks: { [taskId]: { progress: 0 } } };
      }

      const taskTarget = tasksCtx.list[taskId]?.target ?? Infinity;
      const validatedProgress = Math.max(Math.min(progress, taskTarget), 0);

      newDays[dateKeyString].tasks[taskId].progress = validatedProgress;

      return newDays;
    });
  }, [tasksCtx.list]);

  const value: DaysStoreType = useMemo(() => ({
    days,
    updateTaskProgress,
  }), [days, updateTaskProgress]);

  return (
    <DaysContext.Provider value={value}>
      {children}
    </DaysContext.Provider>
  );
};

export default DaysContextProvider;
