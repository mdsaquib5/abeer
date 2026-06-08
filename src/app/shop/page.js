'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { products } from '@/data/products';
import ProductGrid from '@/components/shared/ProductGrid';
import SectionTitle from '@/components/ui/SectionTitle';
import { IoFilterOutline, IoCloseOutline } from 'react-icons/io5';

const categoryLabels = {
  'all': 'All Categories',
  'farshi-salwars-collection': 'Farshi Salwars Collection',
  'kurti-collection': 'Kurti Collection',
  'kurti-sets': 'Kurti Sets',
  'ethnic-dresses': 'Ethnic Dresses',
  'new-collection': 'New Collection'
};

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL state sync
  const currentCollection = searchParams.get('collection') || 'all';
  const currentCategory = searchParams.get('category') || 'all';
  const currentSort = searchParams.get('sort') || 'featured';

  // Local filter states
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [priceRange, setPriceRange] = useState('all');
  const [availability, setAvailability] = useState('all');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Available options
  const collections = ['all', 'basant-bahaar', 'floral-affaire-nargis'];
  const categoriesList = ['all', 'farshi-salwars-collection', 'kurti-collection', 'kurti-sets', 'ethnic-dresses', 'new-collection'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', '2XL'];

  // Handle updates to query params
  const updateQueryParam = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'all' || !value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`/shop?${params.toString()}`);
  };

  // Toggle size selection
  const handleSizeToggle = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSelectedSizes([]);
    setPriceRange('all');
    setAvailability('all');
    router.push('/shop');
  };

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by Collection
    if (currentCollection !== 'all') {
      const match = currentCollection === 'basant-bahaar' ? 'Basant Bahaar' : 'Floral Affairé';
      result = result.filter((p) => p.collection === match);
    }

    // Filter by Category
    if (currentCategory !== 'all') {
      result = result.filter((p) => {
        if (currentCategory === 'farshi-salwars-collection') {
          return p.category === 'Farshi Salwars Collection';
        }
        if (currentCategory === 'kurti-collection') {
          return p.category === 'Kurti Collection' || p.category === 'Kurti Sets' || p.category === 'Farshi Salwars Collection';
        }
        if (currentCategory === 'kurti-sets') {
          return p.category === 'Kurti Sets' || p.category === 'Farshi Salwars Collection';
        }
        if (currentCategory === 'ethnic-dresses') {
          return p.category === 'Ethnic Dresses';
        }
        if (currentCategory === 'new-collection') {
          return p.collection === 'Basant Bahaar';
        }
        return false;
      });
    }

    // Filter by Size
    if (selectedSizes.length > 0) {
      result = result.filter((p) =>
        p.sizes.some((size) => selectedSizes.includes(size))
      );
    }

    // Filter by Price
    if (priceRange !== 'all') {
      if (priceRange === 'under-2000') {
        result = result.filter((p) => p.price < 2000);
      } else if (priceRange === '2000-4000') {
        result = result.filter((p) => p.price >= 2000 && p.price <= 4000);
      } else if (priceRange === 'above-4000') {
        result = result.filter((p) => p.price > 4000);
      }
    }

    // Filter by Availability
    if (availability !== 'all') {
      if (availability === 'in-stock') {
        result = result.filter((p) => p.inStock);
      } else if (availability === 'out-of-stock') {
        result = result.filter((p) => !p.inStock);
      }
    }

    // Sorting
    if (currentSort === 'price-low-high') {
      result.sort((a, b) => a.price - b.price);
    } else if (currentSort === 'price-high-low') {
      result.sort((a, b) => b.price - a.price);
    } else if (currentSort === 'newest') {
      // Geet and Hania are newer, salwar is base
      result.sort((a, b) => (a.id === 'farshi-salwar' ? 1 : -1));
    }

    return result;
  }, [currentCollection, currentCategory, selectedSizes, priceRange, availability, currentSort]);

  const sidebarContent = (
    <div className="shop-filtersWrapper">
      <div className="shop-filterGroup">
        <h4 className="shop-filterHeading">Collections</h4>
        <div className="shop-filterOptions">
          {collections.map((col) => (
            <button
              key={col}
              className={`shop-filterBtn ${currentCollection === col ? 'shop-filterBtnActive' : ''}`}
              onClick={() => updateQueryParam('collection', col)}
            >
              {col.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="shop-filterGroup">
        <h4 className="shop-filterHeading">Category</h4>
        <div className="shop-filterOptions">
          {categoriesList.map((cat) => (
            <button
              key={cat}
              className={`shop-filterBtn ${currentCategory === cat ? 'shop-filterBtnActive' : ''}`}
              onClick={() => updateQueryParam('category', cat)}
            >
              {categoryLabels[cat] || cat}
            </button>
          ))}
        </div>
      </div>

      <div className="shop-filterGroup">
        <h4 className="shop-filterHeading">Sizes</h4>
        <div className="shop-sizesGrid">
          {sizes.map((size) => (
            <button
              key={size}
              className={`shop-sizeBox ${selectedSizes.includes(size) ? 'shop-sizeBoxActive' : ''}`}
              onClick={() => handleSizeToggle(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="shop-filterGroup">
        <h4 className="shop-filterHeading">Price</h4>
        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="shop-selectFilter"
        >
          <option value="all">All Prices</option>
          <option value="under-2000">Under ₹2,000</option>
          <option value="2000-4000">₹2,000 - ₹4,000</option>
          <option value="above-4000">Above ₹4,000</option>
        </select>
      </div>

      <div className="shop-filterGroup">
        <h4 className="shop-filterHeading">Availability</h4>
        <div className="shop-radioGroup">
          <label className="shop-radioLabel">
            <input
              type="radio"
              name="availability"
              value="all"
              checked={availability === 'all'}
              onChange={() => setAvailability('all')}
            />
            All
          </label>
          <label className="shop-radioLabel">
            <input
              type="radio"
              name="availability"
              value="in-stock"
              checked={availability === 'in-stock'}
              onChange={() => setAvailability('in-stock')}
            />
            In Stock
          </label>
        </div>
      </div>

      <button className="shop-clearBtn" onClick={handleClearFilters}>
        Clear Filters
      </button>
    </div>
  );

  return (
    <div className="shop-shopSection">
      <div className="container">
        <SectionTitle title="The Shop" subtitle="Quiet Luxury Silhouettes" />

        {/* Action controls for mobile */}
        <div className="shop-controlsBar">
          <button
            className="shop-mobileFilterToggle"
            onClick={() => setIsMobileFilterOpen(true)}
          >
            <IoFilterOutline /> Filters
          </button>

          <div className="shop-sortWrapper">
            <span className="shop-sortLabel">Sort By:</span>
            <select
              value={currentSort}
              onChange={(e) => updateQueryParam('sort', e.target.value)}
              className="shop-sortSelect"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="shop-layout">
          {/* Desktop Sidebar */}
          <aside className="shop-desktopSidebar">
            {sidebarContent}
          </aside>

          {/* Product Grid listing */}
          <div className="shop-contentArea">
            <p className="shop-resultsCount">
              Showing {filteredProducts.length} pieces
            </p>
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer Slide panel */}
      {isMobileFilterOpen && (
        <div className="shop-drawerOverlay">
          <div className="shop-drawerBackdrop" onClick={() => setIsMobileFilterOpen(false)} />
          <div className="shop-drawerContainer">
            <div className="shop-drawerHeader">
              <h3 className="shop-drawerTitle">Filters</h3>
              <button
                className="shop-drawerClose"
                onClick={() => setIsMobileFilterOpen(false)}
              >
                <IoCloseOutline />
              </button>
            </div>
            <div className="shop-drawerBody">
              {sidebarContent}
            </div>
            <div className="shop-drawerFooter">
              <button
                className="shop-applyBtn"
                onClick={() => setIsMobileFilterOpen(false)}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', backgroundColor: '#fffaf5', color: '#4d2618', fontFamily: 'var(--font-heading)', fontSize: '1.5rem' }}>
        Loading the Abeer Shop...
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
