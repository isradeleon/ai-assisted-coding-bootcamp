import { createContext, useContext, useState } from 'react';
import initialProducts from '../data/products';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [items, setItems] = useState(initialProducts);

    const toggleCart = (itemId) => {
        setItems((prev) =>
            prev.map((item) =>
                item.id === itemId
                    ? {
                          ...item,
                          isInBag: !item.isInBag,
                          quantity: item.isInBag ? 1 : item.quantity
                      }
                    : item
            )
        );
    };

    const changeQuantity = (itemId, delta) => {
        setItems((prev) =>
            prev.map((item) => {
                if (item.id !== itemId || !item.isInBag) return item;
                const nextQty = Math.max(1, item.quantity + delta);
                return { ...item, quantity: nextQty };
            })
        );
    };

    const cartItems = items.filter((item) => item.isInBag);
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

    const value = {
        items,
        cartItems,
        totalItems,
        totalPrice,
        toggleCart,
        changeQuantity
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}