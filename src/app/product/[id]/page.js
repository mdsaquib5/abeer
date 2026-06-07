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
import { IoArrowBackOutline } from 'react-icons/io5';
;

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

  const addToCart = useCartStore((state) => state.addToCart);

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
            <div className="prod-activeImageWrapper">
              {product.images && product.images[activeImage] && (
                <Image
                  src={product.images[activeImage]}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="prod-activeImage"
                />
              )}
            </div>

            {/* Thumbnails grid */}
            {product.images && product.images.length > 1 && (
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
              </div>
            )}
          </div>

          {/* Details Block */}
          <div className="prod-detailsContainer">
            <span className="prod-brand">ABEER LABEL</span>
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
    </div>
  );
}
