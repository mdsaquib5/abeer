import React from 'react';
import Link from 'next/link';
import { IoLogoInstagram, IoLogoWhatsapp, IoMailOutline } from 'react-icons/io5';
;

export default function Footer() {
  return (
    <footer className="ftr-footer">
      <div className="container">
        <div className="ftr-footerGrid">
          <div className="ftr-brandCol">
            <div className='footer-logo'>
              <Link href="/" className="ftr-logo">
                ABEER
              </Link>
              <span className="ftr-tagline">अबीर</span>
            </div>
            <p className="ftr-cursiveTagline">Desi Maximalism</p>
            <p className="ftr-description">
              Abeer is a reflection of slow fashion, quiet luxury, and timeless design.
              We create consciously made pieces that remain relevant long after trends fade,
              crafted for the modern desi muse.
            </p>
          </div>
          <div className="ftr-linksCol">
            <h3 className="ftr-colTitle">Quick Links</h3>
            <ul className="ftr-linksList">
              <li><Link href="/" className="ftr-link">Home</Link></li>
              <li><Link href="/shop" className="ftr-link">Shop All</Link></li>
              <li><Link href="/shop?collection=basant-bahaar" className="ftr-link">Basant Bahaar</Link></li>
              <li><Link href="/#about-section" className="ftr-link">Our Story</Link></li>
            </ul>
          </div>
          <div className="ftr-linksCol">
            <h3 className="ftr-colTitle">Policies</h3>
            <ul className="ftr-linksList">
              <li><Link href="/payment-policy" className="ftr-link">Payment & Cancellation</Link></li>
              <li><Link href="/return-policy" className="ftr-link">Return & Exchange Policy</Link></li>
              <li><Link href="/privacy-policy" className="ftr-link">Privacy Policy</Link></li>
            </ul>
          </div>

          <div className="ftr-contactCol">
            <h3 className="ftr-colTitle">Customer Care</h3>
            <ul className="ftr-contactList">
              <li>
                <span className="ftr-contactLabel">WhatsApp:</span>
                <a href="https://wa.me/918076006802" target="_blank" rel="noopener noreferrer" className="ftr-contactValue">
                  +91 8076006802
                </a>
              </li>
              <li>
                <span className="ftr-contactLabel">Instagram:</span>
                <a href="https://www.instagram.com/abeer.label/" target="_blank" rel="noopener noreferrer" className="ftr-contactValue">
                  @abeer.label
                </a>
              </li>
              <li>
                <span className="ftr-contactLabel">Email:</span>
                <a href="mailto:write@abeerlabel.com" target="_blank" rel="noopener noreferrer" className="ftr-contactValue">
                  write@abeerlabel.com
                </a>
              </li>
            </ul>
            <div className="ftr-socials">
              <a href="https://wa.me/918076006802" target="_blank" rel="noopener noreferrer" className="ftr-socialLink" aria-label="WhatsApp">
                <IoLogoWhatsapp />
              </a>
              <a href="https://www.instagram.com/abeer.label/" target="_blank" rel="noopener noreferrer" className="ftr-socialLink" aria-label="Instagram">
                <IoLogoInstagram />
              </a>
              <a href="mailto:write@abeerlabel.com" target="_blank" rel="noopener noreferrer" className="ftr-socialLink" aria-label="Email">
                <IoMailOutline />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="ftr-bottomBar">
          <p className="ftr-copyright">
            &copy; {new Date().getFullYear()} ABEER. All Rights Reserved.
          </p>
          <p className="ftr-developer">
            Developed by <a href="https://noohark.com" target="_blank" rel="noopener noreferrer" className="ftr-developerLink">NoohArk.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
