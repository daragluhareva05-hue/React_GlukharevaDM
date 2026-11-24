import { useState } from "react";
import styled from "styled-components";
import type { Product } from "../data/products";
import { Card } from "./Card";
import { Badge } from "./Badge";
import { Button } from "./Button";

const ProductImage = styled.div`
    background: ${({ theme }) => theme.colors.secondary};
    border-radius: ${({ theme }) => theme.radius.md};
    height: 120px;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 56px;
`;

const Title = styled.h3`
    margin: 0;
    font-size: 18px;
`;

const Price = styled.p`
    margin: 0;
    font-size: 20px;
    font-weight: bold;
`;

interface ProductCardProps {
    product: Product;
    onAdd: (product: Product) => void;
}

export function ProductCard({
                                product,
                                onAdd,
                            }: ProductCardProps) {
    const [loading, setLoading] = useState(false);

    function handleAdd() {
        setLoading(true);

        setTimeout(() => {
            onAdd(product);
            setLoading(false);
        }, 800);
    }

    return (
        <Card>
            <ProductImage aria-hidden="true">
                {product.emoji}
            </ProductImage>

            <div>
                <Badge>{product.category}</Badge>
            </div>

            <Title>{product.title}</Title>

            <Price>{product.price} ₽</Price>

            <Button loading={loading} onClick={handleAdd}>
                {loading ? "Добавляем..." : "В корзину"}
            </Button>
        </Card>
    );
}