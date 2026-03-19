import PropTypes from 'prop-types';
import './ProductList.css';
import ProductCard from '../ProductCard/ProductCard';

function ProductList({ items, onToggle, onChangeQuantity }) {
    return (
        <section className="items">
            {items.map((item) => (
                <ProductCard
                    key={item.id}
                    item={item}
                    onToggle={onToggle}
                    onChangeQuantity={onChangeQuantity}
                />
            ))}
        </section>
    );
}

ProductList.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            photo: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            isInBag: PropTypes.bool.isRequired,
            quantity: PropTypes.number.isRequired,
        }).isRequired
    ).isRequired,
    onToggle: PropTypes.func.isRequired,
    onChangeQuantity: PropTypes.func.isRequired,
};

export default ProductList;
