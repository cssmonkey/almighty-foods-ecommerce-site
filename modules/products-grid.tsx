import React, { useRef, FC } from 'react';
import { titleCase } from 'title-case';
import { useIntersection } from 'use-intersection';
import Link from 'next/link';
import Photo, { PhotoImage } from '@components/photo';
import { ProductPrice, ProductAdd } from '@blocks/product';

interface Product {
  title: string;
  slug: string;
  photo: PhotoImage;
  price: number;
  comparePrice: number;
  inStock: boolean;
}

interface ProductsGridProps {
  data: {
    title?: string;
    subtitle?: string;
    products?: Product[];
    showCta?: boolean;
  };
}
//@ts-ignore
const ProductsGrid: FC<ProductsGridProps> = ({ data }) => {
  const { title, products, subtitle, showCta } = data;
  const productsListRef = useRef();
  const isIntersecting = useIntersection(productsListRef, {
    once: true,
    threshold: 0.1,
  });

  const renderListItem = (product, i) => {
    const defaultVariant = product.variants[0];

    return (
      <li className="products-grid__list-item" key={i}>
        <Link href={`/products/${product.slug}`}>
          <a>
            {product.mainImage && (
              <div className="products-grid__list-item-image">
                <Photo
                  photo={product.mainImage}
                  hasPlaceholder={false}
                  forceLoad={isIntersecting}
                />
              </div>
            )}
            <span className="products-grid__list-item-title">
              {product.title}
            </span>
            <div className="products-grid__list-item-price-bar">
              <ProductPrice
                price={product.price}
                comparePrice={product.comparePrice}
              />
            </div>
          </a>
        </Link>
        {product.inStock && (
          <div className="products-grid__list-item-add-to-cart">
            <ProductAdd
              productID={defaultVariant.id}
              quantity={1}
              className="btn is-primary"
            >
              Add to Basket
            </ProductAdd>
          </div>
        )}
      </li>
    );
  };

  return (
    <div className="products-grid">
      <div className="products-grid__inner">
        {title && <h2 className="products-grid__title">{titleCase(title)}</h2>}
        {subtitle && <h3 className="products-grid__subtitle">{subtitle}</h3>}
        <ul ref={productsListRef} className="products-grid__list">
          {products.map(renderListItem)}
        </ul>
        {showCta && (
          <div className="products-grid__control text-center">
            <Link href={`/shop`}>
              <a className="cta-link">
                <span className="cta-link__text">
                  {titleCase('Shop for all our products')}
                </span>
              </a>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsGrid;
