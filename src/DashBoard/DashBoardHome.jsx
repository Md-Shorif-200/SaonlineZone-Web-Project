import React, { useState } from 'react';
import {
    DollarSign,
    Package,
    Mail,
    Search,
    Eye,
    MessageCircle,
    ShoppingCart,
    Clock,
    User,
    MapPin,
    Star,
    Check,
    X,
    Megaphone,
    Newspaper,
    Handshake,
    Monitor,
    Building,
    Filter,
    Grid3X3,
    List,
    ChevronRight,
    Bell,
    TrendingUp,
    ThumbsUp
} from 'lucide-react';

import Headline from '../HeadLine/Headline';
import SearchSection from './SearchSection';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const DashboardHome = () => {
    const [selectedRole, setSelectedRole] = useState("buyer");
    const [selectedPost, setSelectedPost] = useState(null);
    const [showBuyModal, setShowBuyModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showAnnouncement, setShowAnnouncement] = useState(false);
    const [viewMode, setViewMode] = useState('grid');
    const [activeTab, setActiveTab] = useState("online");
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const [postStats, setPostStats] = useState({
        1: { likes: 12, views: 45, isLiked: false },
        2: { likes: 8, views: 32, isLiked: false },
        3: { likes: 23, views: 67, isLiked: false },
        4: { likes: 15, views: 38, isLiked: false }
    });

    const userData = {
        name: 'John Don',
        isVerified: true,
        balance: 15420.50,
        totalOrders: 47,
        receiveOrders: 23
    };

    const partnerSites = [
        { name: 'Amazon', icon: ShoppingCart, url: '#', color: 'bg-orange-100 text-orange-600' },
        { name: 'eBay', icon: Building, url: '#', color: 'bg-blue-100 text-blue-600' },
        { name: 'Shopify', icon: Package, url: '#', color: 'bg-green-100 text-green-600' },
        { name: 'Etsy', icon: Star, url: '#', color: 'bg-purple-100 text-purple-600' }
    ];

    const posts = [
        {
            id: 1,
            type: "online",
            images: [
                'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=200&fit=crop',
                'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=200&fit=crop',
                'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=300&h=200&fit=crop'
            ],
            title: 'Professional Web Development Service',
            price: 299.99,
            seller: 'TechExpert',
            rating: 4.9,
            postTime: '2024-01-15 10:30 AM',
            details: 'Complete website development with modern design, responsive layout, and SEO optimization.',
            sellerAccount: {
                name: 'TechExpert',
                rating: 4.8,
                completedOrders: 156,
                joinDate: 'Jan 2020',
                isVerified: true
            }
        },
        {
            id: 2,
            type: "online",
            images: [
                'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop',
                'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop'
            ],
            title: 'Digital Marketing Strategy',
            price: 199.50,
            seller: 'MarketPro',
            rating: 4.7,
            postTime: '2024-01-14 2:15 PM',
            details: 'Comprehensive digital marketing strategy including SEO, social media, and content marketing.',
            sellerAccount: {
                name: 'MarketPro',
                rating: 4.6,
                completedOrders: 89,
                joinDate: 'Mar 2021',
                isVerified: true
            }
        },
        {
            id: 3,
            type: "offline",
            images: [
                'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop',
                'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=200&fit=crop'
            ],
            title: 'Mobile App Development Workshop',
            price: 499.99,
            seller: 'AppBuilder',
            rating: 5.0,
            postTime: '2024-01-13 9:45 AM',
            details: 'In-person workshop for mobile app development for iOS and Android with modern UI/UX design.',
            sellerAccount: {
                name: 'AppBuilder',
                rating: 4.9,
                completedOrders: 234,
                joinDate: 'May 2019',
                isVerified: true
            }
        },
        {
            id: 4,
            type: "offline",
            images: [
                'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=200&fit=crop'
            ],
            title: 'Local Business Networking Event',
            price: 0,
            seller: 'LocalBusinessHub',
            rating: 4.5,
            postTime: '2024-01-20 6:00 PM',
            details: 'Networking event for local businesses to connect and collaborate.',
            sellerAccount: {
                name: 'LocalBusinessHub',
                rating: 4.7,
                completedOrders: 42,
                joinDate: 'Aug 2022',
                isVerified: true
            }
        }
    ];

    const handleBuyNow = (post) => {
        setSelectedPost(post);
        setShowBuyModal(true);
        setShowDetailsModal(false);
    };

    const handleShowDetailsModal = (post) => {
        setSelectedPost(post);
        setShowDetailsModal(true);
        setCurrentImageIndex(0); // Reset carousel index when opening modal
        handleViewPost(post.id);
    };

    const handleLikePost = (postId) => {
        setPostStats(prev => ({
            ...prev,
            [postId]: {
                ...prev[postId],
                likes: prev[postId].isLiked ? prev[postId].likes - 1 : prev[postId].likes + 1,
                isLiked: !prev[postId].isLiked
            }
        }));
    };

    const handleViewPost = (postId) => {
        setPostStats(prev => ({
            ...prev,
            [postId]: {
                ...prev[postId],
                views: prev[postId].views + 1
            }
        }));
    };

    const calculateFees = (amount) => {
        const adminFeeRate = 0.05; // 5%
        const sellerFee = amount * adminFeeRate;
        const buyerFee = amount * adminFeeRate;
        const generation1Fee = amount * 0.02; // 2%
        const generation2Fee = amount * 0.01; // 1%

        return {
            baseAmount: amount,
            sellerFee,
            buyerFee,
            generation1Fee,
            generation2Fee,
            totalForBuyer: amount + buyerFee,
            sellerReceives: amount - sellerFee
        };
    };

    const SellerVerifiedBadge = () => (
        <span className="flex items-center space-x-0.5 ml-1">
            <Star className="w-3 h-3" style={{ color: '#C0C0C0' }} />
            <Star className="w-3 h-3" style={{ color: '#FFD700' }} />
            <Star className="w-3 h-3" style={{ color: '#00BFFF' }} />
        </span>
    );

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
                <Headline className='mb-10' headlines={["Welcome to our amazing platform!"]} />

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border border-white/20 p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
                    <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center space-x-3 sm:space-x-4">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <User className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 flex flex-col sm:flex-row sm:items-center sm:space-x-3">
                                    <span className="truncate">Welcome, {userData.name}</span>
                                    {userData.isVerified && (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6 flex-shrink-0"
                                            viewBox="0 0 24 24"
                                            fill="#0095f6"
                                            aria-label="Verified account"
                                        >
                                            <path d="M22.25 12l-1.6-2.77.3-3.18-3.09-.94L15.66 2 12 3.4 8.34 2 6.14 5.11l-3.09.94.3 3.18L2.25 12l1.1 3.06-.3 3.18 3.09.94L8.34 22l3.66-1.4 3.66 1.4 2.2-3.11 3.09-.94-.3-3.18L22.25 12z" />
                                            <path
                                                d="M10.4 15.6l-3-3 1.2-1.2 1.8 1.8 4.8-4.8 1.2 1.2-6 6z"
                                                fill="#fff"
                                            />
                                        </svg>
                                    )}
                                </h1>
                                <p className="text-sm sm:text-base text-gray-600 mt-1">
                                    Ready to grow your business today?
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => setShowAnnouncement(true)}
                            className="flex items-center justify-center space-x-2 w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-2xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                            <Megaphone className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                            <span className="text-sm sm:text-base lg:text-lg font-semibold">
                                Announcement
                            </span>
                        </button>
                    </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-white/20 mb-6 sm:mb-8">
                    <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Handshake className="w-4 h-4 text-purple-600" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900">Our Partner Sites</h3>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                        {partnerSites.map((partner, index) => {
                            const IconComponent = partner.icon;
                            return (
                                <a
                                    key={index}
                                    href={partner.url}
                                    className="flex items-center space-x-2 sm:space-x-3 p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:shadow-md"
                                >
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${partner.color}`}>
                                        <IconComponent className="w-4 h-4" />
                                    </div>
                                    <span className="font-medium text-gray-700 text-sm sm:text-base">{partner.name}</span>
                                </a>
                            );
                        })}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-white/20 hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs sm:text-sm font-medium text-gray-600 uppercase tracking-wide">Balance</p>
                                <p className="text-2xl sm:text-3xl font-bold text-emerald-600 mt-1">${userData.balance.toFixed(2)}</p>
                                <div className="flex items-center mt-2 text-xs sm:text-sm text-emerald-600">
                                    <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                    <span>+12% from last month</span>
                                </div>
                            </div>
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                                <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-white/20 hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs sm:text-sm font-medium text-gray-600 uppercase tracking-wide">Total Orders</p>
                                <p className="text-2xl sm:text-3xl font-bold text-blue-600 mt-1">{userData.totalOrders}</p>
                                <div className="flex items-center mt-2 text-xs sm:text-sm text-blue-600">
                                    <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                    <span>+5 this week</span>
                                </div>
                            </div>
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <Package className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-white/20 hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs sm:text-sm font-medium text-gray-600 uppercase tracking-wide">Receive Orders</p>
                                <p className="text-2xl sm:text-3xl font-bold text-purple-600 mt-1">{userData.receiveOrders}</p>
                                <div className="flex items-center mt-2 text-xs sm:text-sm text-purple-600">
                                    <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                    <span>+3 today</span>
                                </div>
                            </div>
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                            </div>
                        </div>
                    </div>
                </div>
                <SearchSection></SearchSection>

                <div className="space-y-6 mb-6">
                    <div className="flex space-x-2">
                        <button
                            onClick={() => setActiveTab("online")}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === "online"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                }`}
                        >
                            Online
                        </button>
                        <button
                            onClick={() => setActiveTab("offline")}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === "offline"
                                ? "bg-orange-600 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                }`}
                        >
                            Offline
                        </button>
                    </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border border-white/20 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                                    <Package className="w-4 h-4 text-white" />
                                </div>
                                <h3 className="text-xl sm:text-2xl font-bold text-white">Latest {activeTab === "online" ? "Online" : "Offline"} Posts</h3>
                            </div>
                            <div className="flex items-center space-x-2 w-full sm:w-auto">
                                <div className="flex bg-white/20 rounded-lg p-1">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white/30' : ''}`}
                                    >
                                        <Grid3X3 className="w-4 h-4 text-white" />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`p-2 rounded ${viewMode === 'list' ? 'bg-white/30' : ''}`}
                                    >
                                        <List className="w-4 h-4 text-white" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 sm:p-6 lg:p-8">
                        <div className={`grid gap-4 sm:gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                            {posts
                                .filter(post => post.type === activeTab)
                                .slice(0, 3)
                                .map(post => (
                                    <div key={post.id} className={`bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 ${viewMode === 'list' ? 'flex space-x-4 p-4' : ''}`}>
                                        <img
                                            src={post.images[0]}
                                            alt={post.title}
                                            className={`object-cover ${viewMode === 'list' ? 'w-24 h-24 rounded-lg flex-shrink-0' : 'w-full h-40 sm:h-48'}`}
                                        />
                                        <div className={`${viewMode === 'list' ? 'flex-1' : 'p-4 sm:p-6'}`}>
                                            <h4 className="font-bold text-gray-900 mb-2 text-sm sm:text-base leading-tight">{post.title}</h4>
                                            <div className="flex items-center justify-between mb-3 sm:mb-4">
                                                <span className="text-xl sm:text-2xl font-bold text-emerald-600">${post.price}</span>
                                                <div className="flex items-center space-x-1">
                                                    <Star className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400 fill-current" />
                                                    <span className="text-xs sm:text-sm text-gray-600">{post.rating}</span>
                                                </div>
                                            </div>

                                            <div className='flex justify-between items-center my-5'>
                                                <div className="flex items-center space-x-2">
                                                    <User className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                                                    <span className="text-xs sm:text-sm text-gray-500">by {post.seller}</span>
                                                </div>
                                                <div className='action_btn flex gap-x-4 items-center'>
                                                    <div className='flex items-center gap-x-2'>
                                                        <ThumbsUp
                                                            className={`w-5 h-5 cursor-pointer hover:scale-110 transition-all ease-in-out ${postStats[post.id]?.isLiked
                                                                ? 'text-blue-600 fill-current'
                                                                : 'text-gray-700'
                                                                }`}
                                                            onClick={() => handleLikePost(post.id)}
                                                        />
                                                        <p className="count text-sm font-medium text-gray-600">
                                                            {postStats[post.id]?.likes || 0}
                                                        </p>
                                                    </div>
                                                    <div className='flex items-center gap-x-2'>
                                                        <Eye className='w-5 h-5 text-gray-700 cursor-pointer hover:scale-110 transition-all ease-in-out' />
                                                        <p className="count text-sm font-medium text-gray-600">
                                                            {postStats[post.id]?.views || 0}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => handleShowDetailsModal(post)}
                                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 sm:py-3 rounded-lg transition-colors font-medium text-sm sm:text-base"
                                            >
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>

                {showDetailsModal && selectedPost && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50">
                        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="bg-gradient-to-r from-emerald-600 to-blue-600 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 rounded-t-2xl sm:rounded-t-3xl">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl sm:text-2xl font-bold text-white">Post Details</h3>
                                    <button
                                        onClick={() => setShowDetailsModal(false)}
                                        className="text-white hover:text-gray-200 transition-colors p-1"
                                    >
                                        <X className="w-5 h-5 sm:w-6 sm:h-6" />
                                    </button>
                                </div>
                            </div>

                            <div className="p-4 sm:p-6 lg:p-8">
                                <div className="mb-6">

                                    <div className="relative w-full h-48 sm:h-64 mb-4">
                                        <img
                                            src={selectedPost.images[currentImageIndex]}
                                            alt={`${selectedPost.title} - ${currentImageIndex + 1}`}
                                            className="w-full h-full object-cover rounded-xl"
                                        />

                                        {selectedPost.images.length > 1 && (
                                            <>
                                                <button
                                                    onClick={() => setCurrentImageIndex(prev =>
                                                        prev === 0 ? selectedPost.images.length - 1 : prev - 1
                                                    )}
                                                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                                                >
                                                    ❮
                                                </button>
                                                <button
                                                    onClick={() => setCurrentImageIndex(prev =>
                                                        prev === selectedPost.images.length - 1 ? 0 : prev + 1
                                                    )}
                                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                                                >
                                                    ❯
                                                </button>

                                                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
                                                    {selectedPost.images.map((_, idx) => (
                                                        <button
                                                            key={idx}
                                                            onClick={() => setCurrentImageIndex(idx)}
                                                            className={`w-2 h-2 rounded-full ${idx === currentImageIndex ? 'bg-white' : 'bg-gray-400'}`}
                                                        />
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    <h4 className="font-bold text-gray-900 mb-2 text-lg sm:text-xl lg:text-2xl leading-tight">
                                        {selectedPost.title}
                                    </h4>

                                    <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500 mb-2">
                                        <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                                        <span>{selectedPost.postTime}</span>
                                    </div>

                                    <p className="text-sm sm:text-base text-gray-600 mb-4">{selectedPost.details}</p>

                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center space-x-2">
                                            <User className="w-4 h-4 text-gray-400" />
                                            <span className="text-sm font-medium">{selectedPost.sellerAccount.name}</span>
                                            {selectedPost.sellerAccount.isVerified && (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-6 h-6 flex-shrink-0"
                                                    viewBox="0 0 24 24"
                                                    fill="#0095f6"
                                                    aria-label="Verified account"
                                                >
                                                    <path d="M22.25 12l-1.6-2.77.3-3.18-3.09-.94L15.66 2 12 3.4 8.34 2 6.14 5.11l-3.09.94.3 3.18L2.25 12l1.1 3.06-.3 3.18 3.09.94L8.34 22l3.66-1.4 3.66 1.4 2.2-3.11 3.09-.94-.3-3.18L22.25 12z" />
                                                    <path
                                                        d="M10.4 15.6l-3-3 1.2-1.2 1.8 1.8 4.8-4.8 1.2 1.2-6 6z"
                                                        fill="#fff"
                                                    />
                                                </svg>
                                            )}
                                            <span className="text-xs text-gray-500">
                                                ({selectedPost.sellerAccount.completedOrders} orders)
                                            </span>
                                        </div>
                                        <button className="px-2 sm:px-3 py-1 bg-blue-200 text-blue-600 rounded-lg hover:bg-blue-300 transition-colors text-xs sm:text-sm font-medium">
                                            <MessageCircle className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between mb-6">
                                        <span className="text-xl font-bold text-emerald-600">${selectedPost.price}</span>
                                        <div className="flex items-center space-x-4">
                                            <div className='flex items-center gap-x-1'>
                                                <ThumbsUp className="w-4 h-4 text-gray-600" />
                                                <span className="text-[0.7rem] font-medium">{postStats[selectedPost.id]?.likes || 0} likes</span>
                                            </div>
                                            <div className='flex items-center gap-x-1'>
                                                <Eye className="w-4 h-4 text-gray-600" />
                                                <span className="text-[0.7rem] font-medium">{postStats[selectedPost.id]?.views || 0} views</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                                    <button
                                        onClick={() => setShowDetailsModal(false)}
                                        className="flex-1 px-4 sm:px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                                    >
                                        Close
                                    </button>
                                    <button
                                        onClick={() => handleBuyNow(selectedPost)}
                                        className="flex-1 px-4 sm:px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
                                    >
                                        Purchase Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {showBuyModal && selectedPost && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50">
                        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">

                            <div className="bg-gradient-to-r from-emerald-600 to-blue-600 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 rounded-t-2xl sm:rounded-t-3xl">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl sm:text-2xl font-bold text-white">Purchase Confirmation</h3>
                                    <button
                                        onClick={() => setShowBuyModal(false)}
                                        className="text-white hover:text-gray-200 transition-colors p-1"
                                    >
                                        <X className="w-5 h-5 sm:w-6 sm:h-6" />
                                    </button>
                                </div>
                            </div>


                            <div className="p-4 sm:p-6 lg:p-8">


                                <div className="mb-4">
                                    <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{selectedPost.title}</h4>
                                    <p className="text-sm sm:text-base text-gray-600">{selectedPost.details}</p>
                                </div>


                                <div className="flex space-x-2 mb-6">
                                    <button
                                        onClick={() => setSelectedRole("buyer")}
                                        className={`flex-1 px-4 py-2 rounded-lg border border-blue-500 font-medium transition-colors
              ${selectedRole === "buyer"
                                                ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                                                : "bg-blue-50 text-blue-500 hover:bg-blue-100"}`}
                                    >
                                        Buyer
                                    </button>

                                    <button
                                        onClick={() => setSelectedRole("seller")}
                                        className={`flex-1 px-4 py-2 rounded-lg border border-blue-500 font-medium transition-colors
              ${selectedRole === "seller"
                                                ? "bg-blue-500 text-white"
                                                : "bg-blue-50 text-blue-500 hover:bg-blue-100"}`}
                                    >
                                        Seller
                                    </button>

                                    <button
                                        onClick={() => setSelectedRole("combined")}
                                        className={`flex-1 px-4 py-2 rounded-lg border border-blue-500 font-medium transition-colors
              ${selectedRole === "combined"
                                                ? "bg-blue-500 text-white"
                                                : "bg-blue-50 text-blue-500 hover:bg-blue-100"}`}
                                    >
                                        Combined
                                    </button>
                                </div>
                                {(() => {
                                    const fees = calculateFees(selectedPost.price);

                                    return (
                                        <div className="bg-gray-50 rounded-xl p-4 sm:p-6 mb-6">
                                            <h5 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Fee Breakdown</h5>

                                            <div className="space-y-3">
                                                <div className="flex justify-between text-sm sm:text-base">
                                                    <span>Base Amount:</span>
                                                    <span className="font-medium">${fees.baseAmount.toFixed(2)}</span>
                                                </div>

                                                <div className="flex justify-between text-sm sm:text-base">
                                                    <span>Admin Fee (Buyer):</span>
                                                    <span className={`font-medium ${selectedRole === "seller" ? "text-red-600" : ""}`}>
                                                        {selectedRole === "seller"
                                                            ? `-${fees.buyerFee.toFixed(2)}`
                                                            : `+${fees.buyerFee.toFixed(2)}`}
                                                    </span>
                                                </div>

                                                <div className="flex justify-between text-sm sm:text-base">
                                                    <span>Admin Fee (Seller):</span>
                                                    <span className={`font-medium ${selectedRole === "buyer" ? "text-red-600" : ""}`}>
                                                        {selectedRole === "buyer"
                                                            ? `-${fees.sellerFee.toFixed(2)}`
                                                            : `+${fees.sellerFee.toFixed(2)}`}
                                                    </span>
                                                </div>

                                                <div className="flex justify-between text-sm sm:text-base">
                                                    <span>1st Generation Fee:</span>
                                                    <span className="font-medium">${fees.generation1Fee.toFixed(2)}</span>
                                                </div>

                                                <div className="flex justify-between text-sm sm:text-base">
                                                    <span>2nd Generation Fee:</span>
                                                    <span className="font-medium">${fees.generation2Fee.toFixed(2)}</span>
                                                </div>

                                                <hr className="my-3" />

                                                <div className="flex justify-between text-base sm:text-lg font-bold">
                                                    <span>Total You Pay:</span>
                                                    <span className="text-emerald-600">${fees.totalForBuyer.toFixed(2)}</span>
                                                </div>

                                                <div className="flex justify-between text-xs sm:text-sm text-gray-600">
                                                    <span>Seller Receives:</span>
                                                    <span>${fees.sellerReceives.toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })()}


                                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                                    <button
                                        onClick={() => setShowBuyModal(false)}
                                        className="flex-1 px-4 sm:px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => {
                                            alert("Purchase confirmed! Order will be processed shortly.");
                                            setShowBuyModal(false);
                                        }}
                                        className="flex-1 px-4 sm:px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
                                    >
                                        Confirm Purchase
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}



                {showAnnouncement && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50">
                        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-sm w-full">
                            <div className="flex items-center justify-between px-4 py-3 border-b">
                                <h3 className="text-lg font-bold text-gray-900">Connect With Us</h3>
                                <button
                                    onClick={() => setShowAnnouncement(false)}
                                    className="text-gray-500 hover:text-gray-700 transition-colors p-1"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="flex flex-col items-center justify-center p-6 space-y-5">
                                <div className="flex space-x-8">
                                    <a
                                        href="https://facebook.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group hover:scale-110 transition-transform duration-300"
                                    >
                                        <div className="w-12 h-12 rounded-xl flex items-center justify-center  transition-colors">
                                            <i class="fa-brands fa-facebook text-5xl text-blue-600"></i>
                                        </div>
                                    </a>
                                    <a
                                        href="https://t.me"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group hover:scale-110 transition-transform duration-300"
                                    >
                                        <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors">
                                            <i class="fa-brands fa-whatsapp text-5xl text-green-600"></i>
                                        </div>
                                    </a>
                                    <a
                                        href="https://wa.me"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group hover:scale-110 transition-transform duration-300"
                                    >
                                        <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors">
                                            <i class="fa-brands fa-telegram text-5xl text-blue-400"></i>
                                        </div>
                                    </a>
                                </div>
                                <div className="text-center">
                                    <p className="text-base font-semibold text-gray-800 mb-1">Connect with us or subscribe to our channel</p>
                                    <p className="text-sm text-gray-500">Stay updated with our latest news and offers!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardHome;