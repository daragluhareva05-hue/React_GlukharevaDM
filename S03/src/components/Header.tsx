import React from "react";

type HeaderProps = {
    totalCount: number;
    totalPrice: number;
    onClear: () => void;
};

function Header({
                    totalCount,
                    totalPrice,
                    onClear,
                }: HeaderProps) {
    return (
        <header className="header">
            <h1>Магазин</h1>

            <div className="cart-summary">
        <span>
          Корзина: {totalCount} шт. · {totalPrice} ₽
        </span>

                <button onClick={onClear}>
                    Очистить
                </button>
            </div>
        </header>
    );
}

export default Header;
