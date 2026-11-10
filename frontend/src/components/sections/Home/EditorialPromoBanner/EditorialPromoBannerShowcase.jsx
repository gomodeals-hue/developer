import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DualSplitPromoBanner from './DualSplitPromoBanner';
import GeometricSaleBanner from './GeometricSaleBanner';
import { Layers, Sparkles } from 'lucide-react';

export default function EditorialPromoBannerShowcase({ showMode = 'both' }) {
  const [activeStyle, setActiveStyle] = useState('split'); // 'split' | 'geometric'

  if (showMode === 'split') {
    return <DualSplitPromoBanner />;
  }

  if (showMode === 'geometric') {
    return <GeometricSaleBanner />;
  }

  // If showMode === 'both', render both banners sequentially in their optimal homepage slots!
  return (
    <>
      <DualSplitPromoBanner />
      <GeometricSaleBanner />
    </>
  );
}

export { DualSplitPromoBanner, GeometricSaleBanner };
