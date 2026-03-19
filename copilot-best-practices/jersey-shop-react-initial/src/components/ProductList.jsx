import ProductCard from './ProductCard';

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

export default ProductList;
