import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    MessageSquare, Send, Trash2, X, Bot, Star, User, Clock, ArrowUp, ExternalLink
} from 'lucide-react';
import { sendChatbotMessage } from '../../../services/chatbotService';
import { useAuth } from '../../../context/AuthContext';
import { useShop } from '../../../context/ShopContext';

const ChatbotWidget = () => {
    const { user } = useAuth();
    const { cartDrawerOpen } = useShop();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [suggestedReplies, setSuggestedReplies] = useState([
        "Shipping performance & SLA",
        "Raise a support ticket",
        "0% commission policy",
        "Track my order",
        "Featured deals"
    ]);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [isSellerChatActive, setIsSellerChatActive] = useState(false);

    // Listen for custom seller chat active status to hide AI chatbot overlap
    useEffect(() => {
        const handleChatStatus = (e) => {
            const active = e.detail.isOpen;
            setIsSellerChatActive(active);
            if (active) {
                setIsOpen(false); // Close AI Chatbot if it's open
            }
        };

        window.addEventListener("gomo_chat_status", handleChatStatus);
        
        // Initial check in case it's already open on mount
        const activeChatDiv = document.getElementById("gomo-boutique-chat-modal");
        if (activeChatDiv) {
            setIsSellerChatActive(true);
            setIsOpen(false);
        }

        return () => {
            window.removeEventListener("gomo_chat_status", handleChatStatus);
        };
    }, []);

    // Scroll to top window listener
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close chatbot if cart sidebar is opened
    useEffect(() => {
        if (cartDrawerOpen) {
            setIsOpen(false);
        }
    }, [cartDrawerOpen]);

    // Format time
    const getCurrentTime = () => {
        return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    // Send query to AI backend
    const handleSendMessage = async (textToSend = null) => {
        const text = textToSend || inputValue;
        if (!text || !text.trim()) return;

        const userMsg = {
            role: 'user',
            content: text,
            timestamp: getCurrentTime()
        };

        setMessages((prev) => [...prev, userMsg]);
        if (!textToSend) setInputValue('');
        setIsLoading(true);

        try {
            const history = messages.map(m => ({
                role: m.role,
                content: m.content
            }));

            const response = await sendChatbotMessage(text, history);

            if (response.success && response.reply) {
                const botMsg = {
                    role: 'bot',
                    content: response.reply,
                    timestamp: getCurrentTime(),
                    suggestions: response.suggestedFollowUps || []
                };
                setMessages((prev) => [...prev, botMsg]);
                if (response.suggestedFollowUps && response.suggestedFollowUps.length > 0) {
                    setSuggestedReplies(response.suggestedFollowUps);
                }
            } else {
                setMessages((prev) => [
                    ...prev,
                    {
                        role: 'bot',
                        content: response.reply || "I'm having a slight connection glitch. How else can I assist you?",
                        timestamp: getCurrentTime()
                    }
                ]);
            }
        } catch (error) {
            console.error('Chat error:', error);
            setMessages((prev) => [
                ...prev,
                {
                    role: 'bot',
                    content: "Sorry, our concierge service is momentarily experiencing high demand. Please try again in a few seconds.",
                    timestamp: getCurrentTime()
                }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleClearChat = () => {
        setMessages([]);
        setSuggestedReplies([
            "Shipping performance & SLA",
            "Raise a support ticket",
            "0% commission policy",
            "Track my order",
            "Featured deals"
        ]);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Render formatted markdown-like text
    const formatMessageText = (content) => {
        if (!content) return '';
        
        // Strip markdown image tags or handle product cards
        const cleaned = content.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '').trim();

        // Split by lines or bold patterns
        const parts = cleaned.split(/(\*\*.*?\*\*|\~\~.*?\~\~)/g);
        return parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={index} className="font-extrabold text-sky-950">{part.slice(2, -2)}</strong>;
            }
            if (part.startsWith('~~') && part.endsWith('~~')) {
                return <span key={index} className="line-through text-slate-400 mr-1">{part.slice(2, -2)}</span>;
            }
            return part;
        });
    };

    // When seller chat or the cart sidebar is open, hide both the top arrow and the chatbox button
    if (isSellerChatActive || cartDrawerOpen) return null;

    return (
        <div className="fixed bottom-6 right-6 z-[999] font-sans flex flex-col gap-4 items-end">
            {/* A. SCROLL TO TOP BUTTON */}
            <AnimatePresence>
                {showScrollTop && !isOpen && (
                    <motion.button
                        onClick={scrollToTop}
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center justify-center w-12 h-12 bg-gradient-to-tr from-[#0284c7] to-[#38bdf8] border border-sky-300/40 text-white hover:border-white shadow-[0_4px_20px_rgba(2,132,199,0.3)] cursor-pointer focus:outline-none rounded-full transition-all duration-300"
                        aria-label="Scroll to top"
                    >
                        <ArrowUp className="w-5 h-5" />
                    </motion.button>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {/* B. FLOATING CHAT WIDGET TRIGGER */}
                {!isOpen && (
                    <div className="relative flex items-center justify-end">
                        <motion.button
                            onClick={() => setIsOpen(true)}
                            initial={{ scale: 0.8, opacity: 0 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            animate={{
                                y: [0, -6, 0],
                                scale: 1,
                                opacity: 1
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{
                                y: {
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                },
                                opacity: {
                                    duration: 0.3
                                }
                            }}
                            className="relative flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-[#0284c7] via-[#00a8e8] to-[#38bdf8] border border-sky-300 text-white hover:border-white rounded-full shadow-[0_8px_30px_rgba(2,132,199,0.45)] cursor-pointer focus:outline-none z-10 overflow-hidden transition-all duration-300 group"
                            aria-label="Open GoMo Deals AI Assistant"
                        >
                            {/* Ambient gradient shine */}
                            <motion.div
                                animate={{
                                    x: ['-200%', '200%']
                                }}
                                transition={{
                                    duration: 2.5,
                                    repeat: Infinity,
                                    repeatDelay: 2,
                                    ease: "easeInOut"
                                }}
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-sky-300/40 to-transparent w-full h-full -skew-x-[25deg] pointer-events-none z-[1]"
                            />

                            <MessageSquare className="w-6 h-6 text-white relative z-[2] drop-shadow-xs" />
                        </motion.button>
                    </div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {/* 2. CHAT PANEL WINDOW */}
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.94, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.94, y: 20 }}
                        transition={{ duration: 0.28, cubicBezier: [0.34, 1.56, 0.64, 1] }}
                        style={{ transformOrigin: "bottom right" }}
                        className="flex flex-col w-[385px] h-[600px] bg-white/98 backdrop-blur-xl border border-sky-200 rounded-3xl shadow-[0_20px_50px_rgba(2,132,199,0.22)] overflow-hidden"
                    >
                        
                        {/* A. CONCIERGE HEADER */}
                        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#0284c7] via-[#00a8e8] to-[#38bdf8] border-b border-sky-300/40 text-white shadow-md">
                            <div className="flex items-center space-x-3">
                                {/* Elegant Bot Avatar */}
                                <div className="relative w-10 h-10 rounded-full bg-white/20 backdrop-blur-xs border border-white/40 flex items-center justify-center shadow-inner">
                                    <Bot className="w-5 h-5 text-white" />
                                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-white rounded-full shadow-xs"></span>
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="font-serif italic text-sm tracking-wide text-white font-bold flex items-center gap-1.5 drop-shadow-xs">
                                        GoMo Deals Assistant
                                    </h3>
                                    <span className="text-[8px] uppercase tracking-[0.22em] text-white/95 font-black flex items-center gap-1">
                                        <span className="inline-block w-1.5 h-1.5 bg-emerald-300 rounded-full animate-pulse"></span>
                                        ONLINE ASSISTANCE
                                    </span>
                                </div>
                            </div>
                            
                            <div className="flex items-center space-x-1">
                                {/* Clear History Button */}
                                <motion.button 
                                    onClick={handleClearChat}
                                    whileHover={{ scale: 1.08, backgroundColor: 'rgba(255,255,255,0.2)' }}
                                    whileTap={{ scale: 0.95 }}
                                    className="p-2 rounded-full transition-colors duration-150 focus:outline-none cursor-pointer text-white/85 hover:text-white"
                                    title="Clear Conversation"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </motion.button>
                                {/* Close Panel Button */}
                                <motion.button
                                    onClick={() => setIsOpen(false)}
                                    whileHover={{ scale: 1.08, backgroundColor: 'rgba(255,255,255,0.2)' }}
                                    whileTap={{ scale: 0.95 }}
                                    className="p-2 rounded-full transition-colors duration-150 focus:outline-none cursor-pointer text-white/85 hover:text-white"
                                    title="Close Chat"
                                >
                                    <X className="w-4 h-4" />
                                </motion.button>
                            </div>
                        </div>

                        {/* B. MESSAGE CONTAINER */}
                        <div className="flex-grow p-5 overflow-y-auto space-y-4 bg-gradient-to-b from-[#f8fbff] to-[#f0f7ff] no-scrollbar">
                            {/* Empty Welcome Card */}
                            {messages.length === 0 && (
                                <div className="py-16 text-center flex flex-col items-center justify-center px-4">
                                    <div className="w-14 h-14 bg-gradient-to-tr from-sky-50 to-white border border-sky-200 rounded-2xl flex items-center justify-center text-[#0284c7] shadow-sm mb-5">
                                        <Bot className="w-6 h-6 text-[#0284c7]" />
                                    </div>
                                    <h4 className="font-serif italic text-lg text-sky-950 mb-2 font-bold">
                                        Smart Shopping Assistant
                                    </h4>
                                    <p className="text-[10px] text-sky-800/80 leading-relaxed font-sans max-w-[250px] uppercase tracking-[0.15em] font-extrabold">
                                        How can I help you find the best deals and track your orders today?
                                    </p>
                                </div>
                            )}

                            <AnimatePresence initial={false}>
                                {messages.map((msg, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-[80%] rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-xs ${
                                                msg.role === 'user'
                                                    ? 'bg-gradient-to-r from-[#0284c7] to-[#00a8e8] text-white rounded-tr-none'
                                                    : 'bg-white text-slate-800 border border-sky-100 rounded-tl-none'
                                            }`}
                                        >
                                            <p className="whitespace-pre-wrap">{formatMessageText(msg.content)}</p>
                                            <span
                                                className={`text-[8px] block mt-1.5 font-sans font-bold tracking-wider ${
                                                    msg.role === 'user' ? 'text-sky-100/90 text-right' : 'text-sky-700/60 text-left'
                                                }`}
                                            >
                                                {msg.timestamp}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {isLoading && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex justify-start"
                                >
                                    <div className="flex flex-col items-start max-w-[80%]">
                                        <div className="px-4.5 py-2.5 bg-white text-[#0284c7] border border-sky-100 rounded-2xl rounded-tl-none border-l-4 border-l-[#0284c7] flex items-center space-x-1.5 shadow-sm">
                                            <span className="w-1.5 h-1.5 bg-[#0284c7] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                            <span className="w-1.5 h-1.5 bg-[#00a8e8] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                            <span className="w-1.5 h-1.5 bg-[#38bdf8] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* C. FOOTER WITH SUGGESTED REPLIES & INPUT */}
                        <div className="p-4 border-t border-sky-100/80 bg-white/90">
                            
                            {/* Interactive Suggestion Chips */}
                            {suggestedReplies.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 mb-3.5 max-h-[85px] overflow-y-auto no-scrollbar">
                                    {suggestedReplies.map((reply, index) => (
                                        <motion.button
                                            key={index}
                                            onClick={() => handleSendMessage(reply.replace(/^\p{Extended_Pictographic}\s*/u, "").trim())}
                                            whileHover={{ scale: 1.03, backgroundColor: '#0284c7', color: '#ffffff', borderColor: '#0284c7' }}
                                            whileTap={{ scale: 0.97 }}
                                            className="px-3.5 py-2 text-[8px] uppercase tracking-widest font-black text-sky-900 bg-sky-50/70 border border-sky-200 rounded-full transition-all duration-300 cursor-pointer flex items-center gap-1.5 focus:outline-none shadow-xs hover:shadow-sm"
                                            disabled={isLoading}
                                        >
                                            <span>{reply}</span>
                                        </motion.button>
                                    ))}
                                </div>
                            )}

                            {/* Input Box */}
                            <div className="flex items-center bg-white border border-sky-200 focus-within:border-[#0284c7] focus-within:ring-2 focus-within:ring-sky-100 p-1 pl-4.5 transition-all duration-300 rounded-full shadow-xs">
                                <input
                                    type="text"
                                    placeholder="Ask GoMo Assistant..."
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    className="flex-grow bg-transparent border-none text-[12px] text-slate-800 focus:outline-none focus:ring-0 placeholder-slate-400 py-2.5"
                                    disabled={isLoading}
                                />
                                <motion.button
                                    onClick={() => handleSendMessage()}
                                    disabled={isLoading || !inputValue.trim()}
                                    whileHover={inputValue.trim() && !isLoading ? { scale: 1.03 } : {}}
                                    whileTap={inputValue.trim() && !isLoading ? { scale: 0.97 } : {}}
                                    className={`w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200 border ${
                                        inputValue.trim() && !isLoading
                                            ? 'bg-gradient-to-r from-[#0284c7] to-[#00a8e8] hover:from-[#0369a1] hover:to-[#0284c7] text-white border-transparent cursor-pointer shadow-md shadow-sky-500/25'
                                            : 'bg-sky-50 text-sky-300 border-sky-100 cursor-not-allowed'
                                    }`}
                                    aria-label="Send Message"
                                >
                                    <Send className="w-3.5 h-3.5" />
                                </motion.button>
                            </div>
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ChatbotWidget;
