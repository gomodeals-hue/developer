import React from 'react';
import { Star, CheckCircle2, Quote, Sparkles } from 'lucide-react';
import { useShop } from '../../../../context/ShopContext';
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@/components/tailgrids/core/avatar';
import AvatarGroupWithCountPreview from './AvatarGroupWithCountPreview';
import { customerReviewsData, teamMembersGroup } from './data';

export default function CustomerReviews() {
  const { t } = useShop();

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Unified Section Header with Social Proof Avatar Group */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-stone-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 border border-orange-200/80 text-[#f76e28] text-[11px] font-bold uppercase tracking-wider mb-2">
            <Sparkles size={12} />
            <span>{t("customer_stories", "Customer Stories")}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-stone-900 tracking-tight">
            {t("verified_buyer_experiences", "Verified Buyer Experiences")}
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-xl">
            Authentic feedback and reviews shared by our verified shoppers across India.
          </p>
        </div>

        {/* Social Proof Stats with Avatar Group Preview */}
        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-stone-200 shadow-2xs flex items-center gap-4 shrink-0">
          <AvatarGroupWithCountPreview members={teamMembersGroup} count="12k+" size="sm" />
          <div className="border-l border-stone-200 pl-4">
            <div className="flex items-center gap-1 mb-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
              ))}
              <span className="text-xs font-black text-stone-900 ml-1">4.9 / 5</span>
            </div>
            <p className="text-[11px] text-stone-500 font-medium">
              From 12,000+ verified buyers
            </p>
          </div>
        </div>
      </div>

      {/* Reviews Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {customerReviewsData.map((rev) => (
          <div 
            key={rev.id}
            className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-2xs hover:shadow-md hover:border-orange-200 transition-all duration-200 flex flex-col justify-between h-full group"
          >
            <div>
              {/* Reviewer Header: Avatar + Details */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <Avatar size="md" className="border-2 border-orange-100 group-hover:border-orange-300 transition-colors">
                    <AvatarImage src={rev.avatar} alt={rev.name} />
                    <AvatarFallback>
                      {rev.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-sm font-bold text-stone-900 leading-tight">
                      {rev.name}
                    </h4>
                    <p className="text-[11px] text-stone-400 font-medium">
                      {rev.location} • {rev.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full">
                  <CheckCircle2 size={11} className="text-emerald-600" />
                  <span>Verified</span>
                </div>
              </div>

              {/* Star Rating */}
              <div className="flex items-center gap-1 mb-2.5">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Review Headline & Body */}
              <h3 className="text-sm font-bold text-stone-900 mb-2 leading-snug">
                "{t(rev.title)}"
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed mb-4">
                {rev.review}
              </p>
            </div>

            {/* Author / Purchase Footer */}
            <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
              <span className="font-medium text-stone-400">Purchased:</span>
              <span className="font-semibold text-stone-700 truncate max-w-[170px]">
                {rev.purchase}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
