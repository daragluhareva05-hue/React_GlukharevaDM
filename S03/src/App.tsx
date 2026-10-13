import { useMemo, useState } from 'react';
import { products } from './data';

import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ProductList from './components/ProductList';

import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [onlyInStock, setOnlyInStock] = useState(false);

  const visibleProducts = useMemo(() => {
    const q = query.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(q);

      const matchesStock = !onlyInStock || product.inStock;

      return matchesSearch && matchesStock;
    });
  }, [query, onlyInStock]);

  return (
    <main>
      <Header />

      <SearchBar
        query={query}
        onlyInStock={onlyInStock}
        onQueryChange={setQuery}
        onStockChange={setOnlyInStock}
      />

      <p>Найдено: {visibleProducts.length}</p>

      <ProductList products={visibleProducts} />
    </main>
  );
}

export default App;
