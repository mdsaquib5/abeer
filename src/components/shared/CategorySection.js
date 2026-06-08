'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SectionTitle from '../ui/SectionTitle';
import { categories } from '@/data/products';
;

export default function CategorySection() {
  return (
    <section className="cat-section">
      <div className="container">
        <SectionTitle
          title="Shop By Category"
          subtitle="Explore the Silhouettes"
        />

        <div className="cat-flexContainer">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="cat-card"
            >
              <div className="cat-circleOuter">
                <div className="cat-circleInner">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 576px) 150px, 200px"
                    className="cat-image"
                  />
                </div>
              </div>
              <h3 className="cat-name">{cat.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
