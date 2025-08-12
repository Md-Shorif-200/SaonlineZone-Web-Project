import React from 'react';
import { X, Eye, ThumbsUp, MessageCircle, Clock, User } from 'lucide-react';

const DetailsModal = ({ isOpen, onClose, selectedPost, postStats, handleLikePost, handleBuyNow }) => {
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

    if (!isOpen || !selectedPost) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="bg-gradient-to-r from-emerald-600 to-blue-600 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 rounded-t-2xl sm:rounded-t-3xl">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl sm:text-2xl font-bold text-white">Post Details</h3>
                        <button
                            onClick={onClose}
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
                                {/* {selectedPost.sellerAccount.isVerified && (
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
                                )} */}
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
                            onClick={onClose}
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
    );
};

export default DetailsModal;