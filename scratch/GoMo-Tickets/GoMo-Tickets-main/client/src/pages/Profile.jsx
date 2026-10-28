import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Ticket, Calendar, MapPin, Film, User, Armchair } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { useToast } from '../context/ToastContext';
import * as htmlToImage from 'html-to-image';
import { jsPDF } from 'jspdf';
import { API } from '../config/api';

export default function Profile() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { formatPrice } = useCurrency();
  const { showToast } = useToast();
  
  const user = JSON.parse(localStorage.getItem('tb_user')) || JSON.parse(localStorage.getItem('sso_user'));

  const handleCancel = async (booking) => {
    const showDateTime = new Date(`${booking.booking_date} ${booking.booking_time}`);
    if (!isNaN(showDateTime.getTime())) {
      const hoursDiff = (showDateTime - new Date()) / (1000 * 60 * 60);
      if (hoursDiff < 2) {
        showToast("Cancellations are only allowed up to 2 hours before the showtime.", "warning");
        return;
      }
    }

    if (!confirm("Are you sure you want to cancel this booking and get a refund?")) return;

    try {
      const res = await fetch(`${API}/api/bookings/${booking.booking_id}/cancel`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('tb_token')}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      
      showToast(data.message || "Booking cancelled successfully!", "success");
      setBookings(bookings.map(b => b.booking_id === booking.booking_id ? { ...b, status: 'cancelled' } : b));
    } catch (err) {
      showToast(err.message || "An error occurred", "error");
    }
  };

  const handleDownloadTicket = async (booking) => {
    const element = document.getElementById(`ticket-${booking.booking_id}`);
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
      pdf.save(`Ticket_${booking.booking_id}.pdf`);
    } catch (err) {
      console.error(err);
      showToast("Failed to download ticket: " + (err.message || String(err)), "error");
    }
  };

  const handleExportCSV = () => {
    if (bookings.length === 0) return;
    const headers = ['Booking ID', 'Movie', 'Theatre', 'Date', 'Time', 'Seats', 'Total Amount', 'Status'];
    const rows = bookings.map(b => [
      b.booking_id,
      b.title || 'Movie Ticket',
      b.theatre || 'GoMo Theatre',
      new Date(b.created_at).toLocaleDateString(),
      b.booking_time,
      b.seats.join(' '),
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
    link.setAttribute('download', 'booking_history.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    
    if (user.role === 'owner') {
      navigate('/owner', { replace: true });
      return;
    }
    if (user.role === 'admin') {
      navigate('/admin', { replace: true });
      return;
    }

    const email = user.email || 'guest@gomodeals.com';
    
    fetch(`${API}/api/profile/bookings/${email}`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('tb_token')}` }
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch bookings");
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setBookings(data);
        } else {
          setBookings([]);
        }
      })
      .catch(err => {
        console.error(err);
        setBookings([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate, user]);

  if (!user) return null;

  return (
    <div className="bg-zinc-50 min-h-screen pt-32 pb-16 font-sans">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Profile Header */}
        <div className="bg-white border border-zinc-200 shadow-sm rounded-3xl p-8 mb-12 flex flex-col md:flex-row items-center gap-8">
          <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white text-4xl font-black shrink-0 shadow-[0_10px_20px_rgba(249,115,22,0.3)]">
            {user.full_name?.charAt(0) || user.email?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-black text-zinc-900 mb-2 tracking-tight">{user.full_name || 'Valued Customer'}</h1>
            <p className="text-zinc-500 font-bold flex items-center justify-center md:justify-start gap-2 text-sm uppercase tracking-wider">
              <User size={16} className="text-orange-500" /> {user.email}
            </p>
          </div>
          <div className="md:ml-auto">
            <Link to="/" className="bg-zinc-900 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-bold flex items-center gap-3 transition-all hover:shadow-[0_10px_30px_rgba(249,115,22,0.3)] hover:-translate-y-1 uppercase tracking-widest text-sm">
              <Film size={18} /> Book More Tickets
            </Link>
          </div>
        </div>

        <div className="mb-10 flex items-center justify-between border-b border-zinc-200 pb-4">
          <h2 className="text-3xl font-black text-zinc-900 flex items-center gap-3 tracking-tight">
            <Ticket className="text-orange-500" size={32} />
            My Ticket Bookings
          </h2>
          <div className="flex items-center gap-4">
            <button 
              onClick={handleExportCSV}
              disabled={bookings.length === 0}
              className="text-xs font-bold px-4 py-2 bg-white border border-zinc-200 text-zinc-600 rounded-lg shadow-sm hover:bg-zinc-50 hover:text-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider"
            >
              Export CSV
            </button>
            <div className="bg-orange-50 text-orange-600 text-sm font-bold px-5 py-2 rounded-full border border-orange-200">
              {bookings.length} Bookings
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-orange-500"></div>
          </div>
        ) : bookings.length === 0 ? (
          <div className="bg-white border border-zinc-200 rounded-3xl p-16 text-center shadow-sm">
            <div className="w-24 h-24 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-zinc-100">
              <Ticket className="text-zinc-300" size={48} />
            </div>
            <h3 className="text-2xl font-black text-zinc-900 mb-4 tracking-tight">No tickets yet</h3>
            <p className="text-zinc-500 mb-8 max-w-md mx-auto font-medium leading-relaxed">Looks like you haven't booked any movies recently. Grab some popcorn and book your first show!</p>
            <Link to="/" className="inline-flex bg-orange-600 text-white font-bold px-8 py-4 rounded-full shadow-sm transition-all hover:bg-orange-500 hover:-translate-y-1 uppercase tracking-widest text-sm hover:shadow-[0_10px_30px_rgba(249,115,22,0.3)]">
              Explore Movies
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {bookings.map((booking) => (
              <div key={booking.booking_id} id={`ticket-${booking.booking_id}`} className={`group bg-white border border-zinc-200 rounded-3xl overflow-hidden flex flex-col sm:flex-row shadow-sm hover:shadow-xl hover:border-orange-300 transition-all duration-300 ${booking.status === 'cancelled' ? 'opacity-70 grayscale' : ''}`}>
                
                {/* Visual Left Strip */}
                <div className="bg-zinc-900 w-full sm:w-36 p-6 flex flex-col items-center justify-center text-white border-r border-dashed border-zinc-700 relative overflow-hidden group-hover:bg-orange-600 transition-colors duration-500">
                  <div className="absolute -left-4 w-8 h-8 bg-zinc-50 rounded-full top-1/2 -translate-y-1/2"></div>
                  <Ticket size={32} className="mb-3 text-orange-500 group-hover:text-white transition-colors" />
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 group-hover:text-orange-200 transition-colors mb-1">Admit</p>
                  <p className="text-4xl font-black">{booking.seats.length}</p>
                </div>

                {/* Ticket Details */}
                <div className="p-8 flex-1 flex flex-col justify-between relative bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat">
                  <div className="absolute -right-4 w-8 h-8 bg-zinc-50 rounded-full top-1/2 -translate-y-1/2 border-l border-zinc-200 group-hover:border-orange-300 transition-colors"></div>
                  
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-2xl font-black text-zinc-900 line-clamp-1 group-hover:text-orange-600 transition-colors tracking-tight">{booking.title || "Movie Ticket"}</h3>
                      {booking.status === 'cancelled' ? (
                        <span className="bg-red-50 text-red-700 border border-red-200 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Cancelled</span>
                      ) : (
                        <span className="bg-green-50 text-green-700 border border-green-200 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Confirmed</span>
                      )}
                    </div>

                    <div className="space-y-4 mb-8">
                      <div className="flex items-center gap-4 text-sm font-bold text-zinc-600">
                        <MapPin size={18} className="text-zinc-400" />
                        {booking.theatre || "GoMo Theatre"}
                      </div>
                      <div className="flex items-center gap-4 text-sm font-bold text-zinc-600">
                        <Calendar size={18} className="text-zinc-400" />
                        {new Date(booking.created_at).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-4 text-sm font-bold text-zinc-600">
                        <Armchair size={18} className="text-zinc-400" />
                        <span className="bg-zinc-100 px-3 py-1.5 rounded-lg border border-zinc-200 text-zinc-800 font-bold">{booking.seats.join(', ')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t-2 border-dashed border-zinc-200 pt-6 flex justify-between items-end">
                    <div>
                      <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-1">Booking ID</p>
                      <p className="text-sm text-zinc-900 font-black">{booking.booking_id ? String(booking.booking_id).split('-')[0] : 'N/A'}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-3xl text-orange-600 mb-2">
                        {formatPrice(booking.total_amount !== null && booking.total_amount !== undefined ? Number(booking.total_amount) : booking.seats.length * (booking.base_price !== null && booking.base_price !== undefined ? Number(booking.base_price) : 4))}
                      </p>
                      {booking.status !== 'cancelled' && (
                        <div className="flex gap-2 justify-end" data-html2canvas-ignore="true">
                          <button onClick={() => handleDownloadTicket(booking)} className="text-xs bg-zinc-900 text-white font-bold px-3 py-1.5 rounded-lg hover:bg-orange-600 transition-colors">Download</button>
                          <button onClick={() => handleCancel(booking)} className="text-xs bg-red-50 text-red-600 font-bold px-3 py-1.5 rounded-lg border border-red-200 hover:bg-red-100 transition-colors">Cancel</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
