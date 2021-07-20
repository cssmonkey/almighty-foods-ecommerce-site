import React, { useRef, FC } from 'react';
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

  const renderListItem = (product, i) => {
    const defaultVariant = product.variants[0];
    return (
      <li className="products-grid__list-item" key={i}>
        <Link href={`/products/${product.slug}`}>
          <a>
            {product.photo && (
              <div className="products-grid__list-item-image">
                <Photo
                  photo={product.photo}
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
            {product.inStock && (
              <div className="products-grid__list-item-add-to-cart">
                <ProductAdd
                  productID={defaultVariant}
                  quantity={1}
                  className="btn is-primary is-large is-block"
                >
                  Add To Cart
                </ProductAdd>
              </div>
            )}
          </a>
        </Link>
      </li>
    );
  };

  return (
    <div className="products-grid">
      <div className="products-grid__inner">
        {title && <h2 className="products-grid__title">{title}</h2>}
        <ul ref={productsListRef} className="products-grid__list">
          {productsList.map(renderListItem)}
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
