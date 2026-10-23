import { useMemo, useState } from 'react';
import { Search, ShoppingCart, Sparkles, Store } from 'lucide-react';
import { products } from './data/products.js';
import ProductCard from './components/ProductCard.jsx';
import CartPanel from './components/CartPanel.jsx';
import Checkout, { OrderConfirmation } from './components/Checkout.jsx';
import './App.css';

const categories = ['All', 'Electronics', 'Fashion', 'Home'];

export default function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [page, setPage] = useState('shop');
  const [order, setOrder] = useState(null);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const filteredProducts = useMemo(() => products.filter(product => {
    const matchesCategory = category === 'All' || product.category === category;
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  }), [category, search]);

  function addToCart(product) {
    setCart(previous => {
      const existing = previous.find(item => item.id === product.id);
      return existing
        ? previous.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...previous, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
  }

  function changeQuantity(id, quantity) {
    if (quantity < 1) {
      setCart(previous => previous.filter(item => item.id !== id));
      return;
    }
    setCart(previous => previous.map(item => item.id === id ? { ...item, quantity } : item));
  }

  function completeOrder(newOrder) {
    setOrder(newOrder);
    setCart([]);
    setPage('confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (page === 'checkout') {
    return <Checkout cart={cart} onBack={() => setPage('shop')} onOrderComplete={completeOrder} />;
  }

  if (page === 'confirmation' && order) {
    return <OrderConfirmation order={order} onContinue={() => { setOrder(null); setPage('shop'); }} />;
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="#" onClick={e => { e.preventDefault(); setPage('shop'); }}>
          <span className="brand-mark"><Store size={22} /></span>
          <span>shop<span className="brand-accent">smart</span><small>GOOD FINDS. GREAT PRICES.</small></span>
        </a>
        <div className="search-box">
          <Search size={18} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." aria-label="Search products" />
        </div>
        <button className="header-cart" onClick={() => setCartOpen(true)}>
          <ShoppingCart size={19} /> <span>Cart</span><b>{cartCount}</b>
        </button>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <span className="hero-pill"><Sparkles size={14} /> YOUR EVERYDAY MARKETPLACE</span>
            <h1>Little things.<br /><span>Big happy.</span></h1>
            <p>Discover thoughtful picks for your everyday life, all in one place.</p>
            <button className="hero-button" onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}>Explore collection <span>↗</span></button>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="hero-orbit orbit-one"></div><div className="hero-orbit orbit-two"></div>
            <div className="hero-product product-one">🎧</div><div className="hero-product product-two">👟</div><div className="hero-product product-three">⌚</div>
            <div className="hero-sticker">GOOD<br />CHOICES<br />ONLY ✦</div>
          </div>
          <div className="hero-bottom"><span>CURATED FOR YOU</span><span>FREE SHIPPING OVER ₹999*</span><span>MADE FOR EVERYDAY</span></div>
        </section>

        <section className="catalog-section" id="products">
          <div className="section-heading">
            <div><p className="eyebrow">THE GOOD STUFF</p><h2>Find your next favourite</h2><p className="muted">Useful little upgrades, at feel-good prices.</p></div>
            <span className="product-count">{filteredProducts.length} products</span>
          </div>
          <div className="category-tabs" aria-label="Product categories">
            {categories.map(item => <button key={item} className={category === item ? 'category-tab active' : 'category-tab'} onClick={() => setCategory(item)}>{item}</button>)}
          </div>
          {filteredProducts.length ? <div className="product-grid">{filteredProducts.map(product => <ProductCard key={product.id} product={product} onAdd={addToCart} />)}</div> : <div className="no-results">No products match “{search}”. Try another search.</div>}
        </section>
      </main>

      <footer className="site-footer"><a className="brand footer-brand" href="#" onClick={e => e.preventDefault()}><span className="brand-mark"><Store size={19} /></span><span>shopsmart</span></a><p>Made for the hackathon ✦ Demo storefront — no real payments.</p><span>© 2026 ShopSmart</span></footer>

      {cartOpen && <CartPanel cart={cart} onClose={() => setCartOpen(false)} onChangeQuantity={changeQuantity} onRemove={id => setCart(previous => previous.filter(item => item.id !== id))} onCheckout={() => { setCartOpen(false); setPage('checkout'); }} />}
    </div>
  );
}
