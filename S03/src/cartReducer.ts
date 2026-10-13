
import type { Product } from "./components/ProductCard";

export type CartItem = {
    id: number;
    title: string;
    price: number;
    qty: number;
};

export type CartState = {
    items: CartItem[];
};

export type CartAction =
    | { type: "add"; product: Product }
    | { type: "remove"; id: number }
    | { type: "clear" };

export const initialCart: CartState = {
    items: [],
};

export function cartReducer(
    state: CartState,
    action: CartAction
): CartState {
    switch (action.type) {
        case "add": {
            const existing = state.items.find(
                (item) => item.id === action.product.id
            );

            if (existing) {
                return {
                    items: state.items.map((item) =>
                        item.id === action.product.id
                            ? { ...item, qty: item.qty + 1 }
                            : item
                    ),
                };
            }

            return {
                items: [
                    ...state.items,
                    {
                        id: action.product.id,
                        title: action.product.title,
                        price: action.product.price,
                        qty: 1,
                    },
                ],
            };
        }

        case "remove":
            return {
                items: state.items.filter(
                    (item) => item.id !== action.id
                ),
            };

        case "clear":
            return initialCart;
    }
}
