import React from 'react';
import { Page } from '../../Page.type';
import classes from './Navigation.module.scss';
import NavigationItem from './NavigationItem';

const Navigation: React.FC = () => {
  const pages: Page[] = [
    {
      title: 'Day',
      shortTitle: 'Day',
      component: NavigationItem,
    },
  ];

  return (
    <div className={classes.navigation}>
      <NavigationItem title="Today" />
      <NavigationItem title="Calendar" />
      <NavigationItem title="Add task" />
    </div>
  );
};

export default Navigation;
