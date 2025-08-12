import React from 'react';
import { X } from 'lucide-react';

const BuyModal = ({ isOpen, onClose, selectedPost, selectedRole, setSelectedRole, calculateFees }) => {
    if (!isOpen || !selectedPost) return null;

    const fees = calculateFees(selectedPost.price);

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="bg-gradient-to-r from-emerald-600 to-blue-600 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 rounded-t-2xl sm:rounded-t-3xl">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl sm:text-2xl font-bold text-white">Purchase Confirmation</h3>
                        <button
                            onClick={onClose}
                            className="text-white hover:text-gray-200 transition-colors p-1"
                        >
                            <X className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                    </div>
                </div>

                <div className="p-4 sm:p-6 lg:p-8">
                    <div className="mb-4">
                        <h4 className="text-lg sm:text-xl                        font-bold text-gray-900 mb-2">{selectedPost.title}</h4>
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

                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                        <button
                            onClick={onClose}
                            className="flex-1 px-4 sm:px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                // alert("Purchase confirmed! Order will be processed shortly.");
                                // onClose();
                                hendlePurchase()
                            }}
                            className="flex-1 px-4 sm:px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
                        >
                            Confirm Purchase
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuyModal;