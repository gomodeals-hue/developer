import React, { useState } from 'react';
import { X, Ticket, AlertCircle, CheckCircle2, ShieldCheck, Clock, Send, HelpCircle, FileText } from 'lucide-react';
import { ticketService } from '../../services/ticketService';

export default function RaiseTicketModal({
  isOpen,
  onClose,
  initialData = {},
  userType = 'seller', // 'seller' | 'customer'
  onSuccess
}) {
  const [category, setCategory] = useState(initialData.category || (userType === 'seller' ? 'shipping_performance' : 'shipping_delay'));
  const [subject, setSubject] = useState(initialData.subject || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [priority, setPriority] = useState(initialData.priority || 'medium');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [createdTicket, setCreatedTicket] = useState(null);

  if (!isOpen) return null;

  const sellerCategories = [
    { value: 'shipping_performance', label: 'Shipping Performance & SLA Waiver' },
    { value: 'late_delivery', label: 'Late Delivery / Courier Pickup Issue' },
    { value: 'pdt_policy_compliance', label: 'Product Policy Compliance (PDT)' },
    { value: 'commission_payout', label: 'Payout & 0% Commission Tier Inquiry' },
    { value: 'damaged_return', label: 'Transit Damage / Customer Return Dispute' },
    { value: 'general', label: 'General Merchant Support' }
  ];

  const customerCategories = [
    { value: 'shipping_delay', label: 'Delivery Delay / Tracking Issue' },
    { value: 'damaged_item', label: 'Damaged or Defective Item Received' },
    { value: 'wrong_product', label: 'Incorrect Item / Size / Variant' },
    { value: 'return_pickup', label: 'Return Pickup Escalation' },
    { value: 'refund_issue', label: 'Refund or Payment Settlement' },
    { value: 'general', label: 'General Customer Concierge' }
  ];

  const categories = userType === 'seller' ? sellerCategories : customerCategories;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subject.trim()) {
      setError('Please provide a descriptive subject line.');
      return;
    }
    if (!description.trim()) {
      setError('Please describe your issue in detail.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const payload = {
        author_type: userType,
        author_id: initialData.author_id || (userType === 'seller' ? 'seller-1' : 'usr-1'),
        author_name: initialData.author_name || (userType === 'seller' ? 'Verified Merchant' : 'Customer'),
        author_email: initialData.author_email || '',
        seller_id: initialData.seller_id || null,
        order_id: initialData.order_id || null,
        order_number: initialData.order_number || (initialData.order_id ? `GOMO-2026-${initialData.order_id.replace(/\D/g, '')}` : null),
        product_name: initialData.product_name || null,
        category,
        subject: subject.trim(),
        description: description.trim(),
        priority
      };

      const res = await ticketService.raiseTicket(payload);
      if (res.success && res.ticket) {
        setCreatedTicket(res.ticket);
        if (onSuccess) {
          onSuccess(res.ticket);
        }
      } else {
        setError(res.message || 'Failed to submit ticket. Please retry.');
      }
    } catch (err) {
      setError('Network communication failed. Please check connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetAndClose = () => {
    setCreatedTicket(null);
    setSubject('');
    setDescription('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-200 text-left font-sans">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-stone-900 text-white px-6 py-4 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-600/30 border border-orange-500/40 flex items-center justify-center text-orange-400">
              <Ticket size={18} />
            </div>
            <div>
              <h2 className="text-base font-bold tracking-tight">
                {createdTicket ? 'Ticket Generated Successfully' : 'Raise Support Ticket'}
              </h2>
              <p className="text-[11px] text-stone-400">
                Official grievance redressal & platform inquiry portal
              </p>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="text-stone-400 hover:text-white p-1 rounded-lg hover:bg-stone-800 transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Mandatory Policy Banner */}
        <div className="bg-amber-50 border-b border-amber-200 px-6 py-2.5 flex items-start gap-2.5">
          <AlertCircle size={15} className="text-amber-700 shrink-0 mt-0.5" />
          <div className="text-[11px] text-amber-900 leading-relaxed">
            <strong className="font-bold">Important Notice:</strong> You need to raise a ticket after any issue to ensure formal investigation, audit trail logging, and prompt resolution by our support team.
          </div>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {createdTicket ? (
            <div className="space-y-5 text-center py-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 size={32} />
              </div>
              <div>
                <h3 className="text-lg font-black text-stone-900">
                  Ticket #{createdTicket.id}
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Your ticket has been logged with our priority support team.
                </p>
              </div>

              <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-left space-y-2 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-stone-200">
                  <span className="text-stone-500 font-medium">Ticket ID:</span>
                  <span className="font-mono font-bold text-orange-600">{createdTicket.id}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-stone-200">
                  <span className="text-stone-500 font-medium">Category:</span>
                  <span className="font-semibold text-stone-800 capitalize">{createdTicket.category.replace(/_/g, ' ')}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-stone-200">
                  <span className="text-stone-500 font-medium">Priority:</span>
                  <span className="font-bold uppercase text-amber-700">{createdTicket.priority}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-500 font-medium">Response SLA:</span>
                  <span className="font-semibold text-stone-700">Within 4 business hours</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="w-full py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
                >
                  Done & Return
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle size={14} className="shrink-0 text-rose-600" />
                  <span>{error}</span>
                </div>
              )}

              {/* Order Reference Badge if present */}
              {(initialData.order_id || initialData.order_number) && (
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-orange-700 block">Related Order Reference</span>
                    <span className="font-mono font-bold text-stone-800">
                      {initialData.order_number || initialData.order_id}
                    </span>
                    {initialData.product_name && (
                      <span className="text-stone-600 block text-[11px] truncate max-w-sm mt-0.5">
                        {initialData.product_name}
                      </span>
                    )}
                  </div>
                  <span className="bg-orange-200 text-orange-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Linked Order
                  </span>
                </div>
              )}

              {/* Category */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Issue Classification Category <span className="text-rose-500">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition"
                >
                  {categories.map(c => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Subject / Summary <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="E.g., BlueDart courier pickup delayed past 24h SLA"
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs font-medium text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition"
                  required
                />
              </div>

              {/* Priority */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Severity / Priority Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'low', label: 'Low', desc: 'General Question' },
                    { id: 'medium', label: 'Medium', desc: 'Standard Issue' },
                    { id: 'high', label: 'High', desc: 'Urgent Action Required' }
                  ].map(p => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPriority(p.id)}
                      className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                        priority === p.id 
                          ? 'border-orange-600 bg-orange-50 text-orange-950 font-bold shadow-2xs' 
                          : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50 font-medium'
                      }`}
                    >
                      <div className="text-xs">{p.label}</div>
                      <div className="text-[10px] text-stone-500 mt-0.5">{p.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Detailed Explanation of the Issue <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide precise details, courier names, airway bill numbers, dates, or item conditions..."
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs font-medium text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition resize-none"
                  required
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-end gap-2 border-t border-stone-200">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-4 py-2 border border-stone-200 text-stone-700 hover:bg-stone-100 rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-1.5 px-5 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <span>Submitting Ticket...</span>
                  ) : (
                    <>
                      <Send size={13} />
                      <span>Submit Ticket</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
