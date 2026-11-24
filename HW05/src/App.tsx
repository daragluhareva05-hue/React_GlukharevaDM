import { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";

import { light, dark, pink } from "./theme";
import { useTheme } from "./hooks/useTheme";
import { GlobalStyle } from "./styles/GlobalStyle";

import { Button } from "./components/Button";
import { Input } from "./components/Input";
import { Grid } from "./components/Grid";
import { ProductCard } from "./components/ProductCard";
import { Skeleton } from "./components/Skeleton";

import { products } from "./data/products";
import type { Product } from "./data/products";

import {
    Container,
    Header,
    Filters,
    Select,
    CartInfo,
    EmptyState,
} from "./styles/Layout";

function App() {
    const { theme, setTheme } = useTheme();

    const themes = { light, dark, pink };

    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("Все");
    const [cart, setCart] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1200);

        return () => clearTimeout(timer);
    }, []);

    const categories = [
        "Все",
        ...new Set(products.map(product => product.category)),
    ];

    const filteredProducts = products.filter(product => {
        const matchesQuery = product.title
            .toLowerCase()
            .includes(query.trim().toLowerCase());

        const matchesCategory =
            category === "Все" ||
            product.category === category;

        return matchesQuery && matchesCategory;
    });

    const totalPrice = cart.reduce(
        (sum, product) => sum + product.price,
        0
    );

    function addToCart(product: Product) {
        setCart(prev => [...prev, product]);
    }

    return (
        <ThemeProvider theme={themes[theme]}>
            <GlobalStyle />

            <Container>
                <Header>
                    <h1>Мини-маркет</h1>

                    <Select
                        aria-label="Выбор темы"
                        value={theme}
                        onChange={event => {
                            const value = event.target.value;

                            if (
                                value === "light" ||
                                value === "dark" ||
                                value === "pink"
                            ) {
                                setTheme(value);
                            }
                        }}
                    >
                        <option value="light">
                            ☀️ Светлая тема
                        </option>

                        <option value="dark">
                            🌙 Тёмная тема
                        </option>

                        <option value="pink">
                            🌸 Розовая тема
                        </option>
                    </Select>
                </Header>

                <CartInfo aria-live="polite">
                    <p>🛒 Товаров в корзине: {cart.length}</p>
                    <p>Итого: {totalPrice} ₽</p>

                    <Button
                        variant="danger"
                        size="sm"
                        disabled={cart.length === 0}
                        onClick={() => setCart([])}
                    >
                        Очистить корзину
                    </Button>
                </CartInfo>

                <Filters>
                    <Input
                        placeholder="Поиск товаров..."
                        aria-label="Поиск товаров"
                        value={query}
                        onChange={event =>
                            setQuery(event.target.value)
                        }
                    />

                    <Select
                        aria-label="Категория товаров"
                        value={category}
                        onChange={event =>
                            setCategory(event.target.value)
                        }
                    >
                        {categories.map(item => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </Select>
                </Filters>

                <p role="status">
                    {loading
                        ? "Загрузка товаров..."
                        : `Найдено товаров: ${filteredProducts.length}`}
                </p>

                {loading ? (
                    <Grid aria-busy="true">
                        {Array.from({ length: 8 }, (_, i) => (
                            <Skeleton key={i} />
                        ))}
                    </Grid>
                ) : filteredProducts.length > 0 ? (
                    <Grid>
                        {filteredProducts.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onAdd={addToCart}
                            />
                        ))}
                    </Grid>
                ) : (
                    <EmptyState>
                        <h2>Товары не найдены</h2>

                        <p>
                            Попробуйте изменить запрос
                            или выбрать другую категорию.
                        </p>

                        <Button
                            variant="secondary"
                            onClick={() => {
                                setQuery("");
                                setCategory("Все");
                            }}
                        >
                            Сбросить фильтры
                        </Button>
                    </EmptyState>
                )}
            </Container>
        </ThemeProvider>
    );
}

export default App;