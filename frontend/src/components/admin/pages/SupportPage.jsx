import { useState, useEffect } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { 
  MessageCircle, Clock, CheckCircle2, AlertCircle, Send, Search, 
  Filter, RefreshCw, User, Package, ShieldCheck, Tag, ArrowUpRight,
  ChevronRight, Check
} from "lucide-react";
import { ticketService } from "../../../services/ticketService";
import { realtimeService } from "../../../services/realtimeService";
import { useToast } from "../../../hooks/use-toast";

const priorityStyle = {
  high: "bg-red-50 text-red-700 border-red-200",
  urgent: "bg-red-100 text-red-800 border-red-300 font-bold",
  medium: "bg-amber-50 text-amber-700 border-amber-200",
  low: "bg-blue-50 text-blue-700 border-blue-200"
};

const statusIcon = {
  open: AlertCircle,
  in_progress: Clock,
  resolved: CheckCircle2,
  closed: CheckCircle2
};

export default function SupportPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [resolutionStatus, setResolutionStatus] = useState("in_progress");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const res = await ticketService.getTickets({ status: statusFilter });
      if (res.success && Array.isArray(res.tickets)) {
        setTickets(res.tickets);
        if (res.tickets.length > 0 && !selectedTicket) {
          setSelectedTicket(res.tickets[0]);
        } else if (selectedTicket) {
          const updated = res.tickets.find(t => t.id === selectedTicket.id);
          if (updated) setSelectedTicket(updated);
        }
      }
    } catch (err) {
      console.error("Failed to load tickets:", err);
      toast({ title: "Fetch Error", description: "Failed to load support tickets", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [statusFilter]);

  // Listen for real-time SSE updates
  useEffect(() => {
    const unsubNew = realtimeService.on('NEW_SUPPORT_TICKET', (data) => {
      if (data?.ticket) {
        setTickets(prev => [data.ticket, ...prev.filter(t => t.id !== data.ticket.id)]);
        toast({ title: "New Support Ticket", description: `${data.ticket.id}: ${data.ticket.subject}` });
      }
    });

    const unsubUpdate = realtimeService.on('TICKET_STATUS_UPDATE', (data) => {
      if (data?.ticketId) {
        setTickets(prev => prev.map(t => t.id === data.ticketId ? { ...t, status: data.status, resolution_note: data.resolution_note } : t));
        if (selectedTicket?.id === data.ticketId) {
          setSelectedTicket(prev => prev ? { ...prev, status: data.status, resolution_note: data.resolution_note } : null);
        }
      }
    });

    return () => {
      if (unsubNew) unsubNew();
      if (unsubUpdate) unsubUpdate();
    };
  }, [selectedTicket]);

  const handleSendReply = async (e) => {
    e?.preventDefault();
    if (!selectedTicket) return;
    if (!replyMessage.trim() && resolutionStatus === selectedTicket.status) {
      toast({ title: "Missing Note", description: "Please enter a reply or resolution note.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await ticketService.updateTicket(selectedTicket.id, {
        status: resolutionStatus,
        resolution_note: replyMessage.trim() || `Status updated to ${resolutionStatus}`,
        actor_name: "Admin Support Desk"
      });

      if (res.success && res.ticket) {
        toast({ title: "Ticket Updated", description: `Ticket ${selectedTicket.id} updated to ${resolutionStatus}.` });
        setSelectedTicket(res.ticket);
        setReplyMessage("");
        fetchTickets();
      } else {
        toast({ title: "Error", description: res.message || "Failed to update ticket", variant: "destructive" });
      }
    } catch (err) {
      console.error(err);
      toast({ title: "Update Failed", description: "Server communication error", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredTickets = tickets.filter(t => {
    const matchesSearch = 
      (t.id || "").toLowerCase().includes(search.toLowerCase()) ||
      (t.subject || "").toLowerCase().includes(search.toLowerCase()) ||
      (t.author_name || "").toLowerCase().includes(search.toLowerCase()) ||
      (t.order_number || "").toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  const openCount = tickets.filter(t => t.status === "open").length;
  const inProgressCount = tickets.filter(t => t.status === "in_progress").length;
  const resolvedCount = tickets.filter(t => t.status === "resolved").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-900 tracking-tight">Support Desk &amp; Escalations</h1>
          <p className="text-xs text-stone-500 mt-1">Manage merchant dispute tickets, customer complaints, and order investigations</p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={fetchTickets} 
          disabled={loading}
          className="gap-2 border-stone-200 text-stone-700 self-start sm:self-auto"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        <div 
          onClick={() => setStatusFilter("open")}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${statusFilter === "open" ? "border-red-500 bg-red-50/50 shadow-sm" : "border-stone-200 bg-white hover:border-stone-300"}`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Open Tickets</p>
              <p className="text-2xl font-extrabold text-red-600 mt-1">{openCount}</p>
            </div>
            <div className="rounded-xl bg-red-100 p-2.5 text-red-600">
              <AlertCircle className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div 
          onClick={() => setStatusFilter("in_progress")}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${statusFilter === "in_progress" ? "border-amber-500 bg-amber-50/50 shadow-sm" : "border-stone-200 bg-white hover:border-stone-300"}`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">In Progress</p>
              <p className="text-2xl font-extrabold text-amber-600 mt-1">{inProgressCount}</p>
            </div>
            <div className="rounded-xl bg-amber-100 p-2.5 text-amber-600">
              <Clock className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div 
          onClick={() => setStatusFilter("resolved")}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${statusFilter === "resolved" ? "border-emerald-500 bg-emerald-50/50 shadow-sm" : "border-stone-200 bg-white hover:border-stone-300"}`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Resolved</p>
              <p className="text-2xl font-extrabold text-emerald-600 mt-1">{resolvedCount}</p>
            </div>
            <div className="rounded-xl bg-emerald-100 p-2.5 text-emerald-600">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Ticket List and Details Pane */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column: Tickets Queue */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden flex flex-col h-[700px]">
          <div className="p-4 border-b border-stone-200 space-y-3 bg-stone-50/60">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
              <Input
                placeholder="Search by ticket ID, author, order..."
                className="pl-9 bg-white border-stone-200 text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              {[
                { id: "all", label: "All" },
                { id: "open", label: "Open" },
                { id: "in_progress", label: "In Progress" },
                { id: "resolved", label: "Resolved" }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setStatusFilter(tab.id)}
                  className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    statusFilter === tab.id 
                      ? "bg-stone-900 text-white" 
                      : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-100"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-stone-100">
            {loading && tickets.length === 0 ? (
              <div className="p-10 text-center text-xs text-stone-400">Loading tickets...</div>
            ) : filteredTickets.length === 0 ? (
              <div className="p-10 text-center text-xs text-stone-400">No support tickets found</div>
            ) : (
              filteredTickets.map((t) => {
                const Icon = statusIcon[t.status] || AlertCircle;
                const isSelected = selectedTicket?.id === t.id;
                const pCls = priorityStyle[(t.priority || "medium").toLowerCase()] || priorityStyle.medium;

                return (
                  <div
                    key={t.id}
                    onClick={() => {
                      setSelectedTicket(t);
                      setResolutionStatus(t.status === "open" ? "in_progress" : t.status);
                    }}
                    className={`p-4 transition-all cursor-pointer flex items-start gap-3 ${
                      isSelected ? "bg-orange-50/70 border-l-4 border-l-orange-600" : "hover:bg-stone-50"
                    }`}
                  >
                    <div className="mt-0.5">
                      <Icon className={`h-4 w-4 shrink-0 ${
                        t.status === "open" ? "text-red-500" : t.status === "in_progress" ? "text-amber-500" : "text-emerald-500"
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[11px] font-mono font-bold text-stone-800">{t.id}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border uppercase tracking-wider font-semibold ${pCls}`}>
                          {t.priority}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-stone-900 truncate mb-1">{t.subject}</p>
                      <div className="flex items-center gap-2 text-[11px] text-stone-500">
                        <span>{t.author_name}</span>
                        <span>&middot;</span>
                        <span className="capitalize">{t.author_type}</span>
                        <span>&middot;</span>
                        <span>{new Date(t.created_at || Date.now()).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Ticket Inspection & Resolution */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 shadow-sm p-6 flex flex-col h-[700px] overflow-y-auto">
          {selectedTicket ? (
            <div className="space-y-6">
              {/* Header */}
              <div className="border-b border-stone-200 pb-5">
                <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold bg-stone-100 text-stone-800 px-2.5 py-1 rounded-md">
                      {selectedTicket.id}
                    </span>
                    <span className={`text-xs px-2.5 py-1 rounded-md border uppercase font-bold tracking-wider ${
                      selectedTicket.status === 'open' ? 'bg-red-50 text-red-700 border-red-200' :
                      selectedTicket.status === 'in_progress' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      'bg-emerald-50 text-emerald-700 border-emerald-200'
                    }`}>
                      {selectedTicket.status.replace('_', ' ')}
                    </span>
                  </div>
                  <span className="text-xs text-stone-400">
                    Logged on {new Date(selectedTicket.created_at || Date.now()).toLocaleString()}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-stone-900 mt-2">{selectedTicket.subject}</h2>
              </div>

              {/* Author & Context Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-stone-50 p-3.5 rounded-xl border border-stone-200 text-xs">
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-bold">Author</span>
                  <span className="font-semibold text-stone-800">{selectedTicket.author_name}</span>
                  <span className="text-[10px] text-stone-500 block">({selectedTicket.author_type})</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-bold">Category</span>
                  <span className="font-semibold text-stone-800 capitalize">{(selectedTicket.category || 'General').replace('_', ' ')}</span>
                </div>
                {selectedTicket.order_number && (
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-bold">Order ID</span>
                    <span className="font-mono font-semibold text-stone-800">{selectedTicket.order_number}</span>
                  </div>
                )}
                {selectedTicket.product_name && (
                  <div className="col-span-2">
                    <span className="text-stone-400 block text-[10px] uppercase font-bold">Product</span>
                    <span className="font-semibold text-stone-800 truncate block">{selectedTicket.product_name}</span>
                  </div>
                )}
              </div>

              {/* Ticket Description */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">Issue Description</h3>
                <div className="bg-stone-50/70 p-4 rounded-xl border border-stone-200 text-stone-800 text-xs leading-relaxed whitespace-pre-wrap">
                  {selectedTicket.description}
                </div>
              </div>

              {/* Audit History */}
              {selectedTicket.history && selectedTicket.history.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">Timeline &amp; Audit Trail</h3>
                  <div className="space-y-2 border-l-2 border-stone-200 pl-4 ml-2">
                    {selectedTicket.history.map((h, i) => (
                      <div key={i} className="text-xs relative">
                        <div className="w-2 h-2 bg-stone-400 rounded-full absolute -left-[21px] top-1.5"></div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-stone-800">{h.actor}</span>
                          <span className="text-[10px] text-stone-400">{new Date(h.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <p className="text-stone-600 mt-0.5">{h.note || h.action}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Resolution & Quick Reply Box */}
              <form onSubmit={handleSendReply} className="border-t border-stone-200 pt-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-orange-600" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">Admin Response &amp; Status Transition</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-[11px] font-bold text-stone-600">New Status:</label>
                    <select
                      value={resolutionStatus}
                      onChange={(e) => setResolutionStatus(e.target.value)}
                      className="text-xs border border-stone-200 rounded-lg px-2.5 py-1 bg-white font-semibold text-stone-800"
                    >
                      <option value="open">Open</option>
                      <option value="in_progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </div>
                </div>

                <Textarea
                  placeholder="Type official admin reply, instructions, or resolution note..."
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  className="text-xs min-h-[90px] border-stone-200 bg-white"
                />

                <div className="flex justify-end gap-2">
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-orange-600 hover:bg-orange-700 text-white gap-2 font-bold text-xs"
                  >
                    <Send className="h-3.5 w-3.5" />
                    {isSubmitting ? "Updating..." : "Submit Reply & Update Status"}
                  </Button>
                </div>
              </form>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-stone-400">
              <MessageCircle className="h-10 w-10 text-stone-300 mb-2" />
              <p className="text-sm font-semibold">Select a ticket from the left queue to view details and respond</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

