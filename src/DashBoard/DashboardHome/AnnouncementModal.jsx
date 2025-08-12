import React from 'react';
import { X } from 'lucide-react';

const AnnouncementModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-sm w-full">
                <div className="flex items-center justify-between px-4 py-3 border-b">
                    <h3 className="text-lg font-bold text-gray-900">Connect With Us</h3>
                    <button
                        onClick={onClose}
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
    );
};

export default AnnouncementModal;