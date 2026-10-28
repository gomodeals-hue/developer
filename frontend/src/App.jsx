import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from "./components/layout/Navbar/Navbar";
import ScrollToTop from "./components/common/ScrollToTop";
import Footer from "./components/layout/Footer/Footer";
import Home from "./pages/Home/Home";
import ProductDetails from "./pages/Product/ProductDetails";

import { ShopProvider } from './context/ShopContext';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext/ProductContext';
import { ToastProvider } from './context/ToastContext';
import CategoryPage from './pages/Category/CategoryPage';
import CategoriesPage from './pages/Category/CategoriesPage';
import DealsPage from './pages/Deals/DealsPage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import VerifyEmailPage from './pages/Auth/VerifyEmailPage';
import ForgotPasswordPage from './pages/Auth/ForgotPasswordPage';
import OnboardingPage from './pages/Auth/OnboardingPage';
import CustomerLayout from './components/layout/CustomerLayout';

// Code Splitting for admin and secondary pages
const AdminAuthPage = React.lazy(() => import('./components/admin/pages/AdminAuthPage'));
const AdminSignupPage = React.lazy(() => import('./components/admin/pages/AdminSignupPage'));
const ProfilePage = React.lazy(() => import('./pages/Auth/ProfilePage'));
const MyOrders = React.lazy(() => import('./pages/Auth/MyOrders'));

const AdminLayout = React.lazy(() => import('./components/admin/components/DashboardLayout').then(module => ({ default: module.DashboardLayout })));
const AdminDashboardHome = React.lazy(() => import('./components/admin/pages/DashboardHome'));
const AdminProducts = React.lazy(() => import('./components/admin/pages/ProductsPage'));
const AddProductPage = React.lazy(() => import('./components/admin/pages/AddProductPage'));
const AdminOrders = React.lazy(() => import('./components/admin/pages/OrdersPage'));
const AdminCustomers = React.lazy(() => import('./components/admin/pages/CustomersPage'));
const AdminCoupons = React.lazy(() => import('./components/admin/pages/CouponsPage'));
const AdminFinance = React.lazy(() => import('./components/admin/pages/FinancePage'));
const AdminAnalytics = React.lazy(() => import('./components/admin/pages/AnalyticsPage'));
const AdminLogs = React.lazy(() => import('./components/admin/pages/SystemLogsPage'));
const AdminSettings = React.lazy(() => import('./components/admin/pages/SettingsPage'));
const Administrators = React.lazy(() => import('./components/admin/pages/AdministratorsPage'));
const ReturnsPage = React.lazy(() => import('./components/admin/pages/ReturnsPage'));
const AdBannersPage = React.lazy(() => import('./components/admin/pages/AdBannersPage'));
const BrandRankingsPage = React.lazy(() => import('./components/admin/pages/BrandRankingsPage'));
const AdminCategories = React.lazy(() => import('./components/admin/pages/CategoriesManagementPage'));
const AdminHomepage = React.lazy(() => import('./components/admin/pages/HomepageManagementPage'));
const AdminReviews = React.lazy(() => import('./components/admin/pages/ReviewsPage'));
const AdminInventory = React.lazy(() => import('./components/admin/pages/InventoryPage'));
const AdminReports = React.lazy(() => import('./components/admin/pages/ReportsPage'));
const AdminPayments = React.lazy(() => import('./components/admin/pages/PaymentsPage'));
const AdminSupport = React.lazy(() => import('./components/admin/pages/SupportPage'));
const AdminProfile = React.lazy(() => import('./components/admin/pages/ProfilePage'));
const LegalPage = React.lazy(() => import('./pages/Legal/LegalPage'));
const AboutPage = React.lazy(() => import('./pages/About/AboutPage'));
const ContactPage = React.lazy(() => import('./pages/Contact/ContactPage'));

const CheckoutPage = React.lazy(() => import('./components/CheckoutPage/CheckoutPage'));
const OrderPlaced = React.lazy(() => import('./components/CheckoutPage/OrderPlaced'));
const Cart = React.lazy(() => import('./pages/Cart/Cart'));
const Wishlist = React.lazy(() => import('./pages/Wishlist/Wishlist'));
const SharedWishlist = React.lazy(() => import('./pages/Wishlist/SharedWishlist'));
const MembershipPage = React.lazy(() => import('./pages/Membership/MembershipPage'));

// Flea Market & Agricultural Commodity Exchange
const FleaMarketPage = React.lazy(() => import('./pages/FleaMarket/FleaMarketPage'));
const FleaMarketTerms = React.lazy(() => import('./pages/FleaMarket/FleaMarketTerms'));
const CustomerConferenceRoom = React.lazy(() => import('./pages/FleaMarket/CustomerConferenceRoom'));
const SellerFleaMarket = React.lazy(() => import('./components/SellerDashboard/SellerFleaMarket'));
const FleaMarketMediator = React.lazy(() => import('./components/admin/pages/FleaMarketMediator'));

// Movie & Event Ticket Booking Platform
const TicketsLayout = React.lazy(() => import('./layouts/TicketsLayout'));
const TicketsHome = React.lazy(() => import('./pages/Tickets/TicketsHome'));
const MovieDetails = React.lazy(() => import('./pages/Tickets/MovieDetails'));
const TicketBooking = React.lazy(() => import('./pages/Tickets/TicketBooking'));
const TicketCheckout = React.lazy(() => import('./pages/Tickets/TicketCheckout'));
const TicketSuccess = React.lazy(() => import('./pages/Tickets/TicketSuccess'));
const MyTicketBookings = React.lazy(() => import('./pages/Tickets/MyTicketBookings'));
const MoviesListing = React.lazy(() => import('./pages/Tickets/MoviesListing'));
const EventsListing = React.lazy(() => import('./pages/Tickets/EventsListing'));
const EventDetails = React.lazy(() => import('./pages/Tickets/EventDetails'));
const TheatreOwnerDashboard = React.lazy(() => import('./pages/Tickets/TheatreOwnerDashboard'));
const TheatreOwnerOnboarding = React.lazy(() => import('./pages/Tickets/TheatreOwnerOnboarding'));
const TicketsAdminDashboard = React.lazy(() => import('./pages/Tickets/TicketsAdminDashboard'));

// Bus Ticket Booking Platform
const BusSearch = React.lazy(() => import('./pages/Tickets/buses/BusSearch'));
const BusResults = React.lazy(() => import('./pages/Tickets/buses/BusResults'));
const BusSeatSelection = React.lazy(() => import('./pages/Tickets/buses/BusSeatSelection'));
const BusCheckout = React.lazy(() => import('./pages/Tickets/buses/BusCheckout'));
const BusConfirmation = React.lazy(() => import('./pages/Tickets/buses/BusConfirmation'));
const BusDetails = React.lazy(() => import('./pages/Tickets/buses/BusDetails'));


import { CurrencyProvider } from './context/CurrencyContext';

import { useAuth } from './context/AuthContext';
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext';
import { SellerAuthProvider } from './context/SellerAuthContext';

const SellerDashboard = React.lazy(() => import('./pages/Seller/SellerDashboard'));
const SellerLoginPage = React.lazy(() => import('./pages/Seller/SellerLoginPage'));
const SellerStorefront = React.lazy(() => import('./pages/Seller/SellerStorefront'));


function AdminRouteGuard({ children }) {
  const { isAdminAuthenticated, loading } = useAdminAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#02172e]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-400"></div>
      </div>
    );
  }

  if (!isAdminAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

function CustomerRouteGuard({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-stone-50 p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mb-4 text-2xl font-bold">
            !
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-2">Oops! Something went wrong.</h1>
          <p className="text-stone-600 mb-4 max-w-md text-sm">We're sorry, but the application encountered an unexpected error. This might be due to a network issue or a temporary glitch.</p>

          {this.state.error && (
            <div className="mb-6 p-4 max-w-xl w-full bg-red-50 border border-red-200 rounded-xl text-left overflow-auto text-xs text-red-800 font-mono">
              <p className="font-bold mb-1">{this.state.error.toString()}</p>
              {this.state.errorInfo?.componentStack && (
                <pre className="text-[10px] text-red-600 whitespace-pre-wrap mt-2 max-h-40 overflow-y-auto">
                  {this.state.errorInfo.componentStack}
                </pre>
              )}
            </div>
          )}

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl shadow-sm transition cursor-pointer text-sm"
            >
              Reload Page
            </button>
            <a
              href="/"
              className="px-6 py-2.5 bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold rounded-xl transition text-sm"
            >
              Go to Home
            </a>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AdminAuthProvider>
          <SellerAuthProvider>
            <ShopProvider>
              <ProductProvider>
                <CurrencyProvider>
                  <ToastProvider>
                    <Router>
                    <ScrollToTop />
                    <React.Suspense fallback={
                      <div className="flex items-center justify-center min-h-screen bg-stone-900">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-400"></div>
                      </div>
                    }>
                      <Routes>
                        {/* Standalone Video Negotiation Conference Room */}
                        <Route path="/flea-market/conference/:id" element={<CustomerConferenceRoom />} />

                        {/* Seller Merchant Portal Routes */}
                        <Route path="/seller" element={<SellerDashboard />} />
                        <Route path="/seller/login" element={<SellerLoginPage />} />
                        <Route path="/seller/register" element={<SellerLoginPage />} />
                        <Route path="/seller/flea-market" element={<SellerFleaMarket />} />
                        <Route path="/seller-dashboard/flea-market" element={<SellerFleaMarket />} />

                        {/* Isolated Admin Operations Portal Auth Routes (Strictly Private) */}
                        <Route path="/admin/login" element={<AdminAuthPage />} />
                        <Route path="/admin/register" element={<Navigate to="/admin/login" replace />} />
                        <Route path="/admin/forgot-password" element={<ForgotPasswordPage />} />

                        {/* Redirects from old routes */}
                        <Route path="/admin-login" element={<Navigate to="/admin/login" replace />} />
                        <Route path="/admin-register" element={<Navigate to="/admin/login" replace />} />

                        {/* Customer Store Auth Routes */}
                        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                        <Route path="/reset-password" element={<ForgotPasswordPage />} />

                        {/* Single-Vendor Customer Store Routes */}
                        <Route element={<CustomerLayout />}>
                          <Route path="/" element={<Home />} />
                          <Route path="/deals" element={<DealsPage />} />
                          <Route path="/flea-market" element={<FleaMarketPage />} />
                          <Route path="/flea-market/terms" element={<FleaMarketTerms />} />
                          <Route path="/products" element={<CategoryPage />} />
                          <Route path="/categories" element={<CategoriesPage />} />
                          <Route path="/product/:id" element={<ProductDetails />} />
                          <Route path="/collection/:type" element={<CategoryPage />} />
                          <Route path="/category/:type" element={<CategoryPage />} />
                          <Route path="/men-shirts" element={<CategoryPage />} />
                          <Route path="/shirts" element={<CategoryPage />} />
                          <Route path="/cart" element={<Cart />} />
                          <Route path="/checkout" element={<CheckoutPage />} />
                          <Route path="/order-success" element={<OrderPlaced />} />
                          <Route path="/my-orders" element={<MyOrders />} />
                          <Route path="/orders" element={<MyOrders />} />
                          <Route path="/wishlist" element={<Wishlist />} />
                          <Route path="/login" element={<LoginPage />} />
                          <Route path="/register" element={<RegisterPage />} />
                          <Route path="/verify-email" element={<VerifyEmailPage />} />
                          <Route path="/onboarding" element={<OnboardingPage />} />
                          <Route path="/profile" element={<CustomerRouteGuard><ProfilePage /></CustomerRouteGuard>} />
                          <Route path="/account" element={<CustomerRouteGuard><ProfilePage /></CustomerRouteGuard>} />
                          <Route path="/about" element={<AboutPage />} />
                          <Route path="/about-us" element={<AboutPage />} />
                          <Route path="/contact" element={<ContactPage />} />
                          <Route path="/contact-us" element={<ContactPage />} />
                          <Route path="/support" element={<ContactPage />} />
                          <Route path="/help" element={<Navigate to="/contact" replace />} />
                          <Route path="/security" element={<Navigate to="/legal/database-security" replace />} />
                          <Route path="/database-security" element={<Navigate to="/legal/database-security" replace />} />
                          <Route path="/data-security" element={<Navigate to="/legal/database-security" replace />} />
                          <Route path="/legal/:policyType" element={<LegalPage />} />
                          <Route path="/terms" element={<LegalPage />} />
                          <Route path="/terms-and-conditions" element={<LegalPage />} />
                          <Route path="/privacy-policy" element={<Navigate to="/legal/privacy-policy" replace />} />
                          <Route path="/shipping-policy" element={<Navigate to="/legal/shipping-policy" replace />} />
                          <Route path="/return-policy" element={<Navigate to="/legal/return-policy" replace />} />
                          <Route path="/returns" element={<Navigate to="/legal/return-policy" replace />} />
                          <Route path="/cancellation-policy" element={<Navigate to="/legal/return-policy" replace />} />
                          <Route path="/refund-policy" element={<Navigate to="/legal/return-policy" replace />} />
                          <Route path="/cookies" element={<Navigate to="/legal/cookies" replace />} />
                          <Route path="/cookie-policy" element={<Navigate to="/legal/cookies" replace />} />
                          <Route path="/track-order" element={<Navigate to="/my-orders" replace />} />
                          <Route path="/order-tracking" element={<Navigate to="/my-orders" replace />} />
                          <Route path="/faqs" element={<Navigate to="/legal/faqs" replace />} />
                          <Route path="/faq" element={<Navigate to="/legal/faqs" replace />} />
                          <Route path="/shared-wishlist/:token" element={<SharedWishlist />} />
                          <Route path="/membership" element={<MembershipPage />} />
                          <Route path="/store/:sellerId" element={<SellerStorefront />} />
                          <Route path="/seller/:sellerId" element={<SellerStorefront />} />
                          <Route path="/seller-store/:sellerId" element={<SellerStorefront />} />
                        </Route>

                        {/* Dedicated Cinema & Event Ticket Booking Platform */}
                        <Route path="/tickets" element={<TicketsLayout />}>
                          <Route index element={<TicketsHome />} />
                          <Route path="movies" element={<MoviesListing />} />
                          <Route path="events" element={<EventsListing />} />
                          <Route path="buses" element={<BusSearch />} />
                          <Route path="buses/results" element={<BusResults />} />
                          <Route path="buses/details/:tripId" element={<BusDetails />} />
                          <Route path="buses/details" element={<BusDetails />} />
                          <Route path="buses/fleet" element={<BusDetails />} />
                          <Route path="buses/seat-selection/:tripId" element={<BusSeatSelection />} />
                          <Route path="buses/checkout" element={<BusCheckout />} />
                          <Route path="buses/confirmation" element={<BusConfirmation />} />
                          <Route path="movie/:id" element={<MovieDetails />} />
                          <Route path="event/:id" element={<EventDetails />} />
                          <Route path="booking/:showtimeId" element={<TicketBooking />} />
                          <Route path="checkout" element={<TicketCheckout />} />
                          <Route path="success" element={<TicketSuccess />} />
                          <Route path="my-tickets" element={<MyTicketBookings />} />
                          <Route path="owner" element={<TheatreOwnerDashboard />} />
                          <Route path="owner/onboarding" element={<TheatreOwnerOnboarding />} />
                          <Route path="admin" element={<TicketsAdminDashboard />} />
                        </Route>

                        {/* Single-Vendor Store Admin Management Routes */}
                        <Route element={<AdminRouteGuard><AdminLayout /></AdminRouteGuard>}>
                          <Route path="/admin" element={<AdminDashboardHome />} />
                          <Route path="/admin/products" element={<AdminProducts />} />
                          <Route path="/admin/products/add" element={<AddProductPage />} />
                          <Route path="/admin/products/edit/:id" element={<AddProductPage />} />
                          <Route path="/admin/inventory" element={<AdminInventory />} />
                          <Route path="/admin/categories" element={<AdminCategories />} />
                          <Route path="/admin/orders" element={<AdminOrders />} />
                          <Route path="/admin/returns" element={<ReturnsPage />} />
                          <Route path="/admin/customers" element={<AdminCustomers />} />
                          <Route path="/admin/homepage" element={<AdminHomepage />} />
                          <Route path="/admin/ad-banners" element={<AdBannersPage />} />
                          <Route path="/admin/reviews" element={<AdminReviews />} />
                          <Route path="/admin/coupons" element={<AdminCoupons />} />
                          <Route path="/admin/reports" element={<AdminReports />} />
                          <Route path="/admin/finance" element={<AdminFinance />} />
                          <Route path="/admin/payments" element={<AdminPayments />} />
                          <Route path="/admin/analytics" element={<AdminAnalytics />} />
                          <Route path="/admin/support" element={<AdminSupport />} />
                          <Route path="/admin/mediator/flea-market" element={<FleaMarketMediator />} />
                          <Route path="/admin/tickets-manager" element={<TicketsAdminDashboard />} />
                          <Route path="/admin/logs" element={<AdminLogs />} />
                          <Route path="/admin/settings" element={<AdminSettings />} />
                          <Route path="/admin/profile" element={<AdminProfile />} />
                          <Route path="/admin/administrators" element={<Administrators />} />
                          <Route path="/admin/rankings" element={<BrandRankingsPage />} />
                        </Route>

                        {/* Catch all fallback */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                      </Routes>
                    </React.Suspense>
                  </Router>
                  </ToastProvider>
                </CurrencyProvider>
              </ProductProvider>
            </ShopProvider>
          </SellerAuthProvider>
        </AdminAuthProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
