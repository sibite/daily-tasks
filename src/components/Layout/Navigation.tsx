import React from 'react';
import classes from './Navigation.module.scss';
import NavigationItem from './NavigationItem';

const Navigation: React.FC = () => (
  <div className={classes.navigation}>
    <NavigationItem href="/day" title="Manage tasks" />
    <NavigationItem href="/calendar" title="Calendar" />
  </div>
);

export default Navigation;
