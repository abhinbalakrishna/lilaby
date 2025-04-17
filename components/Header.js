// components/Header.js
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Hide header when scrolling down, show when scrolling up
      if (scrollY > lastScrollY && scrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      
      setLastScrollY(scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <header className={`site-header ${visible ? 'visible' : 'hidden'}`}>
      <div className="header-container">
        <Link href="/">
          <div className="logo">
            <span className="logo-text">Map of Wonder</span>
          </div>
        </Link>
        
        <nav className={`main-nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <ul className="nav-links">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/destinations">Destinations</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </nav>
        
        <button className="mobile-menu-button" onClick={toggleMobileMenu}>
          <span className="menu-icon"></span>
        </button>
      </div>
    </header>
  );
}