'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';

export default function CollectionSection() {
  return (
    <section className="colsec-section">
      <div className="container">
        <SectionTitle 
          title="The Collections" 
          subtitle="Conscious Silhouettes" 
        />

        <div className="colsec-asymmetricalGrid">
          {/* Collection 1: Basant Bahaar */}
          <div className={`colsec-card colsec-leftCard`}>
            <div className="colsec-imageContainer">
              <Image
                src="/basant-bahar.jpg"
                alt="Basant Bahaar Collection"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="colsec-image"
              />
              <span className="colsec-badge">Active Collection</span>
            </div>
            
            <div className="colsec-content">
              <span className="colsec-accentText">Basant Bahaar</span>
              <h3 className="colsec-title">Reflections of Spring</h3>
              <p className="colsec-description">
                A celebration of Indian craftsmanship and breathing space. Crafted from cotton-silk Mal-Chander, featuring the Geet, Hania, and Qala sets.
              </p>
              <Link href="/shop?collection=basant-bahaar">
                <Button variant="primary">Shop Now</Button>
              </Link>
            </div>
          </div>

          {/* Collection 2: Floral Affairé — NARGÍS (Teaser Card) */}
          <div className={`colsec-card colsec-rightCard`}>
            <div className="colsec-imageContainer">
              <Image
                src="/nargis-profile.jpg"
                alt="Floral Affairé — NARGÍS Collection"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="colsec-image"
              />
              <span className={`colsec-badge colsec-comingSoonBadge`}>Launching 15 June</span>
            </div>
            
            <div className="colsec-content">
              <span className="colsec-accentText">Floral Affairé — NARGÍS</span>
              <h3 className="colsec-title">Nostalgia of Summer</h3>
              <p className="colsec-description">
                Soft feminine luxury inspired by the poetry of blooming jasmine and Y2K ethnic silhouettes. Coming soon to the Abeer Muse lookbook.
              </p>
              <Link href="/shop?collection=nargis">
                <Button variant="primary">Shop Now</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
