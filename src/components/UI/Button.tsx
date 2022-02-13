import { FluentIconsProps } from '@fluentui/react-icons';
import React from 'react';
import classes from './Button.module.scss';

interface ButtonProps {
  className?: string;
  icon: React.FC<FluentIconsProps>;
  wide?: boolean;
  onClick?: () => void;
}

const iconSize = '20px';

const Button: React.FC<ButtonProps> = ({
  className, icon, wide, onClick,
}) => (
  <button
    className={`${classes.button} ${wide ? classes['button--wide'] : ''} ${className}`}
    type="button"
    onClick={onClick}
  >
    {React.createElement(icon, { width: iconSize, height: iconSize })}
  </button>
);

Button.defaultProps = {
  className: '',
  wide: false,
  onClick: () => {},
};

export default Button;
