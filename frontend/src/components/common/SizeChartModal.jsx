import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Ruler, Info } from 'lucide-react';

// Exact topwear sizing data matching user's reference specification
export const TOPWEAR_SIZE_DATA = [
  { brandSize: 'S', inSize: 'S', chest: 40.8, shoulder: 17.2, length: 29.6 },
  { brandSize: 'M', inSize: 'M', chest: 42.8, shoulder: 18.0, length: 30.0 },
  { brandSize: 'L', inSize: 'L', chest: 44.8, shoulder: 18.8, length: 30.4 },
  { brandSize: 'XL', inSize: 'XL', chest: 47.2, shoulder: 19.5, length: 31.1 },
  { brandSize: '2XL', inSize: '2XL', chest: 49.8, shoulder: 20.2, length: 31.4 },
];

export const BOTTOMWEAR_SIZE_DATA = [
  { brandSize: 'S', inSize: '30', waist: 30.0, length: 39.5, inseam: 30.0, hip: 38.0 },
  { brandSize: 'M', inSize: '32', waist: 32.0, length: 40.0, inseam: 30.5, hip: 40.0 },
  { brandSize: 'L', inSize: '34', waist: 34.0, length: 40.5, inseam: 31.0, hip: 42.0 },
  { brandSize: 'XL', inSize: '36', waist: 36.0, length: 41.0, inseam: 31.5, hip: 44.0 },
  { brandSize: '2XL', inSize: '38', waist: 38.0, length: 41.5, inseam: 32.0, hip: 46.0 },
];

export const KIDS_TOPWEAR_SIZE_DATA = [
  { brandSize: '3-4Y', inSize: '24', chest: 23.5, shoulder: 10.5, length: 17.0, height: '98-104 cm' },
  { brandSize: '5-6Y', inSize: '26', chest: 25.0, shoulder: 11.2, length: 18.5, height: '110-116 cm' },
  { brandSize: '7-8Y', inSize: '28', chest: 26.5, shoulder: 12.0, length: 20.0, height: '122-128 cm' },
  { brandSize: '9-10Y', inSize: '30', chest: 28.5, shoulder: 12.8, length: 21.5, height: '134-140 cm' },
  { brandSize: '11-12Y', inSize: '32', chest: 30.5, shoulder: 13.5, length: 23.0, height: '146-152 cm' },
  { brandSize: '13-14Y', inSize: '34', chest: 32.5, shoulder: 14.2, length: 24.5, height: '158-164 cm' },
];

export const KIDS_BOTTOMWEAR_SIZE_DATA = [
  { brandSize: '3-4Y', inSize: '20', waist: 21.5, length: 22.0, inseam: 14.5, hip: 24.0 },
  { brandSize: '5-6Y', inSize: '22', waist: 22.5, length: 25.0, inseam: 17.0, hip: 25.5 },
  { brandSize: '7-8Y', inSize: '24', waist: 24.0, length: 28.0, inseam: 20.0, hip: 27.5 },
  { brandSize: '9-10Y', inSize: '26', waist: 25.5, length: 31.0, inseam: 23.0, hip: 29.5 },
  { brandSize: '11-12Y', inSize: '28', waist: 27.0, length: 34.0, inseam: 25.5, hip: 31.5 },
  { brandSize: '13-14Y', inSize: '30', waist: 28.5, length: 36.5, inseam: 27.5, hip: 33.5 },
];

export const KIDS_FOOTWEAR_SIZE_DATA = [
  { brandSize: 'UK 8', inSize: '8', eu: '25', footInches: 5.9, footCm: 15.0, age: '3-4 Y' },
  { brandSize: 'UK 9', inSize: '9', eu: '27', footInches: 6.3, footCm: 16.0, age: '4-5 Y' },
  { brandSize: 'UK 10', inSize: '10', eu: '28', footInches: 6.7, footCm: 17.0, age: '5-6 Y' },
  { brandSize: 'UK 11', inSize: '11', eu: '29', footInches: 7.1, footCm: 18.0, age: '6-7 Y' },
  { brandSize: 'UK 12', inSize: '12', eu: '31', footInches: 7.5, footCm: 19.0, age: '7-8 Y' },
  { brandSize: 'UK 13', inSize: '13', eu: '32', footInches: 7.9, footCm: 20.0, age: '8-9 Y' },
  { brandSize: 'UK 1', inSize: '1', eu: '33', footInches: 8.3, footCm: 21.0, age: '9-10 Y' },
  { brandSize: 'UK 2', inSize: '2', eu: '34', footInches: 8.7, footCm: 22.0, age: '10-11 Y' },
];

export const BABY_SIZE_DATA = [
  { brandSize: '0-3M', inSize: '0-3M', chest: 16.0, length: 14.0, height: '56-62 cm', weight: '3.5-5.5 kg' },
  { brandSize: '3-6M', inSize: '3-6M', chest: 17.5, length: 15.5, height: '62-68 cm', weight: '5.5-7.5 kg' },
  { brandSize: '6-9M', inSize: '6-9M', chest: 18.5, length: 17.0, height: '68-74 cm', weight: '7.5-9.0 kg' },
  { brandSize: '9-12M', inSize: '9-12M', chest: 19.5, length: 18.5, height: '74-80 cm', weight: '9.0-10.5 kg' },
  { brandSize: '12-18M', inSize: '12-18M', chest: 20.5, length: 20.0, height: '80-86 cm', weight: '10.5-12.0 kg' },
  { brandSize: '18-24M', inSize: '18-24M', chest: 21.5, length: 21.5, height: '86-92 cm', weight: '12.0-13.5 kg' },
];

export const FOOTWEAR_SIZE_DATA = [
  { brandSize: 'UK 6', inSize: '6', us: '7', eu: '40', footInches: 9.8, footCm: 25.0 },
  { brandSize: 'UK 7', inSize: '7', us: '8', eu: '41', footInches: 10.2, footCm: 26.0 },
  { brandSize: 'UK 8', inSize: '8', us: '9', eu: '42', footInches: 10.6, footCm: 26.7 },
  { brandSize: 'UK 9', inSize: '9', us: '10', eu: '43', footInches: 11.0, footCm: 27.5 },
  { brandSize: 'UK 10', inSize: '10', us: '11', eu: '44', footInches: 11.4, footCm: 28.5 },
  { brandSize: 'UK 11', inSize: '11', us: '12', eu: '45', footInches: 11.8, footCm: 29.5 },
];

const SizeChartModal = ({ 
  isOpen, 
  onClose, 
  selectedSize, 
  onSelectSize, 
  chartType = 'topwear' // 'topwear' | 'bottomwear' | 'footwear' | 'kids-topwear' | 'kids-bottomwear' | 'kids-footwear' | 'baby'
}) => {
  const [unit, setUnit] = useState('in'); // 'in' or 'cm'

  if (!isOpen) return null;

  const toDisplayValue = (valInches) => {
    if (unit === 'in') return valInches.toFixed(1).replace(/\.0$/, '');
    return (valInches * 2.54).toFixed(1);
  };

  const isBaby = chartType === 'baby';
  const isKidsShoes = chartType === 'kids-footwear';
  const isKidsTop = chartType === 'kids-topwear';
  const isKidsBottom = chartType === 'kids-bottomwear';
  const isBottom = chartType === 'bottomwear';
  const isShoes = chartType === 'footwear' || isKidsShoes;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0"
        />

        {/* Modal Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh] z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200/80 bg-stone-50/70">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
                <Ruler size={18} />
              </div>
              <div>
                <h3 className="text-base font-bold text-stone-900 leading-tight">Size Chart &amp; Fit Guide</h3>
                <p className="text-xs text-stone-500 font-medium">Standard India Sizing Guarantee</p>
              </div>
            </div>

            <button
              onClick={onClose}
              type="button"
              className="w-8 h-8 rounded-full bg-white hover:bg-stone-100 text-stone-500 hover:text-stone-800 border border-stone-200 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 overflow-y-auto space-y-5 custom-scrollbar">
            
            {/* Top Toolbar: Heading & Unit Toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-sm sm:text-base font-black text-stone-900 tracking-tight block">
                  {isKidsShoes
                    ? 'Kids Footwear Sizing (Age 3 to 11 Years)'
                    : isShoes 
                    ? 'Footwear Sizing' 
                    : isBaby
                    ? 'Infant & Baby Sizing Guide (0 to 24 Months)'
                    : isKidsTop 
                    ? 'IN Regular (Kids Tops & T-Shirts - Age 3 to 14 Years)' 
                    : isKidsBottom 
                    ? 'IN Regular (Kids Jeans & Shorts - Age 3 to 14 Years)' 
                    : isBottom 
                    ? 'IN Regular (Bottomwear)' 
                    : 'IN Regular'}
                </span>
                <span className="text-xs text-stone-500">
                  Select your size to directly apply to the product
                </span>
              </div>

              {/* Unit Switcher */}
              {!isShoes && (
                <div className="inline-flex items-center p-0.5 bg-stone-100 rounded-lg border border-stone-200 shrink-0 self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setUnit('in')}
                    className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                      unit === 'in' 
                        ? 'bg-white text-stone-900 shadow-2xs' 
                        : 'text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    Inches (in)
                  </button>
                  <button
                    type="button"
                    onClick={() => setUnit('cm')}
                    className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                      unit === 'cm' 
                        ? 'bg-white text-stone-900 shadow-2xs' 
                        : 'text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    CM (cm)
                  </button>
                </div>
              )}
            </div>

            {/* Exact Size Chart Table */}
            <div className="border border-stone-200 rounded-xl overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-stone-200 bg-stone-50/80">
                      {isKidsShoes ? (
                        <>
                          <th className="py-3 px-4 font-bold text-stone-900">Brand Size</th>
                          <th className="py-3 px-4 font-bold text-stone-900">IN Size</th>
                          <th className="py-3 px-4 font-bold text-stone-900">EU</th>
                          <th className="py-3 px-4 font-bold text-stone-900">Foot Length (in)</th>
                          <th className="py-3 px-4 font-bold text-stone-900">Foot Length (cm)</th>
                          <th className="py-3 px-4 font-bold text-stone-900">Approx. Age</th>
                        </>
                      ) : isShoes ? (
                        <>
                          <th className="py-3 px-4 font-bold text-stone-900">Brand Size</th>
                          <th className="py-3 px-4 font-bold text-stone-900">IN Size</th>
                          <th className="py-3 px-4 font-bold text-stone-900">US</th>
                          <th className="py-3 px-4 font-bold text-stone-900">EU</th>
                          <th className="py-3 px-4 font-bold text-stone-900">Foot Length (in)</th>
                          <th className="py-3 px-4 font-bold text-stone-900">Foot Length (cm)</th>
                        </>
                      ) : isBaby ? (
                        <>
                          <th className="py-3 px-4 font-bold text-stone-900">Baby Age</th>
                          <th className="py-3 px-4 font-bold text-stone-900">Size Code</th>
                          <th className="py-3 px-4 font-bold text-stone-900">Chest ({unit})</th>
                          <th className="py-3 px-4 font-bold text-stone-900">Body Length ({unit})</th>
                          <th className="py-3 px-4 font-bold text-stone-900">Baby Height</th>
                          <th className="py-3 px-4 font-bold text-stone-900">Baby Weight</th>
                        </>
                      ) : isKidsTop ? (
                        <>
                          <th className="py-3 px-4 font-bold text-stone-900">Age / Size</th>
                          <th className="py-3 px-4 font-bold text-stone-900">IN Size</th>
                          <th className="py-3 px-4 font-bold text-stone-900">Chest ({unit})</th>
                          <th className="py-3 px-4 font-bold text-stone-900">Shoulder ({unit})</th>
                          <th className="py-3 px-4 font-bold text-stone-900">Front Length ({unit})</th>
                          <th className="py-3 px-4 font-bold text-stone-900">Child Height</th>
                        </>
                      ) : isKidsBottom ? (
                        <>
                          <th className="py-3 px-4 font-bold text-stone-900">Age / Size</th>
                          <th className="py-3 px-4 font-bold text-stone-900">IN Size</th>
                          <th className="py-3 px-4 font-bold text-stone-900">Waist ({unit})</th>
                          <th className="py-3 px-4 font-bold text-stone-900">Length ({unit})</th>
                          <th className="py-3 px-4 font-bold text-stone-900">Inseam ({unit})</th>
                          <th className="py-3 px-4 font-bold text-stone-900">Hip ({unit})</th>
                        </>
                      ) : isBottom ? (
                        <>
                          <th className="py-3 px-4 font-bold text-stone-900">Brand Size</th>
                          <th className="py-3 px-4 font-bold text-stone-900">IN Size</th>
                          <th className="py-3 px-4 font-bold text-stone-900">Waist ({unit})</th>
                          <th className="py-3 px-4 font-bold text-stone-900">Length ({unit})</th>
                          <th className="py-3 px-4 font-bold text-stone-900">Inseam ({unit})</th>
                          <th className="py-3 px-4 font-bold text-stone-900">Hip ({unit})</th>
                        </>
                      ) : (
                        <>
                          <th className="py-3 px-4 font-bold text-stone-900">Brand Size</th>
                          <th className="py-3 px-4 font-bold text-stone-900">IN Size</th>
                          <th className="py-3 px-4 font-bold text-stone-900">Chest ({unit})</th>
                          <th className="py-3 px-4 font-bold text-stone-900">Shoulder ({unit})</th>
                          <th className="py-3 px-4 font-bold text-stone-900">Centre back length ({unit})</th>
                        </>
                      )}
                      <th className="py-3 px-3 text-right font-bold text-stone-400">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {isKidsShoes ? (
                      KIDS_FOOTWEAR_SIZE_DATA.map((row) => {
                        const isCurrent = selectedSize === row.brandSize;
                        return (
                          <tr 
                            key={row.brandSize}
                            onClick={() => {
                              onSelectSize?.(row.brandSize);
                              onClose();
                            }}
                            className={`transition-colors cursor-pointer group ${
                              isCurrent ? 'bg-orange-50/80 font-bold' : 'hover:bg-stone-50'
                            }`}
                          >
                            <td className="py-3.5 px-4 font-black text-stone-900">{row.brandSize}</td>
                            <td className="py-3.5 px-4 text-stone-700">{row.inSize}</td>
                            <td className="py-3.5 px-4 text-stone-700">{row.eu}</td>
                            <td className="py-3.5 px-4 text-stone-700">{row.footInches}</td>
                            <td className="py-3.5 px-4 text-stone-700">{row.footCm}</td>
                            <td className="py-3.5 px-4 text-stone-700">{row.age}</td>
                            <td className="py-3.5 px-3 text-right">
                              {isCurrent ? (
                                <span className="inline-flex items-center gap-1 text-orange-600 font-bold text-xs">
                                  <Check size={13} strokeWidth={3} /> Selected
                                </span>
                              ) : (
                                <span className="text-xs text-stone-400 group-hover:text-orange-600 font-medium">
                                  Select
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    ) : isShoes ? (
                      FOOTWEAR_SIZE_DATA.map((row) => {
                        const isCurrent = selectedSize === row.brandSize;
                        return (
                          <tr 
                            key={row.brandSize}
                            onClick={() => {
                              onSelectSize?.(row.brandSize);
                              onClose();
                            }}
                            className={`transition-colors cursor-pointer group ${
                              isCurrent ? 'bg-orange-50/80 font-bold' : 'hover:bg-stone-50'
                            }`}
                          >
                            <td className="py-3.5 px-4 font-black text-stone-900">{row.brandSize}</td>
                            <td className="py-3.5 px-4 text-stone-700">{row.inSize}</td>
                            <td className="py-3.5 px-4 text-stone-700">{row.us}</td>
                            <td className="py-3.5 px-4 text-stone-700">{row.eu}</td>
                            <td className="py-3.5 px-4 text-stone-700">{row.footInches}</td>
                            <td className="py-3.5 px-4 text-stone-700">{row.footCm}</td>
                            <td className="py-3.5 px-3 text-right">
                              {isCurrent ? (
                                <span className="inline-flex items-center gap-1 text-orange-600 font-bold text-xs">
                                  <Check size={13} strokeWidth={3} /> Selected
                                </span>
                              ) : (
                                <span className="text-xs text-stone-400 group-hover:text-orange-600 font-medium">
                                  Select
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    ) : isBaby ? (
                      BABY_SIZE_DATA.map((row) => {
                        const isCurrent = selectedSize === row.brandSize;
                        return (
                          <tr 
                            key={row.brandSize}
                            onClick={() => {
                              onSelectSize?.(row.brandSize);
                              onClose();
                            }}
                            className={`transition-colors cursor-pointer group ${
                              isCurrent ? 'bg-orange-50/80 font-bold' : 'hover:bg-stone-50'
                            }`}
                          >
                            <td className="py-3.5 px-4 font-black text-stone-900">{row.brandSize}</td>
                            <td className="py-3.5 px-4 text-stone-700">{row.inSize}</td>
                            <td className="py-3.5 px-4 text-stone-700">{toDisplayValue(row.chest)}</td>
                            <td className="py-3.5 px-4 text-stone-700">{toDisplayValue(row.length)}</td>
                            <td className="py-3.5 px-4 text-stone-700">{row.height}</td>
                            <td className="py-3.5 px-4 text-stone-700">{row.weight}</td>
                            <td className="py-3.5 px-3 text-right">
                              {isCurrent ? (
                                <span className="inline-flex items-center gap-1 text-orange-600 font-bold text-xs">
                                  <Check size={13} strokeWidth={3} /> Selected
                                </span>
                              ) : (
                                <span className="text-xs text-stone-400 group-hover:text-orange-600 font-medium">
                                  Select
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    ) : isKidsTop ? (
                      KIDS_TOPWEAR_SIZE_DATA.map((row) => {
                        const isCurrent = selectedSize === row.brandSize;
                        return (
                          <tr 
                            key={row.brandSize}
                            onClick={() => {
                              onSelectSize?.(row.brandSize);
                              onClose();
                            }}
                            className={`transition-colors cursor-pointer group ${
                              isCurrent ? 'bg-orange-50/80 font-bold' : 'hover:bg-stone-50'
                            }`}
                          >
                            <td className="py-3.5 px-4 font-black text-stone-900">{row.brandSize}</td>
                            <td className="py-3.5 px-4 text-stone-700">{row.inSize}</td>
                            <td className="py-3.5 px-4 text-stone-700">{toDisplayValue(row.chest)}</td>
                            <td className="py-3.5 px-4 text-stone-700">{toDisplayValue(row.shoulder)}</td>
                            <td className="py-3.5 px-4 text-stone-700">{toDisplayValue(row.length)}</td>
                            <td className="py-3.5 px-4 text-stone-700">{row.height}</td>
                            <td className="py-3.5 px-3 text-right">
                              {isCurrent ? (
                                <span className="inline-flex items-center gap-1 text-orange-600 font-bold text-xs">
                                  <Check size={13} strokeWidth={3} /> Selected
                                </span>
                              ) : (
                                <span className="text-xs text-stone-400 group-hover:text-orange-600 font-medium">
                                  Select
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    ) : isKidsBottom ? (
                      KIDS_BOTTOMWEAR_SIZE_DATA.map((row) => {
                        const isCurrent = selectedSize === row.brandSize;
                        return (
                          <tr 
                            key={row.brandSize}
                            onClick={() => {
                              onSelectSize?.(row.brandSize);
                              onClose();
                            }}
                            className={`transition-colors cursor-pointer group ${
                              isCurrent ? 'bg-orange-50/80 font-bold' : 'hover:bg-stone-50'
                            }`}
                          >
                            <td className="py-3.5 px-4 font-black text-stone-900">{row.brandSize}</td>
                            <td className="py-3.5 px-4 text-stone-700">{row.inSize}</td>
                            <td className="py-3.5 px-4 text-stone-700">{toDisplayValue(row.waist)}</td>
                            <td className="py-3.5 px-4 text-stone-700">{toDisplayValue(row.length)}</td>
                            <td className="py-3.5 px-4 text-stone-700">{toDisplayValue(row.inseam)}</td>
                            <td className="py-3.5 px-4 text-stone-700">{toDisplayValue(row.hip)}</td>
                            <td className="py-3.5 px-3 text-right">
                              {isCurrent ? (
                                <span className="inline-flex items-center gap-1 text-orange-600 font-bold text-xs">
                                  <Check size={13} strokeWidth={3} /> Selected
                                </span>
                              ) : (
                                <span className="text-xs text-stone-400 group-hover:text-orange-600 font-medium">
                                  Select
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    ) : isBottom ? (
                      BOTTOMWEAR_SIZE_DATA.map((row) => {
                        const isCurrent = selectedSize === row.brandSize;
                        return (
                          <tr 
                            key={row.brandSize}
                            onClick={() => {
                              onSelectSize?.(row.brandSize);
                              onClose();
                            }}
                            className={`transition-colors cursor-pointer group ${
                              isCurrent ? 'bg-orange-50/80 font-bold' : 'hover:bg-stone-50'
                            }`}
                          >
                            <td className="py-3.5 px-4 font-black text-stone-900">{row.brandSize}</td>
                            <td className="py-3.5 px-4 text-stone-700">{row.inSize}</td>
                            <td className="py-3.5 px-4 text-stone-700">{toDisplayValue(row.waist)}</td>
                            <td className="py-3.5 px-4 text-stone-700">{toDisplayValue(row.length)}</td>
                            <td className="py-3.5 px-4 text-stone-700">{toDisplayValue(row.inseam)}</td>
                            <td className="py-3.5 px-4 text-stone-700">{toDisplayValue(row.hip)}</td>
                            <td className="py-3.5 px-3 text-right">
                              {isCurrent ? (
                                <span className="inline-flex items-center gap-1 text-orange-600 font-bold text-xs">
                                  <Check size={13} strokeWidth={3} /> Selected
                                </span>
                              ) : (
                                <span className="text-xs text-stone-400 group-hover:text-orange-600 font-medium">
                                  Select
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      TOPWEAR_SIZE_DATA.map((row) => {
                        const isCurrent = selectedSize === row.brandSize;
                        return (
                          <tr 
                            key={row.brandSize}
                            onClick={() => {
                              onSelectSize?.(row.brandSize);
                              onClose();
                            }}
                            className={`transition-colors cursor-pointer group ${
                              isCurrent ? 'bg-orange-50/80 font-bold' : 'hover:bg-stone-50'
                            }`}
                          >
                            <td className="py-3.5 px-4 font-black text-stone-900">{row.brandSize}</td>
                            <td className="py-3.5 px-4 text-stone-700">{row.inSize}</td>
                            <td className="py-3.5 px-4 text-stone-700">{toDisplayValue(row.chest)}</td>
                            <td className="py-3.5 px-4 text-stone-700">{toDisplayValue(row.shoulder)}</td>
                            <td className="py-3.5 px-4 text-stone-700">{toDisplayValue(row.length)}</td>
                            <td className="py-3.5 px-3 text-right">
                              {isCurrent ? (
                                <span className="inline-flex items-center gap-1 text-orange-600 font-bold text-xs">
                                  <Check size={13} strokeWidth={3} /> Selected
                                </span>
                              ) : (
                                <span className="text-xs text-stone-400 group-hover:text-orange-600 font-medium">
                                  Select
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* How to Measure Helpful Guide */}
            <div className="bg-stone-50 border border-stone-200/80 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
                <Info size={14} className="text-orange-600" />
                <span>How to Measure Your Fit</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-stone-600">
                {!isBottom && !isShoes ? (
                  <>
                    <div className="bg-white p-2.5 rounded-lg border border-stone-200/70">
                      <strong className="text-stone-900 block mb-0.5">1. Chest:</strong>
                      Measure horizontally around the fullest part of your chest, under the arms.
                    </div>
                    <div className="bg-white p-2.5 rounded-lg border border-stone-200/70">
                      <strong className="text-stone-900 block mb-0.5">2. Shoulder:</strong>
                      Measure across your back from one shoulder point straight to the other.
                    </div>
                    <div className="bg-white p-2.5 rounded-lg border border-stone-200/70">
                      <strong className="text-stone-900 block mb-0.5">3. Centre Back:</strong>
                      Measure from the base of the back collar directly down to the bottom hemline.
                    </div>
                  </>
                ) : isBottom ? (
                  <>
                    <div className="bg-white p-2.5 rounded-lg border border-stone-200/70">
                      <strong className="text-stone-900 block mb-0.5">1. Waist:</strong>
                      Measure around your natural waistline where your waistband typically sits.
                    </div>
                    <div className="bg-white p-2.5 rounded-lg border border-stone-200/70">
                      <strong className="text-stone-900 block mb-0.5">2. Inseam:</strong>
                      Measure along the inside of your leg from the crotch down to the ankle.
                    </div>
                    <div className="bg-white p-2.5 rounded-lg border border-stone-200/70">
                      <strong className="text-stone-900 block mb-0.5">3. Length:</strong>
                      Measure along the outside seam from the top of the waistband down to the cuff.
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-white p-2.5 rounded-lg border border-stone-200/70">
                      <strong className="text-stone-900 block mb-0.5">1. Heel to Toe:</strong>
                      Place heel against wall and measure straight to the tip of your longest toe.
                    </div>
                    <div className="bg-white p-2.5 rounded-lg border border-stone-200/70">
                      <strong className="text-stone-900 block mb-0.5">2. Standard Sizing:</strong>
                      Our shoes adhere strictly to Indian / UK footwear standards.
                    </div>
                    <div className="bg-white p-2.5 rounded-lg border border-stone-200/70">
                      <strong className="text-stone-900 block mb-0.5">3. In Between Sizes:</strong>
                      If you fall between two sizes, we recommend ordering one size larger.
                    </div>
                  </>
                )}
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="px-6 py-3.5 border-t border-stone-200/80 bg-stone-50 flex items-center justify-between">
            <span className="text-xs text-stone-500 font-medium">
              Free 15-day exchanges on all size-related fits
            </span>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SizeChartModal;
