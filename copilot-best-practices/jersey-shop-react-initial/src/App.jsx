import useCart from './hooks/useCart';
import ProductList from './components/ProductList';
import CartSummary from './components/CartSummary';

function App() {
    const shopName = 'Jersey Shop Made with React JS';
    const { items, cartItems, totalItems, totalPrice, toggleCart, changeQuantity } = useCart();

    return (
        <>
            <ProductList items={items} onToggle={toggleCart} onChangeQuantity={changeQuantity} />
            <CartSummary cartItems={cartItems} totalItems={totalItems} totalPrice={totalPrice} />
        </>
    );
}

export default App;
