import { FluentIconsProps } from '@fluentui/react-icons';
import React from 'react';
import classes from './Button.module.scss';

interface ButtonProps {
  className?: string;
  icon: React.FC<FluentIconsProps>;
  wide?: boolean;
  freeMargin?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const iconSize = '20px';

const Button: React.FC<ButtonProps> = ({
  className, icon, wide, freeMargin, disabled, onClick,
}) => (
  <button
    className={`${classes.button} ${wide ? classes['button--wide'] : ''} ${freeMargin ? classes['button--free-margin'] : ''} ${className}`}
    type="button"
    onClick={onClick}
    disabled={disabled}
  >
    {React.createElement(icon, { width: iconSize, height: iconSize })}
  </button>
);

Button.defaultProps = {
  className: '',
  wide: false,
  freeMargin: false,
  disabled: false,
  onClick: () => {},
};

export default Button;
