
import React from "react";
import ProductCard from "./ProductCard";
import type { Product } from "./ProductCard";

type ProductListProps = {
  products: Product[];
  qtyById: Record<number, number>;
  onAdd: (product: Product) => void;
  onRemove: (id: number) => void;
};

function ProductList({
                       products,
                       qtyById,
                       onAdd,
                       onRemove,
                     }: ProductListProps) {
  return (
      <div className="product-list">
        {products.map((product) => (
            <ProductCard
                key={product.id}
                product={product}
                qty={qtyById[product.id] ?? 0}
                onAdd={onAdd}
                onRemove={onRemove}
            />
        ))}
      </div>
  );
}

export default ProductList;
