import { useEffect } from 'react';
import { useLocation, Link, Navigate, useNavigate } from 'react-router-dom';
import { CheckCircle, Home, Ticket, Download } from 'lucide-react';
import * as htmlToImage from 'html-to-image';
import { jsPDF } from 'jspdf';
import { useCurrency } from '../context/CurrencyContext';
import { useToast } from '../context/ToastContext';

export default function Success() {
  const location = useLocation();
  const navigate = useNavigate();
  const { formatLocalPrice } = useCurrency();
  const { showToast } = useToast();
  const { bookingId, movieTitle, theatreName, seats, date, time, total } = location.state || {};

  const ssoUser = JSON.parse(localStorage.getItem('tb_user')) || JSON.parse(localStorage.getItem('sso_user'));

  const handleDownloadTicket = async () => {
    const element = document.getElementById(`ticket-receipt`);
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
      pdf.save(`Ticket_${bookingId}.pdf`);
    } catch (err) {
      console.error(err);
      showToast("Failed to download ticket: " + (err.message || String(err)), "error");
    }
  };

  useEffect(() => {
    if (ssoUser?.role === 'owner') {
      navigate('/owner', { replace: true });
    } else if (ssoUser?.role === 'admin') {
      navigate('/admin', { replace: true });
    }
  }, [navigate, ssoUser?.role]);

  if (!bookingId) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-10 max-w-lg w-full text-center border border-orange-100 shadow-2xl shadow-orange-900/10">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center">
            <CheckCircle size={48} />
          </div>
        </div>
        
        <h1 className="text-4xl font-extrabold text-orange-950 mb-4">Payment Successful!</h1>
        <p className="text-orange-700 text-lg mb-8">
          Your tickets have been booked successfully. Get ready for an amazing cinematic experience!
        </p>

        <div id="ticket-receipt" className="bg-orange-50 rounded-2xl p-6 mb-8 border border-orange-200 text-left">
          <div className="border-b border-orange-200 pb-4 mb-4">
            <p className="text-orange-500 text-xs font-bold uppercase tracking-wider mb-1">Movie Ticket</p>
            <h3 className="text-2xl font-black text-orange-950">{movieTitle || 'Movie'}</h3>
            <p className="text-orange-700 font-bold">{theatreName || 'Theatre'}</p>
          </div>
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-orange-500 text-xs font-bold uppercase tracking-wider mb-1">Date & Time</p>
              <p className="text-orange-900 font-bold">{date || 'N/A'} at {time || 'N/A'}</p>
            </div>
            <div className="text-right">
              <p className="text-orange-500 text-xs font-bold uppercase tracking-wider mb-1">Seats</p>
              <p className="text-orange-900 font-bold">{seats?.map(s => typeof s === 'string' ? s : (s.id || s.number || s)).join(', ') || 'N/A'}</p>
            </div>
          </div>
          <div className="border-t border-dashed border-orange-300 pt-4 flex justify-between items-end">
            <div>
              <p className="text-orange-500 text-xs font-bold uppercase tracking-wider mb-1">Booking ID</p>
              <div className="flex items-center gap-2">
                <Ticket className="text-orange-900" size={16} />
                <p className="font-mono font-black text-orange-950">{bookingId ? String(bookingId).split('-')[0] : 'N/A'}</p>
              </div>
            </div>
            {total && <p className="font-black text-2xl text-orange-600">{formatLocalPrice(total)}</p>}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button 
            onClick={handleDownloadTicket}
            className="inline-flex items-center justify-center gap-2 bg-zinc-900 text-white font-bold px-8 py-4 rounded-xl w-full hover:bg-black transition-all shadow-[0_8px_20px_rgba(0,0,0,0.2)] hover:-translate-y-1"
          >
            <Download size={20} />
            Download Ticket PDF
          </button>
          <Link 
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-orange-500 text-white font-bold px-8 py-4 rounded-xl w-full hover:bg-orange-600 transition-all shadow-[0_8px_20px_rgba(249,115,22,0.3)] hover:-translate-y-1"
          >
          <Home size={20} />
          Return to Home
        </Link>
      </div>
      </div>
    </div>
  );
}
