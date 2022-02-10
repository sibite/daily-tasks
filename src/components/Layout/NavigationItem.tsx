import React from 'react';
import classes from './NavigationItem.module.scss';

interface NavigationItemProps {
  title: string;
}

const NavigationItem: React.FC<NavigationItemProps> = ({
  title,
}) => (
  <button type="button" className={classes.navigation__item}>
    {title}
  </button>
);

export default NavigationItem;
