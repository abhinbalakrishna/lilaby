// components/Footer.js
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [visible, setVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollThreshold = 300; // Show footer after scrolling this much
      
      // Only show footer when scrolled down enough
      if (scrollY > scrollThreshold) {
        setVisible(true);
      } else {
        setVisible(false);
      }
      
      setLastScrollY(scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);
  
  return (
    <footer className={`site-footer ${visible ? 'visible' : 'hidden'}`}>
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">Map of Wonder</h3>
          <p className="footer-description">
            Discover extraordinary places around the world with our interactive travel guide.
          </p>
        </div>
        
        <div className="footer-section">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/destinations">Destinations</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3 className="footer-title">Get in Touch</h3>
          <ul className="footer-contact">
            <li>Email: info@mapofwonder.com</li>
            <li>Phone: +1 (123) 456-7890</li>
            <li>Address: 123 Travel St, Explorer City</li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3 className="footer-title">Connect</h3>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">FB</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">TW</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">IG</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p className="copyright">
          &copy; {currentYear} Map of Wonder. All rights reserved.
        </p>
        <div className="legal-links">
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Use</Link>
          <Link href="/license">License Information</Link>
        </div>
      </div>
    </footer>
  );
}