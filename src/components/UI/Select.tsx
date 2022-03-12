import React, {
  ChangeEventHandler, useContext,
} from 'react';
import classes from './Input.module.scss';
import { ToolbarContext } from './InputToolbar';

interface PropsType {
  label: string;
  value: string | number;
  id: string;
  onChange: ChangeEventHandler;
}

const Select: React.FC<PropsType> = (props) => {
  const {
    children, label, value, id, onChange,
  } = props;

  const isInsideToolbar = useContext(ToolbarContext) === true;

  return (
    <label
      htmlFor={id}
      className={[
        classes.input,
        isInsideToolbar ? classes['input--inside-toolbar'] : '',
      ].join(' ')}
    >
      <span className={classes.input__label}>{label}</span>
      <select
        className={classes.input__control}
        id={id}
        value={value.toString()}
        onChange={onChange}
      >
        {children}
      </select>
    </label>
  );
};

export default Select;
