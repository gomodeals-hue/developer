import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, KeyRound, ArrowRight, Eye, EyeOff, CheckCircle2, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import * as authService from '../../services/authService';

const ForgotPasswordPage = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [mockOtpHint, setMockOtpHint] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    const navigate = useNavigate();

    const handleSendOTP = async (e) => {
        e.preventDefault();
        if (!email) {
            setError('Please enter your account email address');
            return;
        }

        setLoading(true);
        setError('');
        try {
            const res = await authService.requestPasswordReset(email);
            setStep(2);
            if (res.otp) {
                setMockOtpHint(res.otp);
            }
            setSuccess('A verification code has been dispatched.');
        } catch (err) {
            setError(err.response?.data?.message || 'No registered account found with this email.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyAndReset = async (e) => {
        e.preventDefault();
        if (!otp || otp.length < 6) {
            setError('Please enter a valid 6-digit verification code');
            return;
        }
        if (newPassword.length < 8) {
            setError('Password must contain at least 8 characters');
            return;
        }
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        setError('');
        try {
            await authService.resetPassword(email, otp, newPassword);
            setSuccess('Your password has been successfully updated!');
            setTimeout(() => {
                navigate('/login', { replace: true });
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Verification failed. Please verify the code and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen auth-bg flex items-center justify-center py-12 px-4">
            <div className="auth-card max-w-md w-full bg-white border border-orange-100 p-8 sm:p-10 shadow-xl rounded-sm text-center">
                <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="w-16 h-16 bg-orange-100/70 text-orange-950 rounded-full flex items-center justify-center mx-auto mb-6">
                        <KeyRound size={28} strokeWidth={1.5} />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.4em] text-orange-600/80 block mb-2 font-bold">GoMo Security</span>
                    <h2 className="text-3xl font-serif italic text-orange-950 font-normal mb-2">Reset Password</h2>
                    <p className="text-orange-950/60 text-[9px] uppercase tracking-[0.18em] font-bold max-w-xs mx-auto leading-relaxed mb-6">
                        {step === 1 ? 'Enter your registered email to receive a recovery code' : 'Enter the recovery code & set your new password'}
                    </p>
                </motion.div>

                {/* Mock Code Hint for easy testing */}
                {mockOtpHint && step === 2 && (
                    <div className="mb-6 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-sm text-left flex items-start gap-2">
                        <ShieldCheck size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="font-bold text-[10px] uppercase tracking-wider text-emerald-900">Demo Mode Recovery Code</p>
                            <p className="mt-0.5 text-xs">Use code: <span className="font-mono font-black text-sm text-emerald-900 bg-white px-2 py-0.5 rounded border border-emerald-300 tracking-widest">{mockOtpHint}</span></p>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="p-3.5 mb-6 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-sm">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="p-3.5 mb-6 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-sm flex items-center justify-center gap-2">
                        <CheckCircle2 size={16} className="text-emerald-600" />
                        {success}
                    </div>
                )}

                {step === 1 ? (
                    <form onSubmit={handleSendOTP} className="space-y-5 text-left">
                        <div className="space-y-1.5">
                            <label className="text-[9px] uppercase tracking-[0.25em] font-bold text-orange-950/70">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-950/45" size={16} strokeWidth={1.5} />
                                <input 
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@example.com"
                                    className="w-full pl-12 pr-4 py-3.5 bg-[#faf8f5] border border-orange-200/60 focus:border-orange-950 focus:bg-white outline-none transition-all text-xs tracking-wider text-orange-950"
                                />
                            </div>
                        </div>

                        <button 
                            type="submit"
                            disabled={loading}
                            className={`w-full py-4 bg-orange-950 text-white text-[9px] uppercase tracking-[0.4em] font-black hover:bg-orange-900 transition-all duration-300 shadow-[0_8px_30px_rgba(67,23,5,0.12)] flex items-center justify-center gap-3 cursor-pointer ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'SENDING CODE...' : 'SEND RECOVERY CODE'}
                            {!loading && <ArrowRight size={14} strokeWidth={2} />}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyAndReset} className="space-y-4 text-left">
                        <div className="space-y-1.5">
                            <label className="text-[9px] uppercase tracking-[0.25em] font-bold text-orange-950/70">6-Digit Code</label>
                            <input 
                                type="text"
                                required
                                maxLength={6}
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                placeholder="123456"
                                className="w-full px-4 py-3 bg-[#faf8f5] border border-orange-200/60 focus:border-orange-950 focus:bg-white outline-none transition-all text-sm tracking-[0.4em] text-center font-bold text-orange-950"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[9px] uppercase tracking-[0.25em] font-bold text-orange-950/70">New Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-950/45" size={16} strokeWidth={1.5} />
                                <input 
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Min. 8 characters"
                                    className="w-full pl-12 pr-10 py-3 bg-[#faf8f5] border border-orange-200/60 focus:border-orange-950 focus:bg-white outline-none transition-all text-xs tracking-wider text-orange-950"
                                />
                                <button 
                                    type="button" 
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-950/45 hover:text-orange-950"
                                >
                                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[9px] uppercase tracking-[0.25em] font-bold text-orange-950/70">Confirm New Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-950/45" size={16} strokeWidth={1.5} />
                                <input 
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Repeat new password"
                                    className="w-full pl-12 pr-4 py-3 bg-[#faf8f5] border border-orange-200/60 focus:border-orange-950 focus:bg-white outline-none transition-all text-xs tracking-wider text-orange-950"
                                />
                            </div>
                        </div>

                        <button 
                            type="submit"
                            disabled={loading}
                            className={`w-full mt-2 py-4 bg-orange-950 text-white text-[9px] uppercase tracking-[0.4em] font-black hover:bg-orange-900 transition-all duration-300 shadow-[0_8px_30px_rgba(67,23,5,0.12)] flex items-center justify-center gap-3 cursor-pointer ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'UPDATING...' : 'RESET PASSWORD'}
                            {!loading && <ArrowRight size={14} strokeWidth={2} />}
                        </button>
                    </form>
                )}

                <div className="mt-8 text-center">
                    <Link to="/login" className="text-orange-700 hover:text-orange-900 text-xs uppercase tracking-wider font-semibold">
                        &larr; Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
