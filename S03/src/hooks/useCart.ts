
import { useCallback, useMemo, useReducer } from "react";

import type { Product } from "../components/ProductCard";

import {
    cartReducer,
    initialCart,
} from "../cartReducer";

export function useCart() {
    const [cart, dispatch] = useReducer(
        cartReducer,
        initialCart
    );

    const add = useCallback((product: Product) => {
        dispatch({
            type: "add",
            product,
        });
    }, []);

    const remove = useCallback((id: number) => {
        dispatch({
            type: "remove",
            id,
        });
    }, []);

    const clear = useCallback(() => {
        dispatch({
            type: "clear",
        });
    }, []);

    const totalCount = useMemo(() => {
        return cart.items.reduce(
            (sum, item) => sum + item.qty,
            0
        );
    }, [cart.items]);

    const totalPrice = useMemo(() => {
        return cart.items.reduce(
            (sum, item) => sum + item.price * item.qty,
            0
        );
    }, [cart.items]);

    const qtyById = useMemo(() => {
        return Object.fromEntries(
            cart.items.map((item) => [
                item.id,
                item.qty,
            ])
        ) as Record<number, number>;
    }, [cart.items]);

    return {
        cart,
        add,
        remove,
        clear,
        totalCount,
        totalPrice,
        qtyById,
    };
}
