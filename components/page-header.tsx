import React, { FC } from 'react';
import { titleCase } from 'title-case';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

const PageHeader: FC<PageHeaderProps> = ({ title, subtitle }) => (
  <div className="page-header">
    <h1>{titleCase(title)}</h1>
    {subtitle && <p className="page-header__subtitle">{titleCase(subtitle)}</p>}
  </div>
);

export default PageHeader;
