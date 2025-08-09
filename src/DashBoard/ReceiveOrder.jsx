import React, { useState } from 'react';
import {
  Mail,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
  Trophy,
  DollarSign,
  Search,
  ClipboardList,
  Eye,
  X,
  User,
  Calendar,
  Activity
} from 'lucide-react';
import Headline from '../HeadLine/Headline';

const ReceiveOrder = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);


  const [orders, setOrders] = useState([
    {
      id: 'ORD-2024-101',
      postShow: 'Premium Electronics Showcase - Latest Smartphones',
      amount: 450.00,
      status: 'Pending',
      time: '2024-01-28 16:45:30',
      customerName: 'John Smith',
      customerEmail: 'john.smith@email.com',
      description: 'High-quality showcase for latest smartphone collection with detailed specifications and comparison charts.',
      duration: '14 days',
      targetAudience: 'Tech enthusiasts, age 25-45',
      requirements: 'Premium placement, mobile-optimized, include video content'
    },
    {
      id: 'ORD-2024-102',
      postShow: 'Fashion Week Collection - Designer Clothing',
      amount: 750.25,
      status: 'Pending',
      time: '2024-01-28 14:20:15',
      customerName: 'Sarah Johnson',
      customerEmail: 'sarah.j@email.com',
      description: 'Exclusive fashion showcase featuring designer clothing and accessories for the upcoming season.',
      duration: '21 days',
      targetAudience: 'Fashion enthusiasts, women 20-40',
      requirements: 'High-resolution images, lifestyle photography, social media integration'
    },
    {
      id: 'ORD-2024-103',
      postShow: 'Home Improvement Tools & Equipment',
      amount: 320.50,
      status: 'Accepted',
      time: '2024-01-28 11:30:45',
      customerName: 'Mike Davis',
      customerEmail: 'mike.davis@email.com',
      description: 'Comprehensive showcase of professional-grade home improvement tools and equipment.',
      duration: '10 days',
      targetAudience: 'DIY enthusiasts, contractors',
      requirements: 'Product demonstrations, before/after examples'
    },
    {
      id: 'ORD-2024-104',
      postShow: 'Organic Beauty & Skincare Products',
      amount: 280.75,
      status: 'Rejected',
      time: '2024-01-28 09:15:20',
      customerName: 'Emily Wilson',
      customerEmail: 'emily.w@email.com',
      description: 'Natural and organic beauty products with focus on sustainable packaging and ingredients.',
      duration: '7 days',
      targetAudience: 'Health-conscious women, age 25-50',
      requirements: 'Ingredient highlighting, sustainability focus, before/after results'
    },
    {
      id: 'ORD-2024-105',
      postShow: 'Fitness Equipment & Supplements',
      amount: 520.00,
      status: 'Pending',
      time: '2024-01-27 18:45:10',
      customerName: 'David Brown',
      customerEmail: 'david.brown@email.com',
      description: 'Complete fitness solution showcase including equipment, supplements, and workout programs.',
      duration: '18 days',
      targetAudience: 'Fitness enthusiasts, gym goers',
      requirements: 'Workout demonstrations, progress tracking features, testimonials'
    },
    {
      id: 'ORD-2024-106',
      postShow: 'Gourmet Food & Recipe Collection',
      amount: 190.30,
      status: 'Accepted',
      time: '2024-01-27 15:20:35',
      customerName: 'Lisa Chen',
      customerEmail: 'lisa.chen@email.com',
      description: 'Premium gourmet food products with accompanying recipe collections and cooking tips.',
      duration: '12 days',
      targetAudience: 'Food lovers, home cooks',
      requirements: 'High-quality food photography, recipe videos, ingredient sourcing info'
    },
    {
      id: 'ORD-2024-107',
      postShow: 'Educational Courses & Learning Materials',
      amount: 380.99,
      status: 'Pending',
      time: '2024-01-27 12:10:25',
      customerName: 'Robert Taylor',
      customerEmail: 'robert.taylor@email.com',
      description: 'Online educational platform showcase featuring various courses and learning materials.',
      duration: '15 days',
      targetAudience: 'Students, professionals seeking skill development',
      requirements: 'Course previews, instructor profiles, student testimonials'
    },
    {
      id: 'ORD-2024-108',
      postShow: 'Travel & Adventure Packages',
      amount: 680.45,
      status: 'Rejected',
      time: '2024-01-27 08:30:15',
      customerName: 'Amanda Rodriguez',
      customerEmail: 'amanda.r@email.com',
      description: 'Exotic travel destinations and adventure packages with detailed itineraries and pricing.',
      duration: '25 days',
      targetAudience: 'Travel enthusiasts, adventure seekers',
      requirements: 'Destination videos, interactive maps, customer reviews'
    }
  ]);

  const getStatusBadge = (status) => {
    const statusStyles = {
      'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Accepted': 'bg-green-100 text-green-800 border-green-200',
      'Rejected': 'bg-red-100 text-red-800 border-red-200',
      'In Progress': 'bg-blue-100 text-blue-800 border-blue-200',
      'Completed': 'bg-purple-100 text-purple-800 border-purple-200'
    };
    
    const icons = {
      'Pending': <Clock className="w-3 h-3" />,
      'Accepted': <CheckCircle className="w-3 h-3" />,
      'Rejected': <XCircle className="w-3 h-3" />,
      'In Progress': <RefreshCw className="w-3 h-3" />,
      'Completed': <Trophy className="w-3 h-3" />
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${statusStyles[status] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
        <span className="mr-1">{icons[status]}</span>
        {status}
      </span>
    );
  };

  const handleOrderAction = async (orderId, action) => {
    setIsProcessing(true);
    

    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, status: action === 'accept' ? 'Accepted' : 'Rejected' }
          : order
      )
    );
    
    setIsProcessing(false);
    setSelectedOrder(null);
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === 'all' || order.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         order.postShow.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const pendingOrders = orders.filter(order => order.status === 'Pending').length;
  const acceptedOrders = orders.filter(order => order.status === 'Accepted').length;
  const rejectedOrders = orders.filter(order => order.status === 'Rejected').length;
  const totalRevenue = orders.filter(order => order.status === 'Accepted').reduce((sum, order) => sum + order.amount, 0);


  const OrderCard = ({ order }) => (
    <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="font-mono text-sm font-medium text-gray-900">{order.id}</div>
          <div className="text-sm text-gray-600 mt-1 line-clamp-2">{order.postShow}</div>
        </div>
        <div className="ml-2">{getStatusBadge(order.status)}</div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center text-sm text-gray-600">
          <User className="w-3 h-3 mr-1" />
          <span className="font-medium">{order.customerName}</span>
        </div>
        <div className="text-xs text-gray-500">{order.customerEmail}</div>
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
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedOrder(order)}
              className="inline-flex items-center px-3 py-1.5 rounded-md text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors duration-150"
            >
              <Eye className="mr-1 w-3 h-3" />
              View
            </button>
            {order.status === 'Pending' && (
              <>
                <button
                  onClick={() => handleOrderAction(order.id, 'accept')}
                  disabled={isProcessing}
                  className="inline-flex items-center px-2 py-1.5 rounded-md text-xs font-medium bg-green-100 text-green-800 hover:bg-green-200 transition-colors duration-150 disabled:opacity-50"
                >
                  <CheckCircle className="w-3 h-3" />
                </button>
                <button
                  onClick={() => handleOrderAction(order.id, 'reject')}
                  disabled={isProcessing}
                  className="inline-flex items-center px-2 py-1.5 rounded-md text-xs font-medium bg-red-100 text-red-800 hover:bg-red-200 transition-colors duration-150 disabled:opacity-50"
                >
                  <XCircle className="w-3 h-3" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-4 sm:py-8">
      <Headline className='mb-10'  headlines={["Welcome to our amazing platform!"]} ></Headline>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-4 sm:mb-6">
            <Mail className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-4">Receive Orders</h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Manage incoming orders and approve or reject post showcase requests
          </p>
        </div>

        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-6 border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="mb-2 sm:mb-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Pending</p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-yellow-600">{pendingOrders}</p>
              </div>
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-yellow-100 rounded-full flex items-center justify-center self-end sm:self-auto">
                <Clock className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-6 border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="mb-2 sm:mb-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Accepted</p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600">{acceptedOrders}</p>
              </div>
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center self-end sm:self-auto">
                <CheckCircle className="w-4 h-4 sm:w-6 sm:h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-6 border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="mb-2 sm:mb-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-red-600">{rejectedOrders}</p>
              </div>
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-red-100 rounded-full flex items-center justify-center self-end sm:self-auto">
                <XCircle className="w-4 h-4 sm:w-6 sm:h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-6 border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="mb-2 sm:mb-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600">${totalRevenue.toFixed(2)}</p>
              </div>
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center self-end sm:self-auto">
                <DollarSign className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
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
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="w-4 h-4 text-gray-400" />
              </div>
            </div>
            
            
            <div className="flex flex-wrap gap-2">
              {['all', 'pending', 'accepted', 'rejected'].map((status) => (
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
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-4 sm:px-8 py-4 sm:py-6">
            <h2 className="text-lg sm:text-2xl font-bold text-white flex items-center space-x-2">
              <ClipboardList className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>Incoming Orders</span>
              <span className="bg-white bg-opacity-20 text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full">
                {filteredOrders.length} orders
              </span>
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
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                        <div className="text-sm text-gray-500">{order.customerEmail}</div>
                      </div>
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
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors duration-150"
                        >
                          <Eye className="mr-1 w-3 h-3" />
                          View
                        </button>
                        {order.status === 'Pending' && (
                          <>
                            <button
                              onClick={() => handleOrderAction(order.id, 'accept')}
                              disabled={isProcessing}
                              className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-green-100 text-green-800 hover:bg-green-200 transition-colors duration-150 disabled:opacity-50"
                            >
                              <CheckCircle className="mr-1 w-3 h-3" />
                              Accept
                            </button>
                            <button
                              onClick={() => handleOrderAction(order.id, 'reject')}
                              disabled={isProcessing}
                              className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-red-100 text-red-800 hover:bg-red-200 transition-colors duration-150 disabled:opacity-50"
                            >
                              <XCircle className="mr-1 w-3 h-3" />
                              Reject
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-8 sm:py-12">
              <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400" />
              </div>
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No orders found</h3>
              <p className="text-sm sm:text-base text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </div>

      
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-3xl max-h-screen overflow-y-auto">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-4 sm:px-8 py-4 sm:py-6 rounded-t-2xl sm:rounded-t-3xl">
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

              
              <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                <h4 className="font-semibold text-gray-900 mb-4 text-sm sm:text-base">Customer Information</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <p className="text-sm sm:text-base text-gray-900">{selectedOrder.customerName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <p className="text-sm sm:text-base text-gray-900">{selectedOrder.customerEmail}</p>
                  </div>
                </div>
              </div>

              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Post Show Details</label>
                <div className="bg-blue-50 rounded-xl p-4 sm:p-6">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">{selectedOrder.postShow}</h4>
                  <p className="text-gray-600 mb-4 text-sm">{selectedOrder.description}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Duration:</span>
                      <span className="ml-2 text-gray-600">{selectedOrder.duration}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Target Audience:</span>
                      <span className="ml-2 text-gray-600">{selectedOrder.targetAudience}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <span className="font-medium text-gray-700">Requirements:</span>
                    <p className="text-gray-600 mt-1 text-sm">{selectedOrder.requirements}</p>
                  </div>
                </div>
              </div>

              
              {selectedOrder.status === 'Pending' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-4">
                  <button
                    onClick={() => handleOrderAction(selectedOrder.id, 'accept')}
                    disabled={isProcessing}
                    className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-xl transition-colors duration-200 disabled:cursor-not-allowed text-sm sm:text-base"
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Processing...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <CheckCircle className="w-4 h-4" />
                        <span>Accept Order</span>
                      </div>
                    )}
                  </button>
                  <button
                    onClick={() => handleOrderAction(selectedOrder.id, 'reject')}
                    disabled={isProcessing}
                    className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-xl transition-colors duration-200 disabled:cursor-not-allowed text-sm sm:text-base"
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Processing...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <XCircle className="w-4 h-4" />
                        <span>Reject Order</span>
                      </div>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReceiveOrder;