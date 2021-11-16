import React from 'react';
import ProductsGrid from '@modules/products-grid';

const Collection = ({ products, featuredProducts = [] }) => {
  if (!products || products.length === 0) return null;

  const orderedProducts = mapOrder(products, featuredProducts, 'id');

  return (
    <section className="collection">
      <ProductsGrid data={{ products: orderedProducts }} />
    </section>
  );
};

function mapOrder(array, myorder, key) {
  if (!array) return;

  if (!myorder) {
    return array;
  }

  var order = myorder.reduce((r, k, i) => ((r[k] = i + 1), r), {});
  const theSort = array.sort(
    (a, b) => (order[a[key]] || Infinity) - (order[b[key]] || Infinity)
  );
  return theSort;
}

export default Collection;
