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
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Headline from '../HeadLine/Headline';
import SearchSection from './SearchSection';

const DashboardHome = () => {
    const [showViewAll, setShowViewAll] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [showBuyModal, setShowBuyModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showAnnouncement, setShowAnnouncement] = useState(false);
    const [viewMode, setViewMode] = useState('grid');
    
    // Like and view tracking
    const [postStats, setPostStats] = useState({
        1: { likes: 12, views: 45, isLiked: false },
        2: { likes: 8, views: 32, isLiked: false },
        3: { likes: 23, views: 67, isLiked: false }
    });

    // Sample user data
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

    const deals = {
        online: [
            { title: 'Premium Package 50% OFF', price: '$49', originalPrice: '$99' },
            { title: 'Digital Marketing Course', price: '$29', originalPrice: '$59' }
        ],
        offline: [
            { title: 'Local Business Meetup', price: 'Free', location: 'New York' },
            { title: 'Workshop: Social Media', price: '$25', location: 'Chicago' }
        ]
    };

    const posts = [
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=200&fit=crop',
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
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop',
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
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop',
            title: 'Mobile App Development',
            price: 499.99,
            seller: 'AppBuilder',
            rating: 5.0,
            postTime: '2024-01-13 9:45 AM',
            details: 'Custom mobile app development for iOS and Android with modern UI/UX design.',
            sellerAccount: {
                name: 'AppBuilder',
                rating: 4.9,
                completedOrders: 234,
                joinDate: 'May 2019',
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
        // Increment view count when viewing details
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

    // Verified badge with three stars
    const VerifiedBadge = () => (
        <div className="flex items-center bg-gray-100 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium mt-1 sm:mt-0 w-fit space-x-1">
            <Star className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: '#C0C0C0' }} /> {/* Silver */}
            <Star className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: '#FFD700' }} /> {/* Gold */}
            <Star className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: '#00BFFF' }} /> {/* Diamond */}
            <span className="ml-1 text-gray-700">Verified</span>
        </div>
    );

    // You can reuse this for seller accounts in posts
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

                {/* Welcome Section */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border border-white/20 p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
                    <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center space-x-3 sm:space-x-4">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <User className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 flex flex-col sm:flex-row sm:items-center sm:space-x-3">
                                    <span className="truncate">Welcome, {userData.name}</span>
                                    {userData.isVerified && <VerifiedBadge />}
                                </h1>
                                <p className="text-sm sm:text-base text-gray-600 mt-1">Ready to grow your business today?</p>
                            </div>
                        </div>

                        <button 
                            className="flex items-center justify-center space-x-2 w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-2xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                            onClick={() => setShowAnnouncement(true)}
                        >
                            <Megaphone className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                            <span className="text-sm sm:text-base lg:text-lg font-semibold">Announcement</span>
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
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

                {/* Partner Sites */}
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

                {/* Deals Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-white/20">
                        <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Monitor className="w-4 h-4 text-blue-600" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900">Online Deals</h3>
                        </div>
                        <div className="space-y-3 sm:space-y-4">
                            {deals.online.map((deal, index) => (
                                <div key={index} className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg space-y-2 sm:space-y-0">
                                    <div>
                                        <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{deal.title}</h4>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-lg font-bold text-emerald-600">{deal.price}</span>
                                            {deal.originalPrice && (
                                                <span className="text-xs sm:text-sm text-gray-500 line-through">{deal.originalPrice}</span>
                                            )}
                                        </div>
                                    </div>
                                    <button className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium w-full sm:w-auto">
                                        View Deal
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-white/20">
                        <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                                <Building className="w-4 h-4 text-orange-600" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900">Offline Deals</h3>
                        </div>
                        <div className="space-y-3 sm:space-y-4">
                            {deals.offline.map((deal, index) => (
                                <div key={index} className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 sm:p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg space-y-2 sm:space-y-0">
                                    <div>
                                        <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{deal.title}</h4>
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-1 sm:space-y-0">
                                            <span className="text-lg font-bold text-emerald-600">{deal.price}</span>
                                            <span className="text-xs sm:text-sm text-gray-500 flex items-center">
                                                <MapPin className="w-3 h-3 mr-1" />
                                                {deal.location}
                                            </span>
                                        </div>
                                    </div>
                                    <button className="px-3 sm:px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium w-full sm:w-auto">
                                        View Deal
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Posts Section */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border border-white/20 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                                    <Package className="w-4 h-4 text-white" />
                                </div>
                                <h3 className="text-xl sm:text-2xl font-bold text-white">Latest Posts</h3>
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
                                <button
                                    onClick={() => setShowViewAll(true)}
                                    className="bg-white/20 hover:bg-white/30 text-white px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm font-medium flex items-center space-x-1"
                                >
                                    <span>View All</span>
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 sm:p-6 lg:p-8">
                        <div className={`grid gap-4 sm:gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                            {posts.slice(0, 3).map(post => (
                                <div key={post.id} className={`bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 ${viewMode === 'list' ? 'flex space-x-4 p-4' : ''}`}>
                                    <img
                                        src={post.image}
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
                                                        className={`w-5 h-5 cursor-pointer hover:scale-110 transition-all ease-in-out ${
                                                            postStats[post.id]?.isLiked 
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

                {/* View All Modal */}
                {showViewAll && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50">
                        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 rounded-t-2xl sm:rounded-t-3xl">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl sm:text-2xl font-bold text-white">All Posts</h3>
                                    <button
                                        onClick={() => setShowViewAll(false)}
                                        className="text-white hover:text-gray-200 transition-colors p-1"
                                    >
                                        <X className="w-5 h-5 sm:w-6 sm:h-6" />
                                    </button>
                                </div>
                            </div>

                            <div className="p-4 sm:p-6 lg:p-8">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                    {posts.map(post => (
                                        <div key={post.id} className="bg-gray-50 rounded-xl p-4 sm:p-6">
                                            <div className="flex space-x-3 sm:space-x-4">
                                                <img src={post.image} alt={post.title} className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg flex-shrink-0" />
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-bold text-gray-900 mb-1 text-sm sm:text-base leading-tight">{post.title}</h4>
                                                    <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500 mb-2">
                                                        <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                                                        <span>{post.postTime}</span>
                                                    </div>
                                                    <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2">{post.details}</p>

                                                    <div className="flex items-center space-x-2 mb-3">
                                                        <User className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                                                        <span className="text-xs sm:text-sm font-medium">{post.sellerAccount.name}</span>
                                                        {post.sellerAccount.isVerified && <SellerVerifiedBadge />}
                                                        <span className="text-xs text-gray-500">
                                                            ({post.sellerAccount.completedOrders} orders)
                                                        </span>
                                                    </div>

                                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                                                        <span className="text-lg sm:text-xl font-bold text-emerald-600">${post.price}</span>
                                                        <div className="flex space-x-2">
                                                            <button className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors text-xs sm:text-sm font-medium">
                                                                <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                                                                Chat
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    setShowViewAll(false);
                                                                    handleBuyNow(post);
                                                                }}
                                                                className="px-2 sm:px-3 py-1 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-xs sm:text-sm font-medium"
                                                            >
                                                                <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                                                                Buy Now
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Details Modal */}
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
                                    <img 
                                        src={selectedPost.image} 
                                        alt={selectedPost.title}
                                        className="w-full h-48 sm:h-64 object-cover rounded-xl mb-4"
                                    />
                                    <h4 className="font-bold text-gray-900 mb-2 text-lg sm:text-xl lg:text-2xl leading-tight">{selectedPost.title}</h4>
                                    <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500 mb-2">
                                        <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                                        <span>{selectedPost.postTime}</span>
                                    </div>
                                    <p className="text-sm sm:text-base text-gray-600 mb-4">{selectedPost.details}</p>

                                    <div className="flex items-center space-x-2 mb-4">
                                        <User className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm font-medium">{selectedPost.sellerAccount.name}</span>
                                        {selectedPost.sellerAccount.isVerified && <SellerVerifiedBadge />}
                                        <span className="text-xs text-gray-500">
                                            ({selectedPost.sellerAccount.completedOrders} orders)
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between mb-6">
                                        <span className="text-2xl font-bold text-emerald-600">${selectedPost.price}</span>
                                        <div className="flex items-center space-x-4">
                                            <div className='flex items-center gap-x-2'>
                                                <ThumbsUp className="w-5 h-5 text-gray-600" />
                                                <span className="text-sm font-medium">{postStats[selectedPost.id]?.likes || 0} likes</span>
                                            </div>
                                            <div className='flex items-center gap-x-2'>
                                                <Eye className="w-5 h-5 text-gray-600" />
                                                <span className="text-sm font-medium">{postStats[selectedPost.id]?.views || 0} views</span>
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

                {/* Buy Now Modal */}
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
                                <div className="mb-6">
                                    <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{selectedPost.title}</h4>
                                    <p className="text-sm sm:text-base text-gray-600">{selectedPost.details}</p>
                                </div>

                                {/* Fee Breakdown */}
                                <div className="bg-gray-50 rounded-xl p-4 sm:p-6 mb-6">
                                    <h5 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Fee Breakdown</h5>
                                    {(() => {
                                        const fees = calculateFees(selectedPost.price);
                                        return (
                                            <div className="space-y-3">
                                                <div className="flex justify-between text-sm sm:text-base">
                                                    <span>Base Amount:</span>
                                                    <span className="font-medium">${fees.baseAmount.toFixed(2)}</span>
                                                </div>
                                                <div className="flex justify-between text-sm sm:text-base">
                                                    <span>Admin Fee (Buyer):</span>
                                                    <span className="font-medium text-red-600">+${fees.buyerFee.toFixed(2)}</span>
                                                </div>
                                                <div className="flex justify-between text-sm sm:text-base">
                                                    <span>Admin Fee (Seller):</span>
                                                    <span className="font-medium text-red-600">-${fees.sellerFee.toFixed(2)}</span>
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
                                        );
                                    })()}
                                </div>

                                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                                    <button
                                        onClick={() => setShowBuyModal(false)}
                                        className="flex-1 px-4 sm:px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => {
                                            alert('Purchase confirmed! Order will be processed shortly.');
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

                {/* Announcement Modal with Social Icons */}
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