import { FluentIconsProps } from '@fluentui/react-icons';
import React from 'react';
import classes from './Button.module.scss';

interface ButtonProps {
  id: string;
  icon: React.FC<FluentIconsProps>
  wide?: boolean;
}

const iconSize = '20px';

const Button: React.FC<ButtonProps> = ({
  id, icon, wide,
}) => (
  <button
    className={`${classes.button} ${wide ? classes['button--wide'] : ''}`}
    type="button"
    id={id}
  >
    {React.createElement(icon, { width: iconSize, height: iconSize })}
  </button>
);

Button.defaultProps = {
  wide: false,
};

export default Button;
