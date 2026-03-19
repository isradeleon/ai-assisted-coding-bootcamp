import PropTypes from 'prop-types';
import styles from './ProductCard.module.css';
import { useCart } from '../../contexts/CartContext';

function ProductCard({ item }) {
    const { toggleCart, changeQuantity } = useCart();

    return (
        <div
            className={`${styles.product} ${item.isInBag ? styles.inBag : ''}`}
            onClick={() => toggleCart(item.id)}
            style={{ cursor: 'pointer' }}
        >
            <div className={styles.photo}>
                <img src={`./img/${item.photo}`} alt={item.name} />
            </div>
            <div className={styles.description}>
                <span className={styles.name}>{item.name}</span>
                <span className={styles.price}>$ {item.price.toFixed(2)}</span>

                {item.isInBag && (
                    <div className={styles.quantityArea} onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => changeQuantity(item.id, -1)} disabled={item.quantity <= 1}>
                            -
                        </button>
                        <span className={styles.quantity}>{item.quantity}</span>
                        <button onClick={() => changeQuantity(item.id, 1)}>+</button>
                    </div>
                )}
            </div>
        </div>
    );
}

ProductCard.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        photo: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        isInBag: PropTypes.bool.isRequired,
        quantity: PropTypes.number.isRequired,
    }).isRequired,
};

export default ProductCard;
