'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { products } from '@/data/products';
import ProductCard from './ProductCard';
import SectionTitle from '../ui/SectionTitle';
;

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function FeaturedSection() {
  // Take first 5 products as featured
  const featuredProducts = products.slice(0, 5);

  return (
    <section className="feat-section">
      <div className="container">
        <SectionTitle 
          title="Featured Pieces" 
          subtitle="Designed to Stay" 
        />

        <div className="feat-sliderWrapper">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              nextEl: `.feat-swiperButtonNext`,
              prevEl: `.feat-swiperButtonPrev`,
            }}
            pagination={{ 
              clickable: true,
              el: `.feat-swiperPagination`,
              bulletClass: 'feat-swiperBullet',
              bulletActiveClass: 'feat-swiperBulletActive'
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            className="feat-swiperContainer"
          >
            {featuredProducts.map((product) => (
              <SwiperSlide key={product.id} className="feat-swiperSlide">
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Editorial Slider Navigation Controls */}
          <button className={`feat-swiperButtonPrev feat-navArrow`} aria-label="Previous slide">
            <span>←</span>
          </button>
          <button className={`feat-swiperButtonNext feat-navArrow`} aria-label="Next slide">
            <span>→</span>
          </button>
          
          {/* Pagination container */}
          <div className="feat-swiperPagination"></div>
        </div>
      </div>
    </section>
  );
}
