import React, {
  useCallback, useContext, useMemo, useState,
} from 'react';
import getDateKeyString, { DateKeyString } from '../utilities/getDateKeyString.function';
import { Day, DaysContext, DaysStoreType } from './DaysContext';
import { TasksContext, TaskUnit } from './TasksContext';

const DaysContextProvider: React.FC = ({ children }) => {
  const defaultDays: { [key: DateKeyString]: Day } = {
    [getDateKeyString(new Date())]: {
      tasks: {
        0: { progress: 3, unit: TaskUnit.Count },
        1: { progress: 3e6, unit: TaskUnit.Timestamp },
        2: { progress: 7, unit: TaskUnit.Count },
        3: { progress: 8e5, unit: TaskUnit.Timestamp },
        4: { progress: 0, unit: TaskUnit.Count },
        5: { progress: 4e5, unit: TaskUnit.Timestamp },
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

      const task = tasksCtx.list[taskId];
      const taskTarget = task.unit === TaskUnit.Count ? task.count : task.timestamp;
      const validatedProgress = Math.max(Math.min(progress, taskTarget || Infinity), 0);

      if (!newDays[dateKeyString]) {
        newDays[dateKeyString] = { tasks: { [taskId]: { progress: 0, unit: task.unit } } };
      }

      newDays[dateKeyString].tasks[taskId].progress = validatedProgress;

      return newDays;
    });
  }, [tasksCtx.list]);

  const updateTaskUnit = useCallback((
    dateKeyString: DateKeyString,
    taskId: number,
    unit: TaskUnit,
  ) => {
    setDays((oldDays) => {
      if (!oldDays[dateKeyString]) return oldDays;

      const newDays = {
        ...oldDays,
      };

      const task = tasksCtx.list[taskId];
      const taskEntry = newDays[dateKeyString].tasks[taskId];

      // this won't work by now, because Context API doesn't give up to date TasksContext
      // but I will leave it here to future use after introducing Redux
      //
      // const oldTaskTarget = taskEntry.unit === TaskUnit.Count ? task.count : task.timestamp;
      // const newTaskTarget = unit === TaskUnit.Count ? task.count : task.timestamp;

      // const progressProportion = taskEntry.progress / oldTaskTarget;
      // let newProgress: number;
      // if (task.unit === TaskUnit.Count && unit === TaskUnit.Timestamp) {
      //   newProgress = Math.round((progressProportion * newTaskTarget) / 60e3) * 60e3;
      // } else {
      //   newProgress = Math.round(progressProportion * newTaskTarget);
      // }

      // const validatedProgress = Math.max(Math.min(newProgress, newTaskTarget || Infinity), 0);

      // taskEntry.progress = validatedProgress;

      if (taskEntry.unit !== unit) {
        taskEntry.progress = 0;
      }
      taskEntry.unit = unit;

      return newDays;
    });
  }, [tasksCtx.list]);

  const value: DaysStoreType = useMemo(() => ({
    days,
    updateTaskProgress,
    updateTaskUnit,
  }), [days, updateTaskProgress, updateTaskUnit]);

  return (
    <DaysContext.Provider value={value}>
      {children}
    </DaysContext.Provider>
  );
};

export default DaysContextProvider;
