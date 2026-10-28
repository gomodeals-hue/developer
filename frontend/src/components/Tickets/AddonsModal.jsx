import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';
import { API } from '../../config/ticketApi';

export default function AddonsModal({ isOpen, onClose, ownerId, onProceed }) {
  const [addons, setAddons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});
  const { formatPrice } = useCurrency();

  useEffect(() => {
    if (!isOpen || !ownerId) return;
    setLoading(true);
    fetch(`${API}/api/addons/${ownerId}`)
      .then(res => res.json())
      .then(data => {
        setAddons(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [isOpen, ownerId]);

  if (!isOpen) return null;

  const handleIncrement = (addon) => {
    setQuantities(prev => ({
      ...prev,
      [addon.id]: (prev[addon.id] || 0) + 1
    }));
  };

  const handleDecrement = (addon) => {
    setQuantities(prev => {
      const current = prev[addon.id] || 0;
      if (current <= 1) {
        const next = { ...prev };
        delete next[addon.id];
        return next;
      }
      return { ...prev, [addon.id]: current - 1 };
    });
  };

  const handleProceed = () => {
    const selectedAddons = Object.entries(quantities).map(([id, qty]) => {
      const addon = addons.find(a => a.id === id);
      return { ...addon, quantity: qty };
    });
    onProceed(selectedAddons);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
        <div className="p-6 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/50">
          <div>
            <h2 className="text-2xl font-black text-zinc-900 flex items-center gap-2">
              <ShoppingBag className="text-orange-500" /> Enhance Your Movie
            </h2>
            <p className="text-sm text-zinc-500 font-medium mt-1">Grab some snacks before you checkout!</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
            <X className="text-zinc-400" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-600"></div>
            </div>
          ) : addons.length === 0 ? (
            <div className="text-center py-12 text-zinc-400">
              <ShoppingBag size={48} className="mx-auto opacity-20 mb-4" />
              <p className="font-medium">No snacks available for this theatre.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {addons.map(addon => (
                <div key={addon.id} className="border border-zinc-200 rounded-2xl p-4 flex gap-4 bg-white hover:border-orange-200 transition-colors">
                  <div className="w-20 h-20 bg-zinc-100 rounded-xl overflow-hidden shrink-0">
                    {addon.image_url ? (
                      <img src={addon.image_url} alt={addon.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-300">
                        <ShoppingBag size={24} />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col flex-1">
                    <h3 className="font-bold text-zinc-900 leading-tight">{addon.name}</h3>
                    <p className="text-orange-600 font-black mt-1">{formatPrice(addon.price)}</p>

                    <div className="mt-auto flex items-center justify-between pt-2">
                      {quantities[addon.id] ? (
                        <div className="flex items-center gap-3 bg-zinc-50 rounded-lg p-1 border border-zinc-200">
                          <button onClick={() => handleDecrement(addon)} className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-zinc-600 hover:text-orange-600">
                            <Minus size={14} />
                          </button>
                          <span className="font-bold text-zinc-900 w-4 text-center text-sm">{quantities[addon.id]}</span>
                          <button onClick={() => handleIncrement(addon)} className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-zinc-600 hover:text-orange-600">
                            <Plus size={14} />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleIncrement(addon)}
                          className="text-xs font-bold bg-orange-50 text-orange-600 px-3 py-1.5 rounded-lg hover:bg-orange-100 transition-colors"
                        >
                          Add to Order
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-6 border-t border-zinc-100 bg-zinc-50 flex items-center justify-between">
          <button onClick={handleProceed} className="w-full bg-orange-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-orange-500 hover:-translate-y-0.5 transition-all uppercase tracking-widest text-sm flex justify-center items-center gap-2">
            Proceed to Pay
          </button>
        </div>
      </div>
    </div>
  );
}
