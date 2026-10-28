import React, { useState } from 'react';
import { X, Bell } from 'lucide-react';
import { API } from '../../config/ticketApi';

export default function WaitlistModal({ isOpen, onClose, showtimeId, date, time }) {
  const [email, setEmail] = useState(() => {
    const ssoUser = JSON.parse(localStorage.getItem('tb_user')) || JSON.parse(localStorage.getItem('sso_user'));
    return ssoUser?.email || '';
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch(`${API}/api/waitlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          showtime_id: showtimeId,
          booking_date: date,
          booking_time: time,
          email
        })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Failed to join waitlist');
      }
      
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-zinc-900/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative animate-slide-up">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-full transition-colors">
          <X size={20} />
        </button>
        
        <div className="p-8">
          <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mb-6">
            <Bell size={24} />
          </div>
          
          <h2 className="text-2xl font-black text-zinc-900 mb-2 tracking-tight">Join Waitlist</h2>
          <p className="text-zinc-500 font-medium text-sm mb-8 leading-relaxed">
            This showtime is currently sold out. Leave your email and we'll notify you instantly if seats become available due to cancellations.
          </p>
          
          {success ? (
            <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-xl flex flex-col items-center text-center">
              <span className="font-black text-lg mb-1">You're on the list! 🎉</span>
              <span className="text-sm font-medium">Keep an eye on your inbox. We'll email {email} if seats open up.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                <input 
                  type="email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all font-medium text-zinc-900"
                  placeholder="Enter your email"
                />
              </div>
              
              {error && (
                <div className="text-red-600 text-sm font-bold bg-red-50 p-3 rounded-lg border border-red-100">
                  {error}
                </div>
              )}
              
              <button 
                type="submit" 
                disabled={loading || !email}
                className="w-full bg-zinc-900 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-zinc-800 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:hover:translate-y-0"
              >
                {loading ? 'Joining...' : 'Notify Me'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
