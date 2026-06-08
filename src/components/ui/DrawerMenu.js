'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose, IoLogoInstagram, IoLogoWhatsapp, IoMailOutline } from 'react-icons/io5';
import Link from 'next/link';
;

export default function DrawerMenu({ isOpen, onClose }) {
  const menuVariants = {
    closed: { x: '100%', transition: { type: 'tween', duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
    open: { x: 0, transition: { type: 'tween', duration: 0.45, ease: [0.16, 1, 0.3, 1] } }
  };

  const backdropVariants = {
    closed: { opacity: 0 },
    open: { opacity: 0.5 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            className="drm-backdrop"
            initial="closed"
            animate="open"
            exit="closed"
            variants={backdropVariants}
            onClick={onClose}
          />

          {/* Drawer content panel */}
          <motion.div
            className="drm-drawer"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <div className="drm-header">
              <div className="drm-logoWrapper">
                <Link href="/" className="drm-logo" onClick={onClose}>
                  ABEER
                </Link>
                <span className="drm-tagline">अबीर</span>
              </div>
              <button className="drm-closeBtn" onClick={onClose} aria-label="Close menu">
                <IoClose />
              </button>
            </div>

            <nav className="drm-nav">
              <Link href="/" className="drm-navLink" onClick={onClose}>
                Home
              </Link>
              <Link href="/shop" className="drm-navLink" onClick={onClose}>
                Shop All
              </Link>
              <Link href="/shop?collection=basant-bahaar" className="drm-navLink" onClick={onClose}>
                Basant Bahaar
              </Link>
              <Link href="/return-policy" className="drm-navLink" onClick={onClose}>
                Returns & Exchanges
              </Link>
              <Link href="/payment-policy" className="drm-navLink" onClick={onClose}>
                Payment & Cancellation
              </Link>
              <Link href="/privacy-policy" className="drm-navLink" onClick={onClose}>
                Privacy Policy
              </Link>
            </nav>

            <div className="drm-footer">
              <p className="drm-tagline">Wear Your Soul</p>
              <div className="drm-socials">
                <a href="https://wa.me/918076006802" target="_blank" rel="noopener noreferrer" className="drm-socialIcon" aria-label="WhatsApp">
                  <IoLogoWhatsapp />
                </a>
                <a href="https://www.instagram.com/abeer.label/" target="_blank" rel="noopener noreferrer" className="drm-socialIcon" aria-label="Instagram">
                  <IoLogoInstagram />
                </a>
                <a href="mailto:write@abeerlabel.com" target="_blank" rel="noopener noreferrer" className="drm-socialIcon" aria-label="Email">
                  <IoMailOutline />
                </a>
              </div>
              <p className="drm-copyright">&copy; {new Date().getFullYear()} Abeer.label</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
