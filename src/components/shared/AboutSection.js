import React from 'react';
import Image from 'next/image';
import SectionTitle from '../ui/SectionTitle';
;

export default function AboutSection() {
  return (
    <section id="about-section" className="about-section">
      <div className="container">
        <div className="about-grid">
          {/* Left Column: Story text */}
          <div className="about-content">
            <span className="about-welcome">A Personal Note</span>
            <h2 className="about-headline">Mariyam&apos;s Vision</h2>
            
            <div className="about-storyText">
              <p>
                Abeer is a reflection of slow fashion, quiet luxury, and timeless design. 
                Born from a love for Indian craftsmanship, we create consciously made pieces 
                that remain relevant long after trends fade.
              </p>
              <p>
                Our designs carry the nostalgia of the Y2K era while embracing the ease and 
                confidence of the modern woman. Abeer is for the desi muse who finds herself 
                between two worlds—somewhere between 2000 and 2026.
              </p>
              <p>
                She loves ethnic wear but seeks a contemporary edge. She has a modern mindset 
                yet a soft heart. She still pauses for poetry. Chooses chai over coffee. 
                Prefers auto rides over luxury cars. Finds beauty in the little things.
              </p>
              <p>
                Through thoughtful silhouettes, breathable fabrics, handcrafted details, 
                and modern interpretations of traditional wear, we bring her vision to life. 
                At Abeer, we don&apos;t just create clothes. We create pieces for women who carry 
                nostalgia in their hearts and confidence in their stride.
              </p>
            </div>
            
            <div className="about-quoteWrapper">
              <span className="about-quote">&mdash; Mariyam</span>
              <span className="about-author">Founder &amp; Designer</span>
            </div>
          </div>

          {/* Right Column: Editorial Image */}
          <div className="about-media">
            <div className="about-frame">
              <Image
                src="/Logo Image .png"
                alt="Abeer Brand Narrative Editorial representation"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="about-image"
                priority
              />
              <div className="about-ornament">❀</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
