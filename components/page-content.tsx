import React, { FC } from 'react';

interface PageContentProps {
  children: JSX.Element | JSX.Element[];
}

const PageContent: FC<PageContentProps> = ({ children }) => (
  <div className="page-content">{children}</div>
);

export default PageContent;
