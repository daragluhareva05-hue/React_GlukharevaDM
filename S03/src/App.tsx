
import {
    useMemo,
    useState,
    useTransition,
} from "react";

import { products } from "./data";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import ProductList from "./components/ProductList";

import { useCart } from "./hooks/useCart";

import "./App.css";

function App() {
    // Срочное состояние: текст в поле поиска
    const [query, setQuery] = useState("");

    // Несрочное состояние: запрос для фильтрации
    const [filterQuery, setFilterQuery] = useState("");

    const [onlyInStock, setOnlyInStock] = useState(false);

    const [isPending, startTransition] = useTransition();

    // Вся логика корзины находится в useCart
    const {
        add,
        remove,
        clear,
        totalCount,
        totalPrice,
        qtyById,
    } = useCart();

    // Обработчик поиска
    function handleQueryChange(value: string) {
        // Сразу обновляем текст в input
        setQuery(value);

        // Фильтрацию обновляем с низким приоритетом
        startTransition(() => {
            setFilterQuery(value);
        });
    }

    // Поиск и фильтрация товаров
    const visibleProducts = useMemo(() => {
        const q = filterQuery.trim().toLowerCase();

        return products.filter((product) => {
            const matchesSearch = product.title
                .toLowerCase()
                .includes(q);

            const matchesStock =
                !onlyInStock || product.inStock;

            return matchesSearch && matchesStock;
        });
    }, [filterQuery, onlyInStock]);

    return (
        <main>
            <Header
                totalCount={totalCount}
                totalPrice={totalPrice}
                onClear={clear}
            />

            <SearchBar
                query={query}
                onlyInStock={onlyInStock}
                onQueryChange={handleQueryChange}
                onStockChange={setOnlyInStock}
            />

            {isPending && (
                <p className="pending-message">
                    Обновляем список…
                </p>
            )}

            <p>Найдено: {visibleProducts.length}</p>

            <ProductList
                products={visibleProducts}
                qtyById={qtyById}
                onAdd={add}
                onRemove={remove}
            />
        </main>
    );
}

export default App;
