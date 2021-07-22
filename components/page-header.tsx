import React, { FC } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

const PageHeader: FC<PageHeaderProps> = ({ title, subtitle }) => (
  <div className="page-header">
    <h1>{title}</h1>
    {subtitle && <p className="page-header__subtitle">{subtitle}</p>}
  </div>
);

export default PageHeader;
