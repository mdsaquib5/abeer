'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import SectionTitle from '@/components/ui/SectionTitle';
;

export default function OrderSuccessPage() {
  const [orderDetails, setOrderDetails] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const order = localStorage.getItem('abeer-last-order');
    if (order) {
      setOrderDetails(JSON.parse(order));
    }
  }, []);

  const getWhatsAppLink = () => {
    if (!orderDetails) return '#';
    const totalItems = orderDetails.items.reduce((acc, item) => acc + item.qty, 0);
    const itemDetailsText = orderDetails.items.map((item) => {
      const itemPrice = item.price || 0;
      const itemSubtotal = itemPrice * item.qty;
      return `• *${item.name}*\n  Size: ${item.size}\n  Qty: ${item.qty}\n  Price per item: ₹${itemPrice.toLocaleString('en-IN')}\n  Subtotal: ₹${itemSubtotal.toLocaleString('en-IN')}`;
    }).join('\n\n');

    const messageText = `*NEW ORDER - ABEER*\n` +
      `--------------------------\n` +
      `*Order ID:* ${orderDetails.orderId}\n` +
      `*Name:* ${orderDetails.shippingName}\n` +
      `*Email:* ${orderDetails.email}\n` +
      `*Phone:* ${orderDetails.phone}\n` +
      `*Shipping Address:* ${orderDetails.address}\n\n` +
      `*Order Summary:*\n${itemDetailsText}\n` +
      `--------------------------\n` +
      `*Total Items:* ${totalItems}\n` +
      `*Total Amount:* ₹${orderDetails.amount.toLocaleString('en-IN')}\n\n` +
      `_Please process my order. Thank you!_`;

    return `https://wa.me/918076006802?text=${encodeURIComponent(messageText)}`;
  };

  if (!mounted) {
    return (
      <div className="success-loading">
        <p>Loading order confirmation...</p>
      </div>
    );
  }

  return (
    <div className="success-successSection">
      <div className="container">
        <SectionTitle title="Order Placed" subtitle="Welcome to the Muse" />

        <div className="success-card">
          <div className="success-header">
            <span className="success-flowerIcon">❀</span>
            <h2 className="success-title">Thank You For Your Order</h2>
            <p className="success-subtitle">Your order is confirmed and currently under craftsmanship.</p>
          </div>

          {orderDetails ? (
            <div className="success-detailsBlock">
              <div className="success-detailsGrid">
                <div className="success-detailRow">
                  <span className="success-label">Order Number:</span>
                  <span className="success-valueHighlight">{orderDetails.orderId}</span>
                </div>
                <div className="success-detailRow">
                  <span className="success-label">Email Address:</span>
                  <span className="success-value">{orderDetails.email}</span>
                </div>
                <div className="success-detailRow">
                  <span className="success-label">Delivery Address:</span>
                  <span className="success-value">{orderDetails.address}</span>
                </div>
                <div className="success-detailRow">
                  <span className="success-label">Prepaid Amount:</span>
                  <span className="success-value">₹{orderDetails.amount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="success-itemsBlock">
                <h3 className="success-itemsTitle">Items Ordered</h3>
                <ul className="success-itemsList">
                  {orderDetails.items.map((item, idx) => (
                    <li key={idx} className="success-item">
                      <span className="success-itemName">❀ {item.name}</span>
                      <span className="success-itemMeta">Size: {item.size} • Qty: {item.qty}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="success-detailsBlock">
              <p>Your order details could not be retrieved, but your order was successfully placed.</p>
            </div>
          )}

          <div className="success-infoBox">
            <p><strong>Please Note:</strong> Since Abeer operates as a slow fashion house, your pieces are custom crafted upon order. They will be prepared, packaged with love, and shipped to you within 7–10 business days.</p>
            <p>A shipping confirmation containing tracking information will be sent to your email address.</p>
          </div>

          <div className="success-footer">
            <div className="success-buttonsGroup">
              {orderDetails && (
                <a 
                  href={getWhatsAppLink()} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="success-whatsappBtn"
                >
                  Send Details to WhatsApp
                </a>
              )}
              <Link href="/shop" className="success-shopLink">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
