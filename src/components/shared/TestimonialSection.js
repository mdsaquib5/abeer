import React from 'react';
import SectionTitle from '../ui/SectionTitle';
;

const testimonials = [
  {
    id: 1,
    name: "Sana Khan",
    rating: 5,
    review: "Abeer pieces feel luxurious, breathable and timeless. The Mal-Chander fabric is so soft on the skin and the fit is flowy and elegant."
  },
  {
    id: 2,
    name: "Meera Iyer",
    rating: 5,
    review: "The attention to embroidery details on my Geet Farshi Set is immaculate. Truly a slow fashion dream that stands out in a crowd."
  },
  {
    id: 3,
    name: "Aisha Rahil",
    rating: 5,
    review: "Wearing the Qala dress feels like poetry in motion. It has a beautiful, nostalgic drape while feeling incredibly modern. Wear Your Soul indeed!"
  }
];

export default function TestimonialSection() {
  return (
    <section className="test-section">
      <div className="container">
        <SectionTitle 
          title="The Abeer Voice" 
          subtitle="Love from Our Muses" 
        />
        
        <div className="test-grid">
          {testimonials.map((t) => (
            <div key={t.id} className={`test-card animate-slide-up`}>
              <div className="test-stars">
                {"★".repeat(t.rating)}
              </div>
              <p className="test-review">&ldquo;{t.review}&rdquo;</p>
              <div className="test-divider">❀</div>
              <p className="test-name">{t.name}</p>
              <span className="test-role">Abeer Muse</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
