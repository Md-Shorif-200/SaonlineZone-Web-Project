import React, { useState } from 'react';
import {
  DollarSign,
  CheckCircle,
  Clock,
  XCircle,
  Undo,
  Search,
  Eye,
  Package,
  X,
  FileText,
  Phone,
  RefreshCw,
  BarChart,
  Calendar,
  Activity
} from 'lucide-react';
import Headline from '../HeadLine/Headline';

const MyOrders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');


  const orders = [
    {
      id: 'ORD-2024-001',
      postShow: 'Premium Product Showcase - Electronics Collection',
      amount: 299.99,
      status: 'Completed',
      time: '2024-01-28 14:30:25',
      description: 'Featured post showing latest smartphone collection with detailed specifications and pricing.',
      duration: '7 days',
      views: 15420,
      clicks: 1250,
      conversions: 45
    },
    {
      id: 'ORD-2024-002',
      postShow: 'Fashion Week Special - Designer Clothing',
      amount: 599.50,
      status: 'Processing',
      time: '2024-01-27 09:15:10',
      description: 'Exclusive fashion week showcase featuring designer clothing and accessories.',
      duration: '14 days',
      views: 8930,
      clicks: 720,
      conversions: 28
    },
    {
      id: 'ORD-2024-003',
      postShow: 'Home & Garden Essentials',
      amount: 149.75,
      status: 'Pending',
      time: '2024-01-26 16:45:30',
      description: 'Comprehensive showcase of home improvement and gardening products.',
      duration: '5 days',
      views: 0,
      clicks: 0,
      conversions: 0
    },
    {
      id: 'ORD-2024-004',
      postShow: 'Tech Gadgets & Accessories',
      amount: 399.25,
      status: 'Completed',
      time: '2024-01-25 11:20:45',
      description: 'Latest tech gadgets, accessories, and innovative electronic devices.',
      duration: '10 days',
      views: 22100,
      clicks: 1850,
      conversions: 67
    },
    {
      id: 'ORD-2024-005',
      postShow: 'Fitness & Wellness Products',
      amount: 199.99,
      status: 'Cancelled',
      time: '2024-01-24 08:30:15',
      description: 'Health and fitness equipment, supplements, and wellness products.',
      duration: '7 days',
      views: 0,
      clicks: 0,
      conversions: 0
    },
    {
      id: 'ORD-2024-006',
      postShow: 'Beauty & Skincare Collection',
      amount: 89.99,
      status: 'Processing',
      time: '2024-01-23 13:10:20',
      description: 'Premium beauty products and skincare solutions for all skin types.',
      duration: '3 days',
      views: 5240,
      clicks: 420,
      conversions: 12
    },
    {
      id: 'ORD-2024-007',
      postShow: 'Automotive Parts & Services',
      amount: 750.00,
      status: 'Completed',
      time: '2024-01-22 10:45:55',
      description: 'Car parts, accessories, and automotive service packages.',
      duration: '21 days',
      views: 18900,
      clicks: 980,
      conversions: 35
    },
    {
      id: 'ORD-2024-008',
      postShow: 'Books & Educational Materials',
      amount: 79.50,
      status: 'Processing',
      time: '2024-01-21 15:25:40',
      description: 'Educational books, online courses, and learning materials.',
      duration: '7 days',
      views: 3200,
      clicks: 285,
      conversions: 18
    }
  ];

  const getStatusBadge = (status) => {
    const statusStyles = {
      'Completed': 'bg-green-100 text-green-800 border-green-200',
      'Processing': 'bg-blue-100 text-blue-800 border-blue-200',
      'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Cancelled': 'bg-red-100 text-red-800 border-red-200',
      'Refunded': 'bg-gray-100 text-gray-800 border-gray-200'
    };

    const icons = {
      'Completed': <CheckCircle className="w-3 h-3" />,
      'Processing': <Clock className="w-3 h-3" />,
      'Pending': <Clock className="w-3 h-3" />,
      'Cancelled': <XCircle className="w-3 h-3" />,
      'Refunded': <Undo className="w-3 h-3" />
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${statusStyles[status] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
        <span className="mr-1">{icons[status]}</span>
        {status}
      </span>
    );
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === 'all' || order.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         order.postShow.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalAmount = orders.reduce((sum, order) => sum + order.amount, 0);
  const completedOrders = orders.filter(order => order.status === 'Completed').length;
  const processingOrders = orders.filter(order => order.status === 'Processing').length;


  const OrderCard = ({ order }) => (
    <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="font-mono text-sm font-medium text-gray-900">{order.id}</div>
          <div className="text-sm text-gray-600 mt-1 line-clamp-2">{order.postShow}</div>
        </div>
        <div className="ml-2">{getStatusBadge(order.status)}</div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="space-y-1">
          <div className="text-gray-500">Amount</div>
          <div className="font-semibold text-green-600">${order.amount.toFixed(2)}</div>
        </div>
        <div className="space-y-1">
          <div className="text-gray-500">Duration</div>
          <div className="text-gray-900">{order.duration}</div>
        </div>
      </div>
      
      <div className="pt-2 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs text-gray-500">
            <Calendar className="w-3 h-3 mr-1" />
            {order.time}
          </div>
          <button
            onClick={() => setSelectedOrder(order)}
            className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-indigo-100 text-indigo-800 hover:bg-indigo-200 transition-colors duration-150"
          >
            <Eye className="mr-1 w-3 h-3" />
            View
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-4 sm:py-8">
      <Headline className='mb-10'  headlines={["Welcome to our amazing platform!"]} ></Headline>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-4">My Orders</h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Track and manage all your order history and post showcases
          </p>
        </div>

        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-6 border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="mb-2 sm:mb-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-indigo-600">{orders.length}</p>
              </div>
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-indigo-100 rounded-full flex items-center justify-center self-end sm:self-auto">
                <BarChart className="w-4 h-4 sm:w-6 sm:h-6 text-indigo-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-6 border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="mb-2 sm:mb-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Total Spent</p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600">${totalAmount.toFixed(2)}</p>
              </div>
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center self-end sm:self-auto">
                <DollarSign className="w-4 h-4 sm:w-6 sm:h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-6 border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="mb-2 sm:mb-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Completed</p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600">{completedOrders}</p>
              </div>
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center self-end sm:self-auto">
                <CheckCircle className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-6 border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="mb-2 sm:mb-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Processing</p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-orange-600">{processingOrders}</p>
              </div>
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-orange-100 rounded-full flex items-center justify-center self-end sm:self-auto">
                <Clock className="w-4 h-4 sm:w-6 sm:h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="space-y-4">
            
            <div className="relative">
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="w-4 h-4 text-gray-400" />
              </div>
            </div>
            
            
            <div className="flex flex-wrap gap-2">
              {['all', 'completed', 'processing', 'pending', 'cancelled'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm ${
                    filterStatus === status
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 sm:px-8 py-4 sm:py-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center space-x-2">  
              <span>Order History</span>
            </h2>
          </div>

          
          <div className="block lg:hidden p-4 space-y-4">
            {filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>

          
          <div className="hidden lg:block overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Post Show</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 font-mono">{order.id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs">
                        <div className="font-medium truncate">{order.postShow}</div>
                        <div className="text-gray-500 text-xs mt-1">Duration: {order.duration}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-green-600">${order.amount.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{order.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-indigo-100 text-indigo-800 hover:bg-indigo-200 transition-colors duration-150"
                      >
                        <Eye className="mr-1 w-3 h-3" />
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-8 sm:py-12">
              <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400" />
              </div>
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No orders found</h3>
              <p className="text-sm sm:text-base text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </div>

      
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-2xl max-h-screen overflow-y-auto">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-4 sm:px-8 py-4 sm:py-6 rounded-t-2xl sm:rounded-t-3xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xl sm:text-2xl font-bold text-white">Order Details</h3>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-white hover:text-gray-200 transition-colors p-1"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-8 space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Order ID</label>
                  <p className="text-base sm:text-lg font-mono font-semibold text-gray-900">{selectedOrder.id}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  {getStatusBadge(selectedOrder.status)}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                  <p className="text-base sm:text-lg font-semibold text-green-600">${selectedOrder.amount.toFixed(2)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Order Time</label>
                  <p className="text-sm sm:text-base text-gray-900">{selectedOrder.time}</p>
                </div>
              </div>

              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Post Show</label>
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">{selectedOrder.postShow}</h4>
                  <p className="text-gray-600 text-sm mb-3">{selectedOrder.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      Duration: {selectedOrder.duration}
                    </span>
                  </div>
                </div>
              </div>

              
              {selectedOrder.status === 'Completed' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Performance Metrics</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-blue-50 rounded-xl p-4 text-center">
                      <p className="text-xl sm:text-2xl font-bold text-blue-600">{selectedOrder.views.toLocaleString()}</p>
                      <p className="text-sm text-blue-700">Views</p>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4 text-center">
                      <p className="text-xl sm:text-2xl font-bold text-green-600">{selectedOrder.clicks.toLocaleString()}</p>
                      <p className="text-sm text-green-700">Clicks</p>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-4 text-center">
                      <p className="text-xl sm:text-2xl font-bold text-purple-600">{selectedOrder.conversions}</p>
                      <p className="text-sm text-purple-700">Conversions</p>
                    </div>
                  </div>
                </div>
              )}

              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-4">
                <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors text-sm">
                  <FileText className="w-4 h-4" />
                  <span>Download Invoice</span>
                </button>
                <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm">
                  <Phone className="w-4 h-4" />
                  <span>Contact Support</span>
                </button>
                {selectedOrder.status === 'Completed' && (
                  <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm sm:col-span-2 lg:col-span-1">
                    <RefreshCw className="w-4 h-4" />
                    <span>Reorder</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;