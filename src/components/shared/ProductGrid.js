import React from 'react';
import ProductCard from './ProductCard';
;

export default function ProductGrid({ products, className = '' }) {
  if (!products || products.length === 0) {
    return (
      <div className="pg-empty">
        <p>No products found in this category.</p>
      </div>
    );
  }

  return (
    <div className={`pg-grid ${className}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
