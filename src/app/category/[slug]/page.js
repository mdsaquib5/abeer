'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { categories, products } from '@/data/products';
import ProductGrid from '@/components/shared/ProductGrid';
import { IoArrowBackOutline } from 'react-icons/io5';

export default function CategoryDetailPage({ params: paramsPromise }) {
  const params = React.use(paramsPromise);
  const { slug } = params;

  const category = categories.find((c) => c.slug === slug);

  // Filter products by category slug
  const categoryProducts = products.filter((p) => {
    if (slug === 'farshi-salwars-collection') {
      return p.category === 'Farshi Salwars Collection';
    }
    if (slug === 'kurti-collection') {
      return p.category === 'Kurti Collection' || p.category === 'Kurti Sets' || p.category === 'Farshi Salwars Collection';
    }
    if (slug === 'kurti-sets') {
      // 2-piece farshi sets are also kurti sets
      return p.category === 'Kurti Sets' || p.category === 'Farshi Salwars Collection';
    }
    if (slug === 'ethnic-dresses') {
      return p.category === 'Ethnic Dresses';
    }
    return false;
  });

  if (!category) {
    return (
      <div className="col-notFound">
        <h2>Category Not Found</h2>
        <p>This category does not exist in our label archives.</p>
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
            src={category.image}
            alt={category.name}
            fill
            priority
            sizes="100vw"
            className="col-bannerImage"
          />
          <div className="col-bannerOverlay"></div>
        </div>

        <div className="col-headerContent">
          <Link href="/" className="col-backBtn"><IoArrowBackOutline /> Home</Link>
          <span className="col-tagline">{category.tagline}</span>
          <h1 className="col-title">{category.name}</h1>
          <p className="col-desc">{category.description}</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container" style={{ marginTop: '60px' }}>
        {slug === 'new-collection' ? (
          <div className="col-comingSoonBox">
            <h3 className="col-comingSoonTitle">Floral Affairé — NARGÍS</h3>
            <p className="col-comingSoonDesc">
              Our upcoming summer narrative of handwoven textures and organic luxury will launch on <strong>15 June 2026</strong>.
            </p>
          </div>
        ) : (
          <div className="col-productsArea">
            <h2 className="col-sectionTitle">❀ The {category.name} Silhouettes ❀</h2>
            <ProductGrid products={categoryProducts} />
          </div>
        )}
      </div>
    </div>
  );
}
