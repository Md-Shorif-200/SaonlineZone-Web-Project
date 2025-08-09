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
  LuCopy,
  LuCalendar,
  LuActivity
} from 'react-icons/lu';
import Headline from '../HeadLine/Headline';

const ReferEarn = () => {
  const [copySuccess, setCopySuccess] = useState('');
  

  const userReferralData = {
    referralLink: 'https://app.example.com/ref/USER123ABC',
    promoCode: 'REF123ABC',
    totalEarned: 2456.50,
    totalReferrals: 47,
    pendingEarnings: 128.30,
    thisMonthEarnings: 456.80
  };


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
      '2nd Level': 'bg-purple-100 text-purple-800',
      '3rd Level': 'bg-indigo-100 text-indigo-800'
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${levelStyles[level] || 'bg-gray-100 text-gray-800'}`}>
        {level}
      </span>
    );
  };


  const ReferralCard = ({ user, index }) => (
    <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
            {index + 1}
          </div>
          <div>
            <div className="font-medium text-gray-900 text-sm">{user.userName}</div>
            <div className="text-xs text-gray-500">{user.email}</div>
          </div>
        </div>
        <div className="text-right">
          {getStatusBadge(user.status)}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="space-y-1">
          <div className="text-gray-500">Package</div>
          <div className="font-medium text-gray-900">{user.packagePurchased}</div>
        </div>
        <div className="space-y-1">
          <div className="text-gray-500">Level</div>
          <div>{getLevelBadge(user.level)}</div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="space-y-1">
          <div className="text-gray-500">Earnings</div>
          <div className="font-semibold text-green-600">${user.earningFromUser.toFixed(2)}</div>
        </div>
        <div className="space-y-1">
          <div className="text-gray-500">Join Date</div>
          <div className="text-gray-600">{user.joinDate}</div>
        </div>
      </div>
      
      <div className="pt-2 border-t border-gray-100">
        <div className="flex items-center text-xs text-gray-500">
          <LuActivity className="w-3 h-3 mr-1" />
          Last activity: {user.lastActivity}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-4 sm:py-8">
      <Headline className='mb-10'  headlines={["Welcome to our amazing platform!"]} ></Headline>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-4">Refer & Earn</h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Share your referral link with friends and earn commissions on every successful signup and purchase
          </p>
        </div>

        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-6 border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="mb-2 sm:mb-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Total Earned</p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600">${userReferralData.totalEarned.toFixed(2)}</p>
              </div>
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center self-end sm:self-auto">
                <LuDollarSign className="w-4 h-4 sm:w-6 sm:h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-6 border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="mb-2 sm:mb-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Total Referrals</p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600">{userReferralData.totalReferrals}</p>
              </div>
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center self-end sm:self-auto">
                <LuUsers className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-6 border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="mb-2 sm:mb-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Pending</p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-orange-600">${userReferralData.pendingEarnings.toFixed(2)}</p>
              </div>
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-orange-100 rounded-full flex items-center justify-center self-end sm:self-auto">
                <LuClock className="w-4 h-4 sm:w-6 sm:h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-6 border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="mb-2 sm:mb-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600">This Month</p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600">${userReferralData.thisMonthEarnings.toFixed(2)}</p>
              </div>
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center self-end sm:self-auto">
                <LuTrendingUp className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 p-4 sm:p-8 mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-2xl sm:text-3xl font-bold text-white">1</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Share Your Link</h3>
              <p className="text-sm sm:text-base text-gray-600">Share your unique referral link or promo code with friends, family, and social networks.</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-2xl sm:text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">They Sign Up</h3>
              <p className="text-sm sm:text-base text-gray-600">When someone uses your link to sign up and purchases a subscription package, you earn commissions.</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-2xl sm:text-3xl font-bold text-white">3</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Earn Money</h3>
              <p className="text-sm sm:text-base text-gray-600">Receive instant commissions and ongoing earnings from your referral network up to 3 levels deep.</p>
            </div>
          </div>
        </div>

        
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-6 sm:mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 sm:px-8 py-4 sm:py-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white">Your Referral Tools</h2>
            <p className="text-blue-100 mt-1 text-sm sm:text-base">Use these tools to share and track your referrals</p>
          </div>

          <div className="p-4 sm:p-8 space-y-6">
            
            <div className="space-y-3">
              <label className="block text-base sm:text-lg font-semibold text-gray-800 flex items-center">
                <LuLink className="mr-2 w-4 h-4 sm:w-5 sm:h-5" /> Your Referral Link
              </label>
              <div className="space-y-3 sm:space-y-0 sm:flex sm:items-center sm:space-x-3">
                <input
                  type="text"
                  value={userReferralData.referralLink}
                  readOnly
                  className="w-full sm:flex-1 p-3 sm:p-4 bg-gray-50 border border-gray-300 rounded-xl text-gray-700 font-mono text-xs sm:text-sm"
                />
                <button
                  onClick={() => copyToClipboard(userReferralData.referralLink, 'link')}
                  className="w-full sm:w-auto px-4 sm:px-6 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2 min-h-[48px]"
                >
                  {copySuccess === 'link' ? <LuCheck className="w-4 h-4" /> : <LuCopy className="w-4 h-4" />}
                  <span>{copySuccess === 'link' ? 'Copied!' : 'Copy Link'}</span>
                </button>
              </div>
            </div>

            
            <div className="space-y-3">
              <label className="block text-base sm:text-lg font-semibold text-gray-800 flex items-center">
                <LuTicket className="mr-2 w-4 h-4 sm:w-5 sm:h-5" /> Your Promo Code
              </label>
              <div className="space-y-3 sm:space-y-0 sm:flex sm:items-center sm:space-x-3">
                <input
                  type="text"
                  value={userReferralData.promoCode}
                  readOnly
                  className="w-full sm:flex-1 p-3 sm:p-4 bg-gray-50 border border-gray-300 rounded-xl text-gray-700 font-mono text-lg sm:text-xl font-bold text-center"
                />
                <button
                  onClick={() => copyToClipboard(userReferralData.promoCode, 'code')}
                  className="w-full sm:w-auto px-4 sm:px-6 py-3 sm:py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2 min-h-[48px]"
                >
                  {copySuccess === 'code' ? <LuCheck className="w-4 h-4" /> : <LuCopy className="w-4 h-4" />}
                  <span>{copySuccess === 'code' ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>
            </div>

            
            <div className="pt-2 sm:pt-4">
              <label className="block text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center">
                <LuSmartphone className="mr-2 w-4 h-4 sm:w-5 sm:h-5" /> Quick Share
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
                <button className="flex items-center justify-center space-x-1 sm:space-x-2 px-3 py-2.5 sm:px-4 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors min-h-[44px]">
                  <LuFacebook className="w-4 h-4" />
                  <span className="text-sm">Facebook</span>
                </button>
                <button className="flex items-center justify-center space-x-1 sm:space-x-2 px-3 py-2.5 sm:px-4 sm:py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors min-h-[44px]">
                  <LuTwitter className="w-4 h-4" />
                  <span className="text-sm">Twitter</span>
                </button>
                <button className="flex items-center justify-center space-x-1 sm:space-x-2 px-3 py-2.5 sm:px-4 sm:py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors min-h-[44px]">
                  <LuMessageCircle className="w-4 h-4" />
                  <span className="text-sm">WhatsApp</span>
                </button>
                <button className="flex items-center justify-center space-x-1 sm:space-x-2 px-3 py-2.5 sm:px-4 sm:py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-colors min-h-[44px]">
                  <span>💼</span>
                  <span className="text-sm">LinkedIn</span>
                </button>
                <button className="flex items-center justify-center space-x-1 sm:space-x-2 px-3 py-2.5 sm:px-4 sm:py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors min-h-[44px] col-span-2 sm:col-span-1">
                  <LuMail className="w-4 h-4" />
                  <span className="text-sm">Email</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 sm:px-8 py-4 sm:py-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center space-x-2">
              <span>Referral History</span>
            </h2>
          </div>

          
          <div className="block lg:hidden p-4 space-y-4">
            {referralHistory.map((user, index) => (
              <ReferralCard key={user.id} user={user} index={index} />
            ))}
          </div>

          
          <div className="hidden lg:block overflow-x-auto">
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