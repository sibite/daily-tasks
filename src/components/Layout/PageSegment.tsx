import React, { useContext, useMemo } from 'react';
import { PageContext } from './Page';
import classes from './PageSegment.module.scss';

const PageSegment: React.FC = ({ children }) => {
  const pageContext = useContext(PageContext);
  const className = `${classes[`page__segment--${pageContext.type}`]}`;
  const contextValue = useMemo(() => ({ type: 'default' }), []);

  return (
    <PageContext.Provider value={contextValue}>
      <section className={className}>
        {children}
      </section>
    </PageContext.Provider>
  );
};

export default PageSegment;
