import React from 'react';
import classes from './Page.module.scss';

const Page: React.FC = ({
  children,
}) => (
  <section className={classes.page}>
    <div className={classes.page__inner}>
      {/* <h1>{title}</h1>
      <div className={classes.page__content}> */}
      {children}
      {/* </div> */}
    </div>
  </section>
);

export default Page;
