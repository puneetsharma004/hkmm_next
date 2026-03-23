"use client";

import { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext(null);

function cartReducer(state, action) {
    switch (action.type) {
        case "ADD_ITEM": {
            const existing = state.items.find(i => i.id === action.item.id);
            if (existing) {
                return {
                    ...state,
                    items: state.items.map(i =>
                        i.id === action.item.id
                            ? { ...i, quantity: i.quantity + 1 }
                            : i
                    ),
                };
            }
            return { ...state, items: [...state.items, { ...action.item, quantity: 1 }] };
        }
        case "REMOVE_ITEM":
            return { ...state, items: state.items.filter(i => i.id !== action.id) };
        case "UPDATE_QTY":
            if (action.qty <= 0) {
                return { ...state, items: state.items.filter(i => i.id !== action.id) };
            }
            return {
                ...state,
                items: state.items.map(i =>
                    i.id === action.id ? { ...i, quantity: action.qty } : i
                ),
            };
        case "CLEAR_CART":
            return { ...state, items: [] };
        case "HYDRATE":
            return { ...state, items: action.items };
        default:
            return state;
    }
}

const CART_KEY = "govardhan_store_cart";

export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, { items: [] });

    // Hydrate from localStorage on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem(CART_KEY);
            if (saved) dispatch({ type: "HYDRATE", items: JSON.parse(saved) });
        } catch (_) {}
    }, []);

    // Persist to localStorage on every change
    useEffect(() => {
        localStorage.setItem(CART_KEY, JSON.stringify(state.items));
    }, [state.items]);

    const addItem = (item) => dispatch({ type: "ADD_ITEM", item });
    const removeItem = (id) => dispatch({ type: "REMOVE_ITEM", id });
    const updateQty = (id, qty) => dispatch({ type: "UPDATE_QTY", id, qty });
    const clearCart = () => dispatch({ type: "CLEAR_CART" });

    const totalItems = state.items.reduce((s, i) => s + i.quantity, 0);
    const totalPrice = state.items.reduce((s, i) => s + i.price * i.quantity, 0);

    return (
        <CartContext.Provider value={{ items: state.items, addItem, removeItem, updateQty, clearCart, totalItems, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used inside CartProvider");
    return ctx;
}