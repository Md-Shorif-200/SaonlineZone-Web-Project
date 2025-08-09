import React, { useState } from 'react';
import { 
  Star, 
  DollarSign, 
  FileText, 
  Settings, 
  Shield, 
  Sparkles, 
  Check, 
  X, 
  CreditCard, 
  Phone, 
  Link, 
  User, 
  Gem,
  Edit3,
  Save,
  XCircle
} from 'lucide-react';
import Headline from '../HeadLine/Headline';

const BuySubscription = ({ isAdmin = true }) => { // Add isAdmin prop, defaulting to true for demo
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [formData, setFormData] = useState({
    nidFront: null,
    nidBack: null,
    permanentAddress: '',
    presentAddress: '',
    socialLink: '',
    contactNumber: '',
    profileImage: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [editData, setEditData] = useState({});


  const [packages, setPackages] = useState([
    {
      id: 1,
      name: "Starter Package",
      description: "Perfect for beginners who want to start their journey with basic commission benefits.",
      price: 99,
      sellPosts: 10,
      settings: "Basic",
      trustedGuarantee: 85,
      commission: 15, // Add commission percentage
      popular: false,
      features: ["Basic Dashboard", "Email Support", "Monthly Reports"]
    },
    {
      id: 2,
      name: "Professional Package",
      description: "Advanced features with higher commission rates for serious entrepreneurs.",
      price: 299,
      sellPosts: 50,
      settings: "Advanced",
      trustedGuarantee: 92,
      commission: 25, // Add commission percentage
      popular: true,
      features: ["Advanced Dashboard", "Priority Support", "Weekly Reports", "Analytics Tools"]
    },
    {
      id: 3,
      name: "Enterprise Package",
      description: "Premium package with maximum benefits and exclusive features for top performers.",
      price: 599,
      sellPosts: 200,
      settings: "Premium",
      trustedGuarantee: 98,
      commission: 35, // Add commission percentage
      popular: false,
      features: ["Premium Dashboard", "24/7 Support", "Daily Reports", "Advanced Analytics", "Custom Branding"]
    }
  ]);

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);


    await new Promise(resolve => setTimeout(resolve, 2000));

    alert(`Subscription purchased successfully!\nPackage: ${selectedPackage.name}\nPrice: $${selectedPackage.price}\nCommission: ${selectedPackage.commission}%`);
    

    setFormData({
      nidFront: null,
      nidBack: null,
      permanentAddress: '',
      presentAddress: '',
      socialLink: '',
      contactNumber: '',
      profileImage: null,
    });
    setIsSubmitting(false);
    setShowForm(false);
    setSelectedPackage(null);
  };


  const startEditing = (pkg) => {
    setEditingPackage(pkg.id);
    setEditData({
      name: pkg.name,
      commission: pkg.commission
    });
  };

  const cancelEditing = () => {
    setEditingPackage(null);
    setEditData({});
  };

  const saveEditing = () => {
    setPackages(prev => prev.map(pkg => 
      pkg.id === editingPackage 
        ? { ...pkg, name: editData.name, commission: editData.commission }
        : pkg
    ));
    setEditingPackage(null);
    setEditData({});
  };

  const handleEditChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-4 sm:py-8">
      <Headline className='mb-10' headlines={["Welcome to our amazing platform!"]} />
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        
        
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
            Choose Your Package
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Select the perfect subscription package that fits your business goals and start earning commissions today
          </p>
        </div>

        {!showForm ? (
          /* Package Listing */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl border-2 transition-all duration-300 hover:shadow-xl sm:hover:shadow-2xl hover:scale-[1.02] sm:hover:scale-105 ${
                  pkg.popular ? 'border-blue-500 ring-2 sm:ring-4 ring-blue-300' : 'border-gray-200'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center">
                      <Star className="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" /> Most Popular
                    </span>
                  </div>
                )}

                
                {isAdmin && (
                  <div className="absolute top-3 right-3 z-10">
                    {editingPackage === pkg.id ? (
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={saveEditing}
                          className="p-1.5 bg-green-500 hover:bg-green-600 text-white rounded-full transition-colors"
                          title="Save changes"
                        >
                          <Save className="w-3 h-3" />
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
                          title="Cancel editing"
                        >
                          <XCircle className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => startEditing(pkg)}
                        className="p-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 rounded-full transition-colors"
                        title="Edit package"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                )}

                <div className="p-4 sm:p-6 lg:p-8">
                  
                  <div className="text-center mb-4 sm:mb-6">
                    
                    {editingPackage === pkg.id ? (
                      <input
                        type="text"
                        value={editData.name}
                        onChange={(e) => handleEditChange('name', e.target.value)}
                        className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 w-full text-center border-b-2 border-blue-500 focus:outline-none bg-transparent"
                        placeholder="Package name"
                      />
                    ) : (
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                    )}
                    
                    <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed">{pkg.description}</p>
                    <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">
                      ${pkg.price}
                      <span className="text-base sm:text-lg text-gray-500 font-normal">/month</span>
                    </div>
                  </div>

                  
                  <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-sm sm:text-base text-gray-600 flex items-center">
                        <FileText className="mr-2 w-3 h-3 sm:w-4 sm:h-4" /> Sell Posts
                      </span>
                      <span className="text-sm sm:text-base font-semibold">{pkg.sellPosts}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm sm:text-base text-gray-600 flex items-center">
                        <Settings className="mr-2 w-3 h-3 sm:w-4 sm:h-4" /> Settings
                      </span>
                      <span className="text-sm sm:text-base font-semibold">{pkg.settings}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm sm:text-base text-gray-600 flex items-center">
                        <Shield className="mr-2 w-3 h-3 sm:w-4 sm:h-4" /> Trusted Guarantee
                      </span>
                      <span className="text-sm sm:text-base font-semibold text-green-600">{pkg.trustedGuarantee}%</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm sm:text-base text-gray-600 flex items-center">
                        <DollarSign className="mr-2 w-3 h-3 sm:w-4 sm:h-4" /> Commission
                      </span>
                      {editingPackage === pkg.id ? (
                        <div className="flex items-center">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={editData.commission}
                            onChange={(e) => handleEditChange('commission', parseInt(e.target.value) || 0)}
                            className="text-sm sm:text-base font-semibold text-green-600 w-12 text-right border-b border-green-500 focus:outline-none bg-transparent"
                          />
                          <span className="text-sm sm:text-base font-semibold text-green-600 ml-1">%</span>
                        </div>
                      ) : (
                        <span className="text-sm sm:text-base font-semibold text-green-600">{pkg.commission}%</span>
                      )}
                    </div>
                  </div>

                  
                  <div className="mb-6 sm:mb-8">
                    <h4 className="text-sm sm:text-base font-semibold text-gray-800 mb-2 sm:mb-3 flex items-center">
                      <Sparkles className="mr-2 w-4 h-4 sm:w-5 sm:h-5" /> Features
                    </h4>
                    <ul className="space-y-1.5 sm:space-y-2">
                      {pkg.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-xs sm:text-sm text-gray-600">
                          <Check className="mr-2 w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                          <span className="leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  
                  <button
                    onClick={() => handlePackageSelect(pkg)}
                    disabled={editingPackage === pkg.id}
                    className={`w-full py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base transition-all duration-200 ${
                      editingPackage === pkg.id
                        ? 'bg-gray-400 cursor-not-allowed text-white'
                        : pkg.popular
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg'
                        : 'bg-gray-900 hover:bg-gray-800 text-white'
                    }`}
                  >
                    {editingPackage === pkg.id ? 'Editing...' : `Choose ${pkg.name}`}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Subscription Form */
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl border border-gray-200 overflow-hidden">
              
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 sm:px-8 py-4 sm:py-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg sm:text-2xl font-bold text-white">Complete Your Subscription</h2>
                    <p className="text-purple-100 mt-1 text-sm sm:text-base">
                      {selectedPackage.name} - ${selectedPackage.price}/month - {selectedPackage.commission}% Commission
                    </p>
                  </div>
                  <button
                    onClick={() => setShowForm(false)}
                    className="text-white hover:text-purple-200 transition-colors p-1"
                  >
                    <X className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      NID Front Page *
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 sm:p-6 hover:border-blue-400 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        name="nidFront"
                        onChange={handleInputChange}
                        className="hidden"
                        id="nid-front"
                        required
                      />
                      <label htmlFor="nid-front" className="cursor-pointer flex flex-col items-center">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                          <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                        </div>
                        <p className="text-xs sm:text-sm font-medium text-gray-700 text-center">
                          {formData.nidFront ? formData.nidFront.name : 'Upload NID Front'}
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      NID Back Page *
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 sm:p-6 hover:border-blue-400 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        name="nidBack"
                        onChange={handleInputChange}
                        className="hidden"
                        id="nid-back"
                        required
                      />
                      <label htmlFor="nid-back" className="cursor-pointer flex flex-col items-center">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                          <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                        </div>
                        <p className="text-xs sm:text-sm font-medium text-gray-700 text-center">
                          {formData.nidBack ? formData.nidBack.name : 'Upload NID Back'}
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                      </label>
                    </div>
                  </div>
                </div>

                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Permanent Address *
                    </label>
                    <textarea
                      name="permanentAddress"
                      rows={3}
                      placeholder="Enter your permanent address"
                      className="w-full p-3 sm:p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base resize-none"
                      value={formData.permanentAddress}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Present Address *
                    </label>
                    <textarea
                      name="presentAddress"
                      rows={3}
                      placeholder="Enter your present address"
                      className="w-full p-3 sm:p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base resize-none"
                      value={formData.presentAddress}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Contact Number *
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        name="contactNumber"
                        placeholder="+1 (555) 123-4567"
                        className="w-full p-3 sm:p-4 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                        value={formData.contactNumber}
                        onChange={handleInputChange}
                        required
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 sm:pr-4">
                        <Phone className="text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Social Link
                    </label>
                    <div className="relative">
                      <input
                        type="url"
                        name="socialLink"
                        placeholder="https://facebook.com/yourprofile"
                        className="w-full p-3 sm:p-4 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                        value={formData.socialLink}
                        onChange={handleInputChange}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 sm:pr-4">
                        <Link className="text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                    </div>
                  </div>
                </div>

                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Profile Image *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 sm:p-8 hover:border-blue-400 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      name="profileImage"
                      onChange={handleInputChange}
                      className="hidden"
                      id="profile-image"
                      required
                    />
                    <label htmlFor="profile-image" className="cursor-pointer flex flex-col items-center">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                        <User className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                      </div>
                      <p className="text-base sm:text-lg font-medium text-gray-700 mb-1 sm:mb-2 text-center">
                        {formData.profileImage ? formData.profileImage.name : 'Upload Profile Image'}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500">PNG, JPG up to 5MB</p>
                    </label>
                  </div>
                </div>

                
                <div className="pt-4 sm:pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 sm:py-4 rounded-xl transition-all duration-200 disabled:cursor-not-allowed shadow-lg text-sm sm:text-base"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Processing Payment...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <span>Complete Subscription - ${selectedPackage.price}</span>
                        <Gem className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                      </div>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuySubscription;