import React from 'react';
import cx from 'classnames';
import BlockContent from '@sanity/block-content-to-react';
import { serializers } from '@lib/serializers';

const Freeform = ({ data }) => {
  const { content, textAlign } = data;

  if (!content) return null;

  return (
    <BlockContent
      renderContainerOnSingleChild
      className={cx('rc', textAlign)}
      blocks={content}
      serializers={serializers}
    />
  );
};

export default Freeform;
