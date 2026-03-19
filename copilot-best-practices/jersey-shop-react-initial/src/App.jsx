import useCart from './hooks/useCart';
import ProductList from './components/ProductList/ProductList';
import CartSummary from './components/CartSummary/CartSummary';

function App() {
    const { items, cartItems, totalItems, totalPrice, toggleCart, changeQuantity } = useCart();

    return (
        <main>
            <ProductList items={items} onToggle={toggleCart} onChangeQuantity={changeQuantity} />
            <CartSummary cartItems={cartItems} totalItems={totalItems} totalPrice={totalPrice} />
        </main>
    );
}

export default App;
