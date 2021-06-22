import React, { FC } from 'react';
import BlockContent from '@sanity/block-content-to-react';
import { serializers } from '@lib/serializers';

interface PageHeaderProps {
  title: string;
  introText?: Record<string, unknown>;
}

const PageHeader: FC<PageHeaderProps> = ({ title, introText }) => (
  <div className="page-header">
    <h1>{title}</h1>
    {introText && (
      <BlockContent
        renderContainerOnSingleChild
        className="page-header__intro-text"
        blocks={introText}
        serializers={serializers}
      />
    )}
  </div>
);

export default PageHeader;
