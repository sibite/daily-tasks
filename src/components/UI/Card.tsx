/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { CSSProperties } from 'react';
import classes from './Card.module.scss';

interface CardProps {
  className?: string;
  style?: CSSProperties;
  forwardedProps?: { [key: string]: any };
}

const Card: React.FC<CardProps> = ({
  className, style, children, forwardedProps,
}) => (
  <div className={`${classes.card} ${className}`} style={style} {...forwardedProps}>
    {children}
  </div>
);

Card.defaultProps = {
  className: '',
  style: {},
  forwardedProps: {},
};

export default Card;
