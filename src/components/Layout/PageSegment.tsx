import React from 'react';
import classes from './PageSegment.module.scss';

const PageSegment: React.FC = ({ children }) => (
  <div className={classes.page__segment}>
    {children}
  </div>
);

export default PageSegment;
