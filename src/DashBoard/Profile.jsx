import React, { useState } from 'react';
import {
    Edit,
    CheckCircle,
    MapPin,
    Link,
    Star,
    Shield,
    User,
    Package,
    Briefcase,
    Globe,
    Award,
    X,
    ExternalLink,
    Eye,
    Check,
    Plus,
    Trash2
} from 'lucide-react';

const Profile = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [showEditProfile, setShowEditProfile] = useState(false);
    const [editingField, setEditingField] = useState(null);
    const [tempValue, setTempValue] = useState('');
    const [tempSocialData, setTempSocialData] = useState({ platform: '', url: '' });

    const [userProfile, setUserProfile] = useState({
        coverPhoto: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=1200&h=400&fit=crop',
        profilePhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        isOnline: true,
        name: 'John Smith',
        isVerified: true,
        description: 'Professional digital marketer with 5+ years of experience in social media marketing, content creation, and brand development. Passionate about helping businesses grow their online presence.',
        userId: 'USER12345',
        reviews: {
            rating: 4.8,
            totalReviews: 127,
            stars: [
                { stars: 5, count: 89 },
                { stars: 4, count: 28 },
                { stars: 3, count: 7 },
                { stars: 2, count: 2 },
                { stars: 1, count: 1 }
            ]
        },
        location: {
            zone: 'North America',
            country: 'United States',
            city: 'New York'
        },
        socialMedia: [
            { platform: 'Facebook', url: 'https://facebook.com/johnsmith', icon: ExternalLink },
            { platform: 'Twitter', url: 'https://twitter.com/johnsmith', icon: ExternalLink },
            { platform: 'LinkedIn', url: 'https://linkedin.com/in/johnsmith', icon: ExternalLink },
            { platform: 'Instagram', url: 'https://instagram.com/johnsmith', icon: ExternalLink },
            { platform: 'Website', url: 'https://johnsmith.com', icon: Globe }
        ],
        accountHealth: {
            trustPercentage: 92,
            completionRate: 98,
            responseTime: '< 1 hour',
            memberSince: '2020',
            totalOrders: 245,
            successfulOrders: 241
        },
        skills: ['Digital Marketing', 'Social Media', 'Content Creation', 'SEO', 'Brand Strategy'],
        languages: [
            { language: 'English', level: 'Native' },
            { language: 'Spanish', level: 'Fluent' },
            { language: 'French', level: 'Basic' }
        ],
        certifications: [
            { title: 'Google Ads Certified', issuer: 'Google', year: '2023' },
            { title: 'Facebook Marketing', issuer: 'Meta', year: '2022' }
        ]
    });

    const profileOrders = [
        {
            id: 1,
            coverPhoto: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop',
            profilePhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
            name: 'Premium Social Media Package',
            description: 'Complete social media management including content creation, posting schedule, and analytics reporting for 30 days.',
            location: 'New York, USA',
            socialIcon: Globe,
            price: 299,
            rating: 4.9,
            orders: 45
        },
        {
            id: 2,
            coverPhoto: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop',
            profilePhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
            name: 'Brand Identity Design',
            description: 'Professional logo design, brand guidelines, and complete visual identity package for your business.',
            location: 'New York, USA',
            socialIcon: Briefcase,
            price: 599,
            rating: 4.8,
            orders: 32
        },
        {
            id: 3,
            coverPhoto: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=400&h=200&fit=crop',
            profilePhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
            name: 'Website Development',
            description: 'Custom responsive website development with modern design, SEO optimization, and mobile compatibility.',
            location: 'New York, USA',
            socialIcon: Globe,
            price: 899,
            rating: 4.7,
            orders: 28
        }
    ];

    const handleEdit = (field, currentValue) => {
        setEditingField(field);
        setTempValue(currentValue);
    };

    const handleSocialEdit = (index, social) => {
        setEditingField(`social-${index}`);
        setTempSocialData({ platform: social.platform, url: social.url });
    };

    const handleSave = (field) => {
        if (field.includes('.')) {
            const [mainField, subField] = field.split('.');
            setUserProfile(prev => ({
                ...prev,
                [mainField]: {
                    ...prev[mainField],
                    [subField]: tempValue
                }
            }));
        } else {
            setUserProfile(prev => ({
                ...prev,
                [field]: tempValue
            }));
        }
        setEditingField(null);
        setTempValue('');
    };

    const handleSocialSave = (index) => {
        const newSocialMedia = [...userProfile.socialMedia];
        newSocialMedia[index] = {
            ...newSocialMedia[index],
            platform: tempSocialData.platform,
            url: tempSocialData.url
        };
        setUserProfile(prev => ({ ...prev, socialMedia: newSocialMedia }));
        setEditingField(null);
        setTempSocialData({ platform: '', url: '' });
    };

    const handleCancel = () => {
        setEditingField(null);
        setTempValue('');
        setTempSocialData({ platform: '', url: '' });
    };

    const updateSkill = (index, newSkill) => {
        const newSkills = [...userProfile.skills];
        newSkills[index] = newSkill;
        setUserProfile(prev => ({ ...prev, skills: newSkills }));
    };

    const removeSkill = (index) => {
        const newSkills = userProfile.skills.filter((_, i) => i !== index);
        setUserProfile(prev => ({ ...prev, skills: newSkills }));
    };

    const addSkill = () => {
        setUserProfile(prev => ({ 
            ...prev, 
            skills: [...prev.skills, 'New Skill'] 
        }));
    };

    const removeSocialMedia = (index) => {
        const newSocialMedia = userProfile.socialMedia.filter((_, i) => i !== index);
        setUserProfile(prev => ({ ...prev, socialMedia: newSocialMedia }));
    };

    const addSocialMedia = () => {
        setUserProfile(prev => ({
            ...prev,
            socialMedia: [...prev.socialMedia, { platform: 'New Platform', url: 'https://', icon: ExternalLink }]
        }));
    };

    const updateLanguage = (index, field, value) => {
        const newLanguages = [...userProfile.languages];
        newLanguages[index] = { ...newLanguages[index], [field]: value };
        setUserProfile(prev => ({ ...prev, languages: newLanguages }));
    };

    const updateCertification = (index, field, value) => {
        const newCertifications = [...userProfile.certifications];
        newCertifications[index] = { ...newCertifications[index], [field]: value };
        setUserProfile(prev => ({ ...prev, certifications: newCertifications }));
    };

    const getHealthColor = (percentage) => {
        if (percentage >= 90) return 'text-green-600 bg-green-100';
        if (percentage >= 70) return 'text-yellow-600 bg-yellow-100';
        if (percentage >= 50) return 'text-orange-600 bg-orange-100';
        return 'text-red-600 bg-red-100';
    };

    const getHealthStatus = (percentage) => {
        if (percentage >= 90) return 'Excellent';
        if (percentage >= 70) return 'Good';
        if (percentage >= 50) return 'Fair';
        return 'Needs Improvement';
    };

    const renderStarRating = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />);
        }
        if (hasHalfStar) {
            stars.push(<Star key="half" className="w-4 h-4 text-yellow-400 fill-current" />);
        }
        return stars;
    };

    // Mobile-friendly editable field component
    const EditableField = ({ field, value, type = 'text', className = '', placeholder = '' }) => {
        const isEditing = editingField === field;
        
        return (
            <div className="group relative">
                {isEditing ? (
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                        {type === 'textarea' ? (
                            <textarea
                                value={tempValue}
                                onChange={(e) => setTempValue(e.target.value)}
                                className="flex-1 w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-base"
                                rows="3"
                                placeholder={placeholder}
                            />
                        ) : (
                            <input
                                type={type}
                                value={tempValue}
                                onChange={(e) => setTempValue(e.target.value)}
                                className="flex-1 w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                                placeholder={placeholder}
                            />
                        )}
                        <div className="flex space-x-2">
                            <button
                                onClick={() => handleSave(field)}
                                className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors touch-manipulation"
                            >
                                <Check className="w-4 h-4" />
                            </button>
                            <button
                                onClick={handleCancel}
                                className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors touch-manipulation"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-between">
                        <span className={className}>{value}</span>
                        <button
                            onClick={() => handleEdit(field, value)}
                            className="opacity-100 sm:opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 touch-manipulation ml-2 flex-shrink-0"
                        >
                            <Edit className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">

                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-8">

                    <div className="relative h-48 lg:h-64">
                        <img
                            src={userProfile.coverPhoto}
                            alt="Cover"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

                        <button
                            onClick={() => setShowEditProfile(true)}
                            className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors backdrop-blur-sm flex items-center space-x-2 touch-manipulation"
                        >
                            <Edit className="w-4 h-4" />
                            <span>Edit Profile</span>
                        </button>
                    </div>

                    <div className="relative px-6 lg:px-8 pb-8">

                        <div className="relative -mt-16 lg:-mt-20 mb-6">
                            <div className="relative inline-block">
                                <img
                                    src={userProfile.profilePhoto}
                                    alt="Profile"
                                    className="w-24 h-24 lg:w-32 lg:h-32 rounded-full border-4 border-white shadow-lg object-cover"
                                />
                                
                                <div className={`absolute bottom-2 right-2 w-6 h-6 lg:w-8 lg:h-8 rounded-full border-3 border-white ${userProfile.isOnline ? 'bg-green-500' : 'bg-red-500'
                                    }`}></div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                            <div className="lg:col-span-2">

                                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-4">
                                    <div className="flex-1">
                                        <EditableField
                                            field="name"
                                            value={userProfile.name}
                                            className="text-2xl lg:text-3xl font-bold text-gray-900"
                                            placeholder="Enter your name"
                                        />
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {userProfile.isVerified && (
                                            <div className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                                <CheckCircle className="w-4 h-4 mr-1" />
                                                Verified
                                            </div>
                                        )}
                                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${userProfile.isOnline ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                            }`}>
                                            {userProfile.isOnline ? 'Online' : 'Offline'}
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <span className="text-sm text-gray-500">User ID: </span>
                                    <span className="font-mono text-sm font-medium text-gray-700">{userProfile.userId}</span>
                                </div>

                                <div className="mb-6">
                                    <EditableField
                                        field="description"
                                        value={userProfile.description}
                                        type="textarea"
                                        className="text-gray-600 leading-relaxed"
                                        placeholder="Enter your description"
                                    />
                                </div>

                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                                        <MapPin className="w-5 h-5 mr-2" />
                                        Location
                                    </h3>
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            <div>
                                                <span className="text-sm font-medium text-gray-600">Zone:</span>
                                                <EditableField
                                                    field="location.zone"
                                                    value={userProfile.location.zone}
                                                    className="font-semibold text-gray-900 block"
                                                    placeholder="Enter zone"
                                                />
                                            </div>
                                            <div>
                                                <span className="text-sm font-medium text-gray-600">Country:</span>
                                                <EditableField
                                                    field="location.country"
                                                    value={userProfile.location.country}
                                                    className="font-semibold text-gray-900 block"
                                                    placeholder="Enter country"
                                                />
                                            </div>
                                            <div>
                                                <span className="text-sm font-medium text-gray-600">City:</span>
                                                <EditableField
                                                    field="location.city"
                                                    value={userProfile.location.city}
                                                    className="font-semibold text-gray-900 block"
                                                    placeholder="Enter city"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Social Media - Now Fully Editable */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                                        <Link className="w-5 h-5 mr-2" />
                                        Social Media
                                    </h3>
                                    <div className="space-y-3">
                                        {userProfile.socialMedia.map((social, index) => (
                                            <div key={index} className="group relative">
                                                {editingField === `social-${index}` ? (
                                                    <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                                                        <input
                                                            type="text"
                                                            value={tempSocialData.platform}
                                                            onChange={(e) => setTempSocialData(prev => ({ ...prev, platform: e.target.value }))}
                                                            placeholder="Platform name"
                                                            className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                                                        />
                                                        <input
                                                            type="url"
                                                            value={tempSocialData.url}
                                                            onChange={(e) => setTempSocialData(prev => ({ ...prev, url: e.target.value }))}
                                                            placeholder="https://..."
                                                            className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                                                        />
                                                        <div className="flex space-x-2">
                                                            <button
                                                                onClick={() => handleSocialSave(index)}
                                                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors touch-manipulation"
                                                            >
                                                                Save
                                                            </button>
                                                            <button
                                                                onClick={handleCancel}
                                                                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors touch-manipulation"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center justify-between bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors">
                                                        <a
                                                            href={social.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center space-x-2 flex-1"
                                                        >
                                                            <social.icon className="w-4 h-4" />
                                                            <span className="font-medium text-gray-700">{social.platform}</span>
                                                        </a>
                                                        <div className="flex space-x-1">
                                                            <button
                                                                onClick={() => handleSocialEdit(index, social)}
                                                                className="opacity-100 sm:opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 touch-manipulation"
                                                            >
                                                                <Edit className="w-4 h-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => removeSocialMedia(index)}
                                                                className="opacity-100 sm:opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 touch-manipulation"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                        <button
                                            onClick={addSocialMedia}
                                            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors touch-manipulation"
                                        >
                                            <Plus className="w-4 h-4" />
                                            <span>Add Social Media</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">

                                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                        <Star className="w-5 h-5 mr-2 text-yellow-500" />
                                        Reviews
                                    </h3>

                                    <div className="text-center mb-4">
                                        <div className="flex items-center justify-center space-x-1 mb-2">
                                            {renderStarRating(userProfile.reviews.rating)}
                                        </div>
                                        <p className="text-3xl font-bold text-gray-900">{userProfile.reviews.rating}</p>
                                        <p className="text-sm text-gray-600">{userProfile.reviews.totalReviews} reviews</p>
                                    </div>

                                    <div className="space-y-2">
                                        {userProfile.reviews.stars.map((star) => (
                                            <div key={star.stars} className="flex items-center space-x-2">
                                                <span className="text-sm w-3">{star.stars}</span>
                                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className="bg-yellow-400 h-2 rounded-full"
                                                        style={{ width: `${(star.count / userProfile.reviews.totalReviews) * 100}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-sm text-gray-600">{star.count}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                        <Shield className="w-5 h-5 mr-2 text-green-600" />
                                        Account Health
                                    </h3>

                                    <div className="text-center mb-6">
                                        <div className={`inline-flex items-center px-4 py-2 rounded-full font-bold text-2xl ${getHealthColor(userProfile.accountHealth.trustPercentage)}`}>
                                            {userProfile.accountHealth.trustPercentage}%
                                        </div>
                                        <p className="text-sm text-gray-600 mt-2">
                                            {getHealthStatus(userProfile.accountHealth.trustPercentage)} Trust Level
                                        </p>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600">Completion Rate</span>
                                            <span className="font-semibold text-green-600">{userProfile.accountHealth.completionRate}%</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600">Response Time</span>
                                            <span className="font-semibold text-blue-600">{userProfile.accountHealth.responseTime}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600">Member Since</span>
                                            <span className="font-semibold">{userProfile.accountHealth.memberSince}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600">Total Orders</span>
                                            <span className="font-semibold">{userProfile.accountHealth.totalOrders}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600">Successful Orders</span>
                                            <span className="font-semibold text-green-600">{userProfile.accountHealth.successfulOrders}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center mb-8">
                    <div className="bg-white rounded-2xl shadow-lg p-1 border border-gray-200">
                        <button
                            onClick={() => setActiveTab('profile')}
                            className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 touch-manipulation ${activeTab === 'profile'
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <User className="w-4 h-4" />
                            <span>Profile Info</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('orders')}
                            className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 touch-manipulation ${activeTab === 'orders'
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <Package className="w-4 h-4" />
                            <span>Profile Orders</span>
                        </button>
                    </div>
                </div>

                {activeTab === 'orders' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {profileOrders.map((order) => (
                            <div key={order.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">

                                <div className="relative h-48">
                                    <img
                                        src={order.coverPhoto}
                                        alt={order.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                                    <div className="absolute bottom-4 left-4">
                                        <img
                                            src={order.profilePhoto}
                                            alt="Profile"
                                            className="w-12 h-12 rounded-full border-2 border-white object-cover"
                                        />
                                    </div>

                                    <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full font-bold">
                                        ${order.price}
                                    </div>
                                </div>

                                <div className="p-6">

                                    <div className="flex items-start justify-between mb-3">
                                        <h3 className="text-lg font-bold text-gray-900 flex-1">{order.name}</h3>
                                        <order.socialIcon className="w-6 h-6 ml-2 text-blue-600" />
                                    </div>

                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{order.description}</p>

                                    <div className="flex items-center text-sm text-gray-500 mb-4">
                                        <MapPin className="w-4 h-4 mr-1" />
                                        {order.location}
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex items-center space-x-1">
                                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                <span className="font-semibold text-sm">{order.rating}</span>
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {order.orders} orders
                                            </div>
                                        </div>

                                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-1 touch-manipulation">
                                            <Eye className="w-4 h-4" />
                                            <span>View Details</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'profile' && (
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Information</h2>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                            {/* Skills Section */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                                    <Briefcase className="w-5 h-5 mr-2" />
                                    Skills
                                </h3>
                                <div className="space-y-2">
                                    {userProfile.skills.map((skill, index) => (
                                        <div key={index} className="group relative">
                                            {editingField === `skill-${index}` ? (
                                                <div className="flex items-center space-x-2">
                                                    <input
                                                        value={tempValue}
                                                        onChange={(e) => setTempValue(e.target.value)}
                                                        className="flex-1 px-3 py-2 border border-blue-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        onKeyPress={(e) => {
                                                            if (e.key === 'Enter') {
                                                                updateSkill(index, tempValue);
                                                                setEditingField(null);
                                                            }
                                                        }}
                                                    />
                                                    <button
                                                        onClick={() => {
                                                            updateSkill(index, tempValue);
                                                            setEditingField(null);
                                                        }}
                                                        className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors touch-manipulation"
                                                    >
                                                        <Check className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => setEditingField(null)}
                                                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors touch-manipulation"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-between">
                                                    <span>{skill}</span>
                                                    <div className="flex space-x-1 ml-2">
                                                        <button
                                                            onClick={() => handleEdit(`skill-${index}`, skill)}
                                                            className="opacity-100 sm:opacity-0 group-hover:opacity-100 text-blue-600 hover:text-blue-800 transition-all duration-200 touch-manipulation"
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => removeSkill(index)}
                                                            className="opacity-100 sm:opacity-0 group-hover:opacity-100 text-red-600 hover:text-red-800 transition-all duration-200 touch-manipulation"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                    <button
                                        onClick={addSkill}
                                        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-center space-x-2 transition-colors touch-manipulation"
                                    >
                                        <Plus className="w-4 h-4" />
                                        <span>Add Skill</span>
                                    </button>
                                </div>
                            </div>

                            {/* Languages Section */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                                    <Globe className="w-5 h-5 mr-2" />
                                    Languages
                                </h3>
                                <div className="space-y-3">
                                    {userProfile.languages.map((lang, index) => (
                                        <div key={index} className="group relative bg-gray-50 p-3 rounded-lg">
                                            <div className="flex justify-between items-center">
                                                <span className="font-medium">{lang.language}</span>
                                                <span className={`text-sm font-medium ${
                                                    lang.level === 'Native' ? 'text-green-600' :
                                                    lang.level === 'Fluent' ? 'text-blue-600' : 'text-yellow-600'
                                                }`}>{lang.level}</span>
                                            </div>
                                            <button className="opacity-100 sm:opacity-0 group-hover:opacity-100 absolute top-2 right-2 p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-all duration-200 touch-manipulation">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Certifications Section */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                                    <Award className="w-5 h-5 mr-2" />
                                    Certifications
                                </h3>
                                <div className="space-y-3">
                                    {userProfile.certifications.map((cert, index) => (
                                        <div key={index} className="group relative bg-gray-50 p-3 rounded-lg">
                                            <div className="text-sm">
                                                <p className="font-medium">{cert.title}</p>
                                                <p className="text-gray-500">{cert.issuer} - {cert.year}</p>
                                            </div>
                                            <button className="opacity-100 sm:opacity-0 group-hover:opacity-100 absolute top-2 right-2 p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-all duration-200 touch-manipulation">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {showEditProfile && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-6 rounded-t-3xl">
                            <div className="flex items-center justify-between">
                                <h3 className="text-2xl font-bold text-white">Edit Profile</h3>
                                <button
                                    onClick={() => setShowEditProfile(false)}
                                    className="text-white hover:text-gray-200 transition-colors touch-manipulation"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        <div className="p-8">
                            <p className="text-center text-gray-600">Profile editing functionality would be implemented here.</p>
                            <button
                                onClick={() => setShowEditProfile(false)}
                                className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors touch-manipulation"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;