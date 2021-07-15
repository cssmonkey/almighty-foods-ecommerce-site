import React, { FC } from 'react';
import BlockContent from '@sanity/block-content-to-react';
import { serializers } from '@lib/serializers';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

const PageHeader: FC<PageHeaderProps> = ({ title, subtitle }) => (
  <div className="page-header">
    <h1>{title}</h1>
    <p className="page-header__subtitle">{subtitle}</p>
    {/* {introText && (
      <BlockContent
        renderContainerOnSingleChild
        className=""
        blocks={introText}
        serializers={serializers}
      />
    )} */}
  </div>
);

export default PageHeader;
