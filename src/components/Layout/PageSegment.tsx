import React, { useContext, useMemo } from 'react';
import { PageContext } from './Page';
import classes from './PageSegment.module.scss';

interface PropsType {
  className?: string;
}

const defaultProps = {
  className: '',
};

const PageSegment: React.FC<PropsType> = ({ children, className }) => {
  const pageContext = useContext(PageContext);
  const mergedClassName = `${classes[`page__segment--${pageContext.type}`]} ${className}`;
  const contextValue = useMemo(() => ({ type: 'default' }), []);

  return (
    <PageContext.Provider value={contextValue}>
      <section className={mergedClassName}>
        {children}
      </section>
    </PageContext.Provider>
  );
};

PageSegment.defaultProps = defaultProps;

export default PageSegment;
