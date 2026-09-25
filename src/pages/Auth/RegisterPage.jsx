import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, Calendar, ArrowRight, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import '../../styles/auth.css';
import { useShop } from '../../context/ShopContext';
import { useAuth } from '../../context/AuthContext';
import * as authService from '../../services/authService';

const RegisterPage = () => {
    const { t } = useShop();
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        gender: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validate = () => {
        let newErrors = {};
        if (!formData.fullName.trim()) {
            newErrors.fullName = t('full_name_required') || 'Full Name is required';
        }

        if (!formData.email) {
            newErrors.email = t('email_required') || 'Email address is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = t('email_invalid') || 'Please enter a valid email address';
        }

        if (!formData.phone) {
            newErrors.phone = t('phone_required') || 'Phone number is required';
        } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
            newErrors.phone = t('phone_invalid') || 'Enter a valid phone number (min 10 digits)';
        }

        if (!formData.password) {
            newErrors.password = t('password_required') || 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must contain at least 8 characters';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = t('passwords_dont_match') || 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            setLoading(true);
            setErrors({});
            try {
                const response = await authService.customerRegister({
                    full_name: formData.fullName,
                    email: formData.email,
                    phone: formData.phone,
                    date_of_birth: formData.dateOfBirth,
                    gender: formData.gender,
                    password: formData.password
                });

                if (response.success) {
                    login(response.data);
                    navigate('/profile', { replace: true });
                }
            } catch (err) {
                console.error("REGISTER ERROR:", err);
                setErrors({ 
                    submit: err.response?.data?.message || 'Registration failed. Please check your information.' 
                });
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="min-h-screen auth-bg flex items-center justify-center py-12 px-4">
            <div className="auth-card max-w-lg w-full bg-white border border-orange-100 p-8 sm:p-10 shadow-xl rounded-sm">
                <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-8"
                >
                    <span className="text-[10px] uppercase tracking-[0.4em] text-orange-600/80 block mb-2 font-bold">GoMo Boutique</span>
                    <h2 className="text-3xl sm:text-4xl font-serif italic text-orange-950 font-normal mb-2">Create Account</h2>
                    <p className="text-orange-950/60 text-[9px] uppercase tracking-[0.18em] font-bold max-w-xs mx-auto leading-relaxed">
                        Join the GoMo Deals luxury boutique & unlock member privileges
                    </p>
                </motion.div>

                {errors.submit && (
                    <div className="p-4 mb-6 bg-rose-50 border border-rose-200 text-rose-800 text-center">
                        <p className="text-xs font-serif italic text-orange-950 leading-tight">
                            {errors.submit}
                        </p>
                    </div>
                )}

                <motion.form 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    onSubmit={handleSubmit} 
                    className="space-y-4"
                >
                    {/* Full Name */}
                    <div className="space-y-1">
                        <label className="text-[9px] uppercase tracking-[0.25em] font-bold text-orange-950/70">Full Name *</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-950/45" size={16} strokeWidth={1.5} />
                            <input 
                                type="text"
                                required
                                value={formData.fullName}
                                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                                placeholder="Alexander Hamilton"
                                className={`w-full pl-12 pr-4 py-3 bg-[#faf8f5] border ${errors.fullName ? 'border-red-500' : 'border-orange-200/60'} focus:border-orange-950 focus:bg-white outline-none transition-all text-xs tracking-wider text-orange-950 placeholder-orange-950/30`}
                            />
                        </div>
                        {errors.fullName && <p className="text-[9px] text-red-500 uppercase font-bold mt-0.5">{errors.fullName}</p>}
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[9px] uppercase tracking-[0.25em] font-bold text-orange-950/70">Email Address *</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-950/45" size={16} strokeWidth={1.5} />
                                <input 
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    placeholder="alex@example.com"
                                    className={`w-full pl-12 pr-4 py-3 bg-[#faf8f5] border ${errors.email ? 'border-red-500' : 'border-orange-200/60'} focus:border-orange-950 focus:bg-white outline-none transition-all text-xs tracking-wider text-orange-950 placeholder-orange-950/30`}
                                />
                            </div>
                            {errors.email && <p className="text-[9px] text-red-500 uppercase font-bold mt-0.5">{errors.email}</p>}
                        </div>

                        <div className="space-y-1">
                            <label className="text-[9px] uppercase tracking-[0.25em] font-bold text-orange-950/70">Phone Number *</label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-950/45" size={16} strokeWidth={1.5} />
                                <input 
                                    type="tel"
                                    required
                                    value={formData.phone}
                                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                    placeholder="+91 98765 43210"
                                    className={`w-full pl-12 pr-4 py-3 bg-[#faf8f5] border ${errors.phone ? 'border-red-500' : 'border-orange-200/60'} focus:border-orange-950 focus:bg-white outline-none transition-all text-xs tracking-wider text-orange-950 placeholder-orange-950/30`}
                                />
                            </div>
                            {errors.phone && <p className="text-[9px] text-red-500 uppercase font-bold mt-0.5">{errors.phone}</p>}
                        </div>
                    </div>

                    {/* DOB & Gender */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[9px] uppercase tracking-[0.25em] font-bold text-orange-950/70">Date of Birth</label>
                            <div className="relative">
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-950/45" size={16} strokeWidth={1.5} />
                                <input 
                                    type="date"
                                    value={formData.dateOfBirth}
                                    onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                                    className="w-full pl-12 pr-4 py-3 bg-[#faf8f5] border border-orange-200/60 focus:border-orange-950 focus:bg-white outline-none transition-all text-xs tracking-wider text-orange-950"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[9px] uppercase tracking-[0.25em] font-bold text-orange-950/70">Gender</label>
                            <select 
                                value={formData.gender}
                                onChange={(e) => setFormData({...formData, gender: e.target.value})}
                                className="w-full px-4 py-3 bg-[#faf8f5] border border-orange-200/60 focus:border-orange-950 focus:bg-white outline-none transition-all text-xs tracking-wider text-orange-950"
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Prefer not to say</option>
                            </select>
                        </div>
                    </div>

                    {/* Password & Confirm */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[9px] uppercase tracking-[0.25em] font-bold text-orange-950/70">Password *</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-950/45" size={16} strokeWidth={1.5} />
                                <input 
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    placeholder="Min. 8 chars"
                                    className={`w-full pl-12 pr-10 py-3 bg-[#faf8f5] border ${errors.password ? 'border-red-500' : 'border-orange-200/60'} focus:border-orange-950 focus:bg-white outline-none transition-all text-xs tracking-wider text-orange-950 placeholder-orange-950/30`}
                                />
                                <button 
                                    type="button" 
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-950/45 hover:text-orange-950"
                                >
                                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                                </button>
                            </div>
                            {errors.password && <p className="text-[9px] text-red-500 uppercase font-bold mt-0.5">{errors.password}</p>}
                        </div>

                        <div className="space-y-1">
                            <label className="text-[9px] uppercase tracking-[0.25em] font-bold text-orange-950/70">Confirm Password *</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-950/45" size={16} strokeWidth={1.5} />
                                <input 
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                                    placeholder="Repeat password"
                                    className={`w-full pl-12 pr-4 py-3 bg-[#faf8f5] border ${errors.confirmPassword ? 'border-red-500' : 'border-orange-200/60'} focus:border-orange-950 focus:bg-white outline-none transition-all text-xs tracking-wider text-orange-950 placeholder-orange-950/30`}
                                />
                            </div>
                            {errors.confirmPassword && <p className="text-[9px] text-red-500 uppercase font-bold mt-0.5">{errors.confirmPassword}</p>}
                        </div>
                    </div>

                    <button 
                        type="submit"
                        disabled={loading}
                        className={`w-full mt-4 py-4 bg-orange-950 text-white text-[9px] uppercase tracking-[0.4em] font-black hover:bg-orange-900 transition-all duration-300 shadow-[0_8px_30px_rgba(67,23,5,0.12)] flex items-center justify-center gap-3 cursor-pointer ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'CREATING ACCOUNT...' : 'REGISTER & CONTINUE'}
                        {!loading && <ArrowRight size={14} strokeWidth={2} />}
                    </button>
                </motion.form>

                <div className="mt-6 text-center">
                    <p className="text-orange-950/60 text-[10px] tracking-wider uppercase font-bold">
                        Already have an account? {' '}
                        <Link to="/login" className="text-orange-950 font-black border-b border-orange-950/30 pb-0.5 hover:border-orange-950 hover:text-orange-600 transition-all uppercase text-[10px] tracking-widest ml-1.5">
                            Sign In
                        </Link>
                    </p>
                    <p className="mt-4">
                        <Link to="/" className="text-orange-700 hover:text-orange-900 text-xs uppercase tracking-wider font-semibold">
                            &larr; Back to Boutique
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
