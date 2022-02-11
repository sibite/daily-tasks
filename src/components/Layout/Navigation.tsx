import React from 'react';
import classes from './Navigation.module.scss';
import NavigationItem from './NavigationItem';

const Navigation: React.FC = () => (
  <div className={classes.navigation}>
    <NavigationItem title="Today" />
    <NavigationItem title="Calendar" />
    <NavigationItem title="Add task" />
  </div>
);

export default Navigation;
