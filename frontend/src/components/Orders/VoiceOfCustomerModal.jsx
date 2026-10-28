import React, { useState, useEffect } from 'react';
import { 
  X, MessageSquare, Send, CheckCircle2, AlertCircle, 
  Store, ShieldCheck, Clock, User, Package, ChevronRight, HelpCircle, Ticket
} from 'lucide-react';
import { vocService } from '../../services/vocService';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import RaiseTicketModal from '../common/RaiseTicketModal';

export default function VoiceOfCustomerModal({ 
  isOpen, 
  onClose, 
  order, 
  product, 
  onInquirySubmitted 
}) {
  const { user } = useAuth();

  const [category, setCategory] = useState('Product Defect / Quality Issue');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState('normal');
  const [loading, setLoading] = useState(false);
  const [existingInquiries, setExistingInquiries] = useState([]);
  const [replyText, setReplyText] = useState('');
  const [activeInquiryId, setActiveInquiryId] = useState(null);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

  // Derive target product and exact seller
  const targetProduct = product || (order?.items && order.items[0]) || {};
  const sellerId = targetProduct.seller_id || order?.seller_id || 'seller-1';
  const sellerName = targetProduct.seller_name || order?.seller_name || 'Verified GoMo Deals Merchant';

  // Fetch any past inquiries for this order
  const loadOrderInquiries = async () => {
    if (!order?.order_id && !order?.id) return;
    try {
      const orderId = order.order_id || order.id;
      const res = await vocService.getOrderInquiries(orderId);
      if (res?.success && Array.isArray(res.data)) {
        setExistingInquiries(res.data);
        if (res.data.length > 0 && !activeInquiryId) {
          setActiveInquiryId(res.data[0].id);
        }
      }
    } catch (err) {
      console.error('Error fetching order inquiries:', err);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadOrderInquiries();
      setSubject(`Inquiry regarding ${targetProduct.name || 'my ordered item'}`);
      setMessage('');
      setReplyText('');
    }
  }, [isOpen, order, product]);

  if (!isOpen) return null;

  const handleSubmitNewInquiry = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.error('Please enter your issue description.');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        order_id: order?.id || order?.order_id || 'GMD-ORD-DIRECT',
        order_number: order?.order_number || order?.order_id || order?.id || 'GOMO-ORDER',
        product_id: targetProduct.product_id || targetProduct.id || 'general',
        product_name: targetProduct.name || targetProduct.title || 'Ordered Product',
        product_thumbnail: targetProduct.thumbnail || targetProduct.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
        seller_id: sellerId,
        seller_name: sellerName,
        customer_id: user?.customer_id || user?.id || 'usr-1',
        customer_name: user?.name || order?.customer_name || 'Verified Buyer',
        customer_email: user?.email || order?.customer_email || 'customer@gomodeals.com',
        customer_phone: user?.phone || order?.customer_phone || '+91 98450 12345',
        category,
        subject: subject.trim() || `Inquiry on Order #${order?.order_number || order?.id}`,
        message: message.trim(),
        priority
      };

      const res = await vocService.submitInquiry(payload);
      if (res?.success) {
        toast.success(`Your issue has been sent directly to ${sellerName}!`);
        setMessage('');
        await loadOrderInquiries();
        if (onInquirySubmitted) onInquirySubmitted(res.data || res.inquiry);
      }
    } catch (err) {
      console.error('Failed to submit VOC inquiry:', err);
      toast.error('Failed to send issue to seller. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSendCustomerReply = async (inquiryId) => {
    if (!replyText.trim()) return;
    setLoading(true);
    try {
      const res = await vocService.replyToInquiry(inquiryId, {
        message: replyText.trim(),
        sender: 'customer',
        sender_name: user?.name || order?.customer_name || 'Customer'
      });
      if (res?.success) {
        toast.success('Your message has been sent to the seller.');
        setReplyText('');
        await loadOrderInquiries();
      }
    } catch (err) {
      toast.error('Failed to send message.');
    } finally {
      setLoading(false);
    }
  };

  const activeInquiry = existingInquiries.find(inq => inq.id === activeInquiryId) || existingInquiries[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white max-w-2xl w-full rounded-3xl p-6 shadow-2xl border border-stone-200 max-h-[92vh] overflow-y-auto text-left space-y-4 my-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
              <MessageSquare size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-stone-900">Voice of Customer</h3>
                <span className="bg-orange-100 text-orange-800 text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                  Direct to Seller
                </span>
              </div>
              <p className="text-xs text-stone-500">
                Ask any question or report an issue directly to the verified seller of this item.
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-700 rounded-lg cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Item & Exact Seller Card */}
        <div className="p-3.5 bg-orange-50/60 border border-orange-200/80 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <img
              src={targetProduct.thumbnail || targetProduct.image}
              alt={targetProduct.name}
              className="w-12 h-12 rounded-xl object-cover border border-orange-200 bg-white shrink-0"
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&q=80'; }}
            />
            <div className="min-w-0">
              <span className="font-mono text-[10px] text-orange-700 font-bold block">
                Order #{order?.order_number || order?.order_id || 'GOMO-ORDER'}
              </span>
              <p className="font-bold text-stone-900 truncate max-w-sm">
                {targetProduct.name || targetProduct.title || 'Ordered Item'}
              </p>
              <div className="flex items-center gap-1.5 text-[11px] text-stone-600 font-medium mt-0.5">
                <Store size={12} className="text-orange-600" />
                <span>Exact Seller: <strong className="text-stone-800">{sellerName}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white rounded-xl border border-orange-200 text-[11px] text-emerald-800 font-bold self-start sm:self-auto shrink-0 shadow-2xs">
            <ShieldCheck size={14} className="text-emerald-600" />
            <span>Verified Partner</span>
          </div>
        </div>

        {/* Existing Threads vs New Query Tab Selector */}
        {existingInquiries.length > 0 && (
          <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
              Inquiries:
            </span>
            {existingInquiries.map((inq, idx) => (
              <button
                key={inq.id}
                onClick={() => setActiveInquiryId(inq.id)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                  activeInquiryId === inq.id
                    ? 'bg-orange-600 text-white shadow-2xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                <span>#{idx + 1} ({inq.category})</span>
                <span className={`w-2 h-2 rounded-full ${
                  inq.status === 'resolved' ? 'bg-emerald-400' :
                  inq.status === 'seller_replied' ? 'bg-sky-400' : 'bg-amber-400'
                }`} />
              </button>
            ))}
            <button
              onClick={() => setActiveInquiryId('new')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeInquiryId === 'new'
                  ? 'bg-orange-600 text-white shadow-2xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              + Ask New Issue
            </button>
          </div>
        )}

        {/* VIEW 1: Active Inquiry Thread Conversation */}
        {activeInquiry && activeInquiryId !== 'new' ? (
          <div className="space-y-4">
            
            {/* Thread Status Strip */}
            <div className="flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-stone-400 block">Issue Category</span>
                <span className="font-bold text-stone-800">{activeInquiry.category}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-stone-400 block">Status</span>
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                  activeInquiry.status === 'resolved' ? 'bg-emerald-100 text-emerald-800' :
                  activeInquiry.status === 'seller_replied' ? 'bg-sky-100 text-sky-800' :
                  'bg-amber-100 text-amber-900'
                }`}>
                  {activeInquiry.status.replace('_', ' ')}
                </span>
              </div>
            </div>

            {/* Conversation Log */}
            <div className="space-y-3 max-h-64 overflow-y-auto p-3.5 bg-stone-50/70 rounded-2xl border border-stone-100">
              {(activeInquiry.conversation || []).map((msg, idx) => {
                const isSeller = msg.sender === 'seller';
                return (
                  <div
                    key={idx}
                    className={`flex flex-col ${isSeller ? 'items-start' : 'items-end'}`}
                  >
                    <span className="text-[10px] text-stone-400 font-medium mb-1 px-1">
                      {isSeller ? `${sellerName} (Seller)` : 'You (Customer)'} • {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <div className={`p-3 rounded-2xl text-xs max-w-[85%] ${
                      isSeller
                        ? 'bg-white text-stone-800 border border-stone-200 rounded-tl-xs shadow-2xs font-normal'
                        : 'bg-orange-600 text-white rounded-tr-xs font-medium'
                    }`}>
                      {msg.message}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Resolution Notes If Marked Resolved */}
            {activeInquiry.resolution_notes && (
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Seller Resolution Notes:</p>
                  <p className="text-[11px] text-emerald-800 mt-0.5">{activeInquiry.resolution_notes}</p>
                </div>
              </div>
            )}

            {/* Customer Reply Input */}
            {activeInquiry.status !== 'resolved' && (
              <div className="flex gap-2 items-center pt-2 border-t border-stone-100">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendCustomerReply(activeInquiry.id)}
                  placeholder="Type a reply back to the seller..."
                  className="flex-1 px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:border-orange-500"
                />
                <button
                  type="button"
                  disabled={loading || !replyText.trim()}
                  onClick={() => handleSendCustomerReply(activeInquiry.id)}
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <Send size={13} />
                  <span>Send</span>
                </button>
              </div>
            )}

          </div>
        ) : (
          /* VIEW 2: New Inquiry Form */
          <form onSubmit={handleSubmitNewInquiry} className="space-y-3.5 text-xs">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Issue / Topic Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:border-orange-500 cursor-pointer"
                >
                  <option value="Product Defect / Quality Issue">Item Quality or Defect</option>
                  <option value="Wrong Item / Size Mismatch">Wrong Size / Fit / Variant</option>
                  <option value="Delivery Delay / Tracking Query">Courier / Delivery Delay</option>
                  <option value="Missing Parts / Accessories">Missing Items or Accoutrements</option>
                  <option value="Care & Maintenance Advice">Care, Polish or Usage Guide</option>
                  <option value="Return / Replacement Assistance">Return / Replacement Assistance</option>
                  <option value="General Product Inquiry">General Inquiry to Seller</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:border-orange-500 cursor-pointer"
                >
                  <option value="normal">Normal Priority (24h response)</option>
                  <option value="urgent">Urgent Priority (Direct notification)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Brief summary of your question or issue..."
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 mb-1">
                Describe the Issue or Question in Detail *
              </label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Please describe what happened, whether the package was damaged, any specific queries regarding material, size, or return..."
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:border-orange-500 text-xs"
              />
            </div>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-[11px] text-stone-600 space-y-0.5">
              <p className="font-bold text-stone-800">Direct Merchant Channel:</p>
              <p>Your message will be sent directly to <strong>{sellerName}</strong>. You will receive updates directly on this order in your My Orders page.</p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-stone-200 rounded-xl text-stone-700 font-bold hover:bg-stone-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white rounded-xl font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <Send size={13} />
                <span>{loading ? 'Submitting...' : 'Submit to Seller'}</span>
              </button>
            </div>
          </form>
        )}

        {/* Support Ticket Escalation Banner */}
        <div className="bg-stone-50 border-t border-stone-200 px-6 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-stone-600">
            <Ticket size={15} className="text-orange-600 shrink-0" />
            <span className="text-[11px]">
              <strong>Note:</strong> You need to raise a ticket after any issue with order deliveries, damages, or dispute mediation.
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsTicketModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition shrink-0 cursor-pointer shadow-xs"
          >
            <Ticket size={12} className="text-orange-400" />
            <span>Raise Official Ticket</span>
          </button>
        </div>

      </div>

      {/* Support Ticket Modal */}
      <RaiseTicketModal
        isOpen={isTicketModalOpen}
        onClose={() => setIsTicketModalOpen(false)}
        initialData={{
          order_id: order?.id || order?.order_id,
          order_number: order?.order_number || order?.id,
          product_name: targetProduct.name || targetProduct.title,
          author_id: user?.id || 'usr-1',
          author_name: user?.name || order?.customer_name || 'Customer',
          author_email: user?.email || order?.customer_email,
          seller_id: sellerId,
          category: 'shipping_delay'
        }}
        userType="customer"
        onSuccess={(ticket) => {
          toast.success(`Official Support Ticket #${ticket.id} raised successfully!`);
        }}
      />
    </div>
  );
}
