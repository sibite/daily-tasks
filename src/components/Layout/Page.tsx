import React, { useMemo } from 'react';
import classes from './Page.module.scss';

interface PageProps {
  type?: 'default' | 'horizontal';
}

const defaultProps: PageProps = {
  type: 'default',
};

export const PageContext = React.createContext({
  type: 'default',
});

const Page: React.FC<PageProps> = ({
  type = 'default', children,
}) => {
  const contextValue = useMemo(() => ({ type }), [type]);

  let className = classes.page__inner;
  if (type === 'horizontal') {
    className = [classes.page__inner, classes['page__inner--horizontal']].join(' ');
  }

  return (
    <PageContext.Provider value={contextValue}>
      <section className={classes.page}>
        <div className={className}>
          {children}
        </div>
      </section>
    </PageContext.Provider>
  );
};

Page.defaultProps = defaultProps;

export default Page;
