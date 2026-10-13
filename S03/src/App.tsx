
import { useMemo, useReducer, useState } from "react";

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

function App() {
    const [query, setQuery] = useState("");
    const [onlyInStock, setOnlyInStock] = useState(false);

    const [cart, dispatch] = useReducer(
        cartReducer,
        initialCart
    );

    // Поиск и фильтр из первого шага
    const visibleProducts = useMemo(() => {
        const q = query.trim().toLowerCase();

        return products.filter((product) => {
            const matchesSearch = product.title
                .toLowerCase()
                .includes(q);

            const matchesStock =
                !onlyInStock || product.inStock;

            return matchesSearch && matchesStock;
        });
    }, [query, onlyInStock]);

    // Общее количество товаров
    const totalCount = cart.items.reduce(
        (sum, item) => sum + item.qty,
        0
    );

    // Общая стоимость корзины
    const totalPrice = cart.items.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
    );

    // Количество каждого товара по его id
    const qtyById = Object.fromEntries(
        cart.items.map((item) => [
            item.id,
            item.qty,
        ])
    ) as Record<number, number>;

    // Добавление товара
    function handleAdd(product: Product) {
        dispatch({
            type: "add",
            product,
        });
    }

    // Удаление товара
    function handleRemove(id: number) {
        dispatch({
            type: "remove",
            id,
        });
    }

    // Очистка корзины
    function handleClear() {
        dispatch({
            type: "clear",
        });
    }

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
