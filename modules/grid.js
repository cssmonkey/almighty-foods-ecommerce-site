import React from 'react';
import cx from 'classnames';

import Freeform from '@blocks/freeform';
import Accordions from '@blocks/accordions';
import ProductCard from '@blocks/shop/product-card';
// import Carousel from '@blocks/Carousel'
import Photo from '@components/photo';

const Grid = ({ data = {} }) => {
  const { size, columns } = data;

  const getGridSize = (
    breakpoint,
    size,
    justify = false,
    align = false,
    start = false
  ) => {
    const hasBreakpoint = breakpoint && breakpoint.trim();
    const colSpan = hasBreakpoint
      ? `${breakpoint}:col-span-${size}`
      : `col-span-${size}`;

    const colStart = hasBreakpoint
      ? `${breakpoint}:col-start-${start}`
      : `col-start-${start}`;

    const colJustify = hasBreakpoint ? `${breakpoint}:${justify}` : justify;
    const colAlign = hasBreakpoint ? `${breakpoint}:${align}` : align;

    return cx(
      colSpan,
      start && colStart,
      justify && colJustify,
      align && colAlign
    );
  };

  return (
    <section className="section">
      <div className="section--content">
        <div
          className={`grid grid-cols-${size} gap-x-4 gap-y-4 sm:gap-x-8 sm:gap-y-8 lg:gap-x-12 lg:gap-y-12`}
        >
          {columns.map((col, key) => {
            const { sizes, blocks } = col;

            return (
              <div
                key={key}
                className={cx(
                  sizes.map((size) =>
                    getGridSize(
                      size.breakpoint,
                      size.width,
                      size.justify,
                      size.align,
                      size.start
                    )
                  )
                )}
              >
                {blocks.map((block, key) => (
                  <GridBlock key={key} block={block} />
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const GridBlock = ({ block }) => {
  const type = block._type;

  switch (type) {
    case 'freeform':
      return (
        <div className="freeform-text">
          <Freeform data={block} />
        </div>
      );
    case 'accordions':
      return <Accordions data={block} />;
    case 'productCard':
      return (
        <ProductCard
          className="is-inline"
          product={block.product}
          hasVisuals
          showThumbs
          showPrice
        />
      );
    case 'figure':
      return <Photo photo={block} width={1200} srcSizes={[800, 1000, 1200]} />;
    default:
      return null;
  }
};

export default Grid;
