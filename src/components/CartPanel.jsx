import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';

export default function CartPanel({ cart, onClose, onChangeQuantity, onRemove, onCheckout }) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="overlay" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <aside className="cart-panel" aria-label="Shopping cart">
        <div className="cart-header">
          <div>
            <p className="eyebrow">YOUR BAG</p>
            <h2>Shopping cart</h2>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close cart"><X /></button>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <ShoppingBag size={42} />
            <h3>Your cart is waiting</h3>
            <p>Add a few products and they’ll show up here.</p>
            <button className="primary-button" onClick={onClose}>Explore products</button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className={`cart-item-art ${item.color}`}>{item.emoji}</div>
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <strong>₹{item.price.toLocaleString('en-IN')}</strong>
                    <div className="quantity-control">
                      <button onClick={() => onChangeQuantity(item.id, item.quantity - 1)} aria-label="Decrease quantity"><Minus size={13} /></button>
                      <span>{item.quantity}</span>
                      <button onClick={() => onChangeQuantity(item.id, item.quantity + 1)} aria-label="Increase quantity"><Plus size={13} /></button>
                    </div>
                  </div>
                  <button className="remove-button" onClick={() => onRemove(item.id)} aria-label={`Remove ${item.name}`}><Trash2 size={17} /></button>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <div className="summary-line"><span>Subtotal</span><strong>₹{subtotal.toLocaleString('en-IN')}</strong></div>
              <p className="shipping-note">Shipping and discounts are calculated at checkout.</p>
              <button className="primary-button full-width" onClick={onCheckout}>Continue to checkout</button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
