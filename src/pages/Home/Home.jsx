import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Hero from '../../components/sections/Home/Hero/Hero';
import CategoryBubbles from '../../components/sections/Home/CategoryBubbles/CategoryBubbles';
import FlashDeals from '../../components/sections/Home/FlashDeals/FlashDeals';
import AdBannerCarousel from '../../components/sections/Home/AdBannerCarousel/AdBannerCarousel';
import HomeCategorySections from '../../components/sections/Home/HomeCategorySections/HomeCategorySections';
import ProductGrid from '../../components/sections/Home/ProductGrid/ProductGrid';
import TrustGuarantee from '../../components/sections/Home/TrustGuarantee/TrustGuarantee';
import CustomerReviews from '../../components/sections/Home/Reviews/CustomerReviews';
import NewsletterCTA from '../../components/sections/Home/Newsletter/NewsletterCTA';

const Home = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search') || '';
  const isSearching = searchQuery.trim() !== '';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="overflow-x-hidden bg-white"
    >
      {/* 1. Cinematic Video Hero Section (Navbar transparent over it) */}
      {!isSearching && <Hero />}

      {/* 2. Visual Circular Department Bubbles */}
      {!isSearching && <CategoryBubbles />}

      {/* 3. Limited-Time Flash Deals of the Day (Countdown Timer) */}
      {!isSearching && <FlashDeals />}

      {/* 4. Sponsored Partner Highlights (if active) */}
      {!isSearching && <AdBannerCarousel />}

      {/* 5. Separated Category Sections with Visible Products */}
      {!isSearching && <HomeCategorySections />}

      {/* 6. Search Results Grid (only shown when actively searching) */}
      {isSearching && (
        <div id="catalog-section" className="w-full">
          <ProductGrid />
        </div>
      )}

      {/* 7. E-Commerce Trust & Guarantee Signals */}
      {!isSearching && <TrustGuarantee />}

      {/* 8. Verified Buyer Reviews & Social Proof */}
      {!isSearching && <CustomerReviews />}

      {/* 9. Exclusive VIP Club / Deals Newsletter */}
      {!isSearching && <NewsletterCTA />}
    </motion.div>
  );
};

export default Home;
