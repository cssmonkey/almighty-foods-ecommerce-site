import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import { serializers } from '@lib/serializers';

const Freeform = ({ data }) => {
  const { content } = data;

  if (!content) return null;

  return (
    <BlockContent
      renderContainerOnSingleChild
      className="rc"
      blocks={content}
      serializers={serializers}
    />
  );
};

export default Freeform;
