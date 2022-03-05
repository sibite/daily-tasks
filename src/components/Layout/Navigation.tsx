import React from 'react';
import classes from './Navigation.module.scss';
import NavigationItem from './NavigationItem';

const Navigation: React.FC = () => (
  <div className={classes.navigation}>
    <NavigationItem href="/day" title="Today" />
    <NavigationItem href="/calendar" title="Calendar" />
    <NavigationItem href="/day" title="Add task" />
  </div>
);

export default Navigation;
