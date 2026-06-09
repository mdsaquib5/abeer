'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { products } from '@/data/products';
import { useCartStore } from '@/store/cartStore';
import Accordion from '@/components/ui/Accordion';
import SectionTitle from '@/components/ui/SectionTitle';
import ProductCard from '@/components/shared/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IoArrowBackOutline,
  IoPlay,
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoCloseOutline,
  IoExpandOutline
} from 'react-icons/io5';

export default function ProductDetailPage({ params: paramsPromise }) {
  const router = useRouter();

  // React.use() wrapper to unwrap params in React 19 / Next.js 16 Client Component
  const params = React.use(paramsPromise);
  const { id } = params;

  const product = products.find((p) => p.id === id);

  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // Lightbox States
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Swipe Gestures States
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const addToCart = useCartStore((state) => state.addToCart);

  const mediaItems = product
    ? [
      ...product.images.map((img, idx) => ({ type: 'image', url: img, index: idx })),
      ...(product.video ? [{ type: 'video', url: product.video, index: 'video' }] : [])
    ]
    : [];

  const nextLightboxItem = () => {
    setLightboxIndex((prev) => (prev + 1) % mediaItems.length);
  };

  const prevLightboxItem = () => {
    setLightboxIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
  };

  const handleOpenLightbox = () => {
    const idx = mediaItems.findIndex((item) => item.index === activeImage);
    setLightboxIndex(idx !== -1 ? idx : 0);
    setIsLightboxOpen(true);
  };

  // Keyboard Navigation
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        nextLightboxItem();
      } else if (e.key === 'ArrowLeft') {
        prevLightboxItem();
      } else if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, mediaItems.length]);

  // Background Scroll Lock
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLightboxOpen]);

  // Touch Swipe Handlers
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      nextLightboxItem();
    } else if (isRightSwipe) {
      prevLightboxItem();
    }
  };

  // Set default active image and save recently viewed items
  useEffect(() => {
    if (product) {
      setActiveImage(0);
      setSelectedSize('');
      setQuantity(1);

      // Manage recently viewed items in localStorage
      const viewed = JSON.parse(localStorage.getItem('abeer-recently-viewed') || '[]');
      const updated = [product.id, ...viewed.filter((vid) => vid !== product.id)].slice(0, 4);
      localStorage.setItem('abeer-recently-viewed', JSON.stringify(updated));

      const viewedProducts = products.filter((p) => updated.includes(p.id) && p.id !== product.id);
      setRecentlyViewed(viewedProducts);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="prod-notFound">
        <h2>Silhouettes not found</h2>
        <p>This piece does not exist in our label collections.</p>
        <Link href="/shop" className="prod-backLink">
          Back to Shop
        </Link>
      </div>
    );
  }

  // Related products (same category/collection excluding current)
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.collection === product.collection || p.category === product.category))
    .slice(0, 3);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    addToCart(product, selectedSize, quantity);
    setAddedMessage(true);
    setTimeout(() => {
      setAddedMessage(false);
    }, 3000);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    addToCart(product, selectedSize, quantity);
    router.push('/cart');
  };

  const galleryLayoutClass = product.aspectRatio === 'landscape'
    ? 'prod-landscapeGallery'
    : 'prod-portraitGallery';

  return (
    <div className="prod-productSection">
      <div className="container">
        {/* Back Link */}
        <Link href="/shop" className="prod-backButton">
          <IoArrowBackOutline /> Back to Collections
        </Link>

        {/* Dynamic Gallery and Details layout */}
        <div className={`prod-mainLayout ${galleryLayoutClass}`}>
          {/* Gallery Block */}
          <div className="prod-galleryContainer">
            <div
              className="prod-activeImageWrapper"
              onClick={handleOpenLightbox}
              title="Click to zoom image"
            >
              <div className="prod-zoomOverlay">
                <IoExpandOutline />
              </div>
              {activeImage === 'video' && product.video ? (
                <video
                  src={product.video}
                  className="prod-activeVideo prod-activeImage"
                  controls
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                />
              ) : (
                product.images && product.images[activeImage] && (
                  <Image
                    src={product.images[activeImage]}
                    alt={product.name}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="prod-activeImage"
                  />
                )
              )}
            </div>

            {/* Thumbnails grid */}
            {((product.images && product.images.length > 1) || (product.images && product.images.length > 0 && product.video)) && (
              <div className="prod-thumbnails">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    className={`prod-thumbBtn ${activeImage === index ? 'prod-thumbActive' : ''}`}
                    onClick={() => setActiveImage(index)}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      fill
                      sizes="80px"
                      className="prod-thumbImage"
                    />
                  </button>
                ))}

                {product.video && (
                  <button
                    className={`prod-thumbBtn prod-videoThumbBtn ${activeImage === 'video' ? 'prod-thumbActive' : ''}`}
                    onClick={() => setActiveImage('video')}
                  >
                    {product.images && product.images[0] && (
                      <Image
                        src={product.images[0]}
                        alt={`${product.name} video thumbnail`}
                        fill
                        sizes="80px"
                        className="prod-thumbImage"
                      />
                    )}
                    <div className="prod-videoThumbOverlay">
                      <IoPlay className="prod-videoThumbPlayIcon" />
                    </div>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Details Block */}
          <div className="prod-detailsContainer">
            <span className="prod-brand">ABEER.LABEL</span>
            <h1 className="prod-title">{product.name}</h1>
            <p className="prod-collection">Collection: {product.collection}</p>
            <p className="prod-price">₹{product.price.toLocaleString('en-IN')}</p>

            <div className="prod-divider"></div>

            {/* Size Selector */}
            <div className="prod-sizeSection">
              <div className="prod-sectionHeader">
                <span className="prod-label">Select Size:</span>
                {selectedSize && <span className="prod-selectedValue">{selectedSize}</span>}
              </div>
              <div className="prod-sizesGrid">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`prod-sizeBtn ${selectedSize === size ? 'prod-sizeBtnActive' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="prod-quantitySection">
              <span className="prod-label">Quantity:</span>
              <div className="prod-quantityControls">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="prod-qtyBtn"
                >
                  -
                </button>
                <span className="prod-qtyVal">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="prod-qtyBtn"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="prod-actions">
              <button
                onClick={handleAddToCart}
                className="prod-addToCartBtn"
              >
                Add to Bag
              </button>
              <button
                onClick={handleBuyNow}
                className="prod-buyNowBtn"
              >
                Buy Now
              </button>
            </div>

            {addedMessage && (
              <div className="prod-successToast">
                ✓ Piece successfully added to your shopping bag!
              </div>
            )}

            {/* Accordions */}
            <div className="prod-accordions">
              <Accordion title="Description" defaultOpen={true}>
                <p>{product.description}</p>
              </Accordion>

              <Accordion title="Composition & Lining">
                <ul>
                  <li><strong>Fabric Composition:</strong> {product.composition}</li>
                  <li><strong>Lining:</strong> {product.lining}</li>
                  <li><strong>Fit Styling:</strong> {product.fit}</li>
                  {product.print && <li><strong>Print:</strong> {product.print}</li>}
                  {product.details && <li><strong>Motif:</strong> {product.details}</li>}
                </ul>
              </Accordion>

              <Accordion title="Wash Care Instruction">
                <p>{product.care}</p>
              </Accordion>

              <Accordion title="Shipping & Returns">
                <p>
                  <strong>Prepaid Orders Only:</strong> Abeer operates purely as a slow fashion house. Cash on delivery is unavailable.
                </p>
                <p>
                  <strong>Exchange Policy:</strong> Size exchanges are accepted within 3 days of delivery, subject to size availability. Items must be unwashed, unused, and tags attached.
                </p>
                <p>
                  <strong>Damages:</strong> Returns accepted for damaged items only. An unboxing video is mandatory for claims.
                </p>
              </Accordion>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="prod-relatedSection">
            <SectionTitle title="Complete The Look" subtitle="Perfect Companions" />
            <div className="prod-relatedGrid">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        {/* Recently Viewed Products Section */}
        {recentlyViewed.length > 0 && (
          <div className="prod-viewedSection">
            <SectionTitle title="Recently Viewed" subtitle="Nostalgic Silhouettes" />
            <div className="prod-relatedGrid">
              {recentlyViewed.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal Overlay */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            className="prod-lightboxOverlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Header */}
            <div className="prod-lightboxHeader" onClick={(e) => e.stopPropagation()}>
              <span className="prod-lightboxCounter">
                {String(lightboxIndex + 1).padStart(2, '0')} / {String(mediaItems.length).padStart(2, '0')}
              </span>
              <button
                className="prod-lightboxCloseBtn"
                onClick={() => setIsLightboxOpen(false)}
                aria-label="Close Lightbox"
              >
                <IoCloseOutline />
              </button>
            </div>

            {/* Main Area */}
            <div
              className="prod-lightboxMainArea"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Nav Left */}
              <button
                className="prod-lightboxNavBtn prod-lightboxNavLeft"
                onClick={(e) => {
                  e.stopPropagation();
                  prevLightboxItem();
                }}
                aria-label="Previous Slide"
              >
                <IoChevronBackOutline />
              </button>

              {/* Media Wrapper */}
              <div
                className="prod-lightboxMediaWrapper"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <AnimatePresence mode="wait">
                  {mediaItems[lightboxIndex]?.type === 'video' ? (
                    <motion.video
                      key="video"
                      src={mediaItems[lightboxIndex].url}
                      className="prod-lightboxVideo"
                      controls
                      autoPlay
                      loop
                      muted
                      playsInline
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    />
                  ) : (
                    <motion.div
                      key={mediaItems[lightboxIndex]?.url}
                      style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Image
                        src={mediaItems[lightboxIndex]?.url}
                        alt={`${product.name} gallery image`}
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, 80vw"
                        className="prod-lightboxImage"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Nav Right */}
              <button
                className="prod-lightboxNavBtn prod-lightboxNavRight"
                onClick={(e) => {
                  e.stopPropagation();
                  nextLightboxItem();
                }}
                aria-label="Next Slide"
              >
                <IoChevronForwardOutline />
              </button>
            </div>

            {/* Thumbnail Strip */}
            <div
              className="prod-lightboxThumbnails"
              onClick={(e) => e.stopPropagation()}
            >
              {mediaItems.map((item, idx) => (
                <button
                  key={idx}
                  className={`prod-lightboxThumbBtn ${lightboxIndex === idx ? 'prod-lightboxThumbActive' : ''}`}
                  onClick={() => setLightboxIndex(idx)}
                >
                  {item.type === 'video' ? (
                    <>
                      {product.images && product.images[0] && (
                        <Image
                          src={product.images[0]}
                          alt="Video thumbnail"
                          fill
                          sizes="60px"
                          className="prod-lightboxThumbImage"
                        />
                      )}
                      <div className="prod-lightboxVideoThumbOverlay">
                        <IoPlay className="prod-lightboxVideoThumbPlay" />
                      </div>
                    </>
                  ) : (
                    <Image
                      src={item.url}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      sizes="60px"
                      className="prod-lightboxThumbImage"
                    />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
