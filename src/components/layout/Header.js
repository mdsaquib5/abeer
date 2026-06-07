'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoBagOutline, IoMenuOutline } from 'react-icons/io5';
import { useCartStore } from '@/store/cartStore';
import DrawerMenu from '../ui/DrawerMenu';
;

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Cart item count with hydration protection
  const cartItems = useCartStore((state) => state.items);
  const totalCount = mounted
    ? cartItems.reduce((acc, item) => acc + item.quantity, 0)
    : 0;

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Bar Banner */}
      <div className="hdr-topbar">
        <p className="hdr-topbarText">
          Slow Fashion • Sustainable Choice • Made With Care
        </p>
      </div>

      {/* Main Sticky Header */}
      <header className={`hdr-header ${isSticky ? 'hdr-sticky' : ''}`}>
        <div className="container">
          <div className="hdr-headerInner">
            <div className="hdr-headerLeft">
              <button
                className="hdr-mobileMenuBtn"
                onClick={() => setIsMenuOpen(true)}
                aria-label="Open menu"
              >
                <IoMenuOutline />
              </button>

              <nav className="hdr-desktopNav">
                <Link href="/" className={`hdr-navLink ${pathname === '/' ? 'hdr-active' : ''}`}>
                  Home
                </Link>
                <Link href="/shop" className={`hdr-navLink ${pathname === '/shop' ? 'hdr-active' : ''}`}>
                  Shop
                </Link>
              </nav>
            </div>

            {/* Center Logo */}
            <div className="hdr-headerCenter">
              <Link href="/" className="hdr-logo">
                ABEER
              </Link>
              <span className="hdr-tagline">अबीर</span>
            </div>

            {/* Right Cart Icon */}
            <div className="hdr-headerRight">
              <Link href="/cart" className="hdr-cartIcon" aria-label="Shopping Cart">
                <IoBagOutline />
                {totalCount > 0 && (
                  <span className="hdr-cartBadge">{totalCount}</span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Slide-out Mobile Navigation Drawer */}
      <DrawerMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
