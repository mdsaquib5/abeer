'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { collections, products } from '@/data/products';
import ProductGrid from '@/components/shared/ProductGrid';
import { IoArrowBackOutline } from 'react-icons/io5';
;

export default function CollectionDetailPage({ params: paramsPromise }) {
  const params = React.use(paramsPromise);
  const { id } = params;

  const collection = collections.find((c) => c.id === id);
  const [email, setEmail] = useState('');
  const [notified, setNotified] = useState(false);

  const collectionProducts = products.filter(
    (p) => p.collection.toLowerCase().replace(/[^a-z0-9]+/g, '-') === id || 
           (id === 'basant-bahaar' && p.collection === 'Basant Bahaar')
  );

  const handleNotifySubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setNotified(true);
    setEmail('');
    setTimeout(() => {
      setNotified(false);
    }, 4000);
  };

  if (!collection) {
    return (
      <div className="col-notFound">
        <h2>Collection Not Found</h2>
        <p>This collection does not exist in our label archives.</p>
        <Link href="/" className="col-backLink">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="col-section">
      {/* Banner and Header Panel */}
      <div className="col-heroBanner">
        <div className="col-bannerImageWrapper">
          <Image
            src={collection.image}
            alt={collection.name}
            fill
            priority
            sizes="100vw"
            className="col-bannerImage"
          />
          <div className="col-bannerOverlay"></div>
        </div>

        <div className="col-headerContent">
          <Link href="/" className="col-backBtn"><IoArrowBackOutline /> Home</Link>
          <span className="col-tagline">{collection.tagline}</span>
          <h1 className="col-title">{collection.name}</h1>
          <p className="col-desc">{collection.description}</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container" style={{ marginTop: '60px' }}>
        {collection.status === 'coming-soon' ? (
          <div className="col-comingSoonBox">
            <h3 className="col-comingSoonTitle">Collection Teaser</h3>
            <p className="col-comingSoonDesc">
              This exclusive collection will be launched on <strong>{collection.launchDate}</strong>. 
              Be the first to explore these handcrafted designs by registering below.
            </p>
            {notified ? (
              <div className="col-notifySuccess">
                <span>✓ Successfully registered! We will notify you on launch day. ❀</span>
              </div>
            ) : (
              <form onSubmit={handleNotifySubmit} className="col-notifyForm">
                <input
                  type="email"
                  placeholder="Enter your email for early lookbook access"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="col-notifyInput"
                  required
                />
                <button type="submit" className="col-notifyBtn">
                  Notify Me
                </button>
              </form>
            )}
          </div>
        ) : (
          <div className="col-productsArea">
            <h2 className="col-sectionTitle">❀ The Basant Bahaar Silhouettes ❀</h2>
            <ProductGrid products={collectionProducts} />
          </div>
        )}
      </div>
    </div>
  );
}
