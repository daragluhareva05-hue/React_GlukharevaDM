
import {
    useCallback,
    useMemo,
    useReducer,
    useState,
} from "react";

import { products } from "./data";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import ProductList from "./components/ProductList";

import type { Product } from "./components/ProductCard";

import {
    cartReducer,
    initialCart,
} from "./cartReducer";

import "./App.css";
import React from "react";

function App() {
    const [query, setQuery] = useState("");
    const [onlyInStock, setOnlyInStock] = useState(false);

    const [cart, dispatch] = useReducer(
        cartReducer,
        initialCart
    );

    // Поиск и фильтрация
    const visibleProducts = useMemo(() => {
        const q = query.trim().toLowerCase();

        return products.filter((product: { title: string; inStock: any; }) => {
            const matchesSearch = product.title
                .toLowerCase()
                .includes(q);

            const matchesStock =
                !onlyInStock || product.inStock;

            return matchesSearch && matchesStock;
        });
    }, [query, onlyInStock]);

    // Общее количество товаров
    const totalCount = useMemo(() => {
        return cart.items.reduce(
            (sum, item) => sum + item.qty,
            0
        );
    }, [cart.items]);

    // Общая стоимость
    const totalPrice = useMemo(() => {
        return cart.items.reduce(
            (sum, item) => sum + item.price * item.qty,
            0
        );
    }, [cart.items]);

    // Количество каждого товара по id
    const qtyById = useMemo(() => {
        return Object.fromEntries(
            cart.items.map((item) => [
                item.id,
                item.qty,
            ])
        ) as Record<number, number>;
    }, [cart.items]);

    // Стабильная функция добавления
    const handleAdd = useCallback(
        (product: Product) => {
            dispatch({
                type: "add",
                product,
            });
        },
        []
    );

    // Стабильная функция удаления
    const handleRemove = useCallback(
        (id: number) => {
            dispatch({
                type: "remove",
                id,
            });
        },
        []
    );

    // Стабильная функция очистки
    const handleClear = useCallback(() => {
        dispatch({
            type: "clear",
        });
    }, []);

    return (
        <main>
            <Header
                totalCount={totalCount}
                totalPrice={totalPrice}
                onClear={handleClear}
            />

            <SearchBar
                query={query}
                onlyInStock={onlyInStock}
                onQueryChange={setQuery}
                onStockChange={setOnlyInStock}
            />

            <p>Найдено: {visibleProducts.length}</p>

            <ProductList
                products={visibleProducts}
                qtyById={qtyById}
                onAdd={handleAdd}
                onRemove={handleRemove}
            />
        </main>
    );
}

export default App;
