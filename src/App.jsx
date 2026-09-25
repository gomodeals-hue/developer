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
const LegalPage = React.lazy(() => import('./pages/Legal/LegalPage'));

const CheckoutPage = React.lazy(() => import('./components/CheckoutPage/CheckoutPage'));
const OrderPlaced = React.lazy(() => import('./components/CheckoutPage/OrderPlaced'));
const Cart = React.lazy(() => import('./pages/Cart/Cart'));
const Wishlist = React.lazy(() => import('./pages/Wishlist/Wishlist'));
const SharedWishlist = React.lazy(() => import('./pages/Wishlist/SharedWishlist'));
const MembershipPage = React.lazy(() => import('./pages/Membership/MembershipPage'));

import { useAuth } from './context/AuthContext';


function AdminRouteGuard({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  const userRole = user?.role || user?.type;
  if (!user || (userRole !== 'admin' && userRole !== 'super_admin')) {
    return <Navigate to="/admin-login" replace />;
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
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Oops! Something went wrong.</h1>
          <p className="text-gray-600 mb-6 max-w-md">We're sorry, but the application encountered an unexpected error. This might be due to a network issue or a temporary glitch.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
          >
            Reload Page
          </button>
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
        <ShopProvider>
          <ProductProvider>
            <ToastProvider>
              <Router>
                <ScrollToTop />
                <React.Suspense fallback={
                  <div className="flex items-center justify-center min-h-screen bg-white">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
                  </div>
                }>
                  <Routes>
                    {/* Standalone Auth Routes */}
                    <Route path="/admin-login" element={<AdminAuthPage />} />
                    <Route path="/admin-register" element={<AdminSignupPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="/reset-password" element={<ForgotPasswordPage />} />
                    <Route path="/admin/forgot-password" element={<ForgotPasswordPage />} />

                    {/* Single-Vendor Customer Store Routes */}
                    <Route element={<CustomerLayout />}>
                      <Route path="/" element={<Home />} />
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
                      <Route path="/onboarding/:id" element={<OnboardingPage />} />
                      <Route path="/profile" element={<CustomerRouteGuard><ProfilePage /></CustomerRouteGuard>} />
                      <Route path="/account" element={<CustomerRouteGuard><ProfilePage /></CustomerRouteGuard>} />
                      <Route path="/legal/:policyType" element={<LegalPage />} />
                      <Route path="/shared-wishlist/:token" element={<SharedWishlist />} />
                      <Route path="/membership" element={<MembershipPage />} />
                      <Route path="/deals" element={<DealsPage />} />
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
                      <Route path="/admin/analytics" element={<AdminAnalytics />} />
                      <Route path="/admin/logs" element={<AdminLogs />} />
                      <Route path="/admin/settings" element={<AdminSettings />} />
                      <Route path="/admin/administrators" element={<Administrators />} />
                      <Route path="/admin/rankings" element={<BrandRankingsPage />} />
                    </Route>



                    {/* Catch all fallback */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </React.Suspense>
              </Router>
            </ToastProvider>
          </ProductProvider>
        </ShopProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
