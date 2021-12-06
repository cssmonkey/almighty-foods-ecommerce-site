import React, { useState } from 'react';
import cx from 'classnames';
import { ProductCounter, ProductAdd, ProductWaitlist } from '@blocks/product';

const ProductActions = ({ activeVariant, klaviyoAccountID, customClass }) => {
  // set default quantity
  const [quantity, setQuantity] = useState(1);

  return (
    <div className={cx('product--actions', customClass)}>
      {activeVariant?.inStock ? (
        <>
          <ProductAdd
            productID={activeVariant.id}
            quantity={quantity}
            className="btn is-primary is-large"
          >
            Add to Basket
          </ProductAdd>
          <ProductCounter
            showText
            id={activeVariant.id}
            max={10}
            onUpdate={setQuantity}
          />
        </>
      ) : (
        <>
          {klaviyoAccountID ? (
            <ProductWaitlist
              variant={activeVariant.id}
              klaviyo={klaviyoAccountID}
            />
          ) : (
            <div className="btn is-large is-disabled is-block">
              Out of Stock
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductActions;
