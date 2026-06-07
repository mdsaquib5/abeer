'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Button from '../ui/Button';

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'tween', duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  // Collage variant motions for premium stagger entrance effects
  const collageContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const cardVariantsMain = {
    hidden: { opacity: 0, scale: 0.9, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 50, damping: 15, duration: 1.1 }
    }
  };

  const cardVariantsTopLeft = {
    hidden: { opacity: 0, x: -40, y: -40 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { type: 'spring', stiffness: 45, damping: 13, duration: 0.95 }
    }
  };

  const cardVariantsTopRight = {
    hidden: { opacity: 0, x: 40, y: -40 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { type: 'spring', stiffness: 45, damping: 13, duration: 0.95 }
    }
  };

  const cardVariantsBottomLeft = {
    hidden: { opacity: 0, x: -40, y: 40 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { type: 'spring', stiffness: 45, damping: 13, duration: 0.95 }
    }
  };

  const cardVariantsMiddleRight = {
    hidden: { opacity: 0, x: 40, y: 40 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { type: 'spring', stiffness: 45, damping: 13, duration: 0.95 }
    }
  };

  const collageItems = [
    {
      id: "/shop",
      name: "Ethnic Dresses",
      image: "/qala-one-pirce-ethenic-dress/image-1.jpg",
      className: "hero-cardMain",
      variants: cardVariantsMain
    },
    {
      id: "/shop",
      name: "Kurti Sets",
      image: "/geet-kurta-set-2pc/image-4.jpg",
      className: "hero-cardTopLeft",
      variants: cardVariantsTopLeft
    },
    {
      id: "/shop",
      name: "New Arrivals",
      image: "/geet-kurta-set-2pc/image-2.jpg",
      className: "hero-cardTopRight",
      variants: cardVariantsTopRight
    },
    {
      id: "/shop",
      name: "Hania Kurta",
      image: "/hania-kurta-set-2pc/image-14.jpg",
      className: "hero-cardBottomLeft",
      variants: cardVariantsBottomLeft
    },
    {
      id: "/shop",
      name: "Farshi Sets",
      image: "/hania-kurta-set-2pc/image-1.jpg",
      className: "hero-cardMiddleRight",
      variants: cardVariantsMiddleRight
    }
  ];

  return (
    <div className="hero-hero">
      <div className={`hero-flower hero-f1`}>❀</div>
      <div className={`hero-flower hero-f2`}>❀</div>
      <div className={`hero-flower hero-f3`}>❀</div>

      <div className="container">
        <div className="hero-grid">
          {/* Left Text Column */}
          <motion.div
            className="hero-content"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.span className="hero-welcome" variants={itemVariants}>
              Abeer Labels
            </motion.span>

            <motion.h1 className="hero-headline" variants={itemVariants}>
              For The <br />
              <span className="hero-script">Modern Desi Muse</span>
            </motion.h1>

            <motion.p className="hero-tagline" variants={itemVariants}>
              Timeless silhouettes. Handcrafted details. <br />
              Slow fashion designed to stay.
            </motion.p>

            <motion.div className="hero-ctas" variants={itemVariants}>
              <Link href="/shop?collection=basant-bahaar">
                <Button variant="primary">Shop Now</Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Media Column - Asymmetric Collage Grid */}
          <motion.div
            className="hero-media"
            initial="hidden"
            animate="visible"
            variants={collageContainerVariants}
          >
            <div className="hero-collageContainer">
              {collageItems.map((item) => (
                <motion.div
                  key={item.name}
                  className={`hero-collageCard ${item.className}`}
                  variants={item.variants}
                  whileHover={{
                    scale: 1.04,
                    y: -6,
                    z: 50,
                    boxShadow: '0 25px 50px rgba(77, 38, 24, 0.22)',
                    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
                  }}
                >
                  <Link href={`/shop?category=${item.id}`} className="hero-collageLink">
                    <div className="hero-collageImageWrapper">
                      <Image
                        src={item.image}
                        alt={`${item.name} Category`}
                        fill
                        priority
                        sizes="(max-width: 768px) 50vw, 33vw"
                        className="hero-collageImage"
                      />
                    </div>
                    <div className="hero-collageOverlay">
                      <div className="hero-collageLabelContent">
                        <span className="hero-collageCat">{item.name}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
