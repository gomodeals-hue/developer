import React, { useState } from 'react';
import { useLocation, Link, Navigate, useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, Bus, Download, ArrowLeft, QrCode, 
  Calendar, MapPin, Armchair, ShieldCheck, Clock, Users, Sparkles, Tag, 
  Share2, Printer, Check, ChevronRight, AlertCircle, Copy
} from 'lucide-react';
import * as htmlToImage from 'html-to-image';
import { jsPDF } from 'jspdf';
import { useCurrency } from '../../../context/CurrencyContext';
import { useToast } from '../../../context/ToastContext';

// Helper to derive authentic 3-letter station/airport-style codes
const getCityCode = (city = '') => {
  const map = {
    'Coimbatore': 'CBE',
    'Chennai': 'MAA',
    'Bengaluru': 'BLR',
    'Bangalore': 'BLR',
    'Madurai': 'IXM',
    'Kochi': 'COK',
    'Cochin': 'COK',
    'Salem': 'SXV',
    'Tiruchirappalli': 'TRZ',
    'Trichy': 'TRZ',
    'Hyderabad': 'HYD',
    'Mysore': 'MYQ'
  };
  return map[city] || city.slice(0, 3).toUpperCase();
};

export default function BusConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { formatLocalPrice } = useCurrency();
  const { showToast } = useToast();
  const [downloading, setDownloading] = useState(false);

  const booking = location.state?.booking;

  if (!booking) {
    return <Navigate to="/tickets/buses" replace />;
  }

  const handleDownloadTicket = async () => {
    const element = document.getElementById('gomo-modern-boarding-pass');
    if (!element) return;
    setDownloading(true);
    
    try {
      const canvas = await htmlToImage.toCanvas(element, { 
        pixelRatio: 3, 
        cacheBust: true,
        backgroundColor: '#ffffff'
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width / 2.5, canvas.height / 2.5]
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2.5, canvas.height / 2.5);
      pdf.save(`GoMo_Boarding_Pass_${booking.pnr || booking.id}.pdf`);
      showToast('Modern Boarding Pass PDF downloaded successfully!', 'success');
    } catch (err) {
      console.error(err);
      showToast('Failed to export PDF: ' + (err.message || String(err)), 'error');
    } finally {
      setDownloading(false);
    }
  };

  const handleCopyPNR = () => {
    navigator.clipboard?.writeText(booking.pnr || booking.id);
    showToast('PNR copied to clipboard!', 'info');
  };

  const fromCode = getCityCode(booking.from_city);
  const toCode = getCityCode(booking.to_city);

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex flex-col items-center justify-center p-4 sm:p-6 py-12 font-sans text-zinc-900">
      
      {/* SUCCESS CELEBRATION HEADER */}
      <div className="max-w-2xl w-full text-center mb-6 space-y-2 animate-fadeIn">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full shadow-xs mb-2">
          <CheckCircle2 size={32} />
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest text-amber-800 bg-amber-100/80 border border-amber-300 px-3.5 py-1 rounded-full inline-block">
          DEMO BOOKING — NOT VALID FOR TRAVEL
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">
          Your Travel Pass is Ready!
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 max-w-md mx-auto">
          Reservation confirmed with {booking.operator_name}. Present this digital pass or turnstile barcode upon coach boarding.
        </p>
      </div>

      {/* ULTRA-MODERN PERFORATED TRAVEL BOARDING PASS (RENDERED & EXPORTABLE) */}
      <div className="max-w-2xl w-full">
        <div 
          id="gomo-modern-boarding-pass" 
          className="bg-white rounded-3xl shadow-xl border border-zinc-200/90 overflow-hidden relative"
        >
          {/* 1. TOP BRAND ACCENT HEADER */}
          <div className="bg-gradient-to-r from-[#f76e28] via-[#ff7c3b] to-[#f76e28] text-white p-5 sm:p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-xs">
                <Bus size={22} />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-orange-100 block">
                  GoMo Deals Express
                </span>
                <h2 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
                  <span>Official Boarding Pass</span>
                  <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-full text-white">
                    Confirmed
                  </span>
                </h2>
              </div>
            </div>

            {/* PNR Monospace Pill */}
            <div className="text-right">
              <span className="text-[9px] font-bold uppercase tracking-wider text-orange-100 block">
                Booking PNR
              </span>
              <button 
                onClick={handleCopyPNR}
                className="mt-0.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/25 hover:bg-black/40 text-white font-mono font-black text-xs sm:text-sm tracking-wider border border-white/20 transition-all cursor-pointer"
                title="Click to copy PNR"
              >
                <span>{booking.pnr || 'PNR-GMD-9821'}</span>
                <Copy size={11} className="text-orange-200" />
              </button>
            </div>
          </div>

          {/* 2. OPERATOR & SERVICE BADGE BAR */}
          <div className="bg-zinc-900 text-white px-5 sm:px-6 py-2.5 flex items-center justify-between text-xs border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <span className="font-black text-white text-xs">{booking.operator_name}</span>
              <span className="text-zinc-500">•</span>
              <span className="text-zinc-300 font-mono text-[11px]">{booking.bus_service_number}</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[11px]">
              <ShieldCheck size={13} />
              <span>Verified Carrier</span>
            </div>
          </div>

          {/* 3. AIRPORT-STYLE ROUTE BANNER */}
          <div className="p-6 sm:p-8 bg-gradient-to-b from-white to-zinc-50/50">
            <div className="grid grid-cols-12 items-center gap-2">
              
              {/* Origin */}
              <div className="col-span-4 text-left">
                <span className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight font-mono block">
                  {fromCode}
                </span>
                <span className="text-xs sm:text-sm font-bold text-zinc-700 block truncate">
                  {booking.from_city}
                </span>
                <span className="text-xs font-black text-[#f76e28] mt-1 block">
                  {booking.departure_time}
                </span>
                <span className="text-[10px] text-zinc-400 font-medium block">
                  {booking.journey_date}
                </span>
              </div>

              {/* Trajectory Graphic */}
              <div className="col-span-4 text-center px-1">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                  {booking.duration || '8h 00m'}
                </span>
                <div className="relative flex items-center justify-center">
                  <div className="w-full border-b-2 border-dashed border-zinc-300"></div>
                  <div className="absolute w-8 h-8 rounded-full bg-orange-50 border border-orange-200 text-[#f76e28] flex items-center justify-center shadow-xs">
                    <Bus size={15} />
                  </div>
                </div>
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-emerald-600 block mt-1.5">
                  Direct Express
                </span>
              </div>

              {/* Destination */}
              <div className="col-span-4 text-right">
                <span className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight font-mono block">
                  {toCode}
                </span>
                <span className="text-xs sm:text-sm font-bold text-zinc-700 block truncate">
                  {booking.to_city}
                </span>
                <span className="text-xs font-black text-zinc-900 mt-1 block">
                  {booking.arrival_time}
                </span>
                <span className="text-[10px] text-emerald-600 font-bold block">
                  Next Morning
                </span>
              </div>

            </div>

            {/* ASSIGNED SEATS HIGHLIGHT PILL */}
            <div className="mt-6 pt-5 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[10px] text-zinc-400 uppercase font-black tracking-wider block">
                  Assigned Seat(s)
                </span>
                <div className="flex items-center gap-1.5 mt-1">
                  {(Array.isArray(booking.seats) ? booking.seats : [booking.seats]).map((st, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 rounded-lg bg-orange-50 border border-orange-200 text-[#f76e28] font-black text-sm tracking-wide shadow-2xs"
                    >
                      Seat {st}
                    </span>
                  ))}
                  <span className="text-xs font-semibold text-zinc-500 ml-2">
                    ({booking.seats.length} Passenger{booking.seats.length > 1 ? 's' : ''})
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-zinc-400 uppercase font-black tracking-wider block">
                  Coach Category
                </span>
                <span className="text-xs font-bold text-zinc-800 block mt-1">
                  {booking.bus_type || 'AC Sleeper (2+1)'}
                </span>
              </div>
            </div>

            {/* BOARDING & DROPPING POINT CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-1">
                <div className="flex items-center gap-1 text-[#f76e28] font-bold text-[10px] uppercase tracking-wider">
                  <MapPin size={12} />
                  <span>Boarding Location</span>
                </div>
                <span className="font-black text-zinc-900 text-xs block truncate">
                  {booking.boarding_point?.name || 'Primary Omni Bus Stand'}
                </span>
                <p className="text-[11px] text-zinc-500 leading-tight">
                  {booking.boarding_point?.time || booking.departure_time} • {booking.boarding_point?.landmark || 'Opp. Main Entrance'}
                </p>
                <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 inline-block mt-0.5">
                  Reporting: 15 Mins Prior
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-1">
                <div className="flex items-center gap-1 text-emerald-600 font-bold text-[10px] uppercase tracking-wider">
                  <MapPin size={12} />
                  <span>Dropping Location</span>
                </div>
                <span className="font-black text-zinc-900 text-xs block truncate">
                  {booking.dropping_point?.name || 'Central Terminal'}
                </span>
                <p className="text-[11px] text-zinc-500 leading-tight">
                  {booking.dropping_point?.time || booking.arrival_time} • {booking.dropping_point?.landmark || 'Main Flyover Drop'}
                </p>
                <span className="text-[9px] font-bold text-zinc-500 bg-zinc-100 px-1.5 py-0.5 rounded border border-zinc-200 inline-block mt-0.5">
                  Luggage Assistance Included
                </span>
              </div>
            </div>

            {/* PASSENGER MANIFEST */}
            <div className="mt-4 pt-3 border-t border-zinc-100 text-xs">
              <span className="text-[10px] text-zinc-400 uppercase font-black tracking-wider block mb-1.5">
                Lead Passenger & Manifest
              </span>
              <div className="space-y-1 text-zinc-700">
                {booking.passengers && booking.passengers.length > 0 ? (
                  booking.passengers.map((p, idx) => (
                    <div key={idx} className="flex items-center justify-between py-0.5">
                      <span className="font-bold text-zinc-900">{p.name || 'Passenger'} ({p.gender || 'M'}, {p.age || 'Adult'})</span>
                      <span className="text-zinc-500 font-mono text-[11px]">Seat {p.seat_number}</span>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-zinc-900">{booking.lead_passenger?.name || booking.name || 'Guest Traveler'}</span>
                    <span className="text-zinc-500 font-mono text-[11px]">Primary Contact</span>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* 4. REALISTIC PERFORATED TEAR-LINE WITH CUTOUT NOTCHES */}
          <div className="relative py-2 bg-white flex items-center">
            {/* Left Circular Cutout Notch */}
            <div className="absolute -left-4 w-8 h-8 rounded-full bg-[#f5f5f7] border-r border-zinc-300 z-10"></div>
            
            {/* Dashed Tear Line */}
            <div className="w-full border-b-2 border-dashed border-zinc-300 mx-5"></div>
            
            {/* Right Circular Cutout Notch */}
            <div className="absolute -right-4 w-8 h-8 rounded-full bg-[#f5f5f7] border-l border-zinc-300 z-10"></div>
          </div>

          {/* 5. BOTTOM TURNSTILE & SCANNER BOARDING STUB */}
          <div className="bg-[#1f2533] text-white p-6 sm:p-7">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
              
              {/* QR Code in High-Definition Bracket Frame */}
              <div className="sm:col-span-4 flex flex-col items-center justify-center">
                <div className="p-3 bg-white rounded-2xl shadow-md border-2 border-orange-400/40 relative">
                  {/* Bracket Reticles */}
                  <span className="absolute top-1 left-1 text-[#f76e28] text-[9px] font-black">┌</span>
                  <span className="absolute top-1 right-1 text-[#f76e28] text-[9px] font-black">┐</span>
                  <span className="absolute bottom-1 left-1 text-[#f76e28] text-[9px] font-black">└</span>
                  <span className="absolute bottom-1 right-1 text-[#f76e28] text-[9px] font-black">┘</span>
                  
                  <QrCode size={100} className="text-zinc-900" />
                </div>
                <span className="font-mono text-[9px] text-zinc-400 mt-2 uppercase font-bold tracking-wider">
                  Gate Scanner Pass
                </span>
              </div>

              {/* Barcode & Security Clearance Text */}
              <div className="sm:col-span-8 space-y-3 text-left">
                
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-zinc-400 uppercase font-black tracking-wider">
                      Turnstile Reference
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/70 border border-emerald-800/80 px-2 py-0.5 rounded">
                      AUTH OK • PASS #{booking.id.slice(-6)}
                    </span>
                  </div>
                  <span className="text-base sm:text-lg font-black text-white font-mono tracking-wider block mt-0.5">
                    {booking.id}
                  </span>
                </div>

                {/* Simulated 1D Barcode Graphic */}
                <div className="py-1">
                  <svg className="w-full h-8 overflow-hidden rounded bg-white p-1" viewBox="0 0 280 32" preserveAspectRatio="none">
                    <rect x="0" y="0" width="280" height="32" fill="#ffffff" />
                    {Array.from({ length: 45 }).map((_, i) => (
                      <rect 
                        key={i} 
                        x={i * 6 + (i % 3 === 0 ? 1 : 0)} 
                        y="0" 
                        width={i % 2 === 0 ? "2.5" : (i % 5 === 0 ? "4" : "1.5")} 
                        height="32" 
                        fill="#1f2533" 
                      />
                    ))}
                  </svg>
                </div>

                {/* Total Paid & Payment Status */}
                <div className="flex items-center justify-between pt-1 border-t border-zinc-800 text-xs">
                  <div>
                    <span className="text-[10px] text-zinc-400 uppercase font-bold block">Payment Captured</span>
                    <span className="font-bold text-emerald-400 text-xs">
                      {booking.payment_method?.toUpperCase() || 'UPI'} • ₹{booking.total_amount}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-zinc-400 uppercase font-bold block">Fare Breakdown</span>
                    <span className="font-black text-amber-400 text-sm">
                      {formatLocalPrice(booking.total_amount)}
                    </span>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>

      {/* 6. INSTANT ACTIONS BUTTONS */}
      <div className="max-w-2xl w-full mt-6 space-y-3">
        <button 
          onClick={handleDownloadTicket}
          disabled={downloading}
          className="w-full py-4 rounded-2xl bg-[#f76e28] hover:bg-[#de5713] active:scale-98 text-white font-black text-xs uppercase tracking-wider shadow-lg hover:shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer anim-click-press"
        >
          <Download size={16} />
          <span>{downloading ? 'Generating High-Res PDF...' : 'Download Boarding Pass (PDF)'}</span>
        </button>

        <div className="grid grid-cols-2 gap-3">
          <Link 
            to="/tickets/my-tickets"
            className="py-3.5 rounded-xl bg-white hover:bg-zinc-50 text-zinc-800 border border-zinc-200 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-2xs anim-click-press"
          >
            <Bus size={14} className="text-[#f76e28]" />
            <span>My Bookings</span>
          </Link>

          <Link 
            to="/tickets/buses"
            className="py-3.5 rounded-xl bg-zinc-900 hover:bg-black text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-1.5 anim-click-press"
          >
            <span>Book Another Ride</span>
            <ChevronRight size={14} />
          </Link>
        </div>
      </div>

    </div>
  );
}
