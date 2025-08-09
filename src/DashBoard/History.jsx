import React, { useState } from 'react';
import {
  BarChart3,
  DollarSign,
  TrendingDown,
  Package,
  Mail,
  Crown,
  Users,
  FileText,
  CheckCircle,
  Circle,
  Clock,
  Timer,
  XCircle,
  Edit,
  ClipboardList,
  Search,
  TrendingUp,
  Calendar,
  CreditCard,
  User,
  Target,
  MapPin
} from 'lucide-react';
import Headline from '../HeadLine/Headline';

const History = () => {
  const [activeTab, setActiveTab] = useState('deposit');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');


  const depositHistory = [
    {
      id: 'DEP-2024-001',
      amount: 500.00,
      method: 'Bank Transfer',
      status: 'Completed',
      date: '2024-01-28 14:30:25',
      transactionId: 'TXN123456789',
      fee: 5.00
    },
    {
      id: 'DEP-2024-002',
      amount: 250.75,
      method: 'PayPal',
      status: 'Pending',
      date: '2024-01-27 16:20:10',
      transactionId: 'TXN987654321',
      fee: 2.50
    },
    {
      id: 'DEP-2024-003',
      amount: 1000.00,
      method: 'Credit Card',
      status: 'Completed',
      date: '2024-01-26 09:15:45',
      transactionId: 'TXN456789123',
      fee: 10.00
    }
  ];

  const withdrawalHistory = [
    {
      id: 'WITH-2024-001',
      amount: 300.00,
      method: 'Bank Transfer',
      status: 'Processing',
      date: '2024-01-28 12:45:30',
      transactionId: 'WTH789123456',
      fee: 15.00
    },
    {
      id: 'WITH-2024-002',
      amount: 150.50,
      method: 'PayPal',
      status: 'Completed',
      date: '2024-01-25 18:20:15',
      transactionId: 'WTH456789123',
      fee: 7.50
    }
  ];

  const orderHistory = [
    {
      id: 'ORD-2024-001',
      title: 'Premium Electronics Showcase',
      amount: 299.99,
      status: 'Completed',
      date: '2024-01-28 14:30:25',
      duration: '7 days',
      views: 15420,
      clicks: 1250
    },
    {
      id: 'ORD-2024-002',
      title: 'Fashion Week Collection',
      amount: 599.50,
      status: 'Active',
      date: '2024-01-27 09:15:10',
      duration: '14 days',
      views: 8930,
      clicks: 720
    }
  ];

  const receiveOrderHistory = [
    {
      id: 'RECV-2024-001',
      customerName: 'John Smith',
      title: 'Tech Gadgets Showcase',
      amount: 450.00,
      status: 'Accepted',
      date: '2024-01-28 16:45:30',
      commission: 67.50
    },
    {
      id: 'RECV-2024-002',
      customerName: 'Sarah Johnson',
      title: 'Beauty Products Display',
      amount: 320.75,
      status: 'Pending',
      date: '2024-01-27 14:20:15',
      commission: 48.11
    }
  ];

  const subscriptionHistory = [
    {
      id: 'SUB-2024-001',
      packageName: 'Professional Package',
      amount: 299.00,
      status: 'Active',
      startDate: '2024-01-01',
      endDate: '2024-01-31',
      renewalDate: '2024-02-01'
    },
    {
      id: 'SUB-2024-002',
      packageName: 'Starter Package',
      amount: 99.00,
      status: 'Expired',
      startDate: '2023-12-01',
      endDate: '2023-12-31',
      renewalDate: 'N/A'
    }
  ];

  const referralHistory = [
    {
      id: 'REF-2024-001',
      referredUser: 'Mike Davis',
      packagePurchased: 'Professional Package',
      commission: 85.50,
      level: 'Direct',
      status: 'Paid',
      date: '2024-01-25 10:30:15'
    },
    {
      id: 'REF-2024-002',
      referredUser: 'Emily Wilson',
      packagePurchased: 'Enterprise Package',
      commission: 125.75,
      level: '2nd Level',
      status: 'Pending',
      date: '2024-01-23 14:45:20'
    }
  ];

  const postHistory = [
    {
      id: 'POST-2024-001',
      title: 'Premium Electronics Showcase',
      category: 'Electronics',
      amount: 299.99,
      status: 'Active',
      date: '2024-01-28 14:30:25',
      views: 15420,
      clicks: 1250,
      zone: 'North America'
    },
    {
      id: 'POST-2024-002',
      title: 'Fashion Week Collection',
      category: 'Fashion',
      amount: 599.50,
      status: 'Draft',
      date: '2024-01-27 09:15:10',
      views: 0,
      clicks: 0,
      zone: 'Europe'
    }
  ];

  const tabs = [
    { key: 'deposit', label: 'Deposit', shortLabel: 'Deposit', icon: DollarSign },
    { key: 'withdrawal', label: 'Withdrawal', shortLabel: 'Withdrawal', icon: TrendingDown },
    { key: 'order', label: 'Orders', shortLabel: 'Orders', icon: Package },
    { key: 'receive', label: 'Received', shortLabel: 'Received', icon: Mail },
    { key: 'subscription', label: 'Subscriptions', shortLabel: 'Subs', icon: Crown },
    { key: 'referral', label: 'Referrals', shortLabel: 'Referrals', icon: Users },
    { key: 'post', label: 'Posts', shortLabel: 'Posts', icon: FileText }
  ];

  const getStatusBadge = (status) => {
    const statusStyles = {
      'Completed': 'bg-green-100 text-green-800 border-green-200',
      'Active': 'bg-blue-100 text-blue-800 border-blue-200',
      'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Processing': 'bg-orange-100 text-orange-800 border-orange-200',
      'Accepted': 'bg-green-100 text-green-800 border-green-200',
      'Rejected': 'bg-red-100 text-red-800 border-red-200',
      'Paid': 'bg-green-100 text-green-800 border-green-200',
      'Draft': 'bg-gray-100 text-gray-800 border-gray-200',
      'Expired': 'bg-red-100 text-red-800 border-red-200',
      'Failed': 'bg-red-100 text-red-800 border-red-200'
    };
    
    const icons = {
      'Completed': <CheckCircle className="w-3 h-3" />,
      'Active': <Circle className="w-3 h-3 fill-current" />,
      'Pending': <Clock className="w-3 h-3" />,
      'Processing': <Timer className="w-3 h-3" />,
      'Accepted': <CheckCircle className="w-3 h-3" />,
      'Rejected': <XCircle className="w-3 h-3" />,
      'Paid': <DollarSign className="w-3 h-3" />,
      'Draft': <Edit className="w-3 h-3" />,
      'Expired': <Clock className="w-3 h-3" />,
      'Failed': <XCircle className="w-3 h-3" />
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${statusStyles[status] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
        <span className="mr-1">{icons[status]}</span>
        {status}
      </span>
    );
  };

  const getCurrentData = () => {
    switch (activeTab) {
      case 'deposit': return depositHistory;
      case 'withdrawal': return withdrawalHistory;
      case 'order': return orderHistory;
      case 'receive': return receiveOrderHistory;
      case 'subscription': return subscriptionHistory;
      case 'referral': return referralHistory;
      case 'post': return postHistory;
      default: return [];
    }
  };

  const getFilteredData = () => {
    const data = getCurrentData();
    return data.filter(item => {
      const matchesSearch = Object.values(item).some(value => 
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
      

      const matchesDate = dateFilter === 'all' || 
        (dateFilter === 'today' && item.date?.includes('2024-01-28')) ||
        (dateFilter === 'week' && item.date?.includes('2024-01'));
      
      return matchesSearch && matchesDate;
    });
  };


  const DepositWithdrawalCard = ({ item, isWithdrawal = false }) => (
    <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="font-mono text-sm font-medium text-gray-900">{item.id}</div>
          <div className="flex items-center text-sm text-gray-600 mt-1">
            <CreditCard className="w-3 h-3 mr-1" />
            <span>{item.method}</span>
          </div>
        </div>
        <div className="ml-2">{getStatusBadge(item.status)}</div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="space-y-1">
          <div className="text-gray-500">Amount</div>
          <div className={`font-semibold ${isWithdrawal ? 'text-red-600' : 'text-green-600'}`}>
            ${item.amount.toFixed(2)}
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-gray-500">Fee</div>
          <div className="text-orange-600">${item.fee.toFixed(2)}</div>
        </div>
      </div>
      
      <div className="pt-2 border-t border-gray-100 space-y-1">
        <div className="flex items-center text-xs text-gray-500">
          <Calendar className="w-3 h-3 mr-1" />
          {item.date}
        </div>
        <div className="font-mono text-xs text-gray-600">
          {item.transactionId}
        </div>
      </div>
    </div>
  );

  const OrderCard = ({ item }) => (
    <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="font-mono text-sm font-medium text-gray-900">{item.id}</div>
          <div className="text-sm font-medium text-gray-900 mt-1 line-clamp-2">{item.title}</div>
        </div>
        <div className="ml-2">{getStatusBadge(item.status)}</div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="space-y-1">
          <div className="text-gray-500">Amount</div>
          <div className="font-semibold text-green-600">${item.amount.toFixed(2)}</div>
        </div>
        <div className="space-y-1">
          <div className="text-gray-500">Duration</div>
          <div className="text-gray-900">{item.duration}</div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="space-y-1">
          <div className="text-gray-500">Views</div>
          <div className="text-blue-600">{item.views?.toLocaleString()}</div>
        </div>
        <div className="space-y-1">
          <div className="text-gray-500">Clicks</div>
          <div className="text-blue-600">{item.clicks?.toLocaleString()}</div>
        </div>
      </div>
      
      <div className="pt-2 border-t border-gray-100">
        <div className="flex items-center text-xs text-gray-500">
          <Calendar className="w-3 h-3 mr-1" />
          {item.date}
        </div>
      </div>
    </div>
  );

  const ReceiveOrderCard = ({ item }) => (
    <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="font-mono text-sm font-medium text-gray-900">{item.id}</div>
          <div className="flex items-center text-sm text-gray-600 mt-1">
            <User className="w-3 h-3 mr-1" />
            <span>{item.customerName}</span>
          </div>
          <div className="text-sm font-medium text-gray-900 mt-1 line-clamp-2">{item.title}</div>
        </div>
        <div className="ml-2">{getStatusBadge(item.status)}</div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="space-y-1">
          <div className="text-gray-500">Amount</div>
          <div className="font-semibold text-green-600">${item.amount.toFixed(2)}</div>
        </div>
        <div className="space-y-1">
          <div className="text-gray-500">Commission</div>
          <div className="font-semibold text-blue-600">${item.commission.toFixed(2)}</div>
        </div>
      </div>
      
      <div className="pt-2 border-t border-gray-100">
        <div className="flex items-center text-xs text-gray-500">
          <Calendar className="w-3 h-3 mr-1" />
          {item.date}
        </div>
      </div>
    </div>
  );

  const SubscriptionCard = ({ item }) => (
    <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="font-mono text-sm font-medium text-gray-900">{item.id}</div>
          <div className="text-sm font-medium text-gray-900 mt-1">{item.packageName}</div>
        </div>
        <div className="ml-2">{getStatusBadge(item.status)}</div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="space-y-1">
          <div className="text-gray-500">Amount</div>
          <div className="font-semibold text-green-600">${item.amount.toFixed(2)}</div>
        </div>
        <div className="space-y-1">
          <div className="text-gray-500">Period</div>
          <div className="text-gray-900">{item.startDate} to {item.endDate}</div>
        </div>
      </div>
      
      <div className="pt-2 border-t border-gray-100">
        <div className="text-xs text-gray-500">
          <span className="font-medium">Renewal:</span> {item.renewalDate}
        </div>
      </div>
    </div>
  );

  const ReferralCard = ({ item }) => (
    <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="font-mono text-sm font-medium text-gray-900">{item.id}</div>
          <div className="flex items-center text-sm text-gray-600 mt-1">
            <User className="w-3 h-3 mr-1" />
            <span>{item.referredUser}</span>
          </div>
          <div className="text-sm text-gray-600 mt-1">{item.packagePurchased}</div>
        </div>
        <div className="ml-2 flex flex-col space-y-1">
          {getStatusBadge(item.status)}
          <span className={`px-2 py-1 rounded text-xs ${
            item.level === 'Direct' ? 'bg-blue-100 text-blue-800' :
            item.level === '2nd Level' ? 'bg-blue-100 text-blue-800' :
            'bg-indigo-100 text-indigo-800'
          }`}>
            {item.level}
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-3 text-sm">
        <div className="space-y-1">
          <div className="text-gray-500">Commission</div>
          <div className="font-semibold text-green-600">${item.commission.toFixed(2)}</div>
        </div>
      </div>
      
      <div className="pt-2 border-t border-gray-100">
        <div className="flex items-center text-xs text-gray-500">
          <Calendar className="w-3 h-3 mr-1" />
          {item.date}
        </div>
      </div>
    </div>
  );

  const PostCard = ({ item }) => (
    <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="font-mono text-sm font-medium text-gray-900">{item.id}</div>
          <div className="text-sm font-medium text-gray-900 mt-1 line-clamp-2">{item.title}</div>
          <div className="text-sm text-gray-600 mt-1">{item.category}</div>
        </div>
        <div className="ml-2">{getStatusBadge(item.status)}</div>
      </div>
      
      <div className="flex items-center text-sm text-gray-600">
        <MapPin className="w-3 h-3 mr-1" />
        <span>{item.zone}</span>
      </div>
      
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="space-y-1">
          <div className="text-gray-500">Amount</div>
          <div className="font-semibold text-green-600">${item.amount.toFixed(2)}</div>
        </div>
        <div className="space-y-1">
          <div className="text-gray-500">Views</div>
          <div className="text-blue-600">{item.views?.toLocaleString()}</div>
        </div>
      </div>
      
      <div className="pt-2 border-t border-gray-100">
        <div className="flex items-center text-xs text-gray-500">
          <Calendar className="w-3 h-3 mr-1" />
          {item.date}
        </div>
      </div>
    </div>
  );


  const renderMobileCards = () => {
    const data = getFilteredData();
    
    if (data.length === 0) {
      return (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ClipboardList className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-base font-medium text-gray-900 mb-2">No records found</h3>
          <p className="text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {data.map((item) => {
          switch (activeTab) {
            case 'deposit':
              return <DepositWithdrawalCard key={item.id} item={item} />;
            case 'withdrawal':
              return <DepositWithdrawalCard key={item.id} item={item} isWithdrawal={true} />;
            case 'order':
              return <OrderCard key={item.id} item={item} />;
            case 'receive':
              return <ReceiveOrderCard key={item.id} item={item} />;
            case 'subscription':
              return <SubscriptionCard key={item.id} item={item} />;
            case 'referral':
              return <ReferralCard key={item.id} item={item} />;
            case 'post':
              return <PostCard key={item.id} item={item} />;
            default:
              return null;
          }
        })}
      </div>
    );
  };


  const renderTableContent = () => {
    const data = getFilteredData();
    
    if (data.length === 0) {
      return (
        <tr>
          <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
            <div className="flex justify-center mb-2">
              <ClipboardList className="w-12 h-12 text-gray-400" />
            </div>
            <p>No records found</p>
          </td>
        </tr>
      );
    }

    switch (activeTab) {
      case 'deposit':
        return data.map((item) => (
          <tr key={item.id} className="hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4 whitespace-nowrap font-mono text-sm">{item.id}</td>
            <td className="px-6 py-4 whitespace-nowrap font-semibold text-green-600">${item.amount.toFixed(2)}</td>
            <td className="px-6 py-4 whitespace-nowrap">{item.method}</td>
            <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(item.status)}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
            <td className="px-6 py-4 whitespace-nowrap font-mono text-sm">{item.transactionId}</td>
            <td className="px-6 py-4 whitespace-nowrap text-red-600">${item.fee.toFixed(2)}</td>
          </tr>
        ));
      
      case 'withdrawal':
        return data.map((item) => (
          <tr key={item.id} className="hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4 whitespace-nowrap font-mono text-sm">{item.id}</td>
            <td className="px-6 py-4 whitespace-nowrap font-semibold text-red-600">${item.amount.toFixed(2)}</td>
            <td className="px-6 py-4 whitespace-nowrap">{item.method}</td>
            <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(item.status)}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
            <td className="px-6 py-4 whitespace-nowrap font-mono text-sm">{item.transactionId}</td>
            <td className="px-6 py-4 whitespace-nowrap text-orange-600">${item.fee.toFixed(2)}</td>
          </tr>
        ));

      case 'order':
        return data.map((item) => (
          <tr key={item.id} className="hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4 whitespace-nowrap font-mono text-sm">{item.id}</td>
            <td className="px-6 py-4 max-w-xs truncate">{item.title}</td>
            <td className="px-6 py-4 whitespace-nowrap font-semibold text-green-600">${item.amount.toFixed(2)}</td>
            <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(item.status)}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">{item.duration}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">{item.views?.toLocaleString()}</td>
          </tr>
        ));

      case 'receive':
        return data.map((item) => (
          <tr key={item.id} className="hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4 whitespace-nowrap font-mono text-sm">{item.id}</td>
            <td className="px-6 py-4 whitespace-nowrap">{item.customerName}</td>
            <td className="px-6 py-4 max-w-xs truncate">{item.title}</td>
            <td className="px-6 py-4 whitespace-nowrap font-semibold text-green-600">${item.amount.toFixed(2)}</td>
            <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(item.status)}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
            <td className="px-6 py-4 whitespace-nowrap font-semibold text-blue-600">${item.commission.toFixed(2)}</td>
          </tr>
        ));

      case 'subscription':
        return data.map((item) => (
          <tr key={item.id} className="hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4 whitespace-nowrap font-mono text-sm">{item.id}</td>
            <td className="px-6 py-4 whitespace-nowrap font-medium">{item.packageName}</td>
            <td className="px-6 py-4 whitespace-nowrap font-semibold text-green-600">${item.amount.toFixed(2)}</td>
            <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(item.status)}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.startDate}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.endDate}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">{item.renewalDate}</td>
          </tr>
        ));

      case 'referral':
        return data.map((item) => (
          <tr key={item.id} className="hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4 whitespace-nowrap font-mono text-sm">{item.id}</td>
            <td className="px-6 py-4 whitespace-nowrap">{item.referredUser}</td>
            <td className="px-6 py-4 whitespace-nowrap">{item.packagePurchased}</td>
            <td className="px-6 py-4 whitespace-nowrap font-semibold text-green-600">${item.commission.toFixed(2)}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className={`px-2 py-1 rounded text-xs ${
                item.level === 'Direct' ? 'bg-blue-100 text-blue-800' :
                item.level === '2nd Level' ? 'bg-blue-100 text-blue-800' :
                'bg-indigo-100 text-indigo-800'
              }`}>
                {item.level}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(item.status)}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
          </tr>
        ));

      case 'post':
        return data.map((item) => (
          <tr key={item.id} className="hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4 whitespace-nowrap font-mono text-sm">{item.id}</td>
            <td className="px-6 py-4 max-w-xs truncate">{item.title}</td>
            <td className="px-6 py-4 whitespace-nowrap">{item.category}</td>
            <td className="px-6 py-4 whitespace-nowrap font-semibold text-green-600">${item.amount.toFixed(2)}</td>
            <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(item.status)}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">{item.views?.toLocaleString()}</td>
          </tr>
        ));

      default:
        return null;
    }
  };

  const getTableHeaders = () => {
    switch (activeTab) {
      case 'deposit':
      case 'withdrawal':
        return ['ID', 'Amount', 'Method', 'Status', 'Date', 'Transaction ID', 'Fee'];
      case 'order':
        return ['Order ID', 'Title', 'Amount', 'Status', 'Date', 'Duration', 'Views'];
      case 'receive':
        return ['ID', 'Customer', 'Title', 'Amount', 'Status', 'Date', 'Commission'];
      case 'subscription':
        return ['ID', 'Package', 'Amount', 'Status', 'Start Date', 'End Date', 'Renewal'];
      case 'referral':
        return ['ID', 'Referred User', 'Package', 'Commission', 'Level', 'Status', 'Date'];
      case 'post':
        return ['Post ID', 'Title', 'Category', 'Amount', 'Status', 'Date', 'Views'];
      default:
        return [];
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-4 sm:py-8">
      <Headline className='mb-10'  headlines={["Welcome to our amazing platform!"]} ></Headline>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full mb-4 sm:mb-6">
            <BarChart3 className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-4">History</h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Track all your activities, transactions, and business operations in one place
          </p>
        </div>

        
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 mb-6 sm:mb-8 overflow-hidden">
          <div className="overflow-x-auto">
            <div className="flex min-w-max">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center space-x-2 px-4 sm:px-6 py-3 sm:py-4 font-medium transition-all duration-200 whitespace-nowrap text-sm ${
                    activeTab === tab.key
                      ? 'bg-indigo-600 text-white border-b-2 border-indigo-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.shortLabel}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="space-y-4">
            
            <div className="relative">
              <input
                type="text"
                placeholder="Search records..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="w-4 h-4 text-gray-400" />
              </div>
            </div>
            
            
            <div className="flex flex-wrap gap-2">
              {['all', 'today', 'week', 'month'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setDateFilter(filter)}
                  className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm ${
                    dateFilter === filter
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-blue-600 px-4 sm:px-8 py-4 sm:py-6">
            <h2 className="text-lg sm:text-2xl font-bold text-white flex items-center space-x-2">
              {React.createElement(tabs.find(tab => tab.key === activeTab)?.icon, { className: "w-5 h-5 sm:w-6 sm:h-6" })}
              <span>{tabs.find(tab => tab.key === activeTab)?.label}</span>
              <span className="bg-white bg-opacity-20 text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full">
                {getFilteredData().length} records
              </span>
            </h2>
          </div>

          
          <div className="block lg:hidden p-4">
            {renderMobileCards()}
          </div>

          
          <div className="hidden lg:block overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  {getTableHeaders().map((header) => (
                    <th key={header} className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {renderTableContent()}
              </tbody>
            </table>
          </div>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="mb-2 sm:mb-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Total Records</p>
                <p className="text-2xl sm:text-3xl font-bold text-indigo-600">{getCurrentData().length}</p>
              </div>
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-indigo-100 rounded-full flex items-center justify-center self-end sm:self-auto">
                <BarChart3 className="w-4 h-4 sm:w-6 sm:h-6 text-indigo-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="mb-2 sm:mb-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl sm:text-3xl font-bold text-green-600">
                  {getCurrentData().filter(item => item.date?.includes('2024-01')).length}
                </p>
              </div>
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center self-end sm:self-auto">
                <TrendingUp className="w-4 h-4 sm:w-6 sm:h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="mb-2 sm:mb-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600">Filtered Results</p>
                <p className="text-2xl sm:text-3xl font-bold text-blue-600">{getFilteredData().length}</p>
              </div>
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center self-end sm:self-auto">
                <Search className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;