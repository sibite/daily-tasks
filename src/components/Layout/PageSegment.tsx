import React from 'react';
import classes from './PageSegment.module.scss';

const PageSegment: React.FC = ({ children }) => (
  <section className={classes.page__segment}>
    {children}
  </section>
);

export default PageSegment;
