import PropTypes from 'prop-types';
import styles from './CartSummary.module.css';
import { useCart } from '../../contexts/CartContext';

function CartSummary() {
    const { cartItems, totalItems, totalPrice } = useCart();

    return (
        <section className={styles.summary}>
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
                                <td>
                                    {item.quantity}x {item.name}
                                </td>
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
    );
}

CartSummary.propTypes = {};

export default CartSummary;
