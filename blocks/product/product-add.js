import React, { useState } from 'react';
import cx from 'classnames';

import { useSiteContext, useAddItem } from '@lib/context';

const ProductAdd = ({ productID, quantity = 1, className, children }) => {
  const addItemToCart = useAddItem();
  const { shopifyClient, isLoading } = useSiteContext();
  const [isAdding, setIsAdding] = useState(false);

  // Check that Shopify is connected
  if (!shopifyClient) {
    return (
      <span className={cx('is-disabled', className)} disabled>
        Unavailable
      </span>
    );
  }

  return (
    <>
      {isLoading ? (
        <button className={cx('is-disabled', className)} disabled>
          Loading...
        </button>
      ) : (
        <button
          className={cx(className, { 'is-disabled is-adding': isAdding })}
          onClick={async () => {
            setIsAdding(true);
            await addItemToCart(productID, quantity);
            setIsAdding(false);
          }}
        >
          {isAdding ? (
            'Adding...'
          ) : (
            <>{children ? children : 'Add to Basket'}</>
          )}
        </button>
      )}
    </>
  );
};

export default ProductAdd;
