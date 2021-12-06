import React, { useState, useEffect, FC } from 'react';
import { titleCase } from 'title-case';
import { m } from 'framer-motion';
import cx from 'classnames';

interface AccordionProps {
  id: string;
  title: string;
  children: JSX.Element | JSX.Element[];
}
const Accordion: FC<AccordionProps> = ({ id, title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const accordionAnim = {
    open: {
      opacity: 1,
      height: 'auto',
    },
    closed: {
      opacity: 0,
      height: 0,
    },
  };

  return (
    <div key={id} className="accordion">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen ? 'true' : 'false'}
        aria-controls={`accordion-${id}`}
        className={cx('accordion--toggle', { 'is-open': isOpen })}
      >
        {titleCase(title)}
        <div className="accordion--icon" />
      </button>

      <m.div
        id={`accordion-${id}`}
        className="accordion--content"
        initial={isOpen ? 'open' : 'closed'}
        animate={isOpen ? 'open' : 'closed'}
        variants={accordionAnim}
        transition={{ duration: 0.5, ease: [0.19, 1.0, 0.22, 1.0] }}
      >
        <div className="accordion--inner">{children}</div>
      </m.div>
    </div>
  );
};

export default Accordion;
