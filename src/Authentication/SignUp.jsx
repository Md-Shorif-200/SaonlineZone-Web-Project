import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    FiMail, FiLock, FiUser, FiEye, FiEyeOff, FiX,
    FiShield, FiUsers, FiTrendingUp, FiPhone, FiChevronDown
} from 'react-icons/fi';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import useAuth from '../Hooks/useAuth';
import useAxiosPrivate from '../Hooks/Api/useAxiosPrivate';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const COUNTRY_CODES = [
    { code: '+1', country: 'US', flag: '🇺🇸' },
    { code: '+44', country: 'UK', flag: '🇬🇧' },
    { code: '+91', country: 'IN', flag: '🇮🇳' },
    { code: '+86', country: 'CN', flag: '🇨🇳' },
    { code: '+81', country: 'JP', flag: '🇯🇵' },
    { code: '+49', country: 'DE', flag: '🇩🇪' },
    { code: '+33', country: 'FR', flag: '🇫🇷' },
    { code: '+39', country: 'IT', flag: '🇮🇹' },
    { code: '+34', country: 'ES', flag: '🇪🇸' },
    { code: '+7', country: 'RU', flag: '🇷🇺' },
    { code: '+55', country: 'BR', flag: '🇧🇷' },
    { code: '+52', country: 'MX', flag: '🇲🇽' },
    { code: '+61', country: 'AU', flag: '🇦🇺' },
    { code: '+82', country: 'KR', flag: '🇰🇷' },
    { code: '+971', country: 'AE', flag: '🇦🇪' },
    { code: '+966', country: 'SA', flag: '🇸🇦' },
];

const COUNTRIES = [
    'United States', 'United Kingdom', 'India', 'China', 'Japan', 'Germany', 
    'France', 'Italy', 'Spain', 'Russia', 'Brazil', 'Mexico', 'Australia', 
    'South Korea', 'United Arab Emirates', 'Saudi Arabia', 'Canada', 'Netherlands',
    'Switzerland', 'Sweden', 'Norway', 'Denmark', 'Finland', 'Belgium', 'Austria',
    'Portugal', 'Greece', 'Turkey', 'Egypt', 'South Africa', 'Nigeria', 'Kenya',
    'Thailand', 'Singapore', 'Malaysia', 'Indonesia', 'Philippines', 'Vietnam',
    'Pakistan', 'Bangladesh', 'Sri Lanka', 'Afghanistan', 'Nepal', 'Myanmar'
];

const SignUp = ({ onAuthSuccess }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [countryCode, setCountryCode] = useState('+1');
    const [isCountryCodeOpen, setIsCountryCodeOpen] = useState(false);
    const [isCountryOpen, setIsCountryOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [authError, setAuthError] = useState('');

    const { creatUser, updateUserProfile } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
        reset
    } = useForm({
        defaultValues: {
            fullName: '',
            username: '',
            email: '',
            whatsapp: '',
            country: '',
            password: '',
            confirmPassword: '',
            policyAccepted: false
        }
    });

    const password = watch('password');
    const selectedCountry = watch('country');

    // Password strength calculation
    const getPasswordStrength = (password) => {
        let strength = 0;
        if (password?.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        return strength;
    };

    const passwordStrength = getPasswordStrength(password);
    const strengthColors = ['bg-red-500', 'bg-red-400', 'bg-yellow-400', 'bg-blue-400', 'bg-green-500'];
    const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];

    // Save user to backend
    const saveUserToBackend = async (userData) => {
        try {
            const response = await axiosPrivate.post('/api/all-users', userData);
            //   if(response.data.acknowledged && response.data.insertedId){
                  setTimeout(() => {
                                navigate('/');
                                  toast.success('Registration Successfully') 
                            }, 200);
            //   }
            console.log('User saved to backend:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error saving user to backend:', error);
            throw error;
        }
    };


    // Form submission
    const onSubmit = async (data) => {
        setIsLoading(true);
        setAuthError('');

        try {
            // Create user with Firebase
            const userCredential = await creatUser(data.email, data.password);
            
            // Update user profile with display name (username)
            await updateUserProfile(data.username);

            // Prepare user data for backend
            const userData = {
                uid: userCredential.user.uid,
                fullName: data.fullName,
                username: data.username,
                email: data.email,
                whatsapp: countryCode + data.whatsapp,
                country: data.country,
                password: data.password,
                createdAt: new Date().toISOString(),
                provider: 'email',
                role: 'user'
            };

            // Save to backend (MongoDB)
            await saveUserToBackend(userData);

            console.log('User registration successful');
            
            if (onAuthSuccess) {
                onAuthSuccess(userCredential.user);
            }

            // Reset form
            reset();
            setCountryCode('+1');

        } catch (error) {
            console.error('Registration error:', error);
            const errorMessages = {
                'auth/email-already-in-use': 'An account with this email already exists.',
                'auth/weak-password': 'Password should be at least 6 characters long.',
                'auth/invalid-email': 'Please enter a valid email address.',
            };
            setAuthError(errorMessages[error.code] || 'An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Custom validation rules
    const validationRules = {
        fullName: {
            required: 'Full name is required',
            minLength: {
                value: 2,
                message: 'Name must be at least 2 characters long'
            }
        },
        username: {
            required: 'Username is required',
            minLength: {
                value: 3,
                message: 'Username must be at least 3 characters long'
            },
            pattern: {
                value: /^[a-zA-Z0-9_]+$/,
                message: 'Username can only contain letters, numbers, and underscores'
            }
        },
        email: {
            required: 'Email is required',
            pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address'
            }
        },
        whatsapp: {
            required: 'WhatsApp number is required',
            pattern: {
                value: /^[0-9]{10,15}$/,
                message: 'Please enter a valid phone number'
            }
        },
        country: {
            required: 'Please select your country'
        },
        password: {
            required: 'Password is required',
            minLength: {
                value: 6,
                message: 'Password must be at least 6 characters long'
            }
        },
        confirmPassword: {
            required: 'Please confirm your password',
            validate: (value) => value === password || 'Passwords do not match'
        },
        policyAccepted: {
            required: 'You must accept our policies'
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
                        <h1 className="text-4xl font-bold mb-4">Welcome to our Platform</h1>
                        <p className="text-xl text-blue-100">
                            Join thousands of users who trust our platform for their business needs.
                        </p>
                    </div>
                    <div className="space-y-6">
                        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-white">
                            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                                <FiShield className="text-xl" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Secure & Private</h3>
                            <p className="text-blue-100 text-sm">Your data is protected with enterprise-grade security and encryption.</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-white">
                            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                                <FiUsers className="text-xl" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Team Collaboration</h3>
                            <p className="text-blue-100 text-sm">Work together seamlessly with powerful collaboration tools.</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-white">
                            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                                <FiTrendingUp className="text-xl" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Advanced Analytics</h3>
                            <p className="text-blue-100 text-sm">Get insights and analytics to grow your business effectively.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-gray-50">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
                        <p className="text-gray-600">Sign up to get started with your account</p>
                    </div>

                    {authError && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                            <p className="text-sm text-red-600 flex items-center gap-2">
                                <FiX className="w-4 h-4" />
                                {authError}
                            </p>
                        </div>
                    )}

                  

                    {/* Divider */}
                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-gray-50 px-4 text-gray-500">or continue with email</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Full Name & Username */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="relative">
                                <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    {...register('fullName', validationRules.fullName)}
                                    className={`w-full pl-12 pr-4 py-4 bg-blue-50 border-2 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:bg-white transition-all duration-300 ${
                                        errors.fullName ? 'border-red-400 focus:border-red-500' : 'border-gray-200 hover:border-blue-300 focus:border-blue-500'
                                    }`}
                                />
                                {errors.fullName && (
                                    <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                                        <FiX className="text-xs" />
                                        {errors.fullName.message}
                                    </p>
                                )}
                            </div>

                            <div className="relative">
                                <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                                <input
                                    type="text"
                                    placeholder="Username"
                                    {...register('username', validationRules.username)}
                                    className={`w-full pl-12 pr-4 py-4 bg-blue-50 border-2 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:bg-white transition-all duration-300 ${
                                        errors.username ? 'border-red-400 focus:border-red-500' : 'border-gray-200 hover:border-blue-300 focus:border-blue-500'
                                    }`}
                                />
                                {errors.username && (
                                    <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                                        <FiX className="text-xs" />
                                        {errors.username.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* WhatsApp Number */}
                        <div className="relative">
                            <FiPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg z-10" />
                            
                            <div className={`flex bg-blue-50 border-2 rounded-xl transition-all duration-300 ${
                                errors.whatsapp ? 'border-red-400' : 'border-gray-200 hover:border-blue-300 focus-within:border-blue-500 focus-within:bg-white'
                            }`}>
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => setIsCountryCodeOpen(!isCountryCodeOpen)}
                                        className="pl-12 pr-3 py-4 text-gray-800 focus:outline-none transition-all duration-300 flex items-center gap-2 min-w-[120px] border-r border-gray-300 hover:bg-blue-100 rounded-l-xl"
                                    >
                                        <span className="text-lg">{COUNTRY_CODES.find(c => c.code === countryCode)?.flag || '🌍'}</span>
                                        <span className="text-sm font-medium text-gray-700">{countryCode}</span>
                                        <FiChevronDown className={`text-xs text-gray-500 transition-transform ${isCountryCodeOpen ? 'rotate-180' : ''}`} />
                                    </button>
                                    
                                    {isCountryCodeOpen && (
                                        <div className="absolute top-full left-0 w-64 max-h-60 overflow-y-auto bg-white border-2 border-gray-200 rounded-xl shadow-xl z-30 mt-2">
                                            <div className="p-2">
                                                {COUNTRY_CODES.map((country) => (
                                                    <button
                                                        key={country.code}
                                                        type="button"
                                                        onClick={() => {
                                                            setCountryCode(country.code);
                                                            setIsCountryCodeOpen(false);
                                                        }}
                                                        className="w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-blue-50 transition-colors rounded-lg group"
                                                    >
                                                        <span className="text-lg">{country.flag}</span>
                                                        <div className="flex flex-col">
                                                            <span className="text-sm font-medium text-gray-800 group-hover:text-blue-600">{country.code}</span>
                                                            <span className="text-xs text-gray-500">{country.country}</span>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <input
                                    type="tel"
                                    placeholder="Enter phone number"
                                    {...register('whatsapp', validationRules.whatsapp)}
                                    className="flex-1 pl-4 pr-4 py-4 bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none rounded-r-xl"
                                />
                            </div>
                            {errors.whatsapp && (
                                <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                                    <FiX className="text-xs" />
                                    {errors.whatsapp.message}
                                </p>
                            )}
                            
                            {isCountryCodeOpen && (
                                <div 
                                    className="fixed inset-0 z-20" 
                                    onClick={() => setIsCountryCodeOpen(false)}
                                />
                            )}
                        </div>

                        {/* Country Select */}
                        <div className="relative">
                            <FiUsers className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                            <button
                                type="button"
                                onClick={() => setIsCountryOpen(!isCountryOpen)}
                                className={`w-full pl-12 pr-12 py-4 bg-blue-50 border-2 rounded-xl text-left text-gray-800 focus:outline-none focus:bg-white transition-all duration-300 flex items-center justify-between ${
                                    errors.country ? 'border-red-400 focus:border-red-500' : 'border-gray-200 hover:border-blue-300 focus:border-blue-500'
                                }`}
                            >
                                <span className={selectedCountry ? 'text-gray-800' : 'text-gray-500'}>
                                    {selectedCountry || 'Select your country'}
                                </span>
                                <FiChevronDown className={`text-gray-400 transition-transform ${isCountryOpen ? 'rotate-180' : ''}`} />
                            </button>
                            
                            {isCountryOpen && (
                                <div className="absolute top-full left-0 w-full max-h-60 overflow-y-auto bg-white border-2 border-gray-200 rounded-xl shadow-lg z-20 mt-1">
                                    {COUNTRIES.map((country) => (
                                        <button
                                            key={country}
                                            type="button"
                                            onClick={() => {
                                                setValue('country', country);
                                                setIsCountryOpen(false);
                                            }}
                                            className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0"
                                        >
                                            {country}
                                        </button>
                                    ))}
                                </div>
                            )}
                            {errors.country && (
                                <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                                    <FiX className="text-xs" />
                                    {errors.country.message}
                                </p>
                            )}
                            
                            {isCountryOpen && (
                                <div 
                                    className="fixed inset-0 z-10" 
                                    onClick={() => setIsCountryOpen(false)}
                                />
                            )}
                        </div>

                        {/* Email */}
                        <div className="relative">
                            <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                            <input
                                type="email"
                                placeholder="Email address"
                                {...register('email', validationRules.email)}
                                className={`w-full pl-12 pr-4 py-4 bg-blue-50 border-2 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:bg-white transition-all duration-300 ${
                                    errors.email ? 'border-red-400 focus:border-red-500' : 'border-gray-200 hover:border-blue-300 focus:border-blue-500'
                                }`}
                            />
                            {errors.email && (
                                <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                                    <FiX className="text-xs" />
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                {...register('password', validationRules.password)}
                                className={`w-full pl-12 pr-12 py-4 bg-blue-50 border-2 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:bg-white transition-all duration-300 ${
                                    errors.password ? 'border-red-400 focus:border-red-500' : 'border-gray-200 hover:border-blue-300 focus:border-blue-500'
                                }`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                {showPassword ? <FiEyeOff /> : <FiEye />}
                            </button>
                            {errors.password && (
                                <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                                    <FiX className="text-xs" />
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Password Strength */}
                        {password && (
                            <div className="space-y-2">
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                                            i < passwordStrength ? strengthColors[passwordStrength - 1] : 'bg-gray-200'
                                        }`} />
                                    ))}
                                </div>
                                <p className="text-xs text-gray-600">
                                    Password strength: {passwordStrength > 0 ? strengthLabels[passwordStrength - 1] : 'Enter password'}
                                </p>
                            </div>
                        )}

                        {/* Confirm Password */}
                        <div className="relative">
                            <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="Confirm password"
                                {...register('confirmPassword', validationRules.confirmPassword)}
                                className={`w-full pl-12 pr-12 py-4 bg-blue-50 border-2 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:bg-white transition-all duration-300 ${
                                    errors.confirmPassword ? 'border-red-400 focus:border-red-500' : 'border-gray-200 hover:border-blue-300 focus:border-blue-500'
                                }`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                            </button>
                            {errors.confirmPassword && (
                                <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                                    <FiX className="text-xs" />
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>

                        {/* Privacy Policy Checkbox */}
                        <div className="flex items-start gap-2">
                            <input
                                type="checkbox"
                                id="policy"
                                {...register('policyAccepted', validationRules.policyAccepted)}
                                className="mt-1 w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label htmlFor="policy" className="text-sm text-gray-600">
                                I agree to the{' '}
                                <button type="button" className="text-blue-500 hover:text-blue-600 underline">
                                    Terms of Service
                                </button>{' '}
                                and{' '}
                                <button type="button" className="text-blue-500 hover:text-blue-600 underline">
                                    Privacy Policy
                                </button>
                            </label>
                        </div>

                        {errors.policyAccepted && (
                            <p className="text-sm text-red-500 flex items-center gap-1">
                                <FiX className="text-xs" />
                                {errors.policyAccepted.message}
                            </p>
                        )}

                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            disabled={isLoading} 
                            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-4 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Processing...
                                </>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>

                         <div className="mt-6 text-center">
                        <p className="text-gray-600">
                           Already have an account ? Please  
                            <Link to='/sign-in' className="text-blue-500 font-semibold hover:text-blue-600 transition-all ml-2">
                                Sign In
                            </Link>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SignUp;