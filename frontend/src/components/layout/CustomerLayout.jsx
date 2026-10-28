import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import MobileBottomNav from './Navbar/MobileBottomNav';
import Footer from './Footer/Footer';
import { useAuth } from '../../context/AuthContext';
import ChatbotWidget from './Chatbot/ChatbotWidget';
import MembershipWelcomeModal from '../common/MembershipWelcomeModal';
import CompareTray from '../common/CompareTray';
import LivePurchaseTicker from '../common/LivePurchaseTicker';

const CustomerLayout = () => {
    const { loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <p className="text-orange-500 uppercase tracking-widest text-xs font-bold animate-pulse">Loading GoMo Deals...</p>
            </div>
        );
    }

    const isAuthPage = ['/login', '/register', '/forgot-password', '/onboarding'].includes(location.pathname);
    const isHome = location.pathname === '/';

    return (
        <div className="font-sans antialiased text-stone-900 bg-white min-h-screen flex flex-col pb-16 md:pb-0">
            {!isAuthPage && <Navbar />}
            <main className={`flex-grow relative ${isHome || isAuthPage ? 'pt-0' : 'pt-[110px]'}`}>
                <Outlet />
            </main>
            {!isAuthPage && <Footer />}
            {!isAuthPage && <MobileBottomNav />}
            <ChatbotWidget />
            <MembershipWelcomeModal />
            <CompareTray />
            <LivePurchaseTicker />
        </div>
    );
};

export default CustomerLayout;
