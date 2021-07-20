import React, { FC } from 'react';

import { centsToPrice } from '@lib/helpers';

interface ProductPriceProps {
  price: number;
  comparePrice?: number;
}

const ProductPrice: FC<ProductPriceProps> = ({ price, comparePrice }) => {
  return (
    <div className="price">
      <span className="price--current">£{centsToPrice(price)}</span>
      <span className="price--old">£{centsToPrice(comparePrice)}</span>
    </div>
  );
};

export default ProductPrice;
