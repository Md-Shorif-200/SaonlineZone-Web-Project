import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, User, MessageCircle } from 'lucide-react';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        phone: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);


        await new Promise(resolve => setTimeout(resolve, 2000));

        alert('Message sent successfully!');
        setFormData({
            name: '',
            email: '',
            subject: '',
            phone: '',
            message: ''
        });
        setIsSubmitting(false);
    };

    return (
        <div className="min-h-screen bg-blue-50 py-12 px-4 sm:py-20">
            <div className="max-w-7xl mx-auto pt-10">
                
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6">
                        <MessageCircle className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-semibold text-blue-500 uppercase tracking-wider">
                            Contact Us
                        </span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-6">
                        Get In <span className="text-blue-500">Touch</span>
                    </h1>
                    <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
                        We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                    
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-blue-100 rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300 hover:border-blue-200">
                            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
                                <Mail className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-black mb-2">Email Address</h3>
                            <p className="text-gray-600 mb-3">Send us an email anytime</p>
                            <a href="mailto:contact@saonlinezone.com" className="text-blue-500 font-semibold hover:text-blue-600 transition-colors">
                                contact@saonlinezone.com
                            </a>
                        </div>

                        <div className="bg-blue-100 rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300 hover:border-blue-200">
                            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
                                <Phone className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-black mb-2">Phone Number</h3>
                            <p className="text-gray-600 mb-3">Call us during business hours</p>
                            <a href="tel:+1234567890" className="text-blue-500 font-semibold hover:text-blue-600 transition-colors">
                                +1 (234) 567-890
                            </a>
                        </div>

                        <div className="bg-blue-100 rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300 hover:border-blue-200">
                            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
                                <MapPin className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-black mb-2">Office Location</h3>
                            <p className="text-gray-600 mb-3">Visit us at our office</p>
                            <p className="text-blue-500 font-semibold">
                                123 Business Street<br />
                                New York, NY 10001
                            </p>
                        </div>
                    </div>

                    
                    <div className="lg:col-span-2">
                        <div className="bg-blue-100 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-blue-100">
                            <div className="mb-8">
                                <h2 className="text-2xl sm:text-3xl font-bold text-black mb-4">
                                    Send Us a Message
                                </h2>
                                <p className="text-gray-700">
                                    Fill out the form below and we'll get back to you as soon as possible.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="relative">
                                        <label className="block text-sm font-semibold text-black mb-2">
                                            Full Name *
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="Enter your full name"
                                                required
                                                className="w-full pl-12 pr-4 py-4 bg-blue-50 border-2 border-blue-200 rounded-xl text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all duration-300"
                                            />
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <label className="block text-sm font-semibold text-black mb-2">
                                            Email Address *
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="Enter your email"
                                                required
                                                className="w-full pl-12 pr-4 py-4 bg-blue-50 border-2 border-blue-200 rounded-xl text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all duration-300"
                                            />
                                        </div>
                                    </div>
                                </div>

                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="relative">
                                        <label className="block text-sm font-semibold text-black mb-2">
                                            Subject *
                                        </label>
                                        <div className="relative">
                                            <MessageCircle className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                            <input
                                                type="text"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                placeholder="Message subject"
                                                required
                                                className="w-full pl-12 pr-4 py-4 bg-blue-50 border-2 border-blue-200 rounded-xl text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all duration-300"
                                            />
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <label className="block text-sm font-semibold text-black mb-2">
                                            Phone Number
                                        </label>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="Your phone number"
                                                className="w-full pl-12 pr-4 py-4 bg-blue-50 border-2 border-blue-200 rounded-xl text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all duration-300"
                                            />
                                        </div>
                                    </div>
                                </div>

                                
                                <div className="relative">
                                    <label className="block text-sm font-semibold text-black mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="6"
                                        placeholder="Tell us how we can help you..."
                                        required
                                        className="w-full px-4 py-4 bg-blue-50 border-2 border-blue-200 rounded-xl text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all duration-300 resize-none"
                                    ></textarea>
                                </div>

                                
                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 text-lg"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                Sending Message...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5" />
                                                Send Your Message
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default ContactPage;