import React from 'react';
import Page from '../Layout/Page';
import PageSegment from '../Layout/PageSegment';
import TasksList from './TasksList';
import classes from './Today.module.scss';

// interface TodayProps {}

const Today: React.FC = () => (
  <Page title="Today's tasks">
    <PageSegment>
      <TasksList />
    </PageSegment>
  </Page>
);

export default Today;
