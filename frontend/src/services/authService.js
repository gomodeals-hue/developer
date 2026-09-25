import { API_CONFIG } from "../config/api.config.js";
import { apiClient } from "./apiClient.js";

const USERS_STORAGE_KEY = 'gomo_mock_users';
const ACTIVE_SESSION_KEY = 'gomo_active_session';
const RESET_OTP_KEY = 'gomo_reset_otps';

/**
 * Pre-seeded default users for single-vendor boutique testing:
 * 1. Customer: customer@gomodeals.com / Customer@123
 * 2. Admin: admin@gomodeals.com / Admin@123
 */
const DEFAULT_USERS = [
  {
    id: 'cust_101',
    customer_id: 'cust_101',
    name: 'Saranyan E',
    full_name: 'Saranyan E',
    email: 'customer@gomodeals.com',
    password: 'Customer@123',
    phone: '+91 98765 43210',
    date_of_birth: '1995-06-15',
    gender: 'male',
    role: 'customer',
    membership: 'gold',
    profile_picture_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    created_at: '2026-01-10T10:00:00Z',
    is_verified: true
  },
  {
    id: 'admin_001',
    customer_id: 'admin_001',
    name: 'GoMo Admin',
    full_name: 'GoMo Store Administrator',
    email: 'admin@gomodeals.com',
    password: 'Admin@123',
    phone: '+91 98765 00000',
    date_of_birth: '1990-01-01',
    gender: 'other',
    role: 'admin',
    membership: 'diamond',
    profile_picture_url: '',
    created_at: '2026-01-01T00:00:00Z',
    is_verified: true
  }
];

const loadUsers = () => {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_USERS));
      return DEFAULT_USERS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_USERS;
  } catch {
    return DEFAULT_USERS;
  }
};

const saveUsers = (users) => {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (err) {
    console.error('Failed to save mock users:', err);
  }
};

const normalizeEmail = (email) => {
  if (typeof email === 'string') return email.toLowerCase().trim();
  if (email && typeof email === 'object' && email.email) {
    return email.email.toLowerCase().trim();
  }
  return '';
};

export const handleApiCall = async (method, url, data) => {
  try {
    const res = await apiClient[method](url, data);
    return res.data;
  } catch (error) {
    if (!(url === '/me' && error?.status === 401)) {
      console.warn(`API [${method} ${url}] failed, utilizing mock fallback:`, error?.message);
    }
    throw error;
  }
};

// ==========================================
// CUSTOMER & GENERIC AUTHENTICATION METHODS
// ==========================================

/**
 * Customer & Admin Login
 * Supports email/password with simulated JWT generation
 */
export const customerLogin = async (email, password, otp = null) => {
  const normEmail = normalizeEmail(email);

  if (!API_CONFIG.USE_MOCK) {
    try {
      const res = await apiClient.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN, {
        email: normEmail,
        password,
        otp
      });
      if (res.data?.token) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('auth_token', res.data.token);
      }
      return res.data;
    } catch (err) {
      console.warn('Backend login failed, checking mock credentials:', err.message);
    }
  }

  // Mock Authentication Logic
  const users = loadUsers();
  const user = users.find(u => u.email.toLowerCase() === normEmail);

  if (!user) {
    throw { response: { status: 404, data: { message: 'No account found with this email address.' } } };
  }

  if (user.password !== password) {
    throw { response: { status: 401, data: { message: 'Incorrect password. Please verify and try again.' } } };
  }

  const mockToken = `mock-jwt-${user.role}-${user.id}-${Date.now()}`;
  localStorage.setItem('token', mockToken);
  localStorage.setItem('auth_token', mockToken);

  const sanitizedUser = { ...user };
  delete sanitizedUser.password;
  localStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(sanitizedUser));

  return {
    success: true,
    token: mockToken,
    data: sanitizedUser,
    message: 'Login successful'
  };
};

export const login = customerLogin;

/**
 * Customer Registration
 */
export const customerRegister = async (registerData) => {
  const normEmail = normalizeEmail(registerData.email);

  if (!API_CONFIG.USE_MOCK) {
    try {
      const res = await apiClient.post(API_CONFIG.ENDPOINTS.AUTH.REGISTER, registerData);
      if (res.data?.token) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('auth_token', res.data.token);
      }
      return res.data;
    } catch (err) {
      console.warn('Backend register failed, saving to mock storage:', err.message);
    }
  }

  // Mock Registration Logic
  const users = loadUsers();
  if (users.some(u => u.email.toLowerCase() === normEmail)) {
    throw { response: { status: 409, data: { message: 'An account with this email address already exists.' } } };
  }

  const newId = `cust_${Date.now()}`;
  const newUser = {
    id: newId,
    customer_id: newId,
    name: registerData.full_name || registerData.fullName || 'Customer',
    full_name: registerData.full_name || registerData.fullName || 'Customer',
    email: normEmail,
    password: registerData.password,
    phone: registerData.phone || '',
    date_of_birth: registerData.date_of_birth || registerData.dateOfBirth || '',
    gender: registerData.gender || '',
    role: 'customer',
    membership: 'free',
    profile_picture_url: registerData.profile_picture_url || '',
    created_at: new Date().toISOString(),
    is_verified: true
  };

  users.push(newUser);
  saveUsers(users);

  const mockToken = `mock-jwt-customer-${newId}-${Date.now()}`;
  localStorage.setItem('token', mockToken);
  localStorage.setItem('auth_token', mockToken);

  const sanitizedUser = { ...newUser };
  delete sanitizedUser.password;
  localStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(sanitizedUser));

  return {
    success: true,
    token: mockToken,
    data: sanitizedUser,
    message: 'Account registered successfully'
  };
};

export const register = customerRegister;

/**
 * Send OTP (For Registration / Forgot Password)
 */
export const sendOtp = async (email, purpose = 'verification') => {
  const normEmail = normalizeEmail(email);

  if (!API_CONFIG.USE_MOCK) {
    try {
      const res = await apiClient.post(API_CONFIG.ENDPOINTS.AUTH.FORGOT_PASSWORD, { email: normEmail, purpose });
      return res.data;
    } catch (err) {
      console.warn('Backend sendOtp failed, generating mock OTP:', err.message);
    }
  }

  const mockOtp = '123456';
  try {
    const raw = localStorage.getItem(RESET_OTP_KEY);
    const otps = raw ? JSON.parse(raw) : {};
    otps[normEmail] = { otp: mockOtp, expiresAt: Date.now() + 10 * 60 * 1000 };
    localStorage.setItem(RESET_OTP_KEY, JSON.stringify(otps));
  } catch (e) {
    console.error(e);
  }

  return {
    success: true,
    otp: mockOtp,
    message: `Verification code sent. Use test code: ${mockOtp}`
  };
};

/**
 * Verify OTP
 */
export const verifyOtp = async (email, otp) => {
  const normEmail = normalizeEmail(email);

  if (!API_CONFIG.USE_MOCK) {
    try {
      const res = await apiClient.post(API_CONFIG.ENDPOINTS.AUTH.VERIFY_EMAIL, { email: normEmail, otp });
      return res.data;
    } catch (err) {
      console.warn('Backend verifyOtp failed, verifying mock OTP:', err.message);
    }
  }

  // Accepts '123456' or whatever was stored
  if (otp === '123456') {
    return { success: true, message: 'OTP verified successfully' };
  }

  try {
    const raw = localStorage.getItem(RESET_OTP_KEY);
    const otps = raw ? JSON.parse(raw) : {};
    if (otps[normEmail] && otps[normEmail].otp === otp) {
      return { success: true, message: 'OTP verified successfully' };
    }
  } catch (e) {
    console.error(e);
  }

  throw { response: { status: 400, data: { message: 'Invalid or expired OTP code' } } };
};

/**
 * Request Password Reset
 */
export const requestPasswordReset = async (email) => {
  const normEmail = normalizeEmail(email);
  const users = loadUsers();
  const exists = users.some(u => u.email.toLowerCase() === normEmail);

  if (!exists) {
    throw { response: { status: 404, data: { message: 'No account registered with this email address.' } } };
  }

  return sendOtp(normEmail, 'forgot_password');
};

/**
 * Reset Password with OTP
 */
export const resetPassword = async (email, otp, newPassword) => {
  const normEmail = normalizeEmail(email);

  if (!API_CONFIG.USE_MOCK) {
    try {
      const res = await apiClient.post('/auth/reset-password', { email: normEmail, otp, newPassword });
      return res.data;
    } catch (err) {
      console.warn('Backend resetPassword failed, updating mock storage:', err.message);
    }
  }

  // Validate OTP
  await verifyOtp(normEmail, otp);

  const users = loadUsers();
  const userIndex = users.findIndex(u => u.email.toLowerCase() === normEmail);
  if (userIndex === -1) {
    throw { response: { status: 404, data: { message: 'User not found' } } };
  }

  users[userIndex].password = newPassword;
  saveUsers(users);

  return {
    success: true,
    message: 'Password has been successfully reset. Please log in with your new credentials.'
  };
};

/**
 * Change Password (for authenticated users in account settings)
 */
export const changePassword = async (userId, currentPassword, newPassword) => {
  if (!API_CONFIG.USE_MOCK) {
    try {
      const res = await apiClient.post('/user/change-password', { currentPassword, newPassword });
      return res.data;
    } catch (err) {
      console.warn('Backend changePassword failed, updating mock store:', err.message);
    }
  }

  const users = loadUsers();
  const userIndex = users.findIndex(u => u.id === userId || u.customer_id === userId);
  if (userIndex === -1) {
    throw { response: { status: 404, data: { message: 'User account not found.' } } };
  }

  if (users[userIndex].password !== currentPassword) {
    throw { response: { status: 400, data: { message: 'Current password does not match.' } } };
  }

  users[userIndex].password = newPassword;
  saveUsers(users);

  return {
    success: true,
    message: 'Your password was updated successfully.'
  };
};

/**
 * Get Current Authenticated User (Session validation)
 */
export const getMe = async () => {
  if (!API_CONFIG.USE_MOCK) {
    try {
      const res = await apiClient.get(API_CONFIG.ENDPOINTS.AUTH.ME);
      if (res.data?.success && res.data?.data) {
        localStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(res.data.data));
        return res.data;
      }
    } catch (err) {
      // If token invalid, proceed to mock session check
    }
  }

  const token = localStorage.getItem('token') || localStorage.getItem('auth_token');
  if (!token) {
    return { success: false, data: null };
  }

  try {
    const raw = localStorage.getItem(ACTIVE_SESSION_KEY);
    if (raw) {
      const user = JSON.parse(raw);
      return { success: true, data: user };
    }
  } catch (err) {
    console.error('Failed to parse active session:', err);
  }

  // Fallback to default customer if token exists
  const users = loadUsers();
  const defaultCust = users.find(u => u.role === 'customer') || DEFAULT_USERS[0];
  const sanitized = { ...defaultCust };
  delete sanitized.password;
  return { success: true, data: sanitized };
};

/**
 * Customer & Generic Logout
 */
export const customerLogout = async () => {
  if (!API_CONFIG.USE_MOCK) {
    try {
      await apiClient.post(API_CONFIG.ENDPOINTS.AUTH.LOGOUT);
    } catch (err) {
      // Ignore network errors on logout
    }
  }

  localStorage.removeItem('token');
  localStorage.removeItem('auth_token');
  localStorage.removeItem(ACTIVE_SESSION_KEY);
  localStorage.removeItem('user');
  return { success: true };
};

export const logout = customerLogout;
export const logoutUser = customerLogout;

// ==========================================
// ADMIN AUTHENTICATION METHODS
// ==========================================

export const adminLogin = async (email, password, role = 'admin', otp = null) => {
  const normEmail = normalizeEmail(email);

  if (!API_CONFIG.USE_MOCK) {
    try {
      const res = await apiClient.post('/admin/login', { email: normEmail, password, role, otp });
      if (res.data?.token) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('auth_token', res.data.token);
      }
      return res.data;
    } catch (err) {
      console.warn('Backend admin login failed, falling back to mock:', err.message);
    }
  }

  const users = loadUsers();
  const user = users.find(u => u.email.toLowerCase() === normEmail && (u.role === 'admin' || u.role === 'super_admin'));

  if (!user) {
    throw { response: { status: 404, data: { message: 'No administrator account found with this email.' } } };
  }

  if (user.password !== password) {
    throw { response: { status: 401, data: { message: 'Incorrect admin credentials.' } } };
  }

  const mockToken = `mock-jwt-admin-${user.id}-${Date.now()}`;
  localStorage.setItem('token', mockToken);
  localStorage.setItem('auth_token', mockToken);

  const sanitizedUser = { ...user };
  delete sanitizedUser.password;
  localStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(sanitizedUser));

  return {
    success: true,
    token: mockToken,
    data: sanitizedUser,
    message: 'Admin login successful'
  };
};

export const loginAdmin = adminLogin;
export const verifySuperAdminLogin = adminLogin;

export const adminRegister = async (registerData) => {
  const normEmail = normalizeEmail(registerData.email);

  const users = loadUsers();
  if (users.some(u => u.email.toLowerCase() === normEmail)) {
    throw { response: { status: 409, data: { message: 'An administrator account with this email already exists.' } } };
  }

  const newId = `admin_${Date.now()}`;
  const newAdmin = {
    id: newId,
    customer_id: newId,
    name: registerData.name || registerData.full_name || 'Admin',
    full_name: registerData.full_name || registerData.name || 'Admin',
    email: normEmail,
    password: registerData.password,
    phone: registerData.phone || '',
    role: 'admin',
    membership: 'diamond',
    created_at: new Date().toISOString(),
    is_verified: true
  };

  users.push(newAdmin);
  saveUsers(users);

  return { success: true, data: newAdmin, message: 'Admin account created successfully' };
};

export const registerAdmin = adminRegister;
export const adminLogout = customerLogout;

export const sendAdminRegisterOTP = (data) => sendOtp(data.email, 'admin_register');
export const requestAdminPasswordReset = (email) => requestPasswordReset(email);
export const verifyAdminPasswordReset = (payload) => resetPassword(payload.email, payload.otp, payload.newPassword);

// Backward compatibility helper
export const getCustomerById = async (id) => {
  const users = loadUsers();
  const user = users.find(u => u.id === id || u.customer_id === id);
  return { success: true, data: user || null };
};

export const getCustomerAddresses = async (id) => {
  try {
    const raw = localStorage.getItem('gomo_user_addresses');
    return { success: true, data: raw ? JSON.parse(raw) : [] };
  } catch {
    return { success: true, data: [] };
  }
};

export const customerOnboarding = async (customerId, data) => {
  return { success: true, data };
};

export const agreeToTerms = async () => ({ success: true });
