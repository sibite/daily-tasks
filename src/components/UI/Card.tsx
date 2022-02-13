import React from 'react';
import classes from './Card.module.scss';

interface CardProps {
  className?: string;
}

const Card: React.FC<CardProps> = ({ className, children }) => (
  <div className={`${classes.card} ${className}`}>
    {children}
  </div>
);

Card.defaultProps = {
  className: '',
};

export default Card;
