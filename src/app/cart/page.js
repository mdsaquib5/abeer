'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';
import SectionTitle from '@/components/ui/SectionTitle';
import Button from '@/components/ui/Button';
import { IoTrashOutline, IoArrowForwardOutline } from 'react-icons/io5';
;

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const { items, updateQuantity, removeFromCart } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Compute values
  const subtotal = useMemoSubtotal(items, mounted);

  if (!mounted) {
    return (
      <div className="cart-loadingContainer">
        <p>Loading your shopping bag...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="cart-emptyContainer">
        <div className="container">
          <SectionTitle title="Shopping Bag" subtitle="Your Selected Silhouettes" />
          <div className="cart-emptyContent">
            <p className="cart-emptyMessage">Your shopping bag is currently empty.</p>
            <p className="cart-emptySub">Abeer pieces are consciously crafted to order. Explore our collections and find pieces that match your soul.</p>
            <Link href="/shop">
              <Button variant="primary">Browse Collection</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-cartSection">
      <div className="container">
        <SectionTitle title="Your Bag" subtitle="Order Summary" />

        <div className="cart-layout">
          {/* Cart Items List */}
          <div className="cart-itemsList">
            <div className="cart-tableHeader">
              <span>Product</span>
              <span className="cart-hideMobile">Size</span>
              <span>Quantity</span>
              <span>Total</span>
            </div>

            {items.map((item) => (
              <div key={`${item.product.id}-${item.size}`} className="cart-cartRow">
                {/* Product details thumbnail */}
                <div className="cart-productCell">
                  <div className="cart-thumbWrapper">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      sizes="80px"
                      className="cart-thumb"
                    />
                  </div>
                  <div className="cart-meta">
                    <h3 className="cart-productName">{item.product.name}</h3>
                    <p className="cart-productMeta">
                      <span className="cart-showMobileOnly">Size: {item.size} • </span>
                      Price: ₹{item.product.price}
                    </p>
                    <button
                      className="cart-removeBtn"
                      onClick={() => removeFromCart(item.product.id, item.size)}
                    >
                      <IoTrashOutline /> Remove
                    </button>
                  </div>
                </div>

                {/* Size Cell */}
                <div className={`cart-sizeCell cart-hideMobile`}>
                  <span className="cart-sizeBadge">{item.size}</span>
                </div>

                {/* Quantity adjuster */}
                <div className="cart-quantityCell">
                  <div className="cart-qtyControls">
                    <button
                      className="cart-qtyBtn"
                      onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="cart-qtyVal">{item.quantity}</span>
                    <button
                      className="cart-qtyBtn"
                      onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Item Total */}
                <div className="cart-totalCell">
                  <span className="cart-itemTotal">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Sidebar Summary */}
          <div className="cart-summaryCard">
            <h3 className="cart-summaryTitle">Summary</h3>
            <div className="cart-summaryRow">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="cart-summaryRow">
              <span>Shipping</span>
              <span className="cart-freeShipping">Free</span>
            </div>
            <div className="cart-summaryDivider"></div>
            <div className={`cart-summaryRow cart-totalRow`}>
              <span>Total</span>
              <span>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>

            <div className="cart-infoBox">
              <p>❀ <strong>Prepaid orders only:</strong> Cash on delivery is unavailable.</p>
              <p>❀ Pieces are custom-made and will ship within 7–10 business days.</p>
            </div>

            <Link href="/checkout">
              <button className="cart-checkoutBtn">
                Proceed to Checkout <IoArrowForwardOutline />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function useMemoSubtotal(items, mounted) {
  return React.useMemo(() => {
    if (!mounted) return 0;
    return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }, [items, mounted]);
}
