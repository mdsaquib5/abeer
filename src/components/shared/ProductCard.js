'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IoHeartOutline, IoHeart, IoBagOutline, IoEyeOutline } from 'react-icons/io5';
import { useCartStore } from '@/store/cartStore';
;

export default function ProductCard({ product }) {
  const [showSizeSelector, setShowSizeSelector] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedMessage, setAddedMessage] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowSizeSelector(true);
  };

  const selectSize = (size, e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, size, 1);
    setShowSizeSelector(false);
    setAddedMessage(true);
    setTimeout(() => {
      setAddedMessage(false);
    }, 2000);
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const cardStyleClass = product.aspectRatio === 'landscape' 
    ? 'pc-landscapeCard' 
    : 'pc-portraitCard';

  return (
    <div className={`pc-card ${cardStyleClass} animate-fade-in`}>
      {/* Product Image Gallery Wrapper */}
      <div className="pc-imageWrapper">
        <Link href={`/product/${product.id}`} className="pc-imageLink">
          {product.images && product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="pc-productImage"
              priority={false}
            />
          ) : (
            <div className="pc-placeholder">No Image</div>
          )}

          {/* Hover Overlay Second Image */}
          {product.images && product.images[1] && (
            <Image
              src={product.images[1]}
              alt={`${product.name} alternate`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`pc-productImage pc-productImageHover`}
            />
          )}
        </Link>

        {/* Wishlist Button */}
        <button 
          className={`pc-wishlistBtn ${isWishlisted ? 'pc-activeWish' : ''}`}
          onClick={handleWishlistClick}
          aria-label="Add to wishlist"
        >
          {isWishlisted ? <IoHeart /> : <IoHeartOutline />}
        </button>

        {/* Added to Cart Toast Overlay */}
        {addedMessage && (
          <div className="pc-toastOverlay">
            <span>Added to Bag ✓</span>
          </div>
        )}

        {/* Quick Action Overlay (Desktop) */}
        <div className="pc-actionOverlay">
          <button 
            className="pc-quickActionBtn"
            onClick={handleAddToCartClick}
          >
            <IoBagOutline /> Add to Bag
          </button>
          <Link href={`/product/${product.id}`} className="pc-quickViewBtn">
            <IoEyeOutline /> View Details
          </Link>
        </div>

        {/* Size Selector Overlay panel */}
        {showSizeSelector && (
          <div className="pc-sizeOverlay" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
            <p className="pc-sizeTitle">Choose Size</p>
            <div className="pc-sizesGrid">
              {product.sizes.map((size) => (
                <button 
                  key={size}
                  className="pc-sizeBtn"
                  onClick={(e) => selectSize(size, e)}
                >
                  {size}
                </button>
              ))}
            </div>
            <button 
              className="pc-closeSizeBtn"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowSizeSelector(false); }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Product Details Section */}
      <div className="pc-info">
        <div className="pc-brandRow">
          <span className="pc-brand">ABEER</span>
          <span className="pc-collection">{product.collection}</span>
        </div>
        <Link href={`/product/${product.id}`} className="pc-titleLink">
          <h3 className="pc-title">{product.name}</h3>
        </Link>
        <div className="pc-bottomRow">
          <p className="pc-price">₹{product.price.toLocaleString('en-IN')}</p>
          {/* Mobile direct CTA button */}
          <button 
            className="pc-mobileAddBtn" 
            onClick={handleAddToCartClick}
            aria-label="Add to cart"
          >
            <IoBagOutline />
          </button>
        </div>
      </div>
    </div>
  );
}
