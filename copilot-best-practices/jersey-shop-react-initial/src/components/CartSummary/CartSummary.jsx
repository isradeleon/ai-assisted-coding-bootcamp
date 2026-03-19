import PropTypes from 'prop-types';
import './CartSummary.css';

function CartSummary({ cartItems, totalItems, totalPrice }) {
    return (
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

CartSummary.propTypes = {
    cartItems: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            quantity: PropTypes.number.isRequired,
        }).isRequired
    ).isRequired,
    totalItems: PropTypes.number.isRequired,
    totalPrice: PropTypes.string.isRequired,
};

export default CartSummary;
