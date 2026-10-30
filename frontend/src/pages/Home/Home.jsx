import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Hero from '../../components/sections/Home/Hero/Hero';
import TrustGuarantee from '../../components/sections/Home/TrustGuarantee/TrustGuarantee';
import EasyShoppingExplainer from '../../components/sections/Home/EasyShoppingExplainer/EasyShoppingExplainer';
import CategoryBubbles from '../../components/sections/Home/CategoryBubbles/CategoryBubbles';
import EditorialShowcase from '../../components/sections/Home/EditorialShowcase/EditorialShowcase';
import FlashDeals from '../../components/sections/Home/FlashDeals/FlashDeals';
import AdBannerCarousel from '../../components/sections/Home/AdBannerCarousel/AdBannerCarousel';
import HomeCategorySections from '../../components/sections/Home/HomeCategorySections/HomeCategorySections';
import ProductGrid from '../../components/sections/Home/ProductGrid/ProductGrid';
import CustomerReviews from '../../components/sections/Home/Reviews/CustomerReviews';
import NewsletterCTA from '../../components/sections/Home/Newsletter/NewsletterCTA';
import SplashCursor from '../../components/common/SplashCursor';

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
      className="overflow-x-hidden bg-white relative"
    >
      {/* Subtle Brand Orange WebGL Fluid Splash Cursor Effect */}
      <SplashCursor
        colors={['#f76e28', '#ff7a32', '#ea580c', '#fb923c', '#f97316']}
        rainbow={false}
        intensity={0.4}
        size={0.65}
        force={0.5}
        swirl={1.8}
        trail={0.6}
        shading={0.3}
        glow={0.08}
        clickSplash={true}
        zIndex={25}
      />

      {/* 1. Cinematic Video Hero Section */}
      {!isSearching && <Hero />}

      {/* 2. Sleek Benefit & Trust Strip (Directly beneath hero like reference) */}
      {!isSearching && <TrustGuarantee />}

      {/* 2b. Super Easy 4-Step Shopping Explainer & Roles Connect */}
      {!isSearching && <EasyShoppingExplainer />}

      {/* 3. Visual Circular Department Bubbles */}
      {!isSearching && <CategoryBubbles />}

      {/* 4. Editorial Bento Collection Showcase (Our New Collection) */}
      {!isSearching && <EditorialShowcase />}

      {/* 5. Limited-Time Flash Deals */}
      {!isSearching && <FlashDeals />}

      {/* 6. Sponsored Partner Highlights (if active) */}
      {!isSearching && <AdBannerCarousel />}

      {/* 7. Separated Category Sections with Clean 4-Column Grids */}
      {!isSearching && <HomeCategorySections />}

      {/* 8. Search Results Grid (only shown when actively searching) */}
      {isSearching && (
        <div id="catalog-section" className="w-full">
          <ProductGrid />
        </div>
      )}

      {/* 9. Verified Buyer Reviews & Social Proof */}
      {!isSearching && <CustomerReviews />}

      {/* 10. Exclusive VIP Club / Deals Newsletter */}
      {!isSearching && <NewsletterCTA />}
    </motion.div>
  );
};

export default Home;
