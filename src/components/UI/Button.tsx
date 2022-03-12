import { FluentIconsProps } from '@fluentui/react-icons';
import React from 'react';
import classes from './Button.module.scss';

interface ButtonProps {
  className?: string;
  icon: React.FC<FluentIconsProps> | false;
  wide?: boolean;
  freeMargin?: boolean;
  disabled?: boolean;
  submit?: boolean;
  onClick?: () => void;
}

const defaultProps = {
  className: '',
  wide: false,
  freeMargin: false,
  disabled: false,
  submit: false,
  onClick: () => {},
};

const iconSize = '20px';

const Button: React.FC<ButtonProps> = ({
  className, icon, wide, freeMargin, disabled, submit, onClick, children,
}) => {
  const mergedClassName = [
    classes.button,
    wide && children === undefined ? classes['button--wide'] : '',
    freeMargin ? classes['button--free-margin'] : '',
    className,
    children !== undefined ? classes['button--with-text'] : '',
  ].join(' ');

  return (
    <button
      className={mergedClassName}
      type={submit ? 'submit' : 'button'}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && React.createElement(icon, { width: iconSize, height: iconSize })}
      {children}
    </button>
  );
};

Button.defaultProps = defaultProps;

export default Button;
