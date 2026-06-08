'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import SectionTitle from '@/components/ui/SectionTitle';
;

export default function CheckoutPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { items, clearCart } = useCartStore();

  // Address Form State
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState('upi');

  useEffect(() => {
    setMounted(true);
  }, []);

  const subtotal = useMemo(() => {
    if (!mounted) return 0;
    return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }, [items, mounted]);

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (items.length === 0) return;

    // Simulate order placement
    const orderId = `AB-${Math.floor(100000 + Math.random() * 900000)}`;
    
    // Save order metadata in localStorage for Order Success screen
    const orderDetails = {
      orderId,
      email,
      phone,
      shippingName: `${firstName} ${lastName}`,
      address: `${address}, ${city}, ${state} - ${zipCode}`,
      amount: subtotal,
      items: items.map((i) => ({ 
        name: i.product.name, 
        size: i.size, 
        qty: i.quantity,
        price: i.product.price 
      }))
    };
    localStorage.setItem('abeer-last-order', JSON.stringify(orderDetails));

    // Construct the WhatsApp message details
    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
    const itemDetailsText = items.map((item) => {
      const itemPrice = item.product.price;
      const itemSubtotal = itemPrice * item.quantity;
      return `• *${item.product.name}*\n  Size: ${item.size}\n  Qty: ${item.quantity}\n  Price per item: ₹${itemPrice.toLocaleString('en-IN')}\n  Subtotal: ₹${itemSubtotal.toLocaleString('en-IN')}`;
    }).join('\n\n');

    const messageText = `*NEW ORDER - ABEER*\n` +
      `--------------------------\n` +
      `*Order ID:* ${orderId}\n` +
      `*Name:* ${firstName} ${lastName}\n` +
      `*Email:* ${email}\n` +
      `*Phone:* ${phone}\n` +
      `*Shipping Address:* ${address}, ${city}, ${state} - ${zipCode}\n\n` +
      `*Order Summary:*\n${itemDetailsText}\n` +
      `--------------------------\n` +
      `*Total Items:* ${totalItems}\n` +
      `*Total Amount:* ₹${subtotal.toLocaleString('en-IN')}\n\n` +
      `_Please process my order. Thank you!_`;

    const encodedMessage = encodeURIComponent(messageText);
    const waUrl = `https://wa.me/918076006802?text=${encodedMessage}`;

    // Open WhatsApp in a new tab
    try {
      window.open(waUrl, '_blank');
    } catch (err) {
      console.error('Failed to open WhatsApp tab:', err);
    }

    // Clear cart and redirect to success page
    clearCart();
    router.push('/order-success');
  };

  if (!mounted) {
    return (
      <div className="chk-loadingContainer">
        <p>Loading checkout...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="chk-emptyContainer">
        <div className="container">
          <SectionTitle title="Checkout" subtitle="Complete Your Order" />
          <div className="chk-emptyContent">
            <p className="chk-emptyMessage">Your bag is currently empty.</p>
            <Link href="/shop" className="chk-shopBtn">
              Go to Shop
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="chk-checkoutSection">
      <div className="container">
        <SectionTitle title="Checkout" subtitle="Shipping & Payment" />

        <form onSubmit={handleSubmitOrder} className="chk-layout">
          {/* Left: Checkout Forms */}
          <div className="chk-formsContainer">
            {/* Contact Details */}
            <div className="chk-formBlock">
              <h3 className="chk-blockTitle">1. Contact Information</h3>
              <div className="chk-inputGroup">
                <div className="chk-inputField">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                  />
                </div>
                <div className="chk-inputField">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="10-digit mobile number"
                    pattern="[0-9]{10}"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="chk-formBlock">
              <h3 className="chk-blockTitle">2. Shipping Address</h3>
              <div className="chk-inputGroupRow">
                <div className="chk-inputField">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="chk-inputField">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className="chk-inputField" style={{ marginTop: '16px' }}>
                <label htmlFor="address">Street Address</label>
                <input
                  type="text"
                  id="address"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Apartment, house no., street name"
                />
              </div>
              <div className="chk-inputGroupRow" style={{ marginTop: '16px' }}>
                <div className="chk-inputField">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div className="chk-inputField">
                  <label htmlFor="state">State</label>
                  <input
                    type="text"
                    id="state"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>
                <div className="chk-inputField">
                  <label htmlFor="zip">ZIP / Postal Code</label>
                  <input
                    type="text"
                    id="zip"
                    required
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    pattern="[0-9]{6}"
                    placeholder="6 digits"
                  />
                </div>
              </div>
            </div>

            {/* Payment Options */}
            <div className="chk-formBlock">
              <h3 className="chk-blockTitle">3. Payment Method</h3>
              <p className="chk-prepaidNotice">
                ❀ <strong>Prepaid Order Only:</strong> Cash on delivery is not accepted.
              </p>
              
              <div className="chk-paymentOptions">
                <label className={`chk-paymentLabel ${paymentMethod === 'card' ? 'chk-paymentLabelActive' : ''}`} style={{ opacity: 0.6, cursor: 'not-allowed' }}>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    disabled
                  />
                  Credit / Debit Card (Temporarily Unavailable)
                </label>
                <label className={`chk-paymentLabel ${paymentMethod === 'upi' ? 'chk-paymentLabelActive' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                  />
                  UPI (GPay / PhonePe / Paytm)
                </label>
                <label className={`chk-paymentLabel ${paymentMethod === 'netbanking' ? 'chk-paymentLabelActive' : ''}`} style={{ opacity: 0.6, cursor: 'not-allowed' }}>
                  <input
                    type="radio"
                    name="payment"
                    value="netbanking"
                    checked={paymentMethod === 'netbanking'}
                    onChange={() => setPaymentMethod('netbanking')}
                    disabled
                  />
                  Net Banking (Temporarily Unavailable)
                </label>
              </div>
            </div>
          </div>

          <div className="chk-summaryContainer">
            <h3 className="chk-summaryTitle">Your Order</h3>
            
            <div className="chk-summaryItems">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.size}`} className="chk-itemRow">
                  <div className="chk-itemThumbWrapper">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      sizes="50px"
                      className="chk-itemThumb"
                    />
                  </div>
                  <div className="chk-itemMeta">
                    <p className="chk-itemName">{item.product.name}</p>
                    <p className="chk-itemDetails">Size: {item.size} • Qty: {item.quantity}</p>
                  </div>
                  <span className="chk-itemPrice">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            <div className="chk-totalsSection">
              <div className="chk-totalRow">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="chk-totalRow">
                <span>Shipping</span>
                <span className="chk-freeShipping">Free</span>
              </div>
              <div className="chk-divider"></div>
              <div className={`chk-totalRow chk-grandTotal`}>
                <span>Total Amount</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button type="submit" className="chk-placeOrderBtn">
              Place Prepaid Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
