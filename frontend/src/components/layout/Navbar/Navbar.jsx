import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavMain from './NavMain';

const Navbar = () => {
    const [scrolledPastHero, setScrolledPastHero] = useState(false);
    const location = useLocation();
    const isHome = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            if (isHome) {
                const heroEl = document.getElementById('hero-section');
                if (heroEl) {
                    const rect = heroEl.getBoundingClientRect();
                    // Navbar height is ~110px. When the hero section's bottom passes this, the navbar has crossed the hero
                    setScrolledPastHero(rect.bottom <= 110);
                } else {
                    setScrolledPastHero(window.scrollY > 450);
                }
            } else {
                setScrolledPastHero(true);
            }
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isHome]);

    // Transparent only on the Home page when inside the hero section
    const isTransparent = isHome && !scrolledPastHero;

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-white/95 backdrop-blur-md ${
                scrolledPastHero
                    ? 'shadow-sm border-b border-stone-200'
                    : 'border-b border-stone-100'
            } text-stone-900`}
        >
            <NavMain isTransparent={false} isHome={isHome} />
        </header>
    );
};

export default Navbar;