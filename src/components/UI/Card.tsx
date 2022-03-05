import React, { CSSProperties } from 'react';
import classes from './Card.module.scss';

interface CardProps {
  className?: string;
  style?: CSSProperties;
}

const Card: React.FC<CardProps> = ({ className, style, children }) => (
  <div className={`${classes.card} ${className}`} style={style}>
    {children}
  </div>
);

Card.defaultProps = {
  className: '',
  style: {},
};

export default Card;
