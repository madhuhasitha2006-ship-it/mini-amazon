import { useState } from 'react';
import { ArrowLeft, CheckCircle2, PackageCheck } from 'lucide-react';

const COUPONS = { SAVE10: 10, SHOP15: 15 };

export default function Checkout({ cart, onBack, onOrderComplete }) {
  const [coupon, setCoupon] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [couponMessage, setCouponMessage] = useState('');
  const [customer, setCustomer] = useState({ name: '', email: '', address: '' });

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountPercent = appliedCoupon ? COUPONS[appliedCoupon] : 0;
  const discount = Math.round(subtotal * discountPercent / 100);
  const total = subtotal - discount;

  function applyCoupon() {
    const code = coupon.trim().toUpperCase();
    if (COUPONS[code]) {
      setAppliedCoupon(code);
      setCouponMessage(`${code} applied — ${COUPONS[code]}% off!`);
    } else {
      setAppliedCoupon('');
      setCouponMessage('Invalid coupon. Try SAVE10 or SHOP15.');
    }
  }

  function submitOrder(event) {
    event.preventDefault();
    if (!cart.length) return;
    onOrderComplete({
      orderId: `SS${Date.now().toString().slice(-7)}`,
      customer,
      items: cart,
      subtotal,
      discount,
      total,
      coupon: appliedCoupon
    });
  }

  return (
    <main className="checkout-page">
      <button className="back-button" onClick={onBack}><ArrowLeft size={17} /> Back to shopping</button>
      <div className="checkout-heading">
        <p className="eyebrow">ALMOST YOURS</p>
        <h1>Checkout</h1>
        <p>Enter your details to place a demo order.</p>
      </div>
      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={submitOrder}>
          <section className="checkout-card">
            <h2>Delivery details</h2>
            <label>Full name
              <input required value={customer.name} onChange={e => setCustomer({ ...customer, name: e.target.value })} placeholder="Your name" />
            </label>
            <label>Email address
              <input required type="email" value={customer.email} onChange={e => setCustomer({ ...customer, email: e.target.value })} placeholder="you@example.com" />
            </label>
            <label>Delivery address
              <textarea required rows="3" value={customer.address} onChange={e => setCustomer({ ...customer, address: e.target.value })} placeholder="House number, street, city, PIN code" />
            </label>
          </section>
          <section className="checkout-card">
            <h2>Discount coupon</h2>
            <p className="muted">Try <strong>SAVE10</strong> for 10% off or <strong>SHOP15</strong> for 15% off.</p>
            <div className="coupon-row">
              <input value={coupon} onChange={e => setCoupon(e.target.value)} placeholder="Enter coupon code" />
              <button className="secondary-button" type="button" onClick={applyCoupon}>Apply</button>
            </div>
            {couponMessage && <p className={appliedCoupon ? 'success-message' : 'error-message'}>{couponMessage}</p>}
          </section>
          <button className="primary-button full-width" type="submit">Place demo order · ₹{total.toLocaleString('en-IN')}</button>
          <p className="muted tiny">Demo only — no payment will be collected.</p>
        </form>
        <aside className="checkout-card order-summary">
          <h2>Order summary</h2>
          {cart.map(item => <div className="summary-line" key={item.id}><span>{item.name} × {item.quantity}</span><span>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span></div>)}
          <div className="summary-line"><span>Subtotal</span><span>₹{subtotal.toLocaleString('en-IN')}</span></div>
          <div className="summary-line discount-line"><span>Discount</span><span>−₹{discount.toLocaleString('en-IN')}</span></div>
          <div className="summary-line total-line"><strong>Total</strong><strong>₹{total.toLocaleString('en-IN')}</strong></div>
        </aside>
      </div>
    </main>
  );
}

export function OrderConfirmation({ order, onContinue }) {
  return (
    <main className="confirmation-page">
      <div className="confirmation-card">
        <CheckCircle2 size={58} className="confirmation-icon" />
        <p className="eyebrow">ORDER PLACED</p>
        <h1>Thank you, {order.customer.name.split(' ')[0]}!</h1>
        <p>Your demo order has been created successfully.</p>
        <div className="order-id"><PackageCheck size={20} /><span>Order ID: <strong>{order.orderId}</strong></span></div>
        <div className="summary-line"><span>Items</span><strong>{order.items.reduce((sum, item) => sum + item.quantity, 0)}</strong></div>
        <div className="summary-line"><span>Discount</span><strong>₹{order.discount.toLocaleString('en-IN')}</strong></div>
        <div className="summary-line total-line"><strong>Order total</strong><strong>₹{order.total.toLocaleString('en-IN')}</strong></div>
        <p className="muted tiny">This is a frontend demo. It does not process payments or save orders to a server.</p>
        <button className="primary-button full-width" onClick={onContinue}>Continue shopping</button>
      </div>
    </main>
  );
}
