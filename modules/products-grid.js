import React from 'react'

const ProductsGrid = ({ data = {} }) => {
  // Extract our module data
  const { title } = data

  return (
    <div className="products-grid">
      <div className="products-grid__inner">
        <h2 className="products-grid__title">{title}</h2>
      </div>
    </div>
  )
}

export default ProductsGrid
