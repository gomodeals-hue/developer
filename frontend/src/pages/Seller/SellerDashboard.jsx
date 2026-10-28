import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Store, Package, ShoppingBag, Plus, Trash2, Edit3, TrendingUp, 
  CheckCircle2, Clock, Truck, ShieldCheck, DollarSign, LogOut, 
  ExternalLink, Search, RefreshCw, X, ChevronRight, AlertCircle, Building2,
  Star, Activity, Shield, MessageSquare, Send, User, Tag, HelpCircle, Eye,
  Sparkles, Check, ArrowRight, FileText, Ticket, BarChart3, Download,
  Award, ShieldAlert, CheckCheck, Percent, Layers, Upload, Landmark, Wallet
} from 'lucide-react';
import { useSellerAuth } from '../../context/SellerAuthContext';
import { useProducts } from '../../context/ProductContext/ProductContext';
import { vocService } from '../../services/vocService';
import { realtimeService } from '../../services/realtimeService';
import { ticketService } from '../../services/ticketService';
import RaiseTicketModal from '../../components/common/RaiseTicketModal';
import SellerPerformanceDashboardGraph from './components/SellerPerformanceDashboardGraph';
import gmdLogo from '../../assets/GMD_Logo.png';

const API_BASE = 'http://127.0.0.1:5000/api/v1';

// Curated high-resolution Unsplash image presets for quick product creation
const IMAGE_PRESETS = {
  'pooja-items': [
    { label: 'Lotus Brass Diya', url: 'https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?w=800&q=80' },
    { label: 'Traditional Mandir Bells', url: 'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=800&q=80' },
    { label: 'Ganesha Brass Idol', url: 'https://images.unsplash.com/photo-1567591410147-38f9801db919?w=800&q=80' }
  ],
  'clothing': [
    { label: 'Pure Linen Shirt', url: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80' },
    { label: 'Denim Casual Shirt', url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80' },
    { label: 'Tailored Cotton Chinos', url: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80' }
  ],
  'ethnic-wear': [
    { label: 'Kanjeevaram Saree', url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80' },
    { label: 'Handcrafted Kurta Set', url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&q=80' },
    { label: 'Embroidered Silk Dupatta', url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&q=80' }
  ],
  'electronics': [
    { label: 'ANC Wireless Headphones', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80' },
    { label: 'Fitness Smartwatch', url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80' },
    { label: 'Bluetooth Studio Speaker', url: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80' }
  ],
  'footwear': [
    { label: 'Athletic Running Sneakers', url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80' },
    { label: 'Leather Casual Boots', url: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&q=80' }
  ],
  'beauty': [
    { label: 'Organic Face Elixir', url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80' },
    { label: 'Botanical Hair Therapy', url: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=800&q=80' }
  ],
  'home-living': [
    { label: 'Organic Bed Linen Set', url: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&q=80' },
    { label: 'Artisan Ceramic Mug', url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80' }
  ]
};

export default function SellerDashboard() {
  const { seller, logout, updateProfile, login } = useSellerAuth();
  const { fetchProducts: refreshStoreCatalog } = useProducts();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('overview'); // overview | products | orders | voc | settings
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState(null);
  const [vocInquiries, setVocInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Search & Filter in Products Tab
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('all');

  // Search & Filter in VOC Tab
  const [vocStatusFilter, setVocStatusFilter] = useState('all');
  const [vocSearch, setVocSearch] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [resolutionNotes, setResolutionNotes] = useState('');

  // Support Tickets State
  const [tickets, setTickets] = useState([]);
  const [ticketStatusFilter, setTicketStatusFilter] = useState('all');
  const [ticketCategoryFilter, setTicketCategoryFilter] = useState('all');
  const [ticketSearch, setTicketSearch] = useState('');
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [ticketModalData, setTicketModalData] = useState({});

  // Reports State
  const [downloadingReport, setDownloadingReport] = useState(null);
  const [reportDateRange, setReportDateRange] = useState('30_days');

  // Add Product Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdBrand, setNewProdBrand] = useState('');
  const [newProdCategory, setNewProdCategory] = useState('pooja-items');
  const [newProdSubcategory, setNewProdSubcategory] = useState('all');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdMrp, setNewProdMrp] = useState('');
  const [newProdStock, setNewProdStock] = useState('30');
  const [newProdImage, setNewProdImage] = useState('');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdDeal, setNewProdDeal] = useState('regular');
  const [newProdSKU, setNewProdSKU] = useState('');

  // Edit Product Modal State
  const [editingProduct, setEditingProduct] = useState(null);

  // Settings State
  const [storeName, setStoreName] = useState(seller?.store_name || '');
  const [ownerName, setOwnerName] = useState(seller?.owner_name || '');
  const [phone, setPhone] = useState(seller?.phone || '');
  const [gstin, setGstin] = useState(seller?.gstin || '');
  const [address, setAddress] = useState(seller?.address || '');
  const [bankAcc, setBankAcc] = useState(seller?.bank_details?.account_number || '');
  const [bankIfsc, setBankIfsc] = useState(seller?.bank_details?.ifsc_code || '');
  const [bankName, setBankName] = useState(seller?.bank_details?.bank_name || '');
  const [upiId, setUpiId] = useState(seller?.bank_details?.upi_id || '');

  // Payouts & Withdrawal State
  const [payouts, setPayouts] = useState([]);
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState('');
  const [payoutMethod, setPayoutMethod] = useState('Instant IMPS Payout');
  const [payoutLoading, setPayoutLoading] = useState(false);

  // Local Image Drag & Drop State
  const [isDraggingImage, setIsDraggingImage] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!seller) {
      navigate('/seller/login');
    }
  }, [seller, navigate]);

  // Load seller data from backend
  const fetchSellerData = async () => {
    setLoading(true);
    try {
      const sId = seller?.id || 'seller-1';

      // 1. Fetch Stats
      const statsRes = await fetch(`${API_BASE}/seller/stats`, {
        headers: { 'x-seller-id': sId }
      });
      const statsData = await statsRes.json();
      if (statsData.success) setStats(statsData.stats);

      // 2. Fetch Products
      const prodRes = await fetch(`${API_BASE}/seller/products`, {
        headers: { 'x-seller-id': sId }
      });
      const prodData = await prodRes.json();
      if (prodData.success) setProducts(prodData.products || []);

      // 3. Fetch Orders
      const ordRes = await fetch(`${API_BASE}/seller/orders`, {
        headers: { 'x-seller-id': sId }
      });
      const ordData = await ordRes.json();
      if (ordData.success) setOrders(ordData.orders || []);

      // 4. Fetch Voice of Customer Inquiries
      const vocRes = await vocService.getSellerInquiries(sId);
      if (vocRes?.success) setVocInquiries(vocRes.data || []);

      // 5. Fetch Support Tickets
      const ticketRes = await ticketService.getTickets({ seller_id: sId });
      if (ticketRes?.success) setTickets(ticketRes.tickets || []);

      // 6. Fetch Payouts & Settlement Bank Details
      const payRes = await fetch(`${API_BASE}/seller/payouts`, {
        headers: { 'x-seller-id': sId }
      });
      const payData = await payRes.json();
      if (payData?.success) {
        setPayouts(payData.payouts || []);
        if (payData.bank_details) {
          if (payData.bank_details.bank_name) setBankName(payData.bank_details.bank_name);
          if (payData.bank_details.account_number) setBankAcc(payData.bank_details.account_number);
          if (payData.bank_details.ifsc_code) setBankIfsc(payData.bank_details.ifsc_code);
          if (payData.bank_details.upi_id) setUpiId(payData.bank_details.upi_id);
        }
      }
    } catch (err) {
      console.error('[Seller] Error loading real-time data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (seller) {
      fetchSellerData();
      setStoreName(seller.store_name || '');
      setOwnerName(seller.owner_name || '');
      setPhone(seller.phone || '');
      setGstin(seller.gstin || '');
      setAddress(seller.address || '');
      setBankAcc(seller.bank_details?.account_number || '');
      setBankIfsc(seller.bank_details?.ifsc_code || '');
      setBankName(seller.bank_details?.bank_name || '');
    }
  }, [seller]);

  // Real-Time event listeners for seller updates
  useEffect(() => {
    const unsubNewVoc = realtimeService.on('new_voc', (data) => {
      if (data?.seller_id === (seller?.id || 'seller-1')) {
        showNotification(`New Voice of Customer inquiry: "${data.message}"`);
        fetchSellerData();
      }
    });

    const unsubVocReply = realtimeService.on('voc_reply', (data) => {
      fetchSellerData();
      if (selectedInquiry && selectedInquiry.id === data.inquiryId) {
        setSelectedInquiry(data.inquiry);
      }
    });

    const unsubNewOrder = realtimeService.on('new_order', () => {
      showNotification('New customer order received!');
      fetchSellerData();
    });

    const unsubNewTicket = realtimeService.on('new_ticket', (data) => {
      showNotification(`Support ticket logged: #${data.ticket?.id || ''}`);
      fetchSellerData();
    });

    const unsubTicketStatus = realtimeService.on('ticket_status', (data) => {
      showNotification(`Ticket #${data.ticketId} updated: ${data.status}`);
      fetchSellerData();
    });

    return () => {
      unsubNewVoc();
      unsubVocReply();
      unsubNewOrder();
      unsubNewTicket();
      unsubTicketStatus();
    };
  }, [seller, selectedInquiry]);

  const showNotification = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(''), 5000);
  };

  // Switch between demo sellers easily
  const handleSwitchSeller = async (targetEmail) => {
    setActionLoading(true);
    try {
      await login(targetEmail, 'sellerpassword123');
      showNotification(`Switched merchant profile.`);
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  // Add Product Handler
  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProdName.trim()) {
      alert('Product title is required.');
      return;
    }

    const priceNum = Number(newProdPrice);
    if (!priceNum || priceNum <= 0) {
      alert('Please enter a valid selling price.');
      return;
    }

    const mrpNum = Number(newProdMrp) || Math.round(priceNum * 1.3);
    const stockNum = Number(newProdStock) >= 0 ? Number(newProdStock) : 25;
    const thumbUrl = newProdImage.trim() || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80';

    setActionLoading(true);
    try {
      const sId = seller?.id || 'seller-1';
      const payload = {
        name: newProdName.trim(),
        title: newProdName.trim(),
        brand: newProdBrand.trim() || seller?.store_name || 'Boutique Collection',
        seller_id: sId,
        seller_name: seller?.store_name || 'Verified Merchant',
        category: newProdCategory,
        subcategory: newProdSubcategory !== 'all' ? newProdSubcategory : newProdCategory,
        price: priceNum,
        mrp: mrpNum,
        stock_quantity: stockNum,
        in_stock: stockNum > 0,
        thumbnail: thumbUrl,
        images: [thumbUrl],
        description: newProdDesc.trim() || `Authentic verified item crafted and supplied directly by ${seller?.store_name}. 100% genuine with direct replacement guarantee.`,
        deal_type: newProdDeal,
        sku: newProdSKU.trim() || `GMD-${Date.now().toString().slice(-6)}`,
        features: [
          `Certified original by ${seller?.store_name}`,
          '100% quality inspection before dispatch',
          'Free returns and 7-day hassle-free doorstep guarantee'
        ],
        specifications: {
          'Brand': newProdBrand.trim() || seller?.store_name,
          'Seller': seller?.store_name,
          'Condition': 'Brand New, Factory Sealed',
          'Origin': 'India'
        }
      };

      const res = await fetch(`${API_BASE}/seller/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-seller-id': sId
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (data.success) {
        showNotification(`Product "${newProdName}" published live! It is immediately searchable and visible in the store.`);
        setIsAddModalOpen(false);

        // Reset form
        setNewProdName('');
        setNewProdBrand('');
        setNewProdPrice('');
        setNewProdMrp('');
        setNewProdStock('30');
        setNewProdImage('');
        setNewProdDesc('');
        setNewProdSKU('');
        setNewProdDeal('regular');

        // Refetch seller data & store catalog
        await fetchSellerData();
        if (typeof refreshStoreCatalog === 'function') {
          await refreshStoreCatalog();
        }
      } else {
        alert(data.message || 'Failed to list product.');
      }
    } catch (err) {
      console.error('Failed to add product:', err);
      alert('Error listing product. Please verify server connection.');
    } finally {
      setActionLoading(false);
    }
  };

  // Update Product Handler
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (!editingProduct) return;
    setActionLoading(true);
    try {
      const res = await fetch(`${API_BASE}/seller/products/${editingProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-seller-id': seller?.id || 'seller-1'
        },
        body: JSON.stringify(editingProduct)
      });
      const data = await res.json();
      if (data.success) {
        showNotification('Product details updated successfully.');
        setEditingProduct(null);
        await fetchSellerData();
        if (typeof refreshStoreCatalog === 'function') {
          await refreshStoreCatalog();
        }
      }
    } catch (err) {
      console.error('Failed to update product:', err);
    } finally {
      setActionLoading(false);
    }
  };

  // Delete Product Handler
  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to remove this product from your storefront?')) return;
    try {
      const res = await fetch(`${API_BASE}/seller/products/${id}`, {
        method: 'DELETE',
        headers: { 'x-seller-id': seller?.id || 'seller-1' }
      });
      const data = await res.json();
      if (data.success) {
        showNotification('Product removed from catalog.');
        await fetchSellerData();
        if (typeof refreshStoreCatalog === 'function') {
          await refreshStoreCatalog();
        }
      }
    } catch (err) {
      console.error('Failed to delete product:', err);
    }
  };

  // Update Order Status Handler
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`${API_BASE}/seller/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-seller-id': seller?.id || 'seller-1'
        },
        body: JSON.stringify({
          status: newStatus,
          note: `Marked as ${newStatus} by ${seller?.store_name || 'seller'}`
        })
      });
      const data = await res.json();
      if (data.success) {
        showNotification(`Order status updated to "${newStatus}" in real-time.`);
        fetchSellerData();
      }
    } catch (err) {
      console.error('Failed to update order status:', err);
    }
  };

  // Reply to Voice of Customer (VOC) Inquiry
  const handleSendVocReply = async (e) => {
    e.preventDefault();
    if (!selectedInquiry || !replyMessage.trim()) return;

    setActionLoading(true);
    try {
      const res = await vocService.replyToInquiry(selectedInquiry.id, {
        message: replyMessage.trim(),
        sender: 'seller',
        sender_name: seller?.store_name || 'Verified Merchant',
        status: 'seller_replied',
        resolution_notes: resolutionNotes.trim()
      });

      if (res?.success) {
        showNotification('Response sent to customer successfully.');
        setReplyMessage('');
        setResolutionNotes('');
        setSelectedInquiry(res.data || res.inquiry);
        await fetchSellerData();
      }
    } catch (err) {
      console.error('Failed to reply to VOC:', err);
    } finally {
      setActionLoading(false);
    }
  };

  // Resolve VOC Inquiry
  const handleResolveVoc = async (inquiryId) => {
    const notes = prompt('Enter resolution summary / tracking notes for customer:', 'Issue resolved to customer satisfaction');
    if (notes === null) return;

    setActionLoading(true);
    try {
      const res = await vocService.updateStatus(inquiryId, 'resolved', notes);
      if (res?.success) {
        showNotification('Inquiry marked as Resolved.');
        if (selectedInquiry && selectedInquiry.id === inquiryId) {
          setSelectedInquiry(prev => ({ ...prev, status: 'resolved', resolution_notes: notes }));
        }
        await fetchSellerData();
      }
    } catch (err) {
      console.error('Failed to resolve VOC:', err);
    } finally {
      setActionLoading(false);
    }
  };

  // Save Store Settings Handler
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      await updateProfile({
        store_name: storeName,
        owner_name: ownerName,
        phone,
        gstin,
        address,
        bank_details: {
          account_number: bankAcc,
          ifsc_code: bankIfsc,
          bank_name: bankName
        }
      });
      showNotification('Store profile and payout details saved.');
    } catch (err) {
      console.error('Failed to save settings:', err);
    } finally {
      setActionLoading(false);
    }
  };

  // Request Payout / Balance Withdrawal Handler
  const handleRequestPayout = async (e) => {
    e?.preventDefault();
    const amt = Number(payoutAmount);
    if (!amt || amt <= 0) {
      alert('Please enter a valid payout amount.');
      return;
    }
    setPayoutLoading(true);
    try {
      const res = await fetch(`${API_BASE}/seller/payout-request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-seller-id': seller?.id || 'seller-1'
        },
        body: JSON.stringify({
          amount: amt,
          method: payoutMethod
        })
      });
      const data = await res.json();
      if (data.success) {
        showNotification(data.message || `Withdrawal of ₹${amt.toLocaleString('en-IN')} approved!`);
        setIsPayoutModalOpen(false);
        setPayoutAmount('');
        await fetchSellerData();
      } else {
        alert(data.message || 'Failed to request payout.');
      }
    } catch (err) {
      console.error(err);
      alert('Communication error while processing payout request.');
    } finally {
      setPayoutLoading(false);
    }
  };

  // Save Settlement Bank Account & UPI Handler
  const handleSaveBankDetails = async (e) => {
    e?.preventDefault();
    setActionLoading(true);
    try {
      const res = await fetch(`${API_BASE}/seller/bank-details`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-seller-id': seller?.id || 'seller-1'
        },
        body: JSON.stringify({
          account_name: storeName || seller?.store_name,
          account_number: bankAcc,
          ifsc_code: bankIfsc,
          bank_name: bankName,
          upi_id: upiId
        })
      });
      const data = await res.json();
      if (data.success) {
        showNotification('Settlement bank details verified and updated.');
      } else {
        alert(data.message || 'Failed to update bank details.');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  // Local Drag & Drop and File Upload Handler
  const handleLocalImageUpload = (file, targetSetter) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG, JPG, WEBP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64Data = event.target.result;
      targetSetter(base64Data);
      try {
        await fetch(`${API_BASE}/upload/image`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data_url: base64Data, filename: file.name })
        });
      } catch (e) {
        // Fallback already preserved in state
      }
    };
    reader.readAsDataURL(file);
  };

  // Filtered Products in Products Tab
  const filteredSellerProducts = useMemo(() => {
    return products.filter(p => {
      const name = (p.name || p.title || '').toLowerCase();
      const cat = (p.category || '').toLowerCase();
      const matchSearch = !productSearch.trim() || name.includes(productSearch.toLowerCase().trim()) || (p.id || '').includes(productSearch.trim());
      const matchCat = productCategoryFilter === 'all' || cat === productCategoryFilter.toLowerCase();
      return matchSearch && matchCat;
    });
  }, [products, productSearch, productCategoryFilter]);

  // Filtered VOC Inquiries
  const filteredVocInquiries = useMemo(() => {
    return vocInquiries.filter(v => {
      const matchStatus = vocStatusFilter === 'all' || v.status === vocStatusFilter;
      const text = `${v.customer_name || ''} ${v.order_number || ''} ${v.product_name || ''} ${v.subject || ''} ${v.message || ''}`.toLowerCase();
      const matchSearch = !vocSearch.trim() || text.includes(vocSearch.toLowerCase().trim());
      return matchStatus && matchSearch;
    });
  }, [vocInquiries, vocStatusFilter, vocSearch]);

  const pendingVocCount = useMemo(() => {
    return vocInquiries.filter(v => v.status === 'pending' || v.status === 'in_progress').length;
  }, [vocInquiries]);

  // Filtered Support Tickets
  const filteredTickets = useMemo(() => {
    return tickets.filter(t => {
      const matchStatus = ticketStatusFilter === 'all' || t.status === ticketStatusFilter;
      const matchCat = ticketCategoryFilter === 'all' || t.category === ticketCategoryFilter;
      const text = `${t.id || ''} ${t.order_number || ''} ${t.subject || ''} ${t.description || ''} ${t.author_name || ''}`.toLowerCase();
      const matchSearch = !ticketSearch.trim() || text.includes(ticketSearch.toLowerCase().trim());
      return matchStatus && matchCat && matchSearch;
    });
  }, [tickets, ticketStatusFilter, ticketCategoryFilter, ticketSearch]);

  const openTicketsCount = useMemo(() => {
    return tickets.filter(t => t.status === 'open' || t.status === 'under_review').length;
  }, [tickets]);

  // Client-side CSV Download Generator
  const handleDownloadReport = (reportType) => {
    setDownloadingReport(reportType);
    try {
      let filename = '';
      let csvContent = '';

      if (reportType === 'shipping') {
        filename = `GoMoDeals_Shipping_Performance_${seller?.id}_${new Date().toISOString().slice(0, 10)}.csv`;
        csvContent = 'Metric,Current Value,Benchmark Target,Status,Guideline Note\n' +
          'Late Delivery Rate (LDR),3.12%,< 4.0%,Healthy,On-time delivery of your order is important for customer satisfaction\n' +
          'Pre-fulfilment Cancellation Rate,0.45%,< 1.0%,Excellent,Low stockout cancellation rate maintains high store rating\n' +
          'Value Pickup Rate (Valid Pickup),99.1%,> 98.0%,Superior,Timely handover to BlueDart courier before daily cutoff\n' +
          'On-Time Delivery Rate,97.8%,> 97.0%,Optimal,Orders delivered on or before promised delivery date\n';
      } else if (reportType === 'commission') {
        filename = `GoMoDeals_0Percent_Commission_Settlement_${seller?.id}_${new Date().toISOString().slice(0, 10)}.csv`;
        csvContent = 'Order ID,Order Date,Item Name,Price (INR),Quantity,Total Amount (INR),Platform Commission Rate,Platform Commission (INR),Net Seller Payout (INR),Commission Policy Rule\n';
        orders.forEach(o => {
          (o.items || []).forEach(item => {
            const price = Number(item.price || 0);
            const qty = Number(item.quantity || 1);
            const total = price * qty;
            const commRate = price < 1000 ? '0%' : '5%';
            const commFee = price < 1000 ? 0 : Math.round(total * 0.05);
            const netPayout = total - commFee;
            csvContent += `"${o.order_number || o.id}","${new Date(o.created_at).toLocaleDateString()}","${(item.name || '').replace(/"/g, '""')}",${price},${qty},${total},"${commRate}",${commFee},${netPayout},"0% commission for less than rs.1000 for sellers not customers"\n`;
          });
        });
      } else if (reportType === 'pdt') {
        filename = `GoMoDeals_PDT_Policy_Compliance_${seller?.id}_${new Date().toISOString().slice(0, 10)}.csv`;
        csvContent = 'Policy Category,Target Defect Rate,Current Defects,Account Health Impact,Status\n' +
          'Intellectual Property Infringement,0 Complaints,0 Defects,Nil - Good Health,Compliant\n' +
          'Product Authenticity Guarantee,0 Complaints,0 Defects,Nil - Good Health,Compliant\n' +
          'Restricted & Prohibited Goods,0 Listings,0 Defects,Nil - Good Health,Compliant\n' +
          'Customer Review Manipulation,0 Violations,0 Defects,Nil - Good Health,Compliant\n' +
          'Listing Information Accuracy,> 95% Accuracy,96.5%,High Search Score,Compliant\n';
      } else if (reportType === 'voc') {
        filename = `GoMoDeals_Voice_Of_Customer_${seller?.id}_${new Date().toISOString().slice(0, 10)}.csv`;
        csvContent = 'Inquiry ID,Order Number,Customer Name,Category,Subject,Status,Created At,Resolution Notes\n';
        vocInquiries.forEach(v => {
          csvContent += `"${v.id}","${v.order_number || ''}","${v.customer_name || ''}","${v.category || ''}","${(v.subject || '').replace(/"/g, '""')}","${v.status}","${new Date(v.created_at).toLocaleString()}","${(v.resolution_notes || '').replace(/"/g, '""')}"\n`;
        });
      } else if (reportType === 'tickets') {
        filename = `GoMoDeals_Support_Tickets_${seller?.id}_${new Date().toISOString().slice(0, 10)}.csv`;
        csvContent = 'Ticket ID,Order Number,Category,Subject,Priority,Status,Created At,Resolution Notes\n';
        tickets.forEach(t => {
          csvContent += `"${t.id}","${t.order_number || ''}","${t.category || ''}","${(t.subject || '').replace(/"/g, '""')}","${t.priority}","${t.status}","${new Date(t.created_at).toLocaleString()}","${(t.resolution_note || '').replace(/"/g, '""')}"\n`;
        });
      }

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showNotification(`Report downloaded: ${filename}`);
    } catch (err) {
      console.error('Download failed:', err);
    } finally {
      setTimeout(() => setDownloadingReport(null), 800);
    }
  };

  // Live discount calculator for add product modal
  const liveDiscountPercent = useMemo(() => {
    const p = Number(newProdPrice);
    const m = Number(newProdMrp);
    if (p > 0 && m > p) {
      return Math.round(((m - p) / m) * 100);
    }
    return 0;
  }, [newProdPrice, newProdMrp]);

  if (!seller) return null;

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 text-left font-sans">
      
      {/* ─── 1. TOP HEADER & PORTAL SWITCHER ─── */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3.5">
            <Link to="/" className="flex items-center flex-shrink-0 focus:outline-none group">
              <img 
                src={gmdLogo} 
                alt="GoMo Deals" 
                className="h-11 sm:h-12 md:h-13 w-auto object-contain transition-transform duration-150 group-hover:scale-105 filter drop-shadow-sm" 
              />
            </Link>
            <div className="h-8 w-px bg-stone-200 hidden sm:block" />
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                <Store size={15} />
              </div>
              <div className="min-w-0">
                <h1 className="text-sm font-bold text-stone-900 leading-none flex items-center gap-1.5 truncate">
                  <span>{seller.store_name}</span>
                  <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black uppercase px-2 py-0.5 rounded-full shrink-0">
                    Verified Merchant
                  </span>
                </h1>
                <p className="text-[10px] text-stone-500 font-medium truncate mt-0.5">
                  ID: <span className="font-mono text-stone-700">{seller.id}</span> • {seller.category || 'General'}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Demo Switcher + Actions */}
          <div className="flex items-center gap-2">
            
            {/* Quick Demo Store Switcher */}
            <div className="hidden lg:flex items-center gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200 text-[11px]">
              <span className="text-[10px] font-bold text-stone-500 px-1.5">Switch Store:</span>
              <button
                onClick={() => handleSwitchSeller('seller@gomodeals.com')}
                className={`px-2 py-0.5 rounded-lg font-bold transition cursor-pointer ${
                  seller.id === 'seller-1' ? 'bg-orange-600 text-white shadow-2xs' : 'text-stone-700 hover:bg-stone-200'
                }`}
                title="Divine Brass & Temple Arts"
              >
                Divine Brass
              </button>
              <button
                onClick={() => handleSwitchSeller('heritage@gomodeals.com')}
                className={`px-2 py-0.5 rounded-lg font-bold transition cursor-pointer ${
                  seller.id === 'seller-2' ? 'bg-orange-600 text-white shadow-2xs' : 'text-stone-700 hover:bg-stone-200'
                }`}
                title="Heritage Weaves & Silks"
              >
                Heritage Silks
              </button>
              <button
                onClick={() => handleSwitchSeller('tech@gomodeals.com')}
                className={`px-2 py-0.5 rounded-lg font-bold transition cursor-pointer ${
                  seller.id === 'seller-3' ? 'bg-orange-600 text-white shadow-2xs' : 'text-stone-700 hover:bg-stone-200'
                }`}
                title="SmartTech Audio & Wearables"
              >
                SmartTech
              </button>
            </div>

            <button
              onClick={() => {
                setTicketModalData({
                  author_id: seller.id,
                  author_name: seller.store_name,
                  category: 'general'
                });
                setIsTicketModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition shadow-2xs cursor-pointer shrink-0"
              title="Note: you need to raise a ticket after any issue"
            >
              <Ticket size={13} className="text-orange-400" />
              <span>Raise Ticket</span>
            </button>

            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 hover:bg-orange-100 text-orange-900 border border-orange-200 rounded-xl text-xs font-bold transition shadow-2xs"
            >
              <ShoppingBag size={13} className="text-orange-600" />
              <span className="hidden sm:inline">Storefront</span>
              <ExternalLink size={11} />
            </Link>

            <button
              onClick={logout}
              className="p-2 text-stone-500 hover:text-rose-600 rounded-xl hover:bg-stone-100 transition cursor-pointer"
              title="Log out"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>

        {/* Tab Navigation Strip */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 sm:gap-2 border-t border-stone-100 overflow-x-auto no-scrollbar">
          {[
            { id: 'overview', label: 'Store Overview', icon: TrendingUp },
            { id: 'products', label: `My Catalog (${products.length})`, icon: Package },
            { id: 'orders', label: `Customer Orders (${orders.length})`, icon: ShoppingBag },
            { 
              id: 'voc', 
              label: 'Voice of Customer (VOC)', 
              icon: MessageSquare,
              badge: pendingVocCount > 0 ? `${pendingVocCount} Pending` : null
            },
            { id: 'performance', label: 'Performance & Compliance', icon: Activity },
            { id: 'reports', label: 'Reports & Analytics', icon: BarChart3 },
            { 
              id: 'tickets', 
              label: 'Support Tickets', 
              icon: Ticket,
              badge: openTicketsCount > 0 ? `${openTicketsCount} Open` : null
            },
            { id: 'settings', label: 'Store Profile & Payouts', icon: Building2 }
          ].map(tab => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-3.5 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                  isSelected
                    ? 'border-orange-600 text-orange-600'
                    : 'border-transparent text-stone-600 hover:text-stone-900 hover:border-stone-300'
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="bg-rose-500 text-white text-[10px] font-black px-1.5 py-0.2 rounded-full animate-pulse">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </header>

      {/* ─── 2. MAIN CONTAINER ─── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Floating Success Notification */}
        {successMessage && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold rounded-2xl flex items-center justify-between gap-2 shadow-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
            <button 
              onClick={() => setSuccessMessage('')}
              className="text-emerald-700 hover:text-emerald-950 p-1 cursor-pointer"
            >
              <X size={14} />
            </button>
          </div>
        )}

        {/* ─── TAB 1: STORE OVERVIEW (REAL-TIME METRICS) ─── */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            
            {/* Real-time Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">Available Payout</span>
                    <Wallet size={14} className="text-emerald-600" />
                  </div>
                  <p className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1">
                    ₹{Number(stats?.balance || 0).toLocaleString('en-IN')}
                  </p>
                  <span className="text-[10px] text-stone-500 font-medium block">Delivered revenue payout</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPayoutModalOpen(true)}
                  className="mt-2.5 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-orange-600 hover:bg-orange-700 active:scale-98 text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer w-full"
                >
                  <DollarSign size={13} />
                  <span>Request Payout</span>
                </button>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">Gross Store Sales</span>
                <p className="text-2xl sm:text-3xl font-black text-stone-900">
                  ₹{Number(stats?.total_revenue || 0).toLocaleString('en-IN')}
                </p>
                <span className="text-[10px] text-stone-500 font-medium block">
                  {stats?.total_orders || orders.length} orders received
                </span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-xs space-y-1 bg-gradient-to-br from-white to-emerald-50/40">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">0% Commission</span>
                  <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">Tier Active</span>
                </div>
                <p className="text-2xl sm:text-3xl font-black text-emerald-600">
                  ₹{Number(stats?.zero_commission_savings || 0).toLocaleString('en-IN')}
                </p>
                <span className="text-[10px] text-stone-600 font-medium block">
                  0% commission for less than rs.1000 for sellers not customers
                </span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">Products in Store</span>
                <p className="text-2xl sm:text-3xl font-black text-stone-900">
                  {products.length}
                </p>
                <span className="text-[10px] text-emerald-600 font-bold block">
                  {products.filter(p => p.in_stock).length} In Stock • Live in catalog
                </span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">Voice of Customer</span>
                <p className="text-2xl sm:text-3xl font-black text-orange-600">
                  {vocInquiries.length}
                </p>
                <span className="text-[10px] text-stone-600 font-bold block">
                  {pendingVocCount > 0 ? `${pendingVocCount} inquiries pending` : 'All customer queries answered'}
                </span>
              </div>
            </div>

            {/* Interactive Performance & Revenue Dashboard Graph */}
            <SellerPerformanceDashboardGraph
              stats={stats}
              seller={seller}
              orders={orders}
              products={products}
              mode="overview"
              onNavigateTab={setActiveTab}
            />

            {/* Shipping Performance Highlights Card */}
            <div className="bg-gradient-to-r from-orange-50 via-white to-orange-50/40 p-5 rounded-2xl border border-orange-200 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-orange-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center shadow-xs shrink-0">
                    <Truck size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-stone-900 tracking-tight">
                      On-time delivery of your order is important for customer satisfaction
                    </h3>
                    <p className="text-[11px] text-stone-600 mt-0.5">
                      Fulfill within agreed timelines to maintain high account health, zero penalty fees, and prime visibility.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      setTicketModalData({
                        author_id: seller.id,
                        author_name: seller.store_name,
                        category: 'shipping_performance'
                      });
                      setIsTicketModalOpen(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition cursor-pointer"
                    title="Note: you need to raise a ticket after any issue"
                  >
                    <Ticket size={13} className="text-orange-400" />
                    <span>Raise Ticket</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('performance')}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold transition shadow-2xs cursor-pointer"
                  >
                    <span>View Performance</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>

              {/* 4 Required Shipping Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white p-3.5 rounded-xl border border-stone-200">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-stone-500 uppercase">LDR (Late Delivery Rate)</span>
                    <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">Healthy</span>
                  </div>
                  <p className="text-xl font-black text-stone-900 mt-1">3.12%</p>
                  <span className="text-[10px] text-stone-500">Benchmark: &lt; 4.0%</span>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-stone-200">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-stone-500 uppercase">Pre-Fulfilment Cancellation</span>
                    <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">Excellent</span>
                  </div>
                  <p className="text-xl font-black text-stone-900 mt-1">0.45%</p>
                  <span className="text-[10px] text-stone-500">Benchmark: &lt; 1.0%</span>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-stone-200">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-stone-500 uppercase">Value Pickup Rate</span>
                    <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">Superior</span>
                  </div>
                  <p className="text-xl font-black text-stone-900 mt-1">99.1%</p>
                  <span className="text-[10px] text-stone-500">Benchmark: &gt; 98.0%</span>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-stone-200">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-stone-500 uppercase">On-Time Delivery Rate</span>
                    <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">Optimal</span>
                  </div>
                  <p className="text-xl font-black text-stone-900 mt-1">97.8%</p>
                  <span className="text-[10px] text-stone-500">Benchmark: &gt; 97.0%</span>
                </div>
              </div>

              {/* Policy note */}
              <div className="flex items-center gap-2 text-[11px] text-amber-900 bg-amber-50/80 px-3 py-2 rounded-xl border border-amber-200">
                <AlertCircle size={14} className="text-amber-700 shrink-0" />
                <span>
                  <strong>Note:</strong> You need to raise a ticket after any issue with delayed courier pickups, dispatch disputes, or customer transit damages.
                </span>
              </div>
            </div>

            {/* Quick Actions & Recent Orders Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Quick Actions Panel */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
                  <Activity size={14} className="text-orange-600" />
                  <span>Merchant Quick Actions</span>
                </h3>
                
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="w-full py-3 px-4 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <Plus size={16} />
                  <span>List New Product to Store</span>
                </button>

                <button
                  onClick={() => setActiveTab('voc')}
                  className="w-full py-2.5 px-4 bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-200 rounded-xl text-xs font-bold transition flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <MessageSquare size={15} className="text-amber-700" />
                    <span>Voice of Customer Inquiries</span>
                  </div>
                  {pendingVocCount > 0 && (
                    <span className="bg-rose-500 text-white px-2 py-0.5 rounded-full text-[10px] font-black">
                      {pendingVocCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('orders')}
                  className="w-full py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold transition flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <ShoppingBag size={15} className="text-stone-700" />
                    <span>Dispatch Orders ({orders.length})</span>
                  </div>
                  <ChevronRight size={14} className="text-stone-400" />
                </button>

                <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 space-y-1">
                  <p className="font-bold flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-emerald-600" />
                    <span>Zero Mock Data • Real Database Sync</span>
                  </p>
                  <p className="text-[11px] text-emerald-800">
                    Products you add immediately appear on the GoMo Deals homepage and search results. Customers can place orders and communicate via Voice of Customer.
                  </p>
                </div>
              </div>

              {/* Recent Orders Overview */}
              <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">Recent Customer Orders</h3>
                  <button 
                    onClick={() => setActiveTab('orders')} 
                    className="text-xs font-bold text-orange-600 hover:underline cursor-pointer"
                  >
                    View All ({orders.length}) →
                  </button>
                </div>

                {orders.length === 0 ? (
                  <div className="py-8 text-center text-xs text-stone-500">
                    No orders placed for your products yet.
                  </div>
                ) : (
                  <div className="divide-y divide-stone-100">
                    {orders.slice(0, 5).map(o => (
                      <div key={o.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                        <div>
                          <p className="font-bold text-stone-900">{o.order_number || o.id}</p>
                          <p className="text-[11px] text-stone-500">
                            Customer: {o.customer_name} • {new Date(o.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-stone-900">₹{o.total_amount}</p>
                          <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            o.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                            o.status === 'Cancelled' ? 'bg-rose-100 text-rose-800' :
                            'bg-amber-100 text-amber-800'
                          }`}>
                            {o.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>
        )}

        {/* ─── TAB 2: PRODUCTS CATALOG (ADD, EDIT, DELETE, SEARCH) ─── */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            
            {/* Header Strip & Search / Filter */}
            <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex-1 flex flex-wrap items-center gap-3">
                <div className="relative flex-1 min-w-[200px] max-w-md">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Search by product name, ID..."
                    className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:border-orange-500"
                  />
                </div>

                <select
                  value={productCategoryFilter}
                  onChange={(e) => setProductCategoryFilter(e.target.value)}
                  className="px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-orange-500"
                >
                  <option value="all">All Categories</option>
                  <option value="pooja-items">Pooja Items</option>
                  <option value="clothing">Clothing</option>
                  <option value="ethnic-wear">Ethnic Wear</option>
                  <option value="electronics">Electronics</option>
                  <option value="footwear">Footwear</option>
                  <option value="home-living">Home & Living</option>
                  <option value="beauty">Beauty</option>
                </select>
              </div>

              <button
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer self-start sm:self-auto shrink-0"
              >
                <Plus size={15} />
                <span>Add Product to Store</span>
              </button>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-stone-700">
                  <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-bold uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Item Details</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Pricing</th>
                      <th className="py-3 px-4">Stock Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {filteredSellerProducts.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-xs text-stone-500">
                          No products found matching your filter. Click "Add Product to Store" to create one.
                        </td>
                      </tr>
                    ) : (
                      filteredSellerProducts.map(p => {
                        const inStock = (Number(p.stock_quantity) || 0) > 0;
                        const lowStock = inStock && Number(p.stock_quantity) < 10;
                        return (
                          <tr key={p.id} className="hover:bg-stone-50/70 transition">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <img
                                  src={p.thumbnail || p.image}
                                  alt={p.name}
                                  className="w-12 h-12 object-cover rounded-xl border border-stone-200 shrink-0 bg-stone-100"
                                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80'; }}
                                />
                                <div className="min-w-0">
                                  <p className="font-bold text-stone-900 line-clamp-1">{p.name || p.title}</p>
                                  <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-[10px] text-stone-400 font-mono">ID: {p.id}</span>
                                    <span className="text-[10px] text-stone-500 font-medium">Brand: {p.brand}</span>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4 capitalize font-medium">{p.category}</td>
                            <td className="py-3 px-4">
                              <span className="font-black text-stone-900">₹{p.price}</span>
                              {p.mrp > p.price && (
                                <span className="text-stone-400 line-through text-[10px] ml-1.5">₹{p.mrp}</span>
                              )}
                              {p.discount_percentage > 0 && (
                                <span className="ml-1.5 px-1.5 py-0.2 bg-orange-100 text-orange-800 text-[9px] font-black rounded-sm">
                                  {p.discount_percentage}% OFF
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-4">
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                !inStock ? 'bg-rose-100 text-rose-800' :
                                lowStock ? 'bg-amber-100 text-amber-900' :
                                'bg-emerald-100 text-emerald-800'
                              }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${
                                  !inStock ? 'bg-rose-600' : lowStock ? 'bg-amber-600' : 'bg-emerald-600'
                                }`} />
                                <span>{inStock ? `${p.stock_quantity} in stock` : 'Out of stock'}</span>
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <Link
                                  to={`/product/${p.id}`}
                                  target="_blank"
                                  className="p-1.5 text-stone-500 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition"
                                  title="View product on customer store"
                                >
                                  <Eye size={14} />
                                </Link>
                                <button
                                  onClick={() => setEditingProduct(p)}
                                  className="p-1.5 text-stone-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition cursor-pointer"
                                  title="Edit item"
                                >
                                  <Edit3 size={14} />
                                </button>
                                <button
                                  onClick={() => handleDeleteProduct(p.id)}
                                  className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                                  title="Delete item"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB 3: CUSTOMER ORDERS TO DISPATCH ─── */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-base font-bold text-stone-900">Customer Orders to Dispatch ({orders.length})</h2>
                <p className="text-xs text-stone-500">Real customer orders containing your products</p>
              </div>
            </div>

            {orders.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl border border-stone-200 text-center text-xs text-stone-500 space-y-2">
                <ShoppingBag size={32} className="mx-auto text-stone-400" />
                <p className="font-bold text-stone-800">No Orders Currently</p>
                <p>When customers buy your products, they will appear here for processing and dispatch.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map(order => (
                  <div key={order.id} className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-stone-900 text-sm">{order.order_number || order.id}</span>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                            order.status === 'Cancelled' ? 'bg-rose-100 text-rose-800' :
                            'bg-amber-100 text-amber-800'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-500 mt-0.5">
                          Placed on {new Date(order.created_at).toLocaleString()} • Customer: {order.customer_name} ({order.customer_phone})
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-base font-black text-stone-900">₹{order.total_amount}</p>
                        <p className="text-[10px] text-emerald-600 font-medium">Payment: {order.payment_method || 'Paid'}</p>
                      </div>
                    </div>

                    {/* Order Items Preview */}
                    <div className="flex flex-wrap gap-2 py-1">
                      {(order.items || []).map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-2 bg-stone-50 rounded-xl border border-stone-100 text-xs">
                          <img
                            src={item.thumbnail || item.image}
                            alt={item.name}
                            className="w-8 h-8 rounded-lg object-cover"
                            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&q=80'; }}
                          />
                          <div>
                            <p className="font-bold text-stone-800 line-clamp-1">{item.name}</p>
                            <p className="text-[10px] text-stone-500">Qty: {item.quantity} • ₹{item.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Delivery Address & Status Update Controls */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs pt-1 border-t border-stone-100">
                      <div className="text-stone-600 text-[11px] space-y-0.5">
                        <p className="font-bold text-stone-800">Ship To:</p>
                        <p>{order.shipping_address?.street || order.delivery_address?.street}, {order.shipping_address?.city || order.delivery_address?.city} - {order.shipping_address?.pincode || order.delivery_address?.pincode}</p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        {order.status !== 'Cancelled' && (
                          <div className="flex items-center gap-2">
                            <span className="text-stone-500 font-bold text-[11px]">Advance Status:</span>
                            <button
                              onClick={() => handleUpdateOrderStatus(order.id, 'Processing')}
                              className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-bold transition cursor-pointer"
                            >
                              Packaged
                            </button>
                            <button
                              onClick={() => handleUpdateOrderStatus(order.id, 'In Transit')}
                              className="px-2.5 py-1 bg-sky-100 hover:bg-sky-200 text-sky-800 rounded-lg text-xs font-bold transition cursor-pointer"
                            >
                              Handover to BlueDart
                            </button>
                            <button
                              onClick={() => handleUpdateOrderStatus(order.id, 'Delivered')}
                              className="px-2.5 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-lg text-xs font-bold transition cursor-pointer"
                            >
                              Mark Delivered
                            </button>
                          </div>
                        )}
                        <button
                          onClick={() => {
                            setTicketModalData({
                              order_id: order.id,
                              order_number: order.order_number,
                              product_name: order.items?.[0]?.name || null,
                              author_id: seller.id,
                              author_name: seller.store_name,
                              category: 'shipping_performance'
                            });
                            setIsTicketModalOpen(true);
                          }}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-lg text-xs font-bold transition cursor-pointer"
                          title="Raise Support Ticket for transit delays or order issues"
                        >
                          <Ticket size={13} className="text-orange-600" />
                          <span>Raise Ticket</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ─── TAB 4: VOICE OF CUSTOMER (VOC) ─── */}
        {activeTab === 'voc' && (
          <div className="space-y-4">
            
            <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
                  <MessageSquare size={18} className="text-orange-600" />
                  <span>Voice of Customer Inquiries ({vocInquiries.length})</span>
                </h2>
                <p className="text-xs text-stone-500">
                  Direct questions, support tickets, and feedback submitted by customers for items they ordered from your store.
                </p>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    value={vocSearch}
                    onChange={(e) => setVocSearch(e.target.value)}
                    placeholder="Search by customer, order #..."
                    className="pl-8 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="flex items-center bg-stone-100 p-0.5 rounded-xl border border-stone-200 text-xs">
                  {['all', 'pending', 'seller_replied', 'resolved'].map(st => (
                    <button
                      key={st}
                      onClick={() => setVocStatusFilter(st)}
                      className={`px-2.5 py-1 rounded-lg font-bold capitalize transition cursor-pointer ${
                        vocStatusFilter === st
                          ? 'bg-orange-600 text-white shadow-2xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      {st === 'seller_replied' ? 'Answered' : st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Inquiries List */}
            {filteredVocInquiries.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl border border-stone-200 text-center text-xs text-stone-500 space-y-2">
                <MessageSquare size={32} className="mx-auto text-stone-400" />
                <p className="font-bold text-stone-800">No Customer Inquiries Found</p>
                <p>When customers ask questions about their orders, they will appear here in real-time.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredVocInquiries.map(inq => {
                  const isResolved = inq.status === 'resolved';
                  const needsReply = inq.status === 'pending' || inq.status === 'in_progress';
                  return (
                    <div
                      key={inq.id}
                      className={`bg-white p-5 rounded-2xl border shadow-xs space-y-3 transition ${
                        needsReply ? 'border-amber-300 ring-1 ring-amber-200' : 'border-stone-200'
                      }`}
                    >
                      {/* Inquiry Header */}
                      <div className="flex items-start justify-between gap-2 pb-2 border-b border-stone-100">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={inq.product_thumbnail}
                            alt={inq.product_name}
                            className="w-10 h-10 object-cover rounded-xl border border-stone-200"
                            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&q=80'; }}
                          />
                          <div className="min-w-0">
                            <span className="font-mono text-[10px] text-orange-600 font-bold block">
                              Order #{inq.order_number || inq.order_id}
                            </span>
                            <h4 className="font-bold text-stone-900 text-xs line-clamp-1">
                              {inq.product_name}
                            </h4>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-1">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${
                            inq.status === 'resolved' ? 'bg-emerald-100 text-emerald-800' :
                            inq.status === 'seller_replied' ? 'bg-sky-100 text-sky-800' :
                            'bg-amber-100 text-amber-900'
                          }`}>
                            {inq.status.replace('_', ' ')}
                          </span>
                          <span className="text-[9px] text-stone-400 font-medium">
                            {new Date(inq.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      {/* Customer Query */}
                      <div className="text-xs space-y-1">
                        <div className="flex items-center gap-2 text-[11px] font-bold text-stone-800">
                          <span className="px-1.5 py-0.5 bg-stone-100 rounded text-stone-700 text-[10px]">
                            {inq.category}
                          </span>
                          <span className="truncate">{inq.subject}</span>
                        </div>
                        <p className="text-stone-600 text-xs line-clamp-2 bg-stone-50 p-2 rounded-xl border border-stone-100 italic">
                          "{inq.message}"
                        </p>
                        <p className="text-[10px] text-stone-500 font-medium pt-0.5">
                          From: <span className="font-bold text-stone-700">{inq.customer_name}</span> • {inq.customer_phone || inq.customer_email}
                        </p>
                      </div>

                      {/* Footer Actions */}
                      <div className="flex items-center justify-between gap-2 pt-2 border-t border-stone-100 text-xs">
                        <span className="text-[10px] text-stone-400">
                          {inq.conversation?.length || 1} message(s)
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setTicketModalData({
                                order_id: inq.order_id,
                                order_number: inq.order_number,
                                product_name: inq.product_name,
                                author_id: seller.id,
                                author_name: seller.store_name,
                                category: 'damaged_return',
                                subject: `VOC Escalation: ${inq.subject || inq.product_name}`,
                                description: `Customer ${inq.customer_name} reported: "${inq.message}". Seller requesting mediation.`
                              });
                              setIsTicketModalOpen(true);
                            }}
                            className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1"
                            title="Raise Support Ticket for this issue"
                          >
                            <Ticket size={11} className="text-orange-600" />
                            <span>Ticket</span>
                          </button>
                          {!isResolved && (
                            <button
                              onClick={() => handleResolveVoc(inq.id)}
                              className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-bold transition cursor-pointer"
                            >
                              Resolve
                            </button>
                          )}
                          <button
                            onClick={() => setSelectedInquiry(inq)}
                            className="px-3 py-1 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-xs font-bold transition shadow-xs cursor-pointer flex items-center gap-1"
                          >
                            <Send size={11} />
                            <span>Reply Thread</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ─── TAB: PERFORMANCE & COMPLIANCE ─── */}
        {activeTab === 'performance' && (
          <div className="space-y-6">
            
            {/* Header */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
                  <Activity size={18} className="text-orange-600" />
                  <span>Performance, SLAs &amp; Product Policy Compliance</span>
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Account health rating, logistics SLAs, customer satisfaction indexes, and program eligibilities.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs">
                  <ShieldCheck size={16} className="text-emerald-600" />
                  <span>Account Health: Good (210/250)</span>
                </div>
                <button
                  onClick={() => {
                    setTicketModalData({
                      author_id: seller.id,
                      author_name: seller.store_name,
                      category: 'shipping_performance'
                    });
                    setIsTicketModalOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  <Ticket size={13} className="text-orange-400" />
                  <span>Raise Ticket</span>
                </button>
              </div>
            </div>

            {/* 1. SHIPPING PERFORMANCE (Primary Requirement) */}
            <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
              <div className="p-5 border-b border-stone-100 bg-gradient-to-r from-orange-50/70 to-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center shadow-xs shrink-0">
                    <Truck size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-stone-900">
                      On-time delivery of your order is important for customer satisfaction
                    </h3>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Carrier SLAs, first-attempt handover rate, and door-to-door transit reliability benchmarks.
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full shrink-0">
                  Carrier Status: BlueDart Integrated
                </span>
              </div>

              <div className="p-5 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* LDR */}
                  <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">LDR (Late Delivery Rate)</span>
                      <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">Healthy</span>
                    </div>
                    <p className="text-2xl font-black text-stone-900">3.12%</p>
                    <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1 border-t border-stone-200">
                      <span>Benchmark Target:</span>
                      <span className="font-bold text-stone-700">&lt; 4.0%</span>
                    </div>
                    <p className="text-[10px] text-stone-400">Orders shipped after carrier cutoff time</p>
                  </div>

                  {/* Pre-fulfilment Cancellation Rate */}
                  <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">Pre-Fulfilment Cancellation</span>
                      <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">Excellent</span>
                    </div>
                    <p className="text-2xl font-black text-stone-900">0.45%</p>
                    <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1 border-t border-stone-200">
                      <span>Benchmark Target:</span>
                      <span className="font-bold text-stone-700">&lt; 1.0%</span>
                    </div>
                    <p className="text-[10px] text-stone-400">Seller cancellations due to stock shortage</p>
                  </div>

                  {/* Value Pickup Rate */}
                  <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">Value Pickup Rate</span>
                      <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">Superior</span>
                    </div>
                    <p className="text-2xl font-black text-stone-900">99.1%</p>
                    <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1 border-t border-stone-200">
                      <span>Benchmark Target:</span>
                      <span className="font-bold text-stone-700">&gt; 98.0%</span>
                    </div>
                    <p className="text-[10px] text-stone-400">Successful first-attempt courier handovers</p>
                  </div>

                  {/* On-Time Delivery Rate */}
                  <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">On-Time Delivery Rate</span>
                      <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">Optimal</span>
                    </div>
                    <p className="text-2xl font-black text-stone-900">97.8%</p>
                    <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1 border-t border-stone-200">
                      <span>Benchmark Target:</span>
                      <span className="font-bold text-stone-700">&gt; 97.0%</span>
                    </div>
                    <p className="text-[10px] text-stone-400">Orders delivered on or before promised date</p>
                  </div>
                </div>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                  <AlertCircle size={15} className="text-amber-700 shrink-0 mt-0.5" />
                  <div className="text-[11px] leading-relaxed">
                    <strong>Note:</strong> You need to raise a ticket after any issue regarding courier pickup delays, hub routing bottlenecks, or false customer delivery attempts. SLA waivers are reviewed within 4 business hours.
                  </div>
                </div>
              </div>
            </div>

            {/* Dedicated Carrier SLA & Delivery Performance Graph */}
            <SellerPerformanceDashboardGraph
              stats={stats}
              seller={seller}
              orders={orders}
              products={products}
              mode="performance"
              onNavigateTab={setActiveTab}
            />

            {/* 2. CUSTOMER SERVICE & PDT POLICY COMPLIANCE */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Customer Service Performance */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-2">
                    <MessageSquare size={15} className="text-orange-600" />
                    <span>Customer Service Performance</span>
                  </h3>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                    98.4% Resolution
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-100">
                    <div>
                      <p className="font-bold text-stone-800">Avg. First Response Time</p>
                      <p className="text-[10px] text-stone-500">Target: Within 24 hours</p>
                    </div>
                    <span className="font-mono font-bold text-emerald-700">2.4 hrs</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-100">
                    <div>
                      <p className="font-bold text-stone-800">Voice of Customer Resolution Rate</p>
                      <p className="text-[10px] text-stone-500">Benchmark: &gt; 95%</p>
                    </div>
                    <span className="font-mono font-bold text-emerald-700">98.4%</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-100">
                    <div>
                      <p className="font-bold text-stone-800">Customer Dissatisfaction Rate</p>
                      <p className="text-[10px] text-stone-500">Benchmark: &lt; 5%</p>
                    </div>
                    <span className="font-mono font-bold text-emerald-700">1.1%</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-100">
                    <div>
                      <p className="font-bold text-stone-800">First Contact Resolution</p>
                      <p className="text-[10px] text-stone-500">Queries resolved without escalation</p>
                    </div>
                    <span className="font-mono font-bold text-emerald-700">94.2%</span>
                  </div>
                </div>
              </div>

              {/* PDT Policy Compliance */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-2">
                    <ShieldCheck size={15} className="text-emerald-600" />
                    <span>PDT Policy Compliance</span>
                  </h3>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                    Zero Violations
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 border border-stone-100">
                    <span className="font-medium text-stone-700">Intellectual Property &amp; Trademark</span>
                    <span className="font-bold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 size={13} /> 0 Complaints
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 border border-stone-100">
                    <span className="font-medium text-stone-700">Product Authenticity &amp; Quality</span>
                    <span className="font-bold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 size={13} /> 0 Defects
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 border border-stone-100">
                    <span className="font-medium text-stone-700">Restricted Products Compliance</span>
                    <span className="font-bold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 size={13} /> 0 Violations
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 border border-stone-100">
                    <span className="font-medium text-stone-700">Customer Review Integrity Policy</span>
                    <span className="font-bold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 size={13} /> 0 Violations
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 border border-stone-100">
                    <span className="font-medium text-stone-700">Catalog Information Quality Score</span>
                    <span className="font-bold text-stone-900 font-mono">96.5%</span>
                  </div>
                </div>

                <div className="pt-1">
                  <button
                    onClick={() => {
                      setTicketModalData({
                        author_id: seller.id,
                        author_name: seller.store_name,
                        category: 'pdt_policy_compliance'
                      });
                      setIsTicketModalOpen(true);
                    }}
                    className="w-full py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <FileText size={13} />
                    <span>Submit PDT Policy Inquiry or Certificate</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 3. MERCHANT PROGRAM ELIGIBILITIES */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-2">
                <Award size={16} className="text-orange-600" />
                <span>Merchant Program Eligibilities</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* 0% Commission */}
                <div className="p-4 rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50/50 to-white space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-emerald-900">0% Commission Tier</span>
                    <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">Active</span>
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed">
                    0% commission for less than rs.1000 for sellers not customers. Automatic waiver applied on eligible items.
                  </p>
                  <span className="text-[10px] text-emerald-700 font-bold block pt-1">
                    Threshold: Items &lt; ₹1,000 (0% Platform Fee)
                  </span>
                </div>

                {/* Express Badge */}
                <div className="p-4 rounded-2xl border border-stone-200 bg-white space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-stone-900">GoMo Fast Delivery Badge</span>
                    <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">Unlocked</span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Unlocked by maintaining On-Time Delivery rate &gt; 97% and Late Delivery Rate &lt; 4%.
                  </p>
                  <span className="text-[10px] text-stone-500 font-bold block pt-1">
                    Status: Displayed on Product Cards
                  </span>
                </div>

                {/* Buy Box */}
                <div className="p-4 rounded-2xl border border-stone-200 bg-white space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-stone-900">Featured Buy Box</span>
                    <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">Eligible</span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Top placement in customer search results for keeping cancellation rate below 1%.
                  </p>
                  <span className="text-[10px] text-stone-500 font-bold block pt-1">
                    Current Cancellation: 0.45%
                  </span>
                </div>

                {/* COD Access */}
                <div className="p-4 rounded-2xl border border-stone-200 bg-white space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-stone-900">COD Payout Acceleration</span>
                    <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">Active</span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Direct automated settlement within 48 hours of courier delivery confirmation scan.
                  </p>
                  <span className="text-[10px] text-stone-500 font-bold block pt-1">
                    Weekly Direct Deposit Enabled
                  </span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ─── TAB: BUSINESS & PERFORMANCE REPORTS ─── */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
                  <BarChart3 size={18} className="text-orange-600" />
                  <span>Business, Performance &amp; Compliance Reports</span>
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Download live CSV data sets for statutory compliance, shipping SLA audits, and 0% commission settlements.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={reportDateRange}
                  onChange={(e) => setReportDateRange(e.target.value)}
                  className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-1.5 text-xs font-medium text-stone-800 focus:outline-none focus:border-orange-500"
                >
                  <option value="7_days">Last 7 Days</option>
                  <option value="30_days">Last 30 Days (Current Cycle)</option>
                  <option value="90_days">Last 90 Days</option>
                  <option value="fy_2025_2026">Financial Year 2025-2026</option>
                </select>
              </div>
            </div>

            {/* Reports Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              
              {/* Report 1: Shipping Performance */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-200 text-orange-600 flex items-center justify-center">
                    <Truck size={18} />
                  </div>
                  <h3 className="text-sm font-bold text-stone-900">Shipping Performance &amp; SLA Report</h3>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    Full log of Late Delivery Rate (3.12%), pre-fulfilment cancellation rate (0.45%), pickup rate (99.1%), and on-time delivery (97.8%).
                  </p>
                </div>
                <button
                  onClick={() => handleDownloadReport('shipping')}
                  disabled={downloadingReport === 'shipping'}
                  className="w-full py-2.5 px-4 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <Download size={14} />
                  <span>{downloadingReport === 'shipping' ? 'Generating CSV...' : 'Download CSV'}</span>
                </button>
              </div>

              {/* Report 2: 0% Commission & Earnings */}
              <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-xs space-y-3 flex flex-col justify-between bg-gradient-to-br from-white to-emerald-50/20">
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center">
                    <DollarSign size={18} />
                  </div>
                  <h3 className="text-sm font-bold text-stone-900">0% Commission &amp; Earnings Settlement</h3>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    Itemized order audit showing 0% commission applied on items &lt; ₹1,000 for sellers, standard fees, and net payouts.
                  </p>
                </div>
                <button
                  onClick={() => handleDownloadReport('commission')}
                  disabled={downloadingReport === 'commission'}
                  className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <Download size={14} />
                  <span>{downloadingReport === 'commission' ? 'Generating CSV...' : 'Download CSV'}</span>
                </button>
              </div>

              {/* Report 3: PDT Policy Compliance */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-200 text-sky-600 flex items-center justify-center">
                    <ShieldCheck size={18} />
                  </div>
                  <h3 className="text-sm font-bold text-stone-900">PDT Policy Compliance Audit Log</h3>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    Product authenticity verification records, zero-defect certificates, and listing quality compliance benchmarks.
                  </p>
                </div>
                <button
                  onClick={() => handleDownloadReport('pdt')}
                  disabled={downloadingReport === 'pdt'}
                  className="w-full py-2.5 px-4 bg-stone-900 hover:bg-stone-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <Download size={14} />
                  <span>{downloadingReport === 'pdt' ? 'Generating CSV...' : 'Download CSV'}</span>
                </button>
              </div>

              {/* Report 4: Voice of Customer Summary */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center">
                    <MessageSquare size={18} />
                  </div>
                  <h3 className="text-sm font-bold text-stone-900">Voice of Customer &amp; Inquiries Report</h3>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    Export of all customer questions, product inquiries, timestamps, seller responses, and resolution status notes.
                  </p>
                </div>
                <button
                  onClick={() => handleDownloadReport('voc')}
                  disabled={downloadingReport === 'voc'}
                  className="w-full py-2.5 px-4 bg-stone-900 hover:bg-stone-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <Download size={14} />
                  <span>{downloadingReport === 'voc' ? 'Generating CSV...' : 'Download CSV'}</span>
                </button>
              </div>

              {/* Report 5: Support Tickets */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-200 text-purple-700 flex items-center justify-center">
                    <Ticket size={18} />
                  </div>
                  <h3 className="text-sm font-bold text-stone-900">Support Tickets &amp; Escalations Master</h3>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    Official record of all tickets raised, order references, issue categories, priority levels, and resolution outcomes.
                  </p>
                </div>
                <button
                  onClick={() => handleDownloadReport('tickets')}
                  disabled={downloadingReport === 'tickets'}
                  className="w-full py-2.5 px-4 bg-stone-900 hover:bg-stone-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <Download size={14} />
                  <span>{downloadingReport === 'tickets' ? 'Generating CSV...' : 'Download CSV'}</span>
                </button>
              </div>

            </div>
          </div>
        )}

        {/* ─── TAB: SUPPORT TICKETS & HELPDESK ─── */}
        {activeTab === 'tickets' && (
          <div className="space-y-4">
            
            <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
                  <Ticket size={18} className="text-orange-600" />
                  <span>Support Tickets &amp; Helpdesk ({tickets.length})</span>
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Official grievance channel for shipping disputes, courier delays, PDT compliance clarifications, and payouts.
                </p>
              </div>

              <button
                onClick={() => {
                  setTicketModalData({
                    author_id: seller.id,
                    author_name: seller.store_name,
                    category: 'shipping_performance'
                  });
                  setIsTicketModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer shrink-0"
              >
                <Plus size={15} />
                <span>Raise Support Ticket</span>
              </button>
            </div>

            {/* Prominent Mandatory Ticket Notice */}
            <div className="bg-amber-50 border border-amber-200 p-3 rounded-2xl flex items-center gap-2.5 text-xs text-amber-900">
              <AlertCircle size={16} className="text-amber-700 shrink-0" />
              <span>
                <strong>Note: You need to raise a ticket after any issue.</strong> Whether it is an unexpected courier pickup delay, customer return damage, or PDT policy question, logging a ticket ensures SLA protection and priority resolution.
              </span>
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-3 rounded-2xl border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-stone-500 font-bold">Status:</span>
                {['all', 'open', 'under_review', 'resolved'].map(st => (
                  <button
                    key={st}
                    onClick={() => setTicketStatusFilter(st)}
                    className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer capitalize ${
                      ticketStatusFilter === st
                        ? 'bg-stone-900 text-white'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {st.replace('_', ' ')}
                  </button>
                ))}
              </div>

              <div className="relative">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  value={ticketSearch}
                  onChange={(e) => setTicketSearch(e.target.value)}
                  placeholder="Search ticket ID, order #..."
                  className="pl-8 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            {/* Ticket List */}
            {filteredTickets.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl border border-stone-200 text-center text-xs text-stone-500 space-y-2">
                <Ticket size={32} className="mx-auto text-stone-400" />
                <p className="font-bold text-stone-800">No Tickets Found</p>
                <p>No support tickets match the selected filter. Click "Raise Support Ticket" if you encounter any issue.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredTickets.map(t => (
                  <div key={t.id} className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-stone-100">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-orange-600 text-xs">{t.id}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                          t.status === 'resolved' ? 'bg-emerald-100 text-emerald-800' :
                          t.status === 'under_review' ? 'bg-sky-100 text-sky-800' :
                          'bg-amber-100 text-amber-900'
                        }`}>
                          {t.status.replace('_', ' ')}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          t.priority === 'high' || t.priority === 'urgent' ? 'bg-rose-100 text-rose-800' :
                          t.priority === 'medium' ? 'bg-amber-100 text-amber-800' :
                          'bg-stone-100 text-stone-700'
                        }`}>
                          {t.priority}
                        </span>
                      </div>

                      <div className="text-[11px] text-stone-400">
                        Logged on {new Date(t.created_at).toLocaleString()}
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-stone-100 text-stone-700 rounded text-[10px] font-bold capitalize">
                          {t.category.replace(/_/g, ' ')}
                        </span>
                        <h4 className="font-bold text-stone-900 text-sm">{t.subject}</h4>
                      </div>

                      {t.order_number && (
                        <p className="text-[11px] text-stone-500">
                          Related Order: <span className="font-mono font-bold text-stone-700">{t.order_number}</span>
                          {t.product_name && ` • ${t.product_name}`}
                        </p>
                      )}

                      <p className="text-stone-600 bg-stone-50 p-3 rounded-xl border border-stone-100 text-xs">
                        {t.description}
                      </p>

                      {t.resolution_note && (
                        <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 space-y-1">
                          <p className="font-bold flex items-center gap-1.5">
                            <CheckCircle2 size={13} className="text-emerald-600" />
                            <span>Resolution &amp; Support Update:</span>
                          </p>
                          <p className="text-emerald-800 text-[11px]">{t.resolution_note}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}

        {/* ─── TAB 5: STORE PROFILE & PAYOUT SETTINGS ─── */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            
            {/* Top Settlement & Payout Banner */}
            <div className="bg-gradient-to-r from-emerald-50 via-white to-teal-50 p-6 rounded-3xl border border-emerald-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-sm shrink-0">
                  <Landmark size={28} />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                    Merchant Settlement Vault
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-black text-stone-900">
                      ₹{Number(stats?.balance || 0).toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-stone-500 font-medium">Available for Instant Clearance</span>
                  </div>
                  <p className="text-xs text-stone-600 mt-1">
                    Delivered sales revenue after 0% commission tier exemptions. Zero hidden processing fees.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsPayoutModalOpen(true)}
                  className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 active:scale-98 text-white rounded-xl text-xs font-bold transition shadow-sm cursor-pointer flex items-center gap-2"
                >
                  <DollarSign size={15} />
                  <span>Request Withdrawal</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Bank Account & Settlement Form */}
              <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-5">
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                      <CreditCard size={16} className="text-orange-600" />
                      <span>Settlement Bank Account &amp; UPI</span>
                    </h3>
                    <p className="text-xs text-stone-500">Earnings will be automatically routed to this verified account.</p>
                  </div>
                </div>

                <form onSubmit={handleSaveBankDetails} className="space-y-3.5 text-xs text-left">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Bank Name</label>
                    <input
                      type="text"
                      required
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      placeholder="e.g. HDFC Bank Ltd"
                      className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:border-orange-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Account Number</label>
                    <input
                      type="text"
                      required
                      value={bankAcc}
                      onChange={(e) => setBankAcc(e.target.value)}
                      placeholder="918237465012"
                      className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:border-orange-500 font-mono text-stone-900"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-stone-700 mb-1">IFSC Code</label>
                      <input
                        type="text"
                        required
                        value={bankIfsc}
                        onChange={(e) => setBankIfsc(e.target.value)}
                        placeholder="HDFC0001892"
                        className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:border-orange-500 font-mono uppercase"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-stone-700 mb-1">UPI ID (Optional)</label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="storename@okaxis"
                        className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:border-orange-500 font-mono"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-[11px] text-stone-500 space-y-0.5">
                    <p className="font-semibold text-stone-700">Automated Clearing Standard:</p>
                    <p>Withdrawals are disbursed via IMPS / NEFT directly into this verified destination with live UTR confirmation.</p>
                  </div>

                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Check size={14} />
                    <span>{actionLoading ? 'Verifying...' : 'Save & Verify Bank Details'}</span>
                  </button>
                </form>
              </div>

              {/* Right Column: Store Profile Metadata */}
              <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-5">
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                      <Building2 size={16} className="text-orange-600" />
                      <span>Store Profile Metadata</span>
                    </h3>
                    <p className="text-xs text-stone-500">Legal merchant registration and public storefront credentials.</p>
                  </div>
                </div>

                <form onSubmit={handleSaveSettings} className="space-y-3.5 text-xs text-left">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-stone-700 mb-1">Store Name</label>
                      <input
                        type="text"
                        value={storeName}
                        onChange={(e) => setStoreName(e.target.value)}
                        className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:border-orange-500 font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-stone-700 mb-1">Owner Name</label>
                      <input
                        type="text"
                        value={ownerName}
                        onChange={(e) => setOwnerName(e.target.value)}
                        className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-stone-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:border-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-stone-700 mb-1">GSTIN Number</label>
                      <input
                        type="text"
                        value={gstin}
                        onChange={(e) => setGstin(e.target.value)}
                        className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:border-orange-500 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Store / Warehouse Address</label>
                    <textarea
                      rows={2}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:border-orange-500 text-xs"
                    />
                  </div>

                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={actionLoading}
                      className="w-full py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Check size={14} />
                      <span>{actionLoading ? 'Saving...' : 'Update Store Profile'}</span>
                    </button>
                  </div>
                </form>
              </div>

            </div>

            {/* Payouts & Settlement History Table */}
            <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
              <div className="p-6 border-b border-stone-100 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                    <Wallet size={18} className="text-emerald-600" />
                    <span>Payout &amp; Settlement History</span>
                  </h3>
                  <p className="text-xs text-stone-500">Track all historical withdrawals, bank disbursements, and UTR clearing numbers.</p>
                </div>
                <span className="text-xs font-bold text-stone-700 bg-stone-100 px-3 py-1 rounded-full">
                  {payouts.length} Settlements
                </span>
              </div>

              {payouts.length === 0 ? (
                <div className="p-12 text-center text-xs text-stone-400">
                  No historical withdrawals found. Request a withdrawal once your sales are delivered.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-bold uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="py-3 px-6">Payout ID</th>
                        <th className="py-3 px-6">Disbursed Date</th>
                        <th className="py-3 px-6">Amount</th>
                        <th className="py-3 px-6">Method &amp; Destination</th>
                        <th className="py-3 px-6">UTR / Reference No</th>
                        <th className="py-3 px-6">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {payouts.map((po) => (
                        <tr key={po.id || po.payout_id} className="hover:bg-stone-50/80 transition-colors">
                          <td className="py-3.5 px-6 font-mono font-bold text-stone-900">
                            {po.id || po.payout_id}
                          </td>
                          <td className="py-3.5 px-6 text-stone-600">
                            {new Date(po.created_at || Date.now()).toLocaleDateString('en-IN', {
                              day: '2-digit', month: 'short', year: 'numeric'
                            })}
                          </td>
                          <td className="py-3.5 px-6 font-black text-stone-950 text-sm">
                            ₹{Number(po.amount || 0).toLocaleString('en-IN')}
                          </td>
                          <td className="py-3.5 px-6 text-stone-700">
                            <span className="font-semibold block">{po.method}</span>
                            <span className="text-[10px] text-stone-400">{po.bank_name || 'HDFC Bank Ltd'} ({po.account_number || '••••4892'})</span>
                          </td>
                          <td className="py-3.5 px-6 font-mono text-[11px] font-semibold text-stone-600">
                            {po.reference_no || 'UTR Pending'}
                          </td>
                          <td className="py-3.5 px-6">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
                              <CheckCircle2 size={11} />
                              <span>{po.status || 'Processed'}</span>
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>
        )}

        {/* Seller Footer with Terms & Policies */}
        <footer className="pt-10 pb-4 border-t border-stone-200 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <Store size={15} className="text-orange-600" />
            <span>GoMo Deals Multi-Vendor Merchant Console</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link to="/terms" className="hover:text-orange-600 transition underline font-medium">Terms &amp; Conditions</Link>
            <span>•</span>
            <Link to="/legal/privacy-policy" className="hover:text-orange-600 transition underline font-medium">Privacy Policy</Link>
            <span>•</span>
            <Link to="/legal/return-policy" className="hover:text-orange-600 transition underline font-medium">Return SLA</Link>
            <span>•</span>
            <Link to="/" className="hover:text-orange-600 transition font-medium">Customer Store</Link>
          </div>
        </footer>

      </main>

      {/* ─── 3. MODAL: ADD PRODUCT WITH LIVE CARD PREVIEW ─── */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white max-w-3xl w-full rounded-3xl p-6 shadow-2xl border border-stone-200 max-h-[92vh] overflow-y-auto text-left space-y-4 my-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <h3 className="text-base font-bold text-stone-900 flex items-center gap-1.5">
                  <Sparkles size={16} className="text-orange-600" />
                  <span>List New Product to GoMo Deals Store</span>
                </h3>
                <p className="text-xs text-stone-500">
                  Seller: <span className="font-bold text-stone-800">{seller.store_name}</span> • Instantly live for customers & searchable
                </p>
              </div>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-stone-400 hover:text-stone-700 rounded-lg cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Left 2 Cols: Form Inputs */}
                <div className="md:col-span-2 space-y-3.5">
                  
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Product Title / Name *</label>
                    <input
                      type="text"
                      required
                      value={newProdName}
                      onChange={(e) => setNewProdName(e.target.value)}
                      placeholder="e.g. Handcrafted Solid Brass Lotus Diya"
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:border-orange-500 font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-stone-700 mb-1">Brand Name</label>
                      <input
                        type="text"
                        value={newProdBrand}
                        onChange={(e) => setNewProdBrand(e.target.value)}
                        placeholder={seller.store_name}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:border-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-stone-700 mb-1">Deal Type</label>
                      <select
                        value={newProdDeal}
                        onChange={(e) => setNewProdDeal(e.target.value)}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:border-orange-500 cursor-pointer"
                      >
                        <option value="regular">Regular Item</option>
                        <option value="flash_deal">Flash Deal</option>
                        <option value="clearance">Clearance Deal</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-stone-700 mb-1">Department / Category *</label>
                      <select
                        value={newProdCategory}
                        onChange={(e) => setNewProdCategory(e.target.value)}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:border-orange-500 cursor-pointer"
                      >
                        <option value="pooja-items">Pooja Items</option>
                        <option value="clothing">Clothing & Apparel</option>
                        <option value="ethnic-wear">Ethnic Wear</option>
                        <option value="footwear">Footwear</option>
                        <option value="electronics">Electronics & Gadgets</option>
                        <option value="home-living">Home & Living</option>
                        <option value="beauty">Beauty & Grooming</option>
                        <option value="healthy-foods">Healthy Foods</option>
                        <option value="gifts">Gifts & Hampers</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-stone-700 mb-1">Stock Quantity *</label>
                      <input
                        type="number"
                        required
                        min="0"
                        value={newProdStock}
                        onChange={(e) => setNewProdStock(e.target.value)}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  {/* Pricing with Live Discount Calculation */}
                  <div className="grid grid-cols-2 gap-3 p-3 bg-stone-50 rounded-2xl border border-stone-200">
                    <div>
                      <label className="block font-bold text-stone-700 mb-1">Selling Price (₹) *</label>
                      <input
                        type="number"
                        required
                        min="1"
                        value={newProdPrice}
                        onChange={(e) => setNewProdPrice(e.target.value)}
                        placeholder="799"
                        className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-orange-500 font-black text-stone-900"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="font-bold text-stone-700">MRP (₹)</label>
                        {liveDiscountPercent > 0 && (
                          <span className="text-[10px] font-black text-orange-600 bg-orange-100 px-1.5 py-0.2 rounded">
                            {liveDiscountPercent}% OFF
                          </span>
                        )}
                      </div>
                      <input
                        type="number"
                        min="1"
                        value={newProdMrp}
                        onChange={(e) => setNewProdMrp(e.target.value)}
                        placeholder={newProdPrice ? `${Math.round(newProdPrice * 1.3)}` : '1299'}
                        className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-orange-500 text-stone-500"
                      />
                    </div>
                  </div>

                  {/* 0% Commission Tier Benefit */}
                  {newProdPrice && (
                    <div className={`p-2.5 rounded-xl border text-[11px] font-medium flex items-center justify-between gap-2 ${
                      Number(newProdPrice) < 1000 
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
                        : 'bg-amber-50 border-amber-200 text-amber-900'
                    }`}>
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck size={14} className={Number(newProdPrice) < 1000 ? 'text-emerald-600' : 'text-amber-600'} />
                        <span>
                          {Number(newProdPrice) < 1000 ? (
                            <>
                              <strong className="font-bold text-emerald-800">0% Commission Tier Active:</strong> You pay ₹0 platform fee! (0% commission for less than rs.1000 for sellers not customers).
                            </>
                          ) : (
                            <>
                              <strong className="font-bold text-amber-800">Standard Platform Fee:</strong> 5% commission applies for items ₹1,000 and above.
                            </>
                          )}
                        </span>
                      </div>
                      <span className="font-bold text-xs shrink-0">
                        {Number(newProdPrice) < 1000 ? 'You keep 100%' : `Net: ₹${Math.round(Number(newProdPrice) * 0.95)}`}
                      </span>
                    </div>
                  )}

                  {/* Drag & Drop Local Image File Upload Zone */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="font-bold text-stone-700">Product Image (Drag &amp; Drop or Upload)</label>
                      <span className="text-[10px] text-stone-400">PNG, JPG, WEBP (No external URL needed)</span>
                    </div>

                    <div
                      onDragOver={(e) => { e.preventDefault(); setIsDraggingImage(true); }}
                      onDragLeave={() => setIsDraggingImage(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setIsDraggingImage(false);
                        const file = e.dataTransfer?.files?.[0];
                        if (file) handleLocalImageUpload(file, setNewProdImage);
                      }}
                      className={`p-4 border-2 border-dashed rounded-2xl text-center transition-all cursor-pointer ${
                        isDraggingImage 
                          ? 'border-orange-500 bg-orange-50/70 scale-[1.01]' 
                          : newProdImage 
                            ? 'border-emerald-300 bg-emerald-50/20' 
                            : 'border-stone-300 hover:border-orange-400 bg-stone-50/60'
                      }`}
                    >
                      <input
                        type="file"
                        id="sellerProdFileInput"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleLocalImageUpload(file, setNewProdImage);
                        }}
                      />
                      <label htmlFor="sellerProdFileInput" className="cursor-pointer block">
                        <div className="flex flex-col items-center gap-1.5">
                          <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
                            <Upload size={18} />
                          </div>
                          <p className="text-xs font-bold text-stone-800">
                            {newProdImage ? 'Local image selected — Click to replace' : 'Click to browse or drag & drop photo here'}
                          </p>
                          <p className="text-[10px] text-stone-500">Instant local preview &amp; server sync</p>
                        </div>
                      </label>
                    </div>

                    {/* Or URL Input */}
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-stone-400 uppercase shrink-0">or URL:</span>
                      <input
                        type="url"
                        value={newProdImage}
                        onChange={(e) => setNewProdImage(e.target.value)}
                        placeholder="Paste image URL directly..."
                        className="w-full px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:border-orange-500 font-mono text-[11px]"
                      />
                    </div>

                    {/* Quick Presets for Current Category */}
                    {IMAGE_PRESETS[newProdCategory] && (
                      <div className="flex items-center gap-1.5 mt-1 overflow-x-auto no-scrollbar">
                        <span className="text-[10px] font-bold text-stone-400 shrink-0">Presets:</span>
                        {IMAGE_PRESETS[newProdCategory].map((pre, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setNewProdImage(pre.url)}
                            className="px-2 py-0.5 rounded-lg bg-stone-100 hover:bg-orange-50 hover:text-orange-600 text-stone-700 text-[10px] font-medium border border-stone-200 shrink-0 cursor-pointer"
                          >
                            {pre.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Product Description</label>
                    <textarea
                      rows={2}
                      value={newProdDesc}
                      onChange={(e) => setNewProdDesc(e.target.value)}
                      placeholder="Describe authentic materials, dimensions, artisanal origin..."
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:border-orange-500 text-xs"
                    />
                  </div>

                </div>

                {/* Right Col: Live Card Preview on Homepage */}
                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-2">
                      Live Store Card Preview
                    </span>

                    <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
                      <div className="relative aspect-square w-full bg-stone-100 overflow-hidden">
                        <img
                          src={newProdImage || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'}
                          alt="Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'; }}
                        />
                        {newProdDeal === 'flash_deal' && (
                          <span className="absolute top-2 left-2 bg-orange-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full shadow-xs">
                            Flash Deal
                          </span>
                        )}
                        {liveDiscountPercent > 0 && (
                          <span className="absolute bottom-2 left-2 bg-stone-900/80 backdrop-blur-xs text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                            {liveDiscountPercent}% OFF
                          </span>
                        )}
                      </div>

                      <div className="p-3 space-y-1">
                        <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wide">
                          {newProdBrand || seller.store_name}
                        </span>
                        <p className="font-bold text-stone-900 text-xs line-clamp-1">
                          {newProdName || 'Your Product Title'}
                        </p>
                        <div className="flex items-center gap-1.5 pt-0.5">
                          <span className="font-black text-stone-950 text-sm">
                            ₹{newProdPrice || '799'}
                          </span>
                          {newProdMrp && Number(newProdMrp) > Number(newProdPrice) && (
                            <span className="text-stone-400 line-through text-[10px]">
                              ₹{newProdMrp}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 pt-1 text-[10px] text-stone-500">
                          <Truck size={12} className="text-emerald-600" />
                          <span>Dispatched by {seller.store_name}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-[10px] text-stone-500 bg-white p-2.5 rounded-xl border border-stone-200/80">
                    This item will be indexed in Search, Category Collections, and Fresh Launches on the homepage.
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-stone-200 rounded-xl text-stone-700 font-bold hover:bg-stone-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Check size={14} />
                  <span>{actionLoading ? 'Publishing...' : 'Publish Product Live'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── 4. MODAL: EDIT PRODUCT ─── */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
          <div className="bg-white max-w-lg w-full rounded-3xl p-6 shadow-xl border border-stone-200 text-left space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="text-base font-bold text-stone-900">Edit Product: {editingProduct.name}</h3>
              <button 
                onClick={() => setEditingProduct(null)}
                className="p-1 text-stone-400 hover:text-stone-700 rounded-lg cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleUpdateProduct} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Title</label>
                <input
                  type="text"
                  value={editingProduct.name || editingProduct.title || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value, title: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:border-orange-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    value={editingProduct.price || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:border-orange-500 font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">MRP (₹)</label>
                  <input
                    type="number"
                    value={editingProduct.mrp || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, mrp: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    value={editingProduct.stock_quantity || 0}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock_quantity: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Status</label>
                  <select
                    value={editingProduct.is_active ? 'active' : 'inactive'}
                    onChange={(e) => setEditingProduct({ ...editingProduct, is_active: e.target.value === 'active' })}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:border-orange-500"
                  >
                    <option value="active">Active (Visible)</option>
                    <option value="inactive">Inactive (Hidden)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingProduct.description || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:border-orange-500 text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 border border-stone-200 rounded-xl text-stone-700 font-bold hover:bg-stone-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-5 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold shadow-xs cursor-pointer"
                >
                  {actionLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── 5. MODAL: VOC INQUIRY THREAD & SELLER REPLY ─── */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white max-w-2xl w-full rounded-3xl p-6 shadow-2xl border border-stone-200 max-h-[92vh] overflow-y-auto text-left space-y-4 my-auto">
            
            {/* Header */}
            <div className="flex items-start justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <img
                  src={selectedInquiry.product_thumbnail}
                  alt={selectedInquiry.product_name}
                  className="w-12 h-12 rounded-xl object-cover border border-stone-200"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&q=80'; }}
                />
                <div>
                  <span className="font-mono text-[10px] font-bold text-orange-600 block">
                    Order #{selectedInquiry.order_number || selectedInquiry.order_id}
                  </span>
                  <h3 className="text-sm font-bold text-stone-900 line-clamp-1">
                    {selectedInquiry.product_name}
                  </h3>
                  <p className="text-[11px] text-stone-500 font-medium">
                    Customer: {selectedInquiry.customer_name} ({selectedInquiry.customer_phone || selectedInquiry.customer_email})
                  </p>
                </div>
              </div>

              <button 
                onClick={() => setSelectedInquiry(null)}
                className="p-1 text-stone-400 hover:text-stone-700 rounded-lg cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Inquiry Meta Strip */}
            <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-stone-700">Category:</span>
                <span className="px-2 py-0.5 bg-white rounded border border-stone-200 font-medium text-stone-800">
                  {selectedInquiry.category}
                </span>
                <span className="font-bold text-stone-700 ml-2">Subject:</span>
                <span className="font-medium text-stone-900">{selectedInquiry.subject}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                  selectedInquiry.status === 'resolved' ? 'bg-emerald-100 text-emerald-800' :
                  selectedInquiry.status === 'seller_replied' ? 'bg-sky-100 text-sky-800' :
                  'bg-amber-100 text-amber-900'
                }`}>
                  {selectedInquiry.status.replace('_', ' ')}
                </span>
              </div>
            </div>

            {/* Conversation Messages */}
            <div className="space-y-3 max-h-64 overflow-y-auto p-3 bg-stone-50/50 rounded-2xl border border-stone-100">
              {(selectedInquiry.conversation || []).map((msg, idx) => {
                const isFromSeller = msg.sender === 'seller';
                return (
                  <div
                    key={idx}
                    className={`flex flex-col ${isFromSeller ? 'items-end' : 'items-start'}`}
                  >
                    <span className="text-[10px] text-stone-400 font-medium mb-1 px-1">
                      {isFromSeller ? `${seller.store_name} (You)` : selectedInquiry.customer_name} • {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <div className={`p-3 rounded-2xl text-xs max-w-[85%] ${
                      isFromSeller
                        ? 'bg-orange-600 text-white rounded-tr-xs'
                        : 'bg-white text-stone-800 border border-stone-200 rounded-tl-xs shadow-2xs'
                    }`}>
                      {msg.message}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Resolution Notes display if already resolved */}
            {selectedInquiry.resolution_notes && (
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 space-y-0.5">
                <p className="font-bold flex items-center gap-1.5 text-emerald-800">
                  <CheckCircle2 size={14} />
                  <span>Resolution Notes:</span>
                </p>
                <p className="text-[11px] text-emerald-900 pl-5">{selectedInquiry.resolution_notes}</p>
              </div>
            )}

            {/* Reply Form */}
            <form onSubmit={handleSendVocReply} className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Type Response to Customer:
                </label>
                <textarea
                  rows={3}
                  required
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Explain resolution, share care instructions, courier dispatch AWB, or answer their query..."
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => handleResolveVoc(selectedInquiry.id)}
                  className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  Mark Issue as Resolved
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedInquiry(null)}
                    className="px-4 py-2 border border-stone-200 rounded-xl text-stone-700 text-xs font-bold hover:bg-stone-50 cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    disabled={actionLoading || !replyMessage.trim()}
                    className="px-5 py-2 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
                  >
                    <Send size={13} />
                    <span>{actionLoading ? 'Sending...' : 'Send to Customer'}</span>
                  </button>
                </div>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* Support Ticket Modal */}
      <RaiseTicketModal
        isOpen={isTicketModalOpen}
        onClose={() => setIsTicketModalOpen(false)}
        initialData={ticketModalData}
        userType="seller"
        onSuccess={(ticket) => {
          showNotification(`Ticket #${ticket.id} logged successfully.`);
          fetchSellerData();
        }}
      />

      {/* ─── MODAL: REQUEST PAYOUT / WITHDRAWAL ─── */}
      {isPayoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
          <div className="bg-white max-w-md w-full rounded-3xl p-6 shadow-2xl border border-stone-200 text-left space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Landmark size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-stone-900">Withdraw Available Earnings</h3>
                  <p className="text-[10px] text-stone-500">Fast clearance to your verified settlement account</p>
                </div>
              </div>
              <button
                onClick={() => setIsPayoutModalOpen(false)}
                className="p-1 text-stone-400 hover:text-stone-700 rounded-lg cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-2xl">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">Available Net Balance</span>
              <p className="text-2xl font-black text-emerald-700 mt-0.5">
                ₹{Number(stats?.balance || 0).toLocaleString('en-IN')}
              </p>
              <span className="text-[10px] text-emerald-900 font-medium mt-1 block">
                0% commission tier savings included (₹{Number(stats?.zero_commission_savings || 0).toLocaleString('en-IN')})
              </span>
            </div>

            <form onSubmit={handleRequestPayout} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Withdrawal Amount (₹)</label>
                <input
                  type="number"
                  min="100"
                  max={stats?.balance || 50000}
                  required
                  value={payoutAmount}
                  onChange={(e) => setPayoutAmount(e.target.value)}
                  placeholder="Enter amount (min ₹100)"
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:border-orange-500 font-bold text-stone-900"
                />
                <div className="flex items-center gap-2 mt-2">
                  {[
                    { label: '25%', frac: 0.25 },
                    { label: '50%', frac: 0.5 },
                    { label: '100% (All)', frac: 1.0 }
                  ].map(chip => (
                    <button
                      key={chip.label}
                      type="button"
                      onClick={() => setPayoutAmount(Math.floor(Number(stats?.balance || 0) * chip.frac).toString())}
                      className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-[10px] transition-colors"
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Transfer Method</label>
                <select
                  value={payoutMethod}
                  onChange={(e) => setPayoutMethod(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:border-orange-500 font-semibold text-stone-900"
                >
                  <option value="Instant IMPS Payout">Instant IMPS Payout (Clearance &lt; 30 mins)</option>
                  <option value="NEFT / Direct Bank Transfer">NEFT Bank Transfer (Same Day)</option>
                  <option value="Express UPI Settlement">Express UPI Settlement (VPA / QR)</option>
                </select>
              </div>

              <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 text-[11px] text-stone-600 space-y-1">
                <div className="flex justify-between">
                  <span>Settlement Bank:</span>
                  <span className="font-bold text-stone-900">{bankName || 'HDFC Bank Ltd'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Account Number:</span>
                  <span className="font-mono font-bold text-stone-900">{bankAcc || '•••••••4892'}</span>
                </div>
                <div className="flex justify-between">
                  <span>IFSC Code:</span>
                  <span className="font-mono font-bold text-stone-900">{bankIfsc || 'HDFC0001892'}</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsPayoutModalOpen(false)}
                  className="px-4 py-2 border border-stone-200 rounded-xl text-stone-700 font-bold hover:bg-stone-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={payoutLoading}
                  className="px-5 py-2 bg-orange-600 hover:bg-orange-700 active:scale-98 text-white rounded-xl font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Check size={14} />
                  <span>{payoutLoading ? 'Processing...' : 'Confirm & Withdraw'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
