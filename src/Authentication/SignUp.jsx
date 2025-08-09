import React, { useState, useEffect } from 'react';
import {
    FiMail,
    FiLock,
    FiUser,
    FiEye,
    FiEyeOff,
    FiX,
    FiChevronRight,
    FiShield,
    FiUsers,
    FiTrendingUp,
    FiPhone,
    FiChevronDown
} from 'react-icons/fi';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
    updateProfile,
    sendPasswordResetEmail,
    onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../../firebase'; // Adjust path as needed

// Country codes data
const countryCodes = [
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

// Countries data
const countries = [
    'United States', 'United Kingdom', 'India', 'China', 'Japan', 'Germany', 
    'France', 'Italy', 'Spain', 'Russia', 'Brazil', 'Mexico', 'Australia', 
    'South Korea', 'United Arab Emirates', 'Saudi Arabia', 'Canada', 'Netherlands',
    'Switzerland', 'Sweden', 'Norway', 'Denmark', 'Finland', 'Belgium', 'Austria',
    'Portugal', 'Greece', 'Turkey', 'Egypt', 'South Africa', 'Nigeria', 'Kenya',
    'Thailand', 'Singapore', 'Malaysia', 'Indonesia', 'Philippines', 'Vietnam',
    'Pakistan', 'Bangladesh', 'Sri Lanka', 'Afghanistan', 'Nepal', 'Myanmar'
];

// Input field component
const InputField = ({
    icon: Icon,
    type,
    name,
    placeholder,
    value,
    onChange,
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
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`w-full pl-12 pr-12 py-4 bg-blue-50 border-2 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:bg-white transition-all duration-300 ${error ? 'border-red-400 focus:border-red-500' : 'border-gray-200 hover:border-blue-300 focus:border-blue-500'
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
                {error}
            </p>
        )}
    </div>
);

// Enhanced WhatsApp field with better UI
const WhatsAppField = ({ value, onChange, error, countryCode, onCountryCodeChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectedCountry = countryCodes.find(c => c.code === countryCode);

    return (
        <div className="relative">
            <div className="relative">
                <FiPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg z-10" />
                
                <div className={`flex bg-blue-50 border-2 rounded-xl transition-all duration-300 ${error ? 'border-red-400' : 'border-gray-200 hover:border-blue-300 focus-within:border-blue-500 focus-within:bg-white'}`}>
                    {/* Country Code Selector */}
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setIsOpen(!isOpen)}
                            className="pl-12 pr-3 py-4 text-gray-800 focus:outline-none transition-all duration-300 flex items-center gap-2 min-w-[120px] border-r border-gray-300 hover:bg-blue-100 rounded-l-xl"
                        >
                            <span className="text-lg">{selectedCountry?.flag || '🌍'}</span>
                            <span className="text-sm font-medium text-gray-700">{countryCode}</span>
                            <FiChevronDown className={`text-xs text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {isOpen && (
                            <div className="absolute top-full left-0 w-64 max-h-60 overflow-y-auto bg-white border-2 border-gray-200 rounded-xl shadow-xl z-30 mt-2">
                                <div className="p-2">
                                    {countryCodes.map((country) => (
                                        <button
                                            key={country.code}
                                            type="button"
                                            onClick={() => {
                                                onCountryCodeChange(country.code);
                                                setIsOpen(false);
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

                    {/* Phone Number Input */}
                    <input
                        type="tel"
                        name="whatsapp"
                        placeholder="Enter phone number"
                        value={value}
                        onChange={onChange}
                        className="flex-1 pl-4 pr-4 py-4 bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none rounded-r-xl"
                    />
                </div>
            </div>
            {error && (
                <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                    <FiX className="text-xs" />
                    {error}
                </p>
            )}
            {/* Click outside to close dropdown */}
            {isOpen && (
                <div 
                    className="fixed inset-0 z-20" 
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    );
};

// Country select field
const CountrySelectField = ({ value, onChange, error }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <div className="relative">
                <FiUsers className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-full pl-12 pr-12 py-4 bg-blue-50 border-2 rounded-xl text-left text-gray-800 focus:outline-none focus:bg-white transition-all duration-300 flex items-center justify-between ${error ? 'border-red-400 focus:border-red-500' : 'border-gray-200 hover:border-blue-300 focus:border-blue-500'}`}
                >
                    <span className={value ? 'text-gray-800' : 'text-gray-500'}>
                        {value || 'Select your country'}
                    </span>
                    <FiChevronDown className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isOpen && (
                    <div className="absolute top-full left-0 w-full max-h-60 overflow-y-auto bg-white border-2 border-gray-200 rounded-xl shadow-lg z-20 mt-1">
                        {countries.map((country) => (
                            <button
                                key={country}
                                type="button"
                                onClick={() => {
                                    onChange({ target: { name: 'country', value: country } });
                                    setIsOpen(false);
                                }}
                                className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0"
                            >
                                {country}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            {error && (
                <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                    <FiX className="text-xs" />
                    {error}
                </p>
            )}
            {/* Click outside to close dropdown */}
            {isOpen && (
                <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    );
};

// Social button
const SocialButton = ({ icon: Icon, provider, onClick, disabled }) => (
    <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className="flex-1 flex items-center justify-center gap-3 py-3 px-4 bg-white border-2 border-gray-200 rounded-xl text-gray-700 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
    >
        <Icon className="text-lg group-hover:scale-110 transition-transform" />
        <span className="text-sm font-medium">{provider}</span>
    </button>
);

// Feature card
const FeatureCard = ({ icon: Icon, title, description }) => (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-white">
        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
            <Icon className="text-xl" />
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-blue-100 text-sm">{description}</p>
    </div>
);

// Forgot Password Modal
const ForgotPasswordModal = ({ isOpen, onClose, onSend }) => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;

        setIsLoading(true);
        try {
            await sendPasswordResetEmail(auth, email);
            setMessage('Password reset email sent! Check your inbox.');
            setTimeout(() => {
                onClose();
                setEmail('');
                setMessage('');
            }, 3000);
        } catch (error) {
            setMessage(getFirebaseErrorMessage(error.code));
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
                <p className="text-gray-600 mb-4">Enter your email address and we'll send you a link to reset your password.</p>
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

// Helper function to get user-friendly error messages
const getFirebaseErrorMessage = (errorCode) => {
    switch (errorCode) {
        case 'auth/user-not-found':
            return 'No account found with this email address.';
        case 'auth/wrong-password':
            return 'Incorrect password. Please try again.';
        case 'auth/email-already-in-use':
            return 'An account with this email already exists.';
        case 'auth/weak-password':
            return 'Password should be at least 6 characters long.';
        case 'auth/invalid-email':
            return 'Please enter a valid email address.';
        case 'auth/too-many-requests':
            return 'Too many failed attempts. Please try again later.';
        case 'auth/popup-closed-by-user':
            return 'Sign-in popup was closed. Please try again.';
        case 'auth/cancelled-popup-request':
            return 'Only one popup request is allowed at a time.';
        case 'auth/popup-blocked':
            return 'Popup was blocked by the browser. Please allow popups and try again.';
        default:
            return 'An error occurred. Please try again.';
    }
};

const SignUp = ({ onAuthSuccess }) => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        whatsapp: '',
        country: '',
        password: '',
        confirmPassword: '',
        policyAccepted: false
    });
    const [countryCode, setCountryCode] = useState('+1');
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [authError, setAuthError] = useState('');
    const [user, setUser] = useState(null);

    // Listen for authentication state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser && onAuthSuccess) {
                onAuthSuccess(currentUser);
            }
        });

        return () => unsubscribe();
    }, [onAuthSuccess]);

    const getPasswordStrength = (password) => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        return strength;
    };

    const passwordStrength = getPasswordStrength(formData.password);
    const strengthColors = ['bg-red-500', 'bg-red-400', 'bg-yellow-400', 'bg-blue-400', 'bg-green-500'];
    const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];

    const validateForm = () => {
        const newErrors = {};

        // Check privacy policy for both login and signup
        if (!formData.policyAccepted) {
            newErrors.policyAccepted = 'You must accept our policies';
        }

        if (isSignUp) {
            if (!formData.name.trim()) newErrors.name = 'Name is required';
            if (!formData.username.trim()) newErrors.username = 'Username is required';
            if (!formData.whatsapp.trim()) newErrors.whatsapp = 'WhatsApp number is required';
            if (!formData.country.trim()) newErrors.country = 'Country is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (isSignUp && formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Email/Password Authentication
    const handleEmailAuth = async () => {
        try {
            let userCredential;

            if (isSignUp) {
                // Create new user
                userCredential = await createUserWithEmailAndPassword(
                    auth, 
                    formData.email, 
                    formData.password
                );

                // Update user profile with display name
                await updateProfile(userCredential.user, {
                    displayName: formData.name
                });

                // Here you can save additional user data to your database
                // saveUserData(userCredential.user.uid, {
                //     name: formData.name,
                //     username: formData.username,
                //     whatsapp: countryCode + formData.whatsapp,
                //     country: formData.country
                // });

                console.log('User created:', {
                    uid: userCredential.user.uid,
                    name: formData.name,
                    username: formData.username,
                    whatsapp: countryCode + formData.whatsapp,
                    country: formData.country
                });

            } else {
                // Sign in existing user
                userCredential = await signInWithEmailAndPassword(
                    auth, 
                    formData.email, 
                    formData.password
                );
            }

            console.log('Authentication successful:', userCredential.user);
            setAuthError('');

        } catch (error) {
            console.error('Authentication error:', error);
            setAuthError(getFirebaseErrorMessage(error.code));
        }
    };

    // Google Authentication
    const handleGoogleAuth = async () => {
        try {
            const provider = new GoogleAuthProvider();
            provider.addScope('email');
            provider.addScope('profile');
            
            const result = await signInWithPopup(auth, provider);
            console.log('Google authentication successful:', result.user);
            setAuthError('');

            // If it's a new user and this was meant to be a signup, you might want to collect additional info
            // if (isSignUp && result.additionalUserInfo?.isNewUser) {
            //     // Redirect to complete profile or show additional form
            // }

        } catch (error) {
            console.error('Google authentication error:', error);
            setAuthError(getFirebaseErrorMessage(error.code));
        }
    };

    // Facebook Authentication
    const handleFacebookAuth = async () => {
        try {
            const provider = new FacebookAuthProvider();
            provider.addScope('email');
            
            const result = await signInWithPopup(auth, provider);
            console.log('Facebook authentication successful:', result.user);
            setAuthError('');

        } catch (error) {
            console.error('Facebook authentication error:', error);
            setAuthError(getFirebaseErrorMessage(error.code));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        setAuthError('');

        try {
            await handleEmailAuth();
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
        // Clear auth error when user starts typing
        if (authError) {
            setAuthError('');
        }
    };

    const switchMode = () => {
        setIsSignUp(!isSignUp);
        setFormData({
            name: '',
            username: '',
            email: '',
            whatsapp: '',
            country: '',
            password: '',
            confirmPassword: '',
            policyAccepted: false
        });
        setCountryCode('+1');
        setErrors({});
        setAuthError('');
    };

    return (
        <div className="min-h-screen flex">
            {/* Left side */}
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
                        <FeatureCard icon={FiShield} title="Secure & Private" description="Your data is protected with enterprise-grade security and encryption." />
                        <FeatureCard icon={FiUsers} title="Team Collaboration" description="Work together seamlessly with powerful collaboration tools." />
                        <FeatureCard icon={FiTrendingUp} title="Advanced Analytics" description="Get insights and analytics to grow your business effectively." />
                    </div>
                </div>
            </div>

            {/* Right side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-gray-50">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">
                            {isSignUp ? 'Create Account' : 'Welcome Back'}
                        </h2>
                        <p className="text-gray-600">
                            {isSignUp ? 'Sign up to get started with your account' : 'Sign in to access your account'}
                        </p>
                    </div>

                    {/* Auth Error Display */}
                    {authError && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                            <p className="text-sm text-red-600 flex items-center gap-2">
                                <FiX className="w-4 h-4" />
                                {authError}
                            </p>
                        </div>
                    )}

                    <div className="mb-6">
                        <div className="flex gap-3 mb-4">
                            <SocialButton 
                                icon={FaGoogle} 
                                provider="Google" 
                                onClick={handleGoogleAuth}
                                disabled={isLoading}
                            />
                            <SocialButton 
                                icon={FaFacebookF} 
                                provider="Facebook" 
                                onClick={handleFacebookAuth}
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-gray-50 px-4 text-gray-500">or continue with email</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {isSignUp && (
                            <>
                                <div className="grid grid-cols-2 gap-3 pb-4">
                                    <InputField icon={FiUser} type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} error={errors.name} />
                                    <InputField icon={FiUser} type="text" name="username" placeholder="User Name" value={formData.username} onChange={handleChange} error={errors.username} />
                                </div>

                                <WhatsAppField 
                                    value={formData.whatsapp} 
                                    onChange={handleChange} 
                                    error={errors.whatsapp}
                                    countryCode={countryCode}
                                    onCountryCodeChange={setCountryCode}
                                />
                                
                                <CountrySelectField 
                                    value={formData.country} 
                                    onChange={handleChange} 
                                    error={errors.country} 
                                />
                            </>
                        )}

                        <InputField icon={FiMail} type="email" name="email" placeholder="Email address" value={formData.email} onChange={handleChange} error={errors.email} />

                        <InputField icon={FiLock} type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} error={errors.password} showPasswordToggle onTogglePassword={() => setShowPassword(!showPassword)} showPassword={showPassword} />

                        {isSignUp && formData.password && (
                            <div className="space-y-2">
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i < passwordStrength ? strengthColors[passwordStrength - 1] : 'bg-gray-200'}`} />
                                    ))}
                                </div>
                                <p className="text-xs text-gray-600">Password strength: {passwordStrength > 0 ? strengthLabels[passwordStrength - 1] : 'Enter password'}</p>
                            </div>
                        )}

                        {isSignUp && (
                            <InputField icon={FiLock} type="password" name="confirmPassword" placeholder="Confirm password" value={formData.confirmPassword} onChange={handleChange} error={errors.confirmPassword} showPasswordToggle onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)} showPassword={showConfirmPassword} />
                        )}

                        {!isSignUp && (
                            <div className="text-right">
                                <button 
                                    type="button" 
                                    onClick={() => setShowForgotPassword(true)}
                                    className="text-blue-500 hover:text-blue-600 text-sm transition-colors"
                                >
                                    Forgot password?
                                </button>
                            </div>
                        )}

                        {/* Privacy Policy Checkbox - Now appears on both login and signup */}
                        <div className="flex items-start gap-2">
                            <input
                                type="checkbox"
                                id="policy"
                                name="policyAccepted"
                                checked={formData.policyAccepted}
                                onChange={handleChange}
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
                                {errors.policyAccepted}
                            </p>
                        )}

                        <button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-4 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed">
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Processing...
                                </>
                            ) : (
                                <>
                                    {isSignUp ? 'Create Account' : 'Sign In'}
                                    <FiChevronRight className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                            <button type="button" onClick={switchMode} className="text-blue-500 font-semibold hover:text-blue-600 transition-all">
                                {isSignUp ? 'Sign In' : 'Sign Up'}
                            </button>
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

export default SignUp;