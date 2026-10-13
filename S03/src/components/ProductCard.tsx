
import React from "react";
import { memo } from "react";

export type Product = {
    id: number;
    title: string;
    price: number;
    inStock: boolean;
};

type ProductCardProps = {
    product: Product;
    qty: number;
    onAdd: (product: Product) => void;
    onRemove: (id: number) => void;
};

function ProductCard({
                         product,
                         qty,
                         onAdd,
                         onRemove,
                     }: ProductCardProps) {
    console.log("render", product.id);

    return (
        <div className="product-card">
            <h3>{product.title}</h3>

            <p>{product.price} ₽</p>

            <p>
                {product.inStock
                    ? "В наличии"
                    : "Нет в наличии"}
            </p>

            <button
                disabled={!product.inStock}
                onClick={() => onAdd(product)}
            >
                {qty > 0
                    ? `В корзине: ${qty}`
                    : "В корзину"}
            </button>

            {qty > 0 && (
                <button
                    onClick={() => onRemove(product.id)}
                >
                    Убрать
                </button>
            )}
        </div>
    );
}

export default memo(ProductCard);
