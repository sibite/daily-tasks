import React from 'react';
import getDateKeyString from '../utilities/getDateKeyString.function';
import { DaysContext } from './DaysContext';

const defaultValue = {
  days: {
    [getDateKeyString(new Date())]: {
      tasks: {
        0: { id: 0, progress: 3 },
        1: { id: 1, progress: 3e6 },
        2: { id: 2, progress: 7 },
        3: { id: 3, progress: 8e5 },
        4: { id: 4, progress: 0 },
        5: { id: 5, progress: 4e5 },
      },
    },
  },
};

const DaysContextProvider: React.FC = ({ children }) => {
  const value = defaultValue;

  return (
    <DaysContext.Provider value={value}>
      {children}
    </DaysContext.Provider>
  );
};

export default DaysContextProvider;
