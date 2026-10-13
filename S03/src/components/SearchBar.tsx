import { useEffect, useRef } from 'react';

type SearchBarProps = {
  query: string;
  onlyInStock: boolean;
  onQueryChange: (value: string) => void;
  onStockChange: (value: boolean) => void;
};

function SearchBar({
  query,
  onlyInStock,
  onQueryChange,
  onStockChange,
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="search-bar">
      <input
        ref={inputRef}
        type="text"
        placeholder="Поиск по названию..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
      />

      <label>
        <input
          type="checkbox"
          checked={onlyInStock}
          onChange={(e) => onStockChange(e.target.checked)}
        />
        Только в наличии
      </label>
    </div>
  );
}

export default SearchBar;
