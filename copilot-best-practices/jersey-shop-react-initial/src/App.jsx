import { useState } from 'react';

function App() {
    const shopName = 'Jersey Shop Made with React JS';

    const [items, setItems] = useState([
        { id: 1, photo: 'real_madrid.webp', name: 'Real Madrid', price: 119.99, quantity: 1, isInBag: false },
        { id: 2, photo: 'milan.png', name: 'Milan', price: 99.99, quantity: 1, isInBag: false },
        { id: 3, photo: 'chelsea.webp', name: 'Chelsea', price: 99.99, quantity: 1, isInBag: false },
        { id: 4, photo: 'barcelona.png', name: 'Barcelona', price: 109.99, quantity: 1, isInBag: false },
        { id: 5, photo: 'benfica.png', name: 'Benfica', price: 89.49, quantity: 1, isInBag: false },
        { id: 6, photo: 'manchester.webp', name: 'Manchester City', price: 129.79, quantity: 1, isInBag: false },
        { id: 7, photo: 'bayern.webp', name: 'Bayern', price: 119.99, quantity: 1, isInBag: false },
        { id: 8, photo: 'psg.png', name: 'PSG', price: 94.99, quantity: 1, isInBag: false },
        { id: 9, photo: 'ajax.webp', name: 'Ajax', price: 89.99, quantity: 1, isInBag: false }
    ]);

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

    return (
        <>
            <section className="items">
                <h4>{shopName}</h4>

                {items.map((item) => (
                    <div
                        key={item.id}
                        className={`product ${item.isInBag ? 'in-bag' : ''}`}
                        onClick={() => toggleCart(item.id)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="photo">
                            <img src={`./img/${item.photo}`} alt={item.name} />
                        </div>
                        <div className="description">
                            <span className="name">{item.name}</span>
                            <span className="price">$ {item.price.toFixed(2)}</span>

                            {item.isInBag && (
                                <div className="quantity-area" onClick={(e) => e.stopPropagation()}>
                                    <button onClick={() => changeQuantity(item.id, -1)} disabled={item.quantity <= 1}>
                                        -
                                    </button>
                                    <span className="quantity">{item.quantity}</span>
                                    <button onClick={() => changeQuantity(item.id, 1)}>+</button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </section>

            <section className="summary">
                <strong>Order Summary</strong>
                <table>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.length === 0 ? (
                            <tr>
                                <td colSpan={2}>Your cart is empty. Click an item to add it.</td>
                            </tr>
                        ) : (
                            cartItems.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.quantity}x {item.name}</td>
                                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                                </tr>
                            ))
                        )}
                        <tr>
                            <th>Total ({totalItems} items)</th>
                            <th>${totalPrice}</th>
                        </tr>
                    </tbody>
                </table>
            </section>
        </>
    );
}

export default App;
