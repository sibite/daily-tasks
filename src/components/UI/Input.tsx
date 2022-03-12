import React, {
  ChangeEventHandler, HTMLInputTypeAttribute, ReactEventHandler, useContext,
} from 'react';
import classes from './Input.module.scss';
import { ToolbarContext } from './InputToolbar';

interface PropsType {
  label: string;
  value: string | number;
  id: string;
  type: HTMLInputTypeAttribute;
  onChange: ChangeEventHandler;
  onBlur: ReactEventHandler;
}

const Input: React.FC<PropsType> = (props) => {
  const {
    label, value, id, type, onChange, onBlur,
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
      <input
        className={classes.input__control}
        id={id}
        type={type}
        value={value.toString()}
        onChange={onChange}
        onBlur={onBlur}
      />
    </label>
  );
};

export default Input;
