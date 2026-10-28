import React, { useEffect } from 'react';
import { useLocation, Link, Navigate, useNavigate } from 'react-router-dom';
import { CheckCircle2, Ticket, Download, ArrowLeft, QrCode, Calendar, MapPin, Armchair, Sparkles } from 'lucide-react';
import * as htmlToImage from 'html-to-image';
import { jsPDF } from 'jspdf';
import { useCurrency } from '../../context/CurrencyContext';
import { useToast } from '../../context/ToastContext';

export default function TicketSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { formatLocalPrice } = useCurrency();
  const { showToast } = useToast();
  const { bookingId, movieTitle, theatreName, seats, seatLabels, date, time, total, customer } = location.state || {};

  const handleDownloadTicket = async () => {
    const element = document.getElementById('ticket-receipt');
    if (!element) return;
    
    try {
      const canvas = await htmlToImage.toCanvas(element, { pixelRatio: 2, cacheBust: true });
      const imgData = canvas.toDataURL('image/png');
      const orientation = canvas.width >= canvas.height ? 'landscape' : 'portrait';
      const pdf = new jsPDF({
        orientation: orientation,
        unit: 'px',
        format: [canvas.width / 2, canvas.height / 2]
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2);
      pdf.save(`GoMo_Ticket_${bookingId}.pdf`);
      showToast("Ticket PDF downloaded successfully!", "success");
    } catch (err) {
      console.error(err);
      showToast("Failed to download ticket: " + (err.message || String(err)), "error");
    }
  };

  if (!bookingId) {
    return <Navigate to="/tickets" replace />;
  }

  const displaySeats = seatLabels 
    ? seatLabels.join(', ')
    : (Array.isArray(seats) ? seats.map(s => typeof s === 'string' ? s : (s.id || s.number || s)).join(', ') : 'Admit Pass');

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex flex-col items-center justify-center p-4 sm:p-6 py-12 font-sans text-zinc-900">
      <div className="bg-white rounded-3xl p-6 sm:p-10 max-w-lg w-full text-center border border-zinc-200/90 shadow-2xl space-y-6">
        
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shadow-md animate-bounce">
            <CheckCircle2 size={44} />
          </div>
        </div>
        
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#f76e28] bg-orange-50 border border-orange-200 px-3 py-1 rounded-full">
            Demo Booking Confirmed
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 mt-2 tracking-tight">
            You're Going to the Show!
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1 max-w-sm mx-auto">
            Your booking confirmation & digital M-Ticket have been generated successfully.
          </p>
        </div>

        {/* Digital Ticket Pass Stub */}
        <div id="ticket-receipt" className="bg-zinc-900 text-white rounded-2xl p-6 text-left relative overflow-hidden shadow-xl border border-zinc-800">
          
          {/* Header */}
          <div className="border-b border-dashed border-zinc-700 pb-4 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#f76e28]">
                GoMo Digital Ticket
              </span>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                VERIFIED PASS
              </span>
            </div>
            <h3 className="text-xl font-black text-white mt-1.5 leading-snug">
              {movieTitle || 'Entertainment Experience'}
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5 font-medium">
              {theatreName || 'Partner Venue'}
            </p>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-3 text-xs mb-4">
            <div>
              <span className="text-[10px] text-zinc-400 uppercase font-bold block mb-0.5">Date & Time</span>
              <span className="font-bold text-zinc-100">{date} • {time}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-zinc-400 uppercase font-bold block mb-0.5">Assigned Seats</span>
              <span className="font-bold text-[#f76e28]">{displaySeats}</span>
            </div>
          </div>

          {/* QR Code graphic */}
          <div className="my-4 p-3 bg-white rounded-xl text-center flex flex-col items-center justify-center">
            <QrCode size={100} className="text-zinc-900" />
            <span className="font-mono text-[9px] text-zinc-500 mt-1 uppercase font-bold">
              Turnstile Digital QR: {bookingId}
            </span>
          </div>

          {/* Footer of ticket */}
          <div className="border-t border-dashed border-zinc-700 pt-3 flex items-center justify-between text-xs">
            <div>
              <span className="text-[10px] text-zinc-400 uppercase font-bold block">Booking ID</span>
              <span className="font-mono font-bold text-white text-sm">{bookingId}</span>
            </div>
            {total && (
              <div className="text-right">
                <span className="text-[10px] text-zinc-400 uppercase font-bold block">Total Amount</span>
                <span className="font-black text-lg text-amber-400">{formatLocalPrice(total)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5 pt-2">
          <button 
            onClick={handleDownloadTicket}
            className="w-full py-3.5 rounded-xl bg-zinc-900 hover:bg-black text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download size={15} />
            <span>Download Ticket (PDF)</span>
          </button>

          <div className="grid grid-cols-2 gap-2.5">
            <Link 
              to="/tickets/my-tickets"
              className="py-3 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#f76e28] border border-orange-200 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
            >
              <Ticket size={14} />
              <span>My Bookings</span>
            </Link>

            <Link 
              to="/tickets"
              className="py-3 rounded-xl bg-[#f76e28] hover:bg-[#e05b16] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-1.5"
            >
              <span>Explore More</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
