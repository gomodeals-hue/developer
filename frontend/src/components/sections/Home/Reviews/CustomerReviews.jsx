import React from 'react';
import { Star, CheckCircle2, Quote } from 'lucide-react';

const REVIEWS = [
  {
    name: 'Priya Sundaram',
    location: 'Chennai, TN',
    rating: 5,
    title: 'Exquisite Brass Vilakku Quality',
    review: 'Ordered the traditional Kamakshi Amman vilakku for Navratri. The brass finish is flawless and weighty. Delivery took just 2 days. Highly recommended!',
    verified: true,
    purchase: 'Brass Pooja Essentials'
  },
  {
    name: 'Rahul Mehta',
    location: 'Mumbai, MH',
    rating: 5,
    title: 'Authentic Handloom & Fast Shipping',
    review: 'The fabric quality of the men linen shirt and kurta set exceeded expectations. Packaging was luxurious and sizing was completely accurate.',
    verified: true,
    purchase: 'Pure Linen Ethnic Kurta'
  },
  {
    name: 'Ananya Sharma',
    location: 'Bengaluru, KA',
    rating: 5,
    title: 'Great Deals & Seamless Return Policy',
    review: 'Bought noise cancelling headphones during the flash sale with over 35% discount. Prompt customer support and guaranteed genuine product.',
    verified: true,
    purchase: 'Wireless ANC Headphones'
  }
];

export default function CustomerReviews() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center max-w-xl mx-auto mb-8">
        <span className="text-[11px] font-extrabold uppercase tracking-widest text-orange-600 block mb-1">
          Customer Stories
        </span>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-stone-900 tracking-tight">
          Verified Buyer Experiences
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {REVIEWS.map((rev, idx) => (
          <div 
            key={idx}
            className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Star Rating */}
              <div className="flex items-center gap-1 mb-3">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} size={15} className="fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Review Headline & Body */}
              <h3 className="text-sm font-bold text-stone-900 mb-2">
                "{rev.title}"
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed mb-4">
                {rev.review}
              </p>
            </div>

            {/* Author Footer */}
            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-stone-900">{rev.name}</p>
                <p className="text-[10px] text-stone-400">{rev.location}</p>
              </div>
              <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200/60">
                <CheckCircle2 size={12} className="text-emerald-600" />
                <span>Verified Buyer</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
