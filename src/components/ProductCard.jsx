import { ShoppingCart, Star } from 'lucide-react';

export default function ProductCard({ product, onAdd }) {
  const discount = Math.round((1 - product.price / product.oldPrice) * 100);

  return (
    <article className="product-card">
      <div className={`product-art ${product.color}`}>
        <span className="discount-tag">{discount}% OFF</span>
        <span className="product-emoji" role="img" aria-label={product.name}>{product.emoji}</span>
      </div>
      <div className="product-info">
        <p className="category-label">{product.category}</p>
        <h3>{product.name}</h3>
        <div className="rating"><Star size={14} fill="currentColor" /> {product.rating}</div>
        <div className="price-row">
          <strong>₹{product.price.toLocaleString('en-IN')}</strong>
          <del>₹{product.oldPrice.toLocaleString('en-IN')}</del>
        </div>
        <button className="add-button" onClick={() => onAdd(product)}>
          <ShoppingCart size={16} /> Add to cart
        </button>
      </div>
    </article>
  );
}
