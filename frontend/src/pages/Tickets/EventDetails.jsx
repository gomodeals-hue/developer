import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Calendar, MapPin, Clock, ShieldCheck, Heart, Share2, 
  ChevronRight, Ticket, Users, AlertCircle, ArrowLeft, Star, Check 
} from 'lucide-react';
import { getEventById, toggleTicketWishlist, isTicketWishlisted } from '../../data/mockTicketData';
import { useCurrency } from '../../context/CurrencyContext';
import { useToast } from '../../context/ToastContext';

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { formatLocalPrice, currency, EXCHANGE_RATES } = useCurrency();
  const { showToast } = useToast();

  const [event, setEvent] = useState(null);
  const [selectedTier, setSelectedTier] = useState(null);
  const [quantity, setQuantity] = useState(2);
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    const found = getEventById(id);
    if (found) {
      setEvent(found);
      if (found.tiers && found.tiers.length > 0) {
        setSelectedTier(found.tiers[0]);
      }
      setWishlisted(isTicketWishlisted(found.id));
    }
  }, [id]);

  if (!event) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-orange-100 text-[#f76e28] flex items-center justify-center mb-4 text-2xl font-black">
          !
        </div>
        <h2 className="text-2xl font-black text-zinc-900 mb-2">Event Not Found</h2>
        <p className="text-sm text-zinc-500 mb-6">The event you are looking for may have concluded or is unavailable.</p>
        <Link 
          to="/tickets/events" 
          className="px-6 py-2.5 rounded-lg bg-[#f76e28] text-white font-bold text-xs uppercase tracking-wider"
        >
          Explore All Events
        </Link>
      </div>
    );
  }

  const rate = EXCHANGE_RATES && EXCHANGE_RATES[currency] ? EXCHANGE_RATES[currency].rate : 1;
  const tierPrice = selectedTier ? selectedTier.price : event.price;
  const baseSubtotal = tierPrice * quantity;

  const handleWishlistToggle = () => {
    const newState = toggleTicketWishlist(event);
    setWishlisted(newState);
    showToast(newState ? `Added "${event.title}" to Wishlist` : `Removed from Wishlist`, 'info');
  };

  const handleProceedToCheckout = () => {
    if (!selectedTier) {
      showToast('Please select a ticket category', 'warning');
      return;
    }

    // Pass structured non-cinema booking object to /tickets/checkout
    navigate('/tickets/checkout', {
      state: {
        isEvent: true,
        event: event,
        movie: { title: event.title, poster: event.cover_image },
        showtime: {
          id: `evt_st_${event.id}`,
          theatre: event.venue,
          base_price: tierPrice,
          event_category: event.category
        },
        selectedTier: selectedTier,
        quantity: quantity,
        // Mock seats format for compatibility
        selectedSeats: Array.from({ length: quantity }, (_, i) => ({
          id: `Pass #${i + 1}`,
          tier: selectedTier.name,
          price: tierPrice
        })),
        date: event.date,
        time: event.time,
        total: baseSubtotal
      }
    });
  };

  return (
    <div className="bg-[#f5f5f7] min-h-screen text-zinc-900 font-sans pb-24">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-zinc-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between text-xs text-zinc-500">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <Link to="/tickets" className="hover:text-[#f76e28] transition-colors">Tickets</Link>
            <ChevronRight size={14} className="text-zinc-400" />
            <Link to="/tickets/events" className="hover:text-[#f76e28] transition-colors">Events</Link>
            <ChevronRight size={14} className="text-zinc-400" />
            <span className="text-zinc-400">{event.category}</span>
            <ChevronRight size={14} className="text-zinc-400" />
            <span className="text-zinc-900 font-bold truncate max-w-[200px]">{event.title}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleWishlistToggle}
              className={`p-2 rounded-full border transition-all cursor-pointer ${
                wishlisted 
                  ? 'bg-rose-50 border-rose-200 text-rose-600' 
                  : 'bg-white border-zinc-200 text-zinc-500 hover:text-rose-600'
              }`}
              title="Add to Wishlist"
            >
              <Heart size={16} className={wishlisted ? 'fill-rose-600' : ''} />
            </button>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                showToast('Event link copied to clipboard!', 'success');
              }}
              className="p-2 rounded-full bg-white border border-zinc-200 text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer"
              title="Share Event"
            >
              <Share2 size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Hero Cover Artwork & Meta Section */}
      <section className="bg-zinc-950 text-white relative overflow-hidden py-8 md:py-12 border-b border-zinc-800">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Event Cover Image Card */}
            <div className="md:col-span-5 lg:col-span-4">
              <div className="relative aspect-[16/10] md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-zinc-800 bg-zinc-900">
                <img 
                  src={event.cover_image} 
                  alt={event.title} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/cinematic_backdrop_1_1780401309164.png';
                  }}
                />
                <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-xs text-[#f76e28] text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md border border-[#f76e28]/30">
                  {event.category}
                </div>
              </div>
            </div>

            {/* Event Meta Details */}
            <div className="md:col-span-7 lg:col-span-8 space-y-4">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                  {event.genre} • Presented by {event.organizer}
                </span>
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mt-1 leading-tight">
                  {event.title}
                </h1>
              </div>

              {/* Rating & Votes */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-800/80 border border-zinc-700 text-xs font-bold text-amber-400">
                  <Star size={14} className="fill-amber-400 text-amber-400" />
                  <span>{event.rating}/5</span>
                  <span className="text-zinc-400 text-[11px] font-normal">({event.votes} ratings)</span>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-zinc-800/80 text-zinc-300 text-xs font-semibold">
                  {event.age_limit}
                </span>
                <span className="px-2.5 py-1 rounded-md bg-zinc-800/80 text-zinc-300 text-xs font-semibold">
                  {event.duration}
                </span>
              </div>

              {/* Date, Time and Venue Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/90 border border-zinc-800">
                  <Calendar size={18} className="text-[#f76e28] shrink-0" />
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase font-bold">Date & Time</span>
                    <span className="font-bold text-white text-sm">{event.date} • {event.time}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/90 border border-zinc-800">
                  <MapPin size={18} className="text-[#f76e28] shrink-0" />
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase font-bold">Venue & City</span>
                    <span className="font-bold text-white text-sm truncate block">{event.venue}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Content Area: Category Tiers & Summary */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Tiers Selection & Overview */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Step 1: Select Ticket Category */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-zinc-200">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-100 mb-6">
                <div>
                  <h2 className="text-lg font-black text-zinc-900 tracking-tight">
                    1. Select Ticket Category
                  </h2>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Choose your preferred access tier and seating zone.
                  </p>
                </div>
                <span className="text-xs font-bold text-[#f76e28] uppercase tracking-wider bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                  Instant E-Ticket
                </span>
              </div>

              {/* Tiers List */}
              <div className="space-y-3">
                {event.tiers?.map((tier) => {
                  const isSelected = selectedTier?.id === tier.id;

                  return (
                    <div
                      key={tier.id}
                      onClick={() => setSelectedTier(tier)}
                      className={`p-4 sm:p-5 rounded-xl border-2 transition-all cursor-pointer relative ${
                        isSelected 
                          ? 'border-[#f76e28] bg-orange-50/40 shadow-xs' 
                          : 'border-zinc-200 hover:border-zinc-300 bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            isSelected ? 'border-[#f76e28] bg-[#f76e28] text-white' : 'border-zinc-300'
                          }`}>
                            {isSelected && <Check size={12} strokeWidth={3} />}
                          </div>
                          <div>
                            <h3 className="font-bold text-zinc-900 text-sm sm:text-base leading-snug">
                              {tier.name}
                            </h3>
                            <p className="text-xs text-zinc-500 mt-1 max-w-lg leading-relaxed">
                              {tier.description}
                            </p>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-base sm:text-lg font-black text-zinc-900">
                            {formatLocalPrice(tier.price)}
                          </span>
                          <span className="block text-[10px] text-zinc-400 font-medium">per person</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Step 2: Quantity Stepper */}
              <div className="mt-8 pt-6 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-zinc-900">Select Number of Tickets</h3>
                  <p className="text-xs text-zinc-500">Max 10 passes per transaction</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    disabled={quantity <= 1}
                    className="w-9 h-9 rounded-lg border border-zinc-300 bg-white hover:bg-zinc-100 disabled:opacity-40 font-black text-base text-zinc-700 flex items-center justify-center transition-all cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-black text-base text-zinc-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(prev => Math.min(10, prev + 1))}
                    disabled={quantity >= 10}
                    className="w-9 h-9 rounded-lg border border-zinc-300 bg-white hover:bg-zinc-100 disabled:opacity-40 font-black text-base text-zinc-700 flex items-center justify-center transition-all cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Event Description & Highlights */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-zinc-200 space-y-4">
              <h2 className="text-lg font-black text-zinc-900 tracking-tight">About the Event</h2>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                {event.description}
              </p>

              <div className="pt-4 border-t border-zinc-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Terms & Guidelines</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  {event.terms}
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Booking Summary Card */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 bg-white rounded-2xl p-6 shadow-md border border-zinc-200 space-y-5">
              
              <div className="pb-4 border-b border-zinc-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#f76e28]">
                  Booking Summary
                </span>
                <h3 className="font-black text-zinc-900 text-base mt-0.5 truncate">
                  {event.title}
                </h3>
                <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1.5">
                  <Calendar size={13} className="text-zinc-400" />
                  <span>{event.date} • {event.time}</span>
                </p>
                <p className="text-xs text-zinc-500 mt-0.5 flex items-center gap-1.5 truncate">
                  <MapPin size={13} className="text-zinc-400 shrink-0" />
                  <span className="truncate">{event.venue}</span>
                </p>
              </div>

              {/* Breakdown */}
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between text-zinc-600">
                  <span>Selected Category:</span>
                  <span className="font-bold text-zinc-900">{selectedTier?.name}</span>
                </div>
                <div className="flex items-center justify-between text-zinc-600">
                  <span>Quantity:</span>
                  <span className="font-bold text-zinc-900">{quantity} Passes</span>
                </div>
                <div className="flex items-center justify-between text-zinc-600">
                  <span>Unit Price:</span>
                  <span className="font-bold text-zinc-900">{formatLocalPrice(tierPrice)}</span>
                </div>

                <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-sm">
                  <span className="font-bold text-zinc-800">Tickets Subtotal:</span>
                  <span className="font-black text-base text-zinc-900">
                    {formatLocalPrice(baseSubtotal)}
                  </span>
                </div>
                <p className="text-[10px] text-zinc-400">
                  *Convenience fee & GST calculated at checkout step
                </p>
              </div>

              {/* Proceed CTA */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 rounded-xl bg-[#f76e28] hover:bg-[#e05b16] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Ticket size={16} />
                <span>Proceed to Checkout</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-400 pt-1">
                <ShieldCheck size={13} className="text-emerald-500" />
                <span>100% Verified Entry • Free Cancellation up to 24 hrs prior</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
