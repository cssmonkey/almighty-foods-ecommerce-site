import React from 'react';
import Icon from '@components/icon';

const Quote = ({ data = {} }) => {
  // Extract our module data
  const { text, author } = data;

  return (
    <div className="quote">
      <div className="quote__inner">
        <blockquote>
          <div className="blockquote__text">
            <Icon
              name="Quote"
              className="blockquote__quotemark-start"
              id="quote-start"
              viewBox="0 0 56 34.206"
            />
            <p>{text}</p>
            <Icon
              name="Quote"
              className="blockquote__quotemark-end"
              id="quote-end"
              viewBox="0 0 56 34.206"
            />
          </div>
          {author && <footer>{author}</footer>}
        </blockquote>
      </div>
    </div>
  );
};

export default Quote;
