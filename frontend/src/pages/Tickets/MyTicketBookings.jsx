import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Ticket, Calendar, MapPin, Film, User, Armchair, 
  ArrowLeft, Download, XCircle, QrCode, CheckCircle2, 
  ChevronRight, Sparkles, Bus, RotateCcw, AlertTriangle, Info, X
} from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';
import { useToast } from '../../context/ToastContext';
import { API } from '../../config/ticketApi';
import { getSavedBookings } from '../../data/mockTicketData';

export default function MyTicketBookings() {
  const [bookings, setBookings] = useState(() => getSavedBookings());
  const [loading, setLoading] = useState(false);
  const [selectedTicketModal, setSelectedTicketModal] = useState(null);
  const [cancelModalBooking, setCancelModalBooking] = useState(null);
  const [cancelling, setCancelling] = useState(false);
  const [activeCategoryTab, setActiveCategoryTab] = useState('all'); // 'all' | 'movie' | 'bus'

  const navigate = useNavigate();
  const { formatLocalPrice } = useCurrency();
  const { showToast } = useToast();
  
  const user = JSON.parse(localStorage.getItem('tb_user') || localStorage.getItem('sso_user') || '{}');

  const fetchBookings = () => {
    setLoading(true);
    const email = user?.email || '';
    const query = email ? `?email=${encodeURIComponent(email)}` : '';

    fetch(`${API}/api/v1/ticket-bookings${query}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.success && Array.isArray(data.bookings) && data.bookings.length > 0) {
          setBookings(data.bookings);
        } else {
          // Merge local storage saved bookings
          const localSaved = getSavedBookings();
          setBookings(localSaved);
        }
      })
      .catch(() => {
        setBookings(getSavedBookings());
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBookings();
  }, [user?.email]);

  const confirmCancellation = async () => {
    if (!cancelModalBooking) return;
    setCancelling(true);

    try {
      const res = await fetch(`${API}/api/v1/ticket-bookings/${cancelModalBooking.booking_id || cancelModalBooking.id}/cancel`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();

      if (data && data.success) {
        showToast(data.message, 'success');
        const updated = bookings.map(b => 
          (b.booking_id === cancelModalBooking.booking_id || b.id === cancelModalBooking.id)
            ? { ...b, status: 'cancelled', cancellation: data.cancellation }
            : b
        );
        setBookings(updated);
        try {
          localStorage.setItem('tb_bookings', JSON.stringify(updated));
        } catch {}
        setCancelModalBooking(null);
      } else {
        showToast(data.message || 'Cancellation failed', 'error');
      }
    } catch (err) {
      // Local fallback cancellation
      const updated = bookings.map(b => 
        (b.booking_id === cancelModalBooking.booking_id || b.id === cancelModalBooking.id)
          ? { 
              ...b, 
              status: 'cancelled', 
              cancellation: { 
                refund_amount: Math.round((b.total_amount || 0) * 0.9), 
                cancellation_fee: Math.round((b.total_amount || 0) * 0.1),
                refund_status: 'processed'
              } 
            }
          : b
      );
      setBookings(updated);
      try {
        localStorage.setItem('tb_bookings', JSON.stringify(updated));
      } catch {}
      showToast('Booking cancelled. Refund of 90% processed in demo mode.', 'info');
      setCancelModalBooking(null);
    } finally {
      setCancelling(false);
    }
  };

  const handleExportCSV = () => {
    if (bookings.length === 0) return;
    const headers = ['Booking ID', 'Type', 'Service / Title', 'Route / Venue', 'Date', 'Time', 'Seats', 'Total Amount', 'Status'];
    const rows = bookings.map(b => [
      b.booking_id || b.id,
      b.booking_type || 'movie',
      b.movie_title || b.title || 'Entertainment Pass',
      b.theatre_name || b.theatre || 'GoMo Partner Venue',
      b.booking_date || new Date().toISOString().split('T')[0],
      b.booking_time || '07:00 PM',
      Array.isArray(b.seats) ? b.seats.join('; ') : b.seats || '',
      b.total_amount || 0,
      b.status || 'Confirmed'
    ]);
    const csvContent = [
      headers.join(','),
      ...rows.map(e => e.map(field => `"${String(field).replace(/"/g, '""')}"`).join(','))
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'GoMoDeals_Ticket_History.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter by category tab
  const displayedBookings = bookings.filter(b => {
    if (activeCategoryTab === 'all') return true;
    if (activeCategoryTab === 'bus') return b.booking_type === 'bus' || b.pnr;
    if (activeCategoryTab === 'movie') return b.booking_type !== 'bus' && !b.pnr;
    return true;
  });

  return (
    <div className="bg-[#f5f5f7] min-h-screen font-sans text-zinc-900 pb-24">
      {/* Top Breadcrumb */}
      <div className="bg-white border-b border-zinc-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <Link to="/tickets" className="hover:text-[#f76e28]">Tickets</Link>
            <span>/</span>
            <span className="text-zinc-900 font-bold">My Bookings</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Link to="/tickets/movies" className="text-zinc-600 hover:text-[#f76e28] font-bold">Movies</Link>
            <span className="text-zinc-300">•</span>
            <Link to="/tickets/buses" className="text-zinc-600 hover:text-[#f76e28] font-bold">Buses</Link>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* User Profile Card */}
        <div className="bg-white rounded-2xl p-6 border border-zinc-200 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight">
                {user?.full_name || 'Guest Booking Account'}
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-orange-50 text-[#f76e28] px-2 py-0.5 rounded-md border border-orange-200">
                Verified Profile
              </span>
            </div>
            <p className="text-xs text-zinc-500 mt-1 flex items-center justify-center md:justify-start gap-1.5">
              <User size={13} className="text-[#f76e28]" />
              <span>{user?.email || 'guest@gomodeals.com'}</span>
            </p>
            <p className="text-[11px] text-zinc-400 mt-0.5">
              Unified ticket hub for Movies, Live Events, and Interstate Bus journeys.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleExportCSV}
              disabled={bookings.length === 0}
              className="px-4 py-2 rounded-xl bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50 text-xs font-bold transition-all shadow-2xs disabled:opacity-50 cursor-pointer"
            >
              Export CSV
            </button>
            <Link
              to="/tickets/buses"
              className="px-4 py-2 rounded-xl bg-orange-50 text-[#f76e28] hover:bg-orange-100 border border-orange-200 text-xs font-bold transition-all shadow-2xs"
            >
              + Book Bus
            </Link>
            <Link
              to="/tickets/movies"
              className="px-4 py-2 rounded-xl bg-[#f76e28] hover:bg-[#e05b16] text-white text-xs font-bold transition-all shadow-md"
            >
              + Book Movie
            </Link>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-200 mb-6">
          <div className="flex items-center gap-2">
            {[
              { id: 'all', label: 'All Bookings', count: bookings.length },
              { id: 'movie', label: 'Movies & Events', count: bookings.filter(b => b.booking_type !== 'bus' && !b.pnr).length },
              { id: 'bus', label: 'Bus Tickets', count: bookings.filter(b => b.booking_type === 'bus' || b.pnr).length }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategoryTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeCategoryTab === tab.id
                    ? 'bg-zinc-900 text-white shadow-xs'
                    : 'bg-white border border-zinc-200 text-zinc-600 hover:border-zinc-300'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  activeCategoryTab === tab.id ? 'bg-zinc-700 text-white' : 'bg-zinc-100 text-zinc-600'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          <span className="text-xs font-bold text-zinc-500">
            Showing {displayedBookings.length} {displayedBookings.length === 1 ? 'Pass' : 'Passes'}
          </span>
        </div>

        {/* Bookings Cards Grid */}
        {displayedBookings.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-zinc-200 space-y-4">
            <Ticket size={40} className="text-zinc-300 mx-auto" />
            <h3 className="text-lg font-black text-zinc-900">No Bookings Found</h3>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">
              You haven't reserved any tickets in this category yet. Explore what's playing in cinema or plan your next bus ride!
            </p>
            <div className="flex justify-center gap-3">
              <Link
                to="/tickets/movies"
                className="px-5 py-2.5 rounded-xl bg-[#f76e28] text-white text-xs font-bold uppercase tracking-wider shadow-md"
              >
                Browse Movies
              </Link>
              <Link
                to="/tickets/buses"
                className="px-5 py-2.5 rounded-xl bg-[#1f2533] text-white text-xs font-bold uppercase tracking-wider shadow-md"
              >
                Book Bus
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {displayedBookings.map((b) => {
              const isCancelled = b.status === 'Cancelled' || b.status === 'cancelled';
              const isBus = b.booking_type === 'bus' || Boolean(b.pnr);
              const seatText = Array.isArray(b.seats) ? b.seats.join(', ') : b.seats;
              const displayTitle = b.movie_title || b.title || (isBus ? `${b.from_city} → ${b.to_city}` : 'Entertainment Pass');
              const displaySub = b.theatre_name || b.theatre || (isBus ? `${b.operator_name || 'Verified Operator'} • ${b.bus_service_number || ''}` : 'Partner Venue');

              return (
                <div
                  key={b.booking_id || b.id}
                  className={`bg-white rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col sm:flex-row shadow-sm hover:shadow-xl anim-hover-lift ${
                    isCancelled ? 'opacity-65 border-zinc-200' : 'border-zinc-200/90 hover:border-orange-300'
                  }`}
                >
                  {/* Left Ticket Stub with Perforation Notches */}
                  <div className="bg-[#1f2533] text-white p-5 sm:w-48 flex flex-col items-center justify-between text-center relative border-b sm:border-b-0 sm:border-r border-dashed border-zinc-700 shrink-0">
                    {/* Top & Bottom Perforation Notches */}
                    <div className="hidden sm:block absolute -top-3.5 -right-3.5 w-7 h-7 rounded-full bg-[#f5f5f7] border-b border-zinc-300 z-10"></div>
                    <div className="hidden sm:block absolute -bottom-3.5 -right-3.5 w-7 h-7 rounded-full bg-[#f5f5f7] border-t border-zinc-300 z-10"></div>

                    <div className="space-y-1">
                      <span className="text-[9px] font-black uppercase tracking-widest text-[#f76e28] flex items-center justify-center gap-1">
                        {isBus ? <Bus size={11} /> : <Film size={11} />}
                        <span>{isBus ? 'GOMO BUS' : 'GOMO CINEMA'}</span>
                      </span>
                      <p className="text-xs font-black text-white truncate max-w-[140px]">
                        {displayTitle}
                      </p>
                    </div>

                    {/* QR Code Graphic with Scan Reticles */}
                    <div className="my-3 p-2.5 bg-white rounded-2xl shadow-xs border border-orange-400/30">
                      <QrCode size={68} className="text-zinc-900" />
                    </div>

                    <div>
                      <span className="text-[10px] font-mono font-bold text-zinc-400 block">
                        {b.booking_id || b.id}
                      </span>
                      {b.pnr && (
                        <span className="text-[10px] font-mono text-emerald-400 block font-bold bg-emerald-950/60 px-2 py-0.5 rounded mt-0.5 border border-emerald-800/80">
                          {b.pnr}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right Details Stub */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div>
                          <div className="flex items-center gap-1.5">
                            {isBus ? (
                              <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 text-[9px] font-bold uppercase">
                                Bus
                              </span>
                            ) : (
                              <span className="px-1.5 py-0.5 rounded bg-purple-50 text-purple-700 text-[9px] font-bold uppercase">
                                Movie
                              </span>
                            )}
                            <h3 className="font-bold text-zinc-900 text-base leading-snug">
                              {displayTitle}
                            </h3>
                          </div>
                          <p className="text-xs text-zinc-500 font-medium truncate mt-0.5">
                            {displaySub}
                          </p>
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shrink-0 ${
                          isCancelled ? 'bg-rose-50 text-rose-600 border border-rose-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}>
                          {b.status || 'Confirmed'}
                        </span>
                      </div>

                      <div className="space-y-1.5 text-xs text-zinc-600 mb-4 bg-zinc-50 p-3 rounded-xl border border-zinc-100">
                        <div className="flex items-center gap-2">
                          <Calendar size={13} className="text-[#f76e28] shrink-0" />
                          <span className="font-semibold text-zinc-800">{b.booking_date} • {b.booking_time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Armchair size={13} className="text-[#f76e28] shrink-0" />
                          <span>Seats: <strong className="text-zinc-900">{seatText}</strong></span>
                        </div>
                        {b.location && (
                          <div className="flex items-center gap-2 text-zinc-500 text-[11px] truncate">
                            <MapPin size={12} className="text-zinc-400 shrink-0" />
                            <span className="truncate">{b.location}</span>
                          </div>
                        )}
                      </div>

                      {/* Refund notice if cancelled */}
                      {isCancelled && b.cancellation && (
                        <div className="mb-3 p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-[11px] text-rose-800 flex items-center justify-between">
                          <span>Refund: ₹{b.cancellation.refund_amount} ({100 - b.cancellation.deduction_percentage}%)</span>
                          <span className="font-bold uppercase text-[9px] bg-rose-200 px-1.5 py-0.5 rounded text-rose-900">
                            {b.cancellation.refund_status || 'Processed'}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Bottom Actions & Price */}
                    <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
                      <div>
                        <span className="block text-[10px] text-zinc-400 uppercase font-bold">Total Paid</span>
                        <span className="text-base font-black text-zinc-900">
                          {formatLocalPrice(b.total_amount || 0)}
                        </span>
                      </div>

                      {!isCancelled && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedTicketModal(b)}
                            className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold transition-all shadow-2xs cursor-pointer"
                          >
                            View Ticket
                          </button>
                          <button
                            onClick={() => setCancelModalBooking(b)}
                            className="px-2.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold transition-all cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* CANCELLATION & REFUND ESTIMATION MODAL PER PART 3.6 & 4.10 */}
      {cancelModalBooking && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <div className="flex items-center gap-2 text-rose-600">
                <AlertTriangle size={20} />
                <h3 className="font-black text-sm uppercase tracking-wider text-zinc-900">
                  Cancel Reservation
                </h3>
              </div>
              <button 
                onClick={() => setCancelModalBooking(null)}
                className="text-zinc-400 hover:text-zinc-600 p-1"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-xs text-zinc-600 leading-relaxed">
              Are you sure you want to cancel booking <strong className="text-zinc-900 font-mono">{cancelModalBooking.booking_id || cancelModalBooking.id}</strong>?
            </p>

            {/* Refund Estimate Breakdown */}
            <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200 text-xs space-y-2">
              <div className="flex justify-between text-zinc-600">
                <span>Original Total Fare:</span>
                <span className="font-bold">{formatLocalPrice(cancelModalBooking.total_amount || 0)}</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Supplier Cancellation Fee (10%):</span>
                <span className="font-bold text-rose-600">−{formatLocalPrice((cancelModalBooking.total_amount || 0) * 0.1)}</span>
              </div>
              <div className="flex justify-between text-zinc-900 font-black pt-2 border-t border-zinc-200">
                <span>Estimated Refund Amount:</span>
                <span className="text-emerald-600 text-sm">{formatLocalPrice((cancelModalBooking.total_amount || 0) * 0.9)}</span>
              </div>
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-800">
              <span className="font-bold block mb-0.5">Supplier Refund Policy:</span>
              <span>Cancellations made 24+ hours before departure qualify for a 90% refund. The refund will be credited directly to your original payment method.</span>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setCancelModalBooking(null)}
                className="flex-1 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold text-xs uppercase"
              >
                Keep Booking
              </button>
              <button
                type="button"
                disabled={cancelling}
                onClick={confirmCancellation}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase shadow-md flex items-center justify-center gap-2"
              >
                {cancelling ? 'Processing...' : 'Confirm Cancellation'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modern Ticket Details Modal */}
      {selectedTicketModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl animate-scaleUp border border-zinc-200 relative">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedTicketModal(null)}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              ✕
            </button>

            {/* Top Brand Header */}
            <div className="bg-gradient-to-r from-[#f76e28] to-[#ff8442] text-white p-5 text-left relative">
              <span className="text-[10px] font-black uppercase tracking-widest text-orange-100 block">
                {selectedTicketModal.booking_type === 'bus' ? 'GoMo Bus Boarding Pass' : 'GoMo Digital Cinema Ticket'}
              </span>
              <h3 className="text-xl font-black text-white mt-1 pr-6 leading-snug">
                {selectedTicketModal.movie_title || selectedTicketModal.title}
              </h3>
              <p className="text-xs text-orange-100/90 mt-0.5">
                {selectedTicketModal.theatre_name || selectedTicketModal.theatre || 'GoMo Verified Partner'}
              </p>

              {selectedTicketModal.pnr && (
                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-black/25 text-white font-mono font-bold text-xs border border-white/20">
                  <span>PNR: {selectedTicketModal.pnr}</span>
                </div>
              )}
            </div>

            {/* Details Body */}
            <div className="p-5 space-y-4 text-xs text-left">
              <div className="grid grid-cols-2 gap-3 p-3.5 bg-zinc-50 rounded-2xl border border-zinc-100">
                <div>
                  <span className="text-[10px] text-zinc-400 font-bold uppercase block">Date & Time</span>
                  <span className="font-bold text-zinc-900 block mt-0.5">
                    {selectedTicketModal.booking_date} • {selectedTicketModal.booking_time}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 font-bold uppercase block">Assigned Seat(s)</span>
                  <span className="font-black text-[#f76e28] block mt-0.5">
                    {Array.isArray(selectedTicketModal.seats) ? selectedTicketModal.seats.join(', ') : selectedTicketModal.seats}
                  </span>
                </div>
              </div>

              {/* Perforated Divider */}
              <div className="relative py-1 flex items-center">
                <div className="absolute -left-7 w-6 h-6 rounded-full bg-zinc-900/10 border-r border-zinc-200"></div>
                <div className="w-full border-b-2 border-dashed border-zinc-200 mx-2"></div>
                <div className="absolute -right-7 w-6 h-6 rounded-full bg-zinc-900/10 border-l border-zinc-200"></div>
              </div>

              {/* QR Turnstile Scanner Frame */}
              <div className="bg-[#1f2533] text-white p-4 rounded-2xl flex items-center gap-4">
                <div className="p-2 bg-white rounded-xl shrink-0">
                  <QrCode size={72} className="text-zinc-900" />
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-widest block">
                    GATE TURNSTILE SCANNER
                  </span>
                  <span className="font-mono text-xs font-bold text-white block">
                    {selectedTicketModal.booking_id || selectedTicketModal.id}
                  </span>
                  <span className="text-[10px] text-zinc-400 block">
                    Total: <strong className="text-amber-400">{formatLocalPrice(selectedTicketModal.total_amount)}</strong>
                  </span>
                </div>
              </div>

              {/* Print Action */}
              <button
                onClick={() => window.print()}
                className="w-full py-3 rounded-xl bg-[#f76e28] hover:bg-[#de5713] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5 anim-click-press"
              >
                <Download size={14} />
                <span>Print or Save Pass (PDF)</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
