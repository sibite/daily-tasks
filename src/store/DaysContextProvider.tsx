import React from 'react';
import { DaysContext } from './DaysContext';

const defaultValue = {
  days: {},
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
