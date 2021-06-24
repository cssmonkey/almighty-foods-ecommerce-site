import React, { useRef, FC } from 'react';
import { useIntersection } from 'use-intersection';
import Link from 'next/link';
import Photo, { PhotoImage } from '@components/photo';

interface Product {
  title: string;
  slug: string;
}

interface ProductsGridProps {
  data: {
    title?: string;
    productsList?: Product[];
  };
}
//@ts-ignore
const ProductsGrid: FC<ProductsGridProps> = ({ data }) => {
  const { title, productsList } = data;
  const productsListRef = useRef();
  const isIntersecting = useIntersection(productsListRef, {
    once: true,
    threshold: 0.1,
  });

  return (
    <div className="products-grid">
      <div className="products-grid__inner">
        {title && <h2 className="products-grid__title">{title}</h2>}
        <ul ref={productsListRef} className="products-grid__list">
          {productsList.map((product, i) => (
            <li className="products-grid__list-item" key={i}>
              <Link href={`/recipes/${product.slug}`}>
                <a>
                  <div className="products-grid-item-image"></div>
                  <span className="products-grid-item-title">
                    {product.title}
                  </span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
        <div className="products-grid__control text-center">
          <Link href={`/shop`}>
            <a className="cta-link">
              <span className="cta-link__text">Shop for all our products</span>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductsGrid;
