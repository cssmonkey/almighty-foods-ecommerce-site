import React from 'react';

const Quote = ({ data = {} }) => {
  // Extract our module data
  const { text, author } = data;

  return (
    <div className="quote">
      <div className="quote__inner">
        <blockquote>
          <p>{text}</p>
          {author && <footer>{author}</footer>}
        </blockquote>
      </div>
    </div>
  );
};

export default Quote;
