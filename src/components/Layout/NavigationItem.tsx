import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.module.scss';

interface NavigationItemProps {
  title: string;
  href: string;
}

const NavigationItem: React.FC<NavigationItemProps> = ({
  title, href,
}) => {
  const className = ({ isActive }: { isActive: boolean }) => [
    classes.navigation__item,
    isActive ? classes['navigation__item--active'] : '',
  ].join(' ');

  return (
    <NavLink to={href} className={className}>
      {title}
    </NavLink>
  );
};

export default NavigationItem;
