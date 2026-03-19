import PropTypes from 'prop-types';
import styles from './ProductList.module.css';
import ProductCard from '../ProductCard/ProductCard';
import { useCart } from '../../contexts/CartContext';

function ProductList() {
    const { items } = useCart();

    return (
        <section className={styles.items}>
            {items.map((item) => (
                <ProductCard
                    key={item.id}
                    item={item}
                />
            ))}
        </section>
    );
}

ProductList.propTypes = {};

export default ProductList;
