import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import classes from './NavigationItem.module.scss';

interface NavigationItemProps {
  title: string;
  href: string;
}

const NavigationItem: React.FC<NavigationItemProps> = ({
  title, href,
}) => (
  <NavLink to={href} className={classes.navigation__item}>
    {title}
  </NavLink>
);

export default NavigationItem;
