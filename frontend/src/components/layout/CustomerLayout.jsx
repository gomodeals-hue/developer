import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import { useAuth } from '../../context/AuthContext';
import ChatbotWidget from './Chatbot/ChatbotWidget';
import MembershipWelcomeModal from '../common/MembershipWelcomeModal';
import CompareTray from '../common/CompareTray';

const CustomerLayout = () => {
    const { loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <p className="text-orange-500 uppercase tracking-widest text-xs font-bold">Loading...</p>
            </div>
        );
    }

    const isAuthPage = ['/login', '/register', '/admin-login', '/admin-register', '/forgot-password'].includes(location.pathname);
    const isHome = location.pathname === '/';

    return (
        <div className="font-sans antialiased text-stone-900 bg-white min-h-screen flex flex-col">
            {!isAuthPage && <Navbar />}
            <main className={`flex-grow relative ${isHome || isAuthPage ? 'pt-0' : 'pt-[110px]'}`}>
                <Outlet />
            </main>
            {!isAuthPage && <Footer />}
            <ChatbotWidget />
            <MembershipWelcomeModal />
            <CompareTray />
        </div>
    );
};

export default CustomerLayout;
