import React, { useState } from 'react';
import { 
  LuDollarSign, 
  LuUsers, 
  LuClock, 
  LuTrendingUp, 
  LuLink, 
  LuTicket, 
  LuSmartphone, 
  LuFacebook, 
  LuTwitter, 
  LuMessageCircle, 
  LuMail, 
  LuCheck, 
  LuCopy 
} from 'react-icons/lu';

const ReferEarn = () => {
  const [copySuccess, setCopySuccess] = useState('');
  
  // Sample user data
  const userReferralData = {
    referralLink: 'https://app.example.com/ref/USER123ABC',
    promoCode: 'REF123ABC',
    totalEarned: 2456.50,
    totalReferrals: 47,
    pendingEarnings: 128.30,
    thisMonthEarnings: 456.80
  };

  // Sample referral history
  const referralHistory = [
    {
      id: 1,
      userName: 'John Smith',
      email: 'john.smith@email.com',
      joinDate: '2024-01-15',
      status: 'Active',
      packagePurchased: 'Professional Package',
      earningFromUser: 85.50,
      level: 'Direct',
      lastActivity: '2024-01-20'
    },
    {
      id: 2,
      userName: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      joinDate: '2024-01-18',
      status: 'Active',
      packagePurchased: 'Starter Package',
      earningFromUser: 45.20,
      level: 'Direct',
      lastActivity: '2024-01-22'
    },
    {
      id: 3,
      userName: 'Mike Davis',
      email: 'mike.davis@email.com',
      joinDate: '2024-01-20',
      status: 'Pending',
      packagePurchased: 'Enterprise Package',
      earningFromUser: 125.75,
      level: '2nd Level',
      lastActivity: '2024-01-21'
    },
    {
      id: 4,
      userName: 'Emily Wilson',
      email: 'emily.w@email.com',
      joinDate: '2024-01-12',
      status: 'Active',
      packagePurchased: 'Professional Package',
      earningFromUser: 85.50,
      level: 'Direct',
      lastActivity: '2024-01-25'
    },
    {
      id: 5,
      userName: 'David Brown',
      email: 'david.brown@email.com',
      joinDate: '2024-01-25',
      status: 'Active',
      packagePurchased: 'Starter Package',
      earningFromUser: 45.20,
      level: '3rd Level',
      lastActivity: '2024-01-26'
    }
  ];

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(type);
      setTimeout(() => setCopySuccess(''), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      'Active': 'bg-green-100 text-green-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Inactive': 'bg-red-100 text-red-800'
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  const getLevelBadge = (level) => {
    const levelStyles = {
      'Direct': 'bg-blue-100 text-blue-800',
      '2nd Level': 'bg-blue-100 text-blue-800',
      '3rd Level': 'bg-indigo-100 text-indigo-800'
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${levelStyles[level] || 'bg-gray-100 text-gray-800'}`}>
        {level}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Refer & Earn</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Share your referral link with friends and earn commissions on every successful signup and purchase
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Earned</p>
                <p className="text-3xl font-bold text-green-600">${userReferralData.totalEarned.toFixed(2)}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <LuDollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Referrals</p>
                <p className="text-3xl font-bold text-blue-600">{userReferralData.totalReferrals}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <LuUsers className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Earnings</p>
                <p className="text-3xl font-bold text-orange-600">${userReferralData.pendingEarnings.toFixed(2)}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <LuClock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-3xl font-bold text-blue-600">${userReferralData.thisMonthEarnings.toFixed(2)}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <LuTrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Share Your Link</h3>
              <p className="text-gray-600">Share your unique referral link or promo code with friends, family, and social networks.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">They Sign Up</h3>
              <p className="text-gray-600">When someone uses your link to sign up and purchases a subscription package, you earn commissions.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Earn Money</h3>
              <p className="text-gray-600">Receive instant commissions and ongoing earnings from your referral network up to 3 levels deep.</p>
            </div>
          </div>
        </div>

        {/* Referral Tools */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-6">
            <h2 className="text-2xl font-bold text-white">Your Referral Tools</h2>
            <p className="text-green-100 mt-1">Use these tools to share and track your referrals</p>
          </div>

          <div className="p-8 space-y-6">
            {/* Referral Link */}
            <div className="space-y-3">
              <label className="block text-lg font-semibold text-gray-800 flex items-center">
                <LuLink className="mr-2 w-5 h-5" /> Your Referral Link
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  value={userReferralData.referralLink}
                  readOnly
                  className="flex-1 p-4 bg-gray-50 border border-gray-300 rounded-xl text-gray-700 font-mono text-sm"
                />
                <button
                  onClick={() => copyToClipboard(userReferralData.referralLink, 'link')}
                  className="px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors duration-200 flex items-center space-x-2"
                >
                  {copySuccess === 'link' ? <LuCheck className="w-4 h-4" /> : <LuCopy className="w-4 h-4" />}
                  <span>{copySuccess === 'link' ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Promo Code */}
            <div className="space-y-3">
              <label className="block text-lg font-semibold text-gray-800 flex items-center">
                <LuTicket className="mr-2 w-5 h-5" /> Your Promo Code
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  value={userReferralData.promoCode}
                  readOnly
                  className="flex-1 p-4 bg-gray-50 border border-gray-300 rounded-xl text-gray-700 font-mono text-xl font-bold text-center"
                />
                <button
                  onClick={() => copyToClipboard(userReferralData.promoCode, 'code')}
                  className="px-6 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors duration-200 flex items-center space-x-2"
                >
                  {copySuccess === 'code' ? <LuCheck className="w-4 h-4" /> : <LuCopy className="w-4 h-4" />}
                  <span>{copySuccess === 'code' ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="pt-4">
              <label className="block text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <LuSmartphone className="mr-2 w-5 h-5" /> Quick Share
              </label>
              <div className="flex flex-wrap gap-3">
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                  <LuFacebook className="w-4 h-4" />
                  <span>Facebook</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors">
                  <LuTwitter className="w-4 h-4" />
                  <span>Twitter</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                  <LuMessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-colors">
                  <span>💼</span>
                  <span>LinkedIn</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors">
                  <LuMail className="w-4 h-4" />
                  <span>Email</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Referral History */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-6">
            <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
              <span>Referral History</span>
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Details</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Earnings</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Activity</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {referralHistory.map((user, index) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                        {index + 1}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{user.userName}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.packagePurchased}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getLevelBadge(user.level)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                      ${user.earningFromUser.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(user.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.joinDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.lastActivity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferEarn;