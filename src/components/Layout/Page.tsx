import React from 'react';
import classes from './Page.module.scss';

interface PageProps {
  title: string
}

const Page: React.FC<PageProps> = ({
  title,
  children,
}) => (
  <section className={classes.page}>
    <div className={classes.page__inner}>
      <h1>{title}</h1>
      <div className={classes.page__content}>
        {children}
      </div>
    </div>
  </section>
);

export default Page;
