import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
    FiMail, FiLock, FiEye, FiEyeOff, FiX, FiChevronRight,
    FiShield, FiUsers, FiTrendingUp
} from 'react-icons/fi';
import useAxiosPrivate from '../Hooks/Api/useAxiosPrivate';
import useAuth from '../Hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Components
const InputField = ({ 
    icon: Icon, 
    type, 
    placeholder, 
    register, 
    error, 
    showPasswordToggle, 
    onTogglePassword, 
    showPassword 
}) => (
    <div className="relative">
        <div className="relative">
            <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
            <input
                type={showPasswordToggle ? (showPassword ? 'text' : 'password') : type}
                placeholder={placeholder}
                {...register}
                className={`w-full pl-12 pr-12 py-4 bg-blue-50 border-2 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:bg-white transition-all duration-300 ${
                    error ? 'border-red-400 focus:border-red-500' : 'border-gray-200 hover:border-blue-300 focus:border-blue-500'
                }`}
            />
            {showPasswordToggle && (
                <button
                    type="button"
                    onClick={onTogglePassword}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
            )}
        </div>
        {error && (
            <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                <FiX className="text-xs" />
                {error.message}
            </p>
        )}
    </div>
);

const FeatureCard = ({ icon: Icon, title, description }) => (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-white">
        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
            <Icon className="text-xl" />
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-blue-100 text-sm">{description}</p>
    </div>
);

const ForgotPasswordModal = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;

        setIsLoading(true);
        try {
            // Add your password reset logic here
            // For example, call your backend API to send reset email
            // await sendPasswordResetEmail(email);
            
            setMessage('Password reset email sent! Check your inbox.');
            setTimeout(() => {
                onClose();
                setEmail('');
                setMessage('');
            }, 3000);
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
        setIsLoading(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">Reset Password</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <FiX className="w-5 h-5" />
                    </button>
                </div>
                <p className="text-gray-600 mb-4">
                    Enter your email address and we'll send you a link to reset your password.
                </p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 mb-4"
                        required
                    />
                    {message && (
                        <p className={`text-sm mb-4 ${message.includes('sent') ? 'text-green-600' : 'text-red-600'}`}>
                            {message}
                        </p>
                    )}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                        {isLoading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </form>
            </div>
        </div>
    );
};

const LogIn = ({ onAuthSuccess }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [authError, setAuthError] = useState('');
    const { logIn } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false
        }
    });

    // Watch form values to clear errors
    const watchedFields = watch();

    useEffect(() => {
        if (authError) {
            setAuthError('');
        }
    }, [watchedFields]);

    // handleEmailLogIn Function

    const handleEmailLogin = async (data) => {
        try {
            setIsLoading(true);
            setAuthError('');
                
            const result = await logIn(data.email,data.password)
                    
                navigate('/');
                setTimeout(() => {
                    toast.success('log in successfully')
                }, 300);

            if (onAuthSuccess) {
                onAuthSuccess(result);
            }

        } catch (error) {
            console.error('Login error:', error);
            setAuthError(error.message || 'Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Panel */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-cyan-500 to-blue-500 relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl"></div>
                </div>
                <div className="relative z-10 flex flex-col justify-center p-12 text-white">
                    <div className="mb-12">
                        <h1 className="text-4xl font-bold mb-4">Welcome to our Platform!</h1>
                        <p className="text-xl text-blue-100">
                            Join thousands of users who trust our platform for their business needs.
                        </p>
                    </div>
                    <div className="space-y-6">
                        <FeatureCard 
                            icon={FiShield} 
                            title="Secure & Private" 
                            description="Your data is protected with enterprise-grade security and encryption." 
                        />
                        <FeatureCard 
                            icon={FiUsers} 
                            title="Team Collaboration" 
                            description="Work together seamlessly with powerful collaboration tools." 
                        />
                        <FeatureCard 
                            icon={FiTrendingUp} 
                            title="Advanced Analytics" 
                            description="Get insights and analytics to grow your business effectively." 
                        />
                    </div>
                </div>
            </div>

            {/* Right Panel */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-gray-50">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
                        <p className="text-gray-600">Sign in to access your account</p>
                    </div>

                    {authError && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                            <p className="text-sm text-red-600 flex items-center gap-2">
                                <FiX className="w-4 h-4" />
                                {authError}
                            </p>
                        </div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleSubmit(handleEmailLogin)} className="space-y-5">
                        <InputField 
                            icon={FiMail} 
                            type="email" 
                            placeholder="Email address" 
                            register={register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: 'Please enter a valid email address'
                                }
                            })}
                            error={errors.email}
                        />

                        <InputField 
                            icon={FiLock} 
                            type="password" 
                            placeholder="Password" 
                            register={register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters'
                                }
                            })}
                            error={errors.password}
                            showPasswordToggle 
                            onTogglePassword={() => setShowPassword(!showPassword)} 
                            showPassword={showPassword} 
                        />

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="rememberMe"
                                    {...register('rememberMe')}
                                    className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <label htmlFor="rememberMe" className="text-sm text-gray-600">
                                    Remember me
                                </label>
                            </div>
                            <button 
                                type="button" 
                                onClick={() => setShowForgotPassword(true)}
                                className="text-blue-500 hover:text-blue-600 text-sm transition-colors"
                            >
                                Forgot password?
                            </button>
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            disabled={isLoading} 
                            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-4 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    Sign In
                                    <FiChevronRight className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Don't have an account?{' '}
                            <Link to='/sign-up' 
                                type="button" 
                                className="text-blue-500 font-semibold hover:text-blue-600 transition-all"
                            >
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Forgot Password Modal */}
            <ForgotPasswordModal 
                isOpen={showForgotPassword}
                onClose={() => setShowForgotPassword(false)}
            />
        </div>
    );
};

export default LogIn;