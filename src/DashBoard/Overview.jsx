import React, { useState } from 'react';
import {
  DollarSign,
  TrendingDown,
  Package,
  TrendingUp,
  Mail,
  Clock,
  RotateCcw,
  Users,
  Crown,
  BarChart3,
  ClipboardList,
  CreditCard,
  CheckCircle,
  Settings,
  Zap,
  Phone,
  IdCard,
  Calendar
} from 'lucide-react';
import Headline from '../HeadLine/Headline';

const Overview = () => {

  const userData = {
    accountBalance: 2456.75,
    spentBalance: 1834.50,
    totalOrders: 47,
    receiveOrders: 23,
    pendingOrders: 8,
    inProgressOrders: 5,
    subscriptionName: 'Professional Package',
    subscriptionStatus: 'Active',
    subscriptionExpiry: '2024-02-28',
    referralUsers: 15,
    totalEarnings: 3291.25,
    monthlyGrowth: 12.5
  };

  const [timeRange, setTimeRange] = useState('30d');


  const recentActivities = [
    {
      id: 1,
      type: 'deposit',
      description: 'Account deposit via PayPal',
      amount: 500.00,
      timestamp: '2024-01-28 14:30',
      status: 'completed'
    },
    {
      id: 2,
      type: 'order',
      description: 'New showcase order received',
      amount: 299.99,
      timestamp: '2024-01-28 12:15',
      status: 'pending'
    },
    {
      id: 3,
      type: 'referral',
      description: 'Referral commission earned',
      amount: 85.50,
      timestamp: '2024-01-27 16:45',
      status: 'completed'
    },
    {
      id: 4,
      type: 'withdrawal',
      description: 'Withdrawal request processed',
      amount: -150.00,
      timestamp: '2024-01-27 09:20',
      status: 'processing'
    }
  ];


  const statusInfo = [
    {
      category: 'Account Status',
      status: 'Verified',
      description: 'Your account is fully verified and active',
      icon: CheckCircle,
      color: 'green'
    },
    {
      category: 'Payment Status',
      status: 'Connected',
      description: 'Payment methods are configured and working',
      icon: CreditCard,
      color: 'blue'
    },
    {
      category: 'KYC Status',
      status: 'Approved',
      description: 'Identity verification completed successfully',
      icon: IdCard,
      color: 'green'
    },
    {
      category: 'Support Level',
      status: 'Premium',
      description: 'Priority support with 24/7 assistance',
      icon: Settings,
      color: 'blue'
    }
  ];

  const getActivityIcon = (type) => {
    const icons = {
      deposit: DollarSign,
      order: Package,
      referral: Users,
      withdrawal: TrendingDown,
      subscription: Crown
    };
    return icons[type] || ClipboardList;
  };

  const getStatusBadge = (status) => {
    const styles = {
      completed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      active: 'bg-green-100 text-green-800',
      expired: 'bg-red-100 text-red-800'
    };
    return `px-2 py-1 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-800'}`;
  };

  const getStatusColor = (color) => {
    const colors = {
      green: 'bg-green-100 text-green-800 border-green-200',
      blue: 'bg-blue-100 text-blue-800 border-blue-200',
      orange: 'bg-orange-100 text-orange-800 border-orange-200',
      red: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[color] || 'bg-gray-100 text-gray-800 border-gray-200';
  };


  const ActivityCard = ({ activity }) => {
    const ActivityIcon = getActivityIcon(activity.type);
    return (
      <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-xl">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <ActivityIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">{activity.description}</p>
            <div className="flex items-center space-x-2 mt-1">
              <Calendar className="w-3 h-3 text-gray-400" />
              <p className="text-xs sm:text-sm text-gray-500">{activity.timestamp}</p>
            </div>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <p className={`font-bold text-sm sm:text-base ${activity.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {activity.amount > 0 ? '+' : ''}${Math.abs(activity.amount).toFixed(2)}
          </p>
          <span className={getStatusBadge(activity.status)}>
            {activity.status}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-4 sm:py-8">
      <Headline className='mb-10'  headlines={["Welcome to our amazing platform!"]} ></Headline>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">Dashboard Overview</h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600">Welcome back! Here's what's happening with your account.</p>
            </div>
            <div className="w-full md:w-auto">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="w-full md:w-auto px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
            </div>
          </div>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          
          
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="mb-3 sm:mb-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Account Balance</p>
                <p className="text-2xl sm:text-3xl font-bold text-green-600">${userData.accountBalance.toFixed(2)}</p>
                <p className="text-xs sm:text-sm text-green-500 mt-1">+{userData.monthlyGrowth}% this month</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center self-end sm:self-auto">
                <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
              </div>
            </div>
          </div>

          
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="mb-3 sm:mb-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Spent Balance</p>
                <p className="text-2xl sm:text-3xl font-bold text-red-600">${userData.spentBalance.toFixed(2)}</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">Total expenditure</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-full flex items-center justify-center self-end sm:self-auto">
                <TrendingDown className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
              </div>
            </div>
          </div>

          
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="mb-3 sm:mb-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl sm:text-3xl font-bold text-blue-600">{userData.totalOrders}</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">All time orders</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center self-end sm:self-auto">
                <Package className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
            </div>
          </div>

          
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="mb-3 sm:mb-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Total Earnings</p>
                <p className="text-2xl sm:text-3xl font-bold text-blue-600">${userData.totalEarnings.toFixed(2)}</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">Including referrals</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center self-end sm:self-auto">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          
          
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-6 border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="mb-2 sm:mb-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Receive Orders</p>
                <p className="text-xl sm:text-2xl font-bold text-indigo-600">{userData.receiveOrders}</p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-100 rounded-full flex items-center justify-center self-end sm:self-auto">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
              </div>
            </div>
          </div>

          
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-6 border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="mb-2 sm:mb-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Pending Orders</p>
                <p className="text-xl sm:text-2xl font-bold text-yellow-600">{userData.pendingOrders}</p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-100 rounded-full flex items-center justify-center self-end sm:self-auto">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
              </div>
            </div>
          </div>

          
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-6 border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="mb-2 sm:mb-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-xl sm:text-2xl font-bold text-orange-600">{userData.inProgressOrders}</p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-full flex items-center justify-center self-end sm:self-auto">
                <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
              </div>
            </div>
          </div>

          
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-6 border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="mb-2 sm:mb-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Referral Users</p>
                <p className="text-xl sm:text-2xl font-bold text-green-600">{userData.referralUsers}</p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center self-end sm:self-auto">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          
          
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-4 sm:px-6 py-3 sm:py-4">
              <h3 className="text-lg sm:text-xl font-bold text-white flex items-center">
                <Crown className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Current Subscription
              </h3>
            </div>
            <div className="p-4 sm:p-6">
              <div className="text-center mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{userData.subscriptionName}</h4>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getStatusBadge(userData.subscriptionStatus.toLowerCase())}`}>
                  {userData.subscriptionStatus}
                </span>
              </div>
              
              <div className="space-y-2 sm:space-y-3">
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-gray-600">Status</span>
                  <span className="font-semibold text-green-600">Active</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-gray-600">Expires</span>
                  <span className="font-semibold">{userData.subscriptionExpiry}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-gray-600">Renewal</span>
                  <span className="font-semibold text-blue-600">Auto-renew</span>
                </div>
              </div>
              
              <button className="w-full mt-4 sm:mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-2 sm:py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors text-sm sm:text-base">
                Manage Subscription
              </button>
            </div>
          </div>

          
          <div className="lg:col-span-2 bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 sm:px-6 py-3 sm:py-4">
              <h3 className="text-lg sm:text-xl font-bold text-white flex items-center">
                <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Recent Activities
              </h3>
            </div>
            <div className="p-4 sm:p-6">
              <div className="space-y-3 sm:space-y-4">
                {recentActivities.map((activity) => (
                  <ActivityCard key={activity.id} activity={activity} />
                ))}
              </div>
              <button className="w-full mt-3 sm:mt-4 text-blue-600 font-semibold py-2 sm:py-3 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm sm:text-base">
                View All Activities
              </button>
            </div>
          </div>
        </div>

        
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-6 sm:mb-8">
          <div className="bg-gradient-to-r from-green-500 to-blue-600 px-4 sm:px-8 py-4 sm:py-6">
            <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center">
              <ClipboardList className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
              Status Information
            </h3>
            <p className="text-green-100 mt-1 text-sm sm:text-base">Current status of your account and services</p>
          </div>
          
          <div className="p-4 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {statusInfo.map((status, index) => {
                const StatusIcon = status.icon;
                return (
                  <div key={index} className={`p-4 sm:p-6 rounded-xl border-2 ${getStatusColor(status.color)}`}>
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                        <StatusIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 space-y-1 sm:space-y-0">
                          <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{status.category}</h4>
                          <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-bold self-start ${
                            status.color === 'green' ? 'bg-green-600 text-white' :
                            status.color === 'blue' ? 'bg-blue-600 text-white' :
                            'bg-gray-600 text-white'
                          }`}>
                            {status.status}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600">{status.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 p-4 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
            <Zap className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
            Quick Actions
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <button className="p-3 sm:p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors group">
              <div className="mb-2 flex justify-center">
                <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
              </div>
              <p className="font-semibold text-gray-900 group-hover:text-blue-600 text-xs sm:text-sm">Add Funds</p>
            </button>
            
            <button className="p-3 sm:p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors group">
              <div className="mb-2 flex justify-center">
                <Package className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
              </div>
              <p className="font-semibold text-gray-900 group-hover:text-green-600 text-xs sm:text-sm">Create Order</p>
            </button>
            
            <button className="p-3 sm:p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors group">
              <div className="mb-2 flex justify-center">
                <TrendingDown className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
              </div>
              <p className="font-semibold text-gray-900 group-hover:text-blue-600 text-xs sm:text-sm">Withdraw</p>
            </button>
            
            <button className="p-3 sm:p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors group">
              <div className="mb-2 flex justify-center">
                <Phone className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" />
              </div>
              <p className="font-semibold text-gray-900 group-hover:text-orange-600 text-xs sm:text-sm">Support</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;