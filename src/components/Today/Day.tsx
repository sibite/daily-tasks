import React from 'react';
import Page from '../Layout/Page';
import PageSegment from '../Layout/PageSegment';
import TasksList from './TasksList';
import classes from './Day.module.scss';

const Day: React.FC = () => (
  <Page title="Today's daily tasks">
    <PageSegment>
      <TasksList />
    </PageSegment>
  </Page>
);

export default Day;
