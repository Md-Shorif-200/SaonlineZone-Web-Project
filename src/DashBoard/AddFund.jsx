import React, { useState } from 'react';
import { 
  CreditCard, 
  User, 
  Hash, 
  Upload, 
  FileText, 
  Eye,
  Edit,
  Check,
  X,
  Play
} from 'lucide-react';
import Headline from '../HeadLine/Headline';

const AddFund = () => {
  const [formData, setFormData] = useState({
    methodName: '',
    senderAccount: '',
    transactionId: '',
    amount: '',
    screenshot: null,
  });

  const [history, setHistory] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  

  const [adminDescription, setAdminDescription] = useState('Welcome to the Add Fund section. Here you can submit your fund requests with proper transaction details. Please ensure all information is accurate before submitting.');
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [tempDescription, setTempDescription] = useState('');
  

  const isAdmin = true; // You can replace this with actual admin check

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);


    await new Promise(resolve => setTimeout(resolve, 1000));

    const newEntry = {
      ...formData,
      id: Date.now(),
      date: new Date().toLocaleString(),
      screenshotURL: formData.screenshot ? URL.createObjectURL(formData.screenshot) : null,
    };

    setHistory([newEntry, ...history]);
    setFormData({
      methodName: '',
      senderAccount: '',
      transactionId: '',
      amount: '',
      screenshot: null,
    });
    setIsSubmitting(false);
  };

  const startEditingDescription = () => {
    setTempDescription(adminDescription);
    setIsEditingDescription(true);
  };

  const saveDescription = () => {
    setAdminDescription(tempDescription);
    setIsEditingDescription(false);
  };

  const cancelEditingDescription = () => {
    setTempDescription('');
    setIsEditingDescription(false);
  };

  const VideoTutorial = () => (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-4">
        <h3 className="text-xl font-semibold text-white flex items-center space-x-2">
          <Play className="w-5 h-5" />
          <span>Video Tutorial</span>
        </h3>
      </div>
      
      <div className="p-6">
        <div className="relative bg-gray-900 rounded-xl overflow-hidden">
          <div className="aspect-video">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="How to Add Funds - Tutorial"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-xl"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <Headline className='mb-10' headlines={["Welcome to our amazing platform!"]} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Add Fund</h1>
          <p className="text-gray-600">Submit your fund request with transaction details</p>
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white flex items-center space-x-2">
                    <FileText className="w-5 h-5" />
                    <span>Instructions</span>
                  </h3>
                  {isAdmin && (
                    <button
                      onClick={startEditingDescription}
                      className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                      title="Edit instructions"
                    >
                      <Edit className="w-4 h-4 text-white" />
                    </button>
                  )}
                </div>
              </div>
              
              <div className="p-6">
                {isEditingDescription ? (
                  <div className="space-y-4">
                    <textarea
                      value={tempDescription}
                      onChange={(e) => setTempDescription(e.target.value)}
                      rows={6}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Enter instructions for users..."
                    />
                    <div className="flex space-x-3">
                      <button
                        onClick={saveDescription}
                        className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                      >
                        <Check className="w-4 h-4" />
                        <span>Save</span>
                      </button>
                      <button
                        onClick={cancelEditingDescription}
                        className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <p className="text-gray-700 leading-relaxed">{adminDescription}</p>
                    {isAdmin && adminDescription && (
                      <button
                        onClick={startEditingDescription}
                        className="absolute top-0 right-0 p-2 text-gray-400 hover:text-green-500 hover:bg-green-50 rounded-lg transition-all duration-200"
                        title="Edit instructions"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          
          <div className="lg:col-span-1">
            <VideoTutorial />
          </div>
        </div>

        
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8">
          <div className="bg-blue-500 px-6 py-4">
            <h2 className="text-xl font-semibold text-white">Fund Request Form</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Payment Method *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="methodName"
                    placeholder="e.g., Bank Transfer, PayPal, etc."
                    className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    value={formData.methodName}
                    onChange={handleChange}
                    required
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                    <CreditCard className="text-gray-400 w-5 h-5" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Sender Account *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="senderAccount"
                    placeholder="Account number or email"
                    className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    value={formData.senderAccount}
                    onChange={handleChange}
                    required
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                    <User className="text-gray-400 w-5 h-5" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Transaction ID *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="transactionId"
                    placeholder="Enter transaction reference"
                    className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    value={formData.transactionId}
                    onChange={handleChange}
                    required
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                    <Hash className="text-gray-400 w-5 h-5" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Amount *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    name="amount"
                    placeholder="0.00"
                    className="w-full p-4 pl-8 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                    <span className="text-gray-500 font-medium">$</span>
                  </div>
                </div>
              </div>
            </div>

            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Transaction Screenshot *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-blue-400 transition-colors duration-200">
                <input
                  type="file"
                  accept="image/*"
                  name="screenshot"
                  onChange={handleChange}
                  className="hidden"
                  id="screenshot-upload"
                  required
                />
                <label
                  htmlFor="screenshot-upload"
                  className="cursor-pointer flex flex-col items-center space-y-2"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Upload className="text-blue-600 w-6 h-6" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-700">
                      {formData.screenshot ? formData.screenshot.name : 'Upload transaction screenshot'}
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG up to 10MB (Required)</p>
                  </div>
                </label>
              </div>
            </div>

            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-500 hover:bg-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed shadow-lg"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <span>Submit Fund Request</span>
                </div>
              )}
            </button>
          </form>
        </div>

        
        {history.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
              <h3 className="text-xl font-semibold text-white flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Submission History</span>
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sender</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Screenshot</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {history.map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                          {index + 1}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center space-x-2">
                          <CreditCard className="w-4 h-4 text-blue-600" />
                          <span>{item.methodName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.senderAccount}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">{item.transactionId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                        ${parseFloat(item.amount).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {item.screenshotURL ? (
                          <a
                            href={item.screenshotURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors duration-150"
                          >
                            <Eye className="mr-1 w-3 h-3" />
                            View
                          </a>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
                            N/A
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddFund;