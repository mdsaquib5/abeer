import React from 'react';
import SectionTitle from '../ui/SectionTitle';
;

const testimonials = [
  {
    id: 1,
    name: "Sana Khan",
    rating: 5,
    review: "The fabric is very soft and comfortable. Got so many compliments when I wore it!"
  },
  {
    id: 2,
    name: "Meera Iyer",
    rating: 5,
    review: "The embroidery is super neat and beautiful. Looks exactly like the pictures."
  },
  {
    id: 3,
    name: "Aisha Rahil",
    rating: 5,
    review: "Very nice fit and drape. Extremely comfortable to wear all day long."
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
