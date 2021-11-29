import React from 'react';
import cx from 'classnames';
import { titleCase } from 'title-case';

export const Header1 = ({ children }) => (
  <h1
    style={{
      margin: '0',
      fontSize: '2rem',
      lineHeight: '1.5',
      fontWeight: 400
    }}
  >
    {titleCase(children)}
  </h1>
);

export const Header2 = ({ children }) => (
  <h2
    style={{
      margin: '0',
      fontSize: '1.75rem',
      lineHeight: '1.375',
      fontWeight: 400
    }}
  >
    {titleCase(children)}
  </h2>
);

export const Header3 = ({ children }) => (
  <h3
    style={{
      margin: '0',
      fontSize: '1.5rem',
      lineHeight: '1.25',
      fontWeight: 400
    }}
  >
    {titleCase(children)}
  </h3>
);

export const Header4 = ({ children }) => (
  <h4
    style={{
      margin: '0',
      fontSize: '1.25rem',
      lineHeight: '1.25',
      fontWeight: 400
    }}
  >
    {titleCase(children)}
  </h4>
);

export const Button = ({ isButton, styles, children }) => {
  if (!isButton) return children;

  return (
    <span
      className={cx('btn', styles?.style, {
        'is-large': styles?.isLarge,
        'is-block': styles?.isBlock
      })}
    >
      {children}
    </span>
  );
};

export const EnlargedParagraph = ({ children }) => (
  <p
    style={{
      margin: '0',
      fontSize: '1.25rem',
      lineHeight: '1.25',
      fontWeight: 400
    }}
  >
    {children}
  </p>
);
