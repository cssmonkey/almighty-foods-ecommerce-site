import React from 'react';
import Link from 'next/link';
import { titleCase } from 'title-case';

import { hasObject } from '@lib/helpers';

import Photo from '@components/photo';
import { ProductCounter, ProductPrice } from '@blocks/product';

import { useUpdateItem, useRemoveItem, useToggleCart } from '@lib/context';

function CartItem({ item }) {
  const removeItem = useRemoveItem();
  const updateItem = useUpdateItem();
  const toggleCart = useToggleCart();

  const changeQuantity = (quantity) => {
    updateItem(item.lineID, quantity);
  };

  const defaultPhoto = item.product.mainImage;

  return (
    <div className="cart-item">
      {defaultPhoto && (
        <Photo
          photo={defaultPhoto}
          srcsetSizes={[400]}
          sizes="(min-width: 768px) 400px, 35vw'"
          className="cart-item--photo"
        />
      )}
      <div className="cart-item--details">
        <div className="cart-item--header">
          <div className="cart-item--title">
            {item.title && item.title !== 'Default Title' && (
              <div className="cart-item--variant">{titleCase(item.title)}</div>
            )}
            <h2 className="cart-item--name">
              <Link
                href={`/products/${item.product.slug}?variant=${item.id}`}
                scroll={false}
              >
                <a
                  onClick={() => toggleCart(false)}
                  className="cart-item--link"
                >
                  {titleCase(item.product.title)}
                </a>
              </Link>
            </h2>
          </div>
          <ProductPrice price={item.price} />
        </div>
        <div className="cart-item--tools">
          <div className="cart-item--quantity">
            <ProductCounter
              key={item.id}
              id={item.id}
              defaultCount={item.quantity}
              onUpdate={changeQuantity}
              className="is-small"
            />
          </div>
          <button
            onClick={() => removeItem(item.lineID)}
            className="btn is-text"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
