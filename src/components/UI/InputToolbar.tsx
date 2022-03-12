import React from 'react';
import classes from './InputToolbar.module.scss';

export const ToolbarContext = React.createContext(true);

const InputToolbar: React.FC = (props) => {
  const { children } = props;

  return (
    <ToolbarContext.Provider value>
      <fieldset className={classes['input-toolbar']}>
        {children}
      </fieldset>
    </ToolbarContext.Provider>
  );
};

export default InputToolbar;
