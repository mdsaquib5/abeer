import React from 'react';
import HeroSection from '@/components/shared/HeroSection';
import CategorySection from '@/components/shared/CategorySection';
import CollectionSection from '@/components/shared/CollectionSection';
import FeaturedSection from '@/components/shared/FeaturedSection';
import ReelsSection from '@/components/shared/ReelsSection';
import TestimonialSection from '@/components/shared/TestimonialSection';
import AboutSection from '@/components/shared/AboutSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <CollectionSection />
      <FeaturedSection />
      <ReelsSection />
      <TestimonialSection />
      <AboutSection />
    </>
  );
}
