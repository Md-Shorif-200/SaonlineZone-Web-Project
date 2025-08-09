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
    Eye
} from 'lucide-react';

const Profile = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [showEditProfile, setShowEditProfile] = useState(false);


    // Sample user data
    const userProfile = {
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
        }
    };

    // Sample profile orders/showcase
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">

                {/* Profile Header */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-8">

                    {/* Cover Photo */}
                    <div className="relative h-48 lg:h-64">
                        <img
                            src={userProfile.coverPhoto}
                            alt="Cover"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

                        {/* Edit Button */}
                        <button
                            onClick={() => setShowEditProfile(true)}
                            className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors backdrop-blur-sm flex items-center space-x-2"
                        >
                            <Edit className="w-4 h-4" />
                            <span>Edit Profile</span>
                        </button>
                    </div>

                    {/* Profile Info */}
                    <div className="relative px-6 lg:px-8 pb-8">

                        {/* Profile Photo */}
                        <div className="relative -mt-16 lg:-mt-20 mb-6">
                            <div className="relative inline-block">
                                <img
                                    src={userProfile.profilePhoto}
                                    alt="Profile"
                                    className="w-24 h-24 lg:w-32 lg:h-32 rounded-full border-4 border-white shadow-lg object-cover"
                                />
                                {/* Online Status */}
                                <div className={`absolute bottom-2 right-2 w-6 h-6 lg:w-8 lg:h-8 rounded-full border-3 border-white ${userProfile.isOnline ? 'bg-green-500' : 'bg-red-500'
                                    }`}></div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                            {/* Left Column - Basic Info */}
                            <div className="lg:col-span-2">

                                {/* Name and Verification */}
                                <div className="flex items-center space-x-3 mb-4">
                                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{userProfile.name}</h1>
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

                                {/* User ID */}
                                <div className="mb-4">
                                    <span className="text-sm text-gray-500">User ID: </span>
                                    <span className="font-mono text-sm font-medium text-gray-700">{userProfile.userId}</span>
                                </div>

                                {/* Description */}
                                <p className="text-gray-600 mb-6 leading-relaxed">{userProfile.description}</p>

                                {/* Location */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                                        <MapPin className="w-5 h-5 mr-2" />
                                        Location
                                    </h3>
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            <div>
                                                <span className="text-sm font-medium text-gray-600">Zone:</span>
                                                <p className="font-semibold text-gray-900">{userProfile.location.zone}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm font-medium text-gray-600">Country:</span>
                                                <p className="font-semibold text-gray-900">{userProfile.location.country}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm font-medium text-gray-600">City:</span>
                                                <p className="font-semibold text-gray-900">{userProfile.location.city}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Social Media */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                                        <Link className="w-5 h-5 mr-2" />
                                        Social Media
                                    </h3>
                                    <div className="flex flex-wrap gap-3">
                                        {userProfile.socialMedia.map((social, index) => (
                                            <a
                                                key={index}
                                                href={social.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
                                            >
                                                <social.icon className="w-4 h-4" />
                                                <span className="font-medium text-gray-700">{social.platform}</span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Stats and Health */}
                            <div className="space-y-6">

                                {/* Reviews */}
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

                                {/* Account Health */}
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

                {/* Tab Navigation */}
                <div className="flex justify-center mb-8">
                    <div className="bg-white rounded-2xl shadow-lg p-1 border border-gray-200">
                        <button
                            onClick={() => setActiveTab('profile')}
                            className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 ${activeTab === 'profile'
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <User className="w-4 h-4" />
                            <span>Profile Info</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('orders')}
                            className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 ${activeTab === 'orders'
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <Package className="w-4 h-4" />
                            <span>Profile Orders</span>
                        </button>
                    </div>
                </div>

                {/* Profile Orders Section */}
                {activeTab === 'orders' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {profileOrders.map((order) => (
                            <div key={order.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">

                                {/* Order Cover Photo */}
                                <div className="relative h-48">
                                    <img
                                        src={order.coverPhoto}
                                        alt={order.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                                    {/* Profile Photo Overlay */}
                                    <div className="absolute bottom-4 left-4">
                                        <img
                                            src={order.profilePhoto}
                                            alt="Profile"
                                            className="w-12 h-12 rounded-full border-2 border-white object-cover"
                                        />
                                    </div>

                                    {/* Price Tag */}
                                    <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full font-bold">
                                        ${order.price}
                                    </div>
                                </div>

                                {/* Order Content */}
                                <div className="p-6">

                                    {/* Order Header */}
                                    <div className="flex items-start justify-between mb-3">
                                        <h3 className="text-lg font-bold text-gray-900 flex-1">{order.name}</h3>
                                        <order.socialIcon className="w-6 h-6 ml-2 text-blue-600" />
                                    </div>

                                    {/* Description */}
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{order.description}</p>

                                    {/* Location */}
                                    <div className="flex items-center text-sm text-gray-500 mb-4">
                                        <MapPin className="w-4 h-4 mr-1" />
                                        {order.location}
                                    </div>

                                    {/* Stats */}
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

                                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-1">
                                            <Eye className="w-4 h-4" />
                                            <span>View Details</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Additional Profile Info (when profile tab is active) */}
                {activeTab === 'profile' && (
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Information</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                            {/* Skills */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                                    <Briefcase className="w-5 h-5 mr-2" />
                                    Skills
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {['Digital Marketing', 'Social Media', 'Content Creation', 'SEO', 'Brand Strategy'].map((skill) => (
                                        <span key={skill} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Languages */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                                    <Globe className="w-5 h-5 mr-2" />
                                    Languages
                                </h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span>English</span>
                                        <span className="text-green-600 font-medium">Native</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Spanish</span>
                                        <span className="text-blue-600 font-medium">Fluent</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>French</span>
                                        <span className="text-yellow-600 font-medium">Basic</span>
                                    </div>
                                </div>
                            </div>

                            {/* Certifications */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                                    <Award className="w-5 h-5 mr-2" />
                                    Certifications
                                </h3>
                                <div className="space-y-2">
                                    <div className="text-sm">
                                        <p className="font-medium">Google Ads Certified</p>
                                        <p className="text-gray-500">Google - 2023</p>
                                    </div>
                                    <div className="text-sm">
                                        <p className="font-medium">Facebook Marketing</p>
                                        <p className="text-gray-500">Meta - 2022</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Edit Profile Modal */}
            {showEditProfile && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-6 rounded-t-3xl">
                            <div className="flex items-center justify-between">
                                <h3 className="text-2xl font-bold text-white">Edit Profile</h3>
                                <button
                                    onClick={() => setShowEditProfile(false)}
                                    className="text-white hover:text-gray-200 transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        <div className="p-8">
                            <p className="text-center text-gray-600">Profile editing functionality would be implemented here.</p>
                            <button
                                onClick={() => setShowEditProfile(false)}
                                className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
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