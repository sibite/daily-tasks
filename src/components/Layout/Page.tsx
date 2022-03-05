import React from 'react';
import classes from './Page.module.scss';

interface PageProps {
  type?: 'horizontal' | 'default';
}

const defaultProps: PageProps = {
  type: 'default',
};

const Page: React.FC<PageProps> = ({
  type, children,
}) => (
  <section className={classes.page}>
    {type === 'default' && (
    <div className={classes.page__inner}>
      {children}
    </div>
    )}
    {type === 'horizontal' && (
    <div className={[classes.page__inner, classes['page__inner--horizontal']].join(' ')}>
      {children}
    </div>
    )}
  </section>
);

Page.defaultProps = defaultProps;

export default Page;
