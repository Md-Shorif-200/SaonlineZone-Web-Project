import React, { useState } from 'react';
import {
  MessageCircle,
  Search,
  Star,
  Settings,
  ArrowLeft,
  ClipboardList,
  X,
  DollarSign,
  Send,
  Heart,
  Calendar
} from 'lucide-react';
import Headline from '../HeadLine/Headline';

const Inbox = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [message, setMessage] = useState('');
  const [showCreateDeal, setShowCreateDeal] = useState(false);
  const [showChatList, setShowChatList] = useState(true); // For mobile navigation


  const [chats, setChats] = useState([
    {
      id: 1,
      name: 'John Smith',
      avatar: '👨‍💼',
      lastMessage: 'Thank you for the amazing service! Looking forward to our next project.',
      timestamp: '2024-01-28 15:30',
      unreadCount: 3,
      isOnline: true,
      isFavorite: true,
      isSupport: false,
      messages: [
        { id: 1, sender: 'John Smith', message: 'Hi there! I need help with my order.', timestamp: '2024-01-28 14:00', isOwn: false },
        { id: 2, sender: 'You', message: 'Hello John! I\'d be happy to help you. What seems to be the issue?', timestamp: '2024-01-28 14:05', isOwn: true },
        { id: 3, sender: 'John Smith', message: 'I want to place a bulk order for the electronics showcase.', timestamp: '2024-01-28 14:10', isOwn: false },
        { id: 4, sender: 'You', message: 'That sounds great! Let me create a special deal for you.', timestamp: '2024-01-28 14:15', isOwn: true },
        { id: 5, sender: 'John Smith', message: 'Thank you for the amazing service! Looking forward to our next project.', timestamp: '2024-01-28 15:30', isOwn: false }
      ]
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      avatar: '👩‍💻',
      lastMessage: 'Can we schedule a call to discuss the pricing?',
      timestamp: '2024-01-28 12:45',
      unreadCount: 1,
      isOnline: false,
      isFavorite: true,
      isSupport: false,
      messages: [
        { id: 1, sender: 'Sarah Johnson', message: 'Hi! I\'m interested in your premium package.', timestamp: '2024-01-28 11:00', isOwn: false },
        { id: 2, sender: 'You', message: 'Great choice! Our premium package offers excellent value.', timestamp: '2024-01-28 11:30', isOwn: true },
        { id: 3, sender: 'Sarah Johnson', message: 'Can we schedule a call to discuss the pricing?', timestamp: '2024-01-28 12:45', isOwn: false }
      ]
    },
    {
      id: 3,
      name: 'Support Team',
      avatar: '🛠️',
      lastMessage: 'Your ticket has been resolved. Is there anything else we can help you with?',
      timestamp: '2024-01-28 10:20',
      unreadCount: 0,
      isOnline: true,
      isFavorite: false,
      isSupport: true,
      messages: [
        { id: 1, sender: 'You', message: 'I\'m having trouble with the payment system.', timestamp: '2024-01-28 09:00', isOwn: true },
        { id: 2, sender: 'Support Team', message: 'Thank you for contacting us. We\'re looking into your payment issue.', timestamp: '2024-01-28 09:15', isOwn: false },
        { id: 3, sender: 'Support Team', message: 'The issue has been fixed. Please try processing your payment again.', timestamp: '2024-01-28 10:00', isOwn: false },
        { id: 4, sender: 'Support Team', message: 'Your ticket has been resolved. Is there anything else we can help you with?', timestamp: '2024-01-28 10:20', isOwn: false }
      ]
    },
    {
      id: 4,
      name: 'Mike Davis',
      avatar: '👨‍🔧',
      lastMessage: 'Perfect! I\'ll send the requirements by tomorrow.',
      timestamp: '2024-01-27 18:30',
      unreadCount: 0,
      isOnline: false,
      isFavorite: false,
      isSupport: false,
      messages: [
        { id: 1, sender: 'Mike Davis', message: 'Hello, I need a custom showcase for my tool business.', timestamp: '2024-01-27 16:00', isOwn: false },
        { id: 2, sender: 'You', message: 'Hi Mike! I can definitely help with that. What type of tools are you showcasing?', timestamp: '2024-01-27 16:30', isOwn: true },
        { id: 3, sender: 'Mike Davis', message: 'Professional grade power tools and hand tools.', timestamp: '2024-01-27 17:00', isOwn: false },
        { id: 4, sender: 'You', message: 'Excellent! Let me prepare a proposal for you.', timestamp: '2024-01-27 17:30', isOwn: true },
        { id: 5, sender: 'Mike Davis', message: 'Perfect! I\'ll send the requirements by tomorrow.', timestamp: '2024-01-27 18:30', isOwn: false }
      ]
    },
    {
      id: 5,
      name: 'Emily Wilson',
      avatar: '👩‍🎨',
      lastMessage: 'The design looks amazing! When can we launch?',
      timestamp: '2024-01-27 14:15',
      unreadCount: 2,
      isOnline: true,
      isFavorite: true,
      isSupport: false,
      messages: [
        { id: 1, sender: 'Emily Wilson', message: 'I love the preliminary design you sent!', timestamp: '2024-01-27 13:00', isOwn: false },
        { id: 2, sender: 'You', message: 'Thank you! I\'m glad you like it. Any changes you\'d like to make?', timestamp: '2024-01-27 13:30', isOwn: true },
        { id: 3, sender: 'Emily Wilson', message: 'The design looks amazing! When can we launch?', timestamp: '2024-01-27 14:15', isOwn: false }
      ]
    }
  ]);

  const [dealData, setDealData] = useState({
    title: '',
    description: '',
    amount: '',
    duration: '',
    terms: ''
  });

  const filteredChats = chats.filter(chat => {
    const matchesSearch = chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'favorites' && chat.isFavorite) ||
                      (activeTab === 'support' && chat.isSupport);
    
    return matchesSearch && matchesTab;
  });

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    setShowChatList(false); // Hide chat list on mobile when chat is selected
  };

  const handleBackToList = () => {
    setShowChatList(true);
    setSelectedChat(null);
  };

  const handleSendMessage = () => {
    if (message.trim() && selectedChat) {
      const newMessage = {
        id: selectedChat.messages.length + 1,
        sender: 'You',
        message: message.trim(),
        timestamp: new Date().toLocaleString(),
        isOwn: true
      };

      setChats(prevChats => 
        prevChats.map(chat => 
          chat.id === selectedChat.id 
            ? { 
                ...chat, 
                messages: [...chat.messages, newMessage],
                lastMessage: message.trim(),
                timestamp: new Date().toLocaleString()
              }
            : chat
        )
      );

      setSelectedChat(prev => ({
        ...prev,
        messages: [...prev.messages, newMessage],
        lastMessage: message.trim(),
        timestamp: new Date().toLocaleString()
      }));

      setMessage('');
    }
  };

  const handleCreateDeal = () => {
    if (dealData.title && dealData.amount && selectedChat) {
      const dealMessage = {
        id: selectedChat.messages.length + 1,
        sender: 'You',
        message: `📋 Deal Proposal: ${dealData.title}\n💰 Amount: $${dealData.amount}\n⏱️ Duration: ${dealData.duration}\n📝 ${dealData.description}`,
        timestamp: new Date().toLocaleString(),
        isOwn: true,
        isDeal: true
      };

      setChats(prevChats => 
        prevChats.map(chat => 
          chat.id === selectedChat.id 
            ? { 
                ...chat, 
                messages: [...chat.messages, dealMessage],
                lastMessage: `Deal Proposal: ${dealData.title}`,
                timestamp: new Date().toLocaleString()
              }
            : chat
        )
      );

      setSelectedChat(prev => ({
        ...prev,
        messages: [...prev.messages, dealMessage],
        lastMessage: `Deal Proposal: ${dealData.title}`,
        timestamp: new Date().toLocaleString()
      }));

      setDealData({ title: '', description: '', amount: '', duration: '', terms: '' });
      setShowCreateDeal(false);
    }
  };

  const toggleFavorite = (chatId) => {
    setChats(prevChats => 
      prevChats.map(chat => 
        chat.id === chatId 
          ? { ...chat, isFavorite: !chat.isFavorite }
          : chat
      )
    );
    
    if (selectedChat && selectedChat.id === chatId) {
      setSelectedChat(prev => ({ ...prev, isFavorite: !prev.isFavorite }));
    }
  };

  const getUnreadCount = () => {
    return chats.reduce((total, chat) => total + chat.unreadCount, 0);
  };


  const ChatListItem = ({ chat }) => (
    <div
      onClick={() => handleChatSelect(chat)}
      className="p-4 border-b border-gray-100 active:bg-gray-50 transition-colors"
    >
      <div className="flex items-start space-x-3">
        <div className="relative flex-shrink-0">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xl">
            {chat.avatar}
          </div>
          {chat.isOnline && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 truncate flex items-center text-sm sm:text-base">
              {chat.name}
              {chat.isFavorite && <Star className="ml-1 w-3 h-3 text-yellow-500 fill-current flex-shrink-0" />}
              {chat.isSupport && <Settings className="ml-1 w-3 h-3 text-blue-500 flex-shrink-0" />}
            </h3>
            <div className="flex items-center space-x-2 flex-shrink-0">
              <span className="text-xs text-gray-500">
                {new Date(chat.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
              {chat.unreadCount > 0 && (
                <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                  {chat.unreadCount}
                </span>
              )}
            </div>
          </div>
          <p className="text-sm text-gray-600 truncate mt-1">{chat.lastMessage}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <Headline className='mb-10'  headlines={["Welcome to our amazing platform!"]} ></Headline>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        
        
        <div className={`text-center mb-6 sm:mb-8 ${!showChatList && 'hidden lg:block'}`}>
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mb-4 sm:mb-6">
            <MessageCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-4">Inbox</h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Manage your conversations, support tickets, and business deals
          </p>
        </div>

        
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          
          
          <div className="lg:hidden">
            {showChatList ? (
              /* Mobile Chat List */
              <div className="h-[calc(100vh-200px)] flex flex-col">
                
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-4">
                  <h2 className="text-lg sm:text-xl font-bold text-white flex items-center justify-between">
                    <span>Messages</span>
                    <span className="bg-white bg-opacity-20 text-sm px-2 py-1 rounded-full">
                      {getUnreadCount()} unread
                    </span>
                  </h2>
                </div>

                
                <div className="p-4 border-b border-gray-200">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search conversations..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <Search className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                
                <div className="px-4 py-3 border-b border-gray-200">
                  <div className="flex space-x-1 overflow-x-auto">
                    {[
                      { key: 'all', label: 'All', icon: MessageCircle },
                      { key: 'favorites', label: 'Favorites', icon: Star },
                      { key: 'support', label: 'Support', icon: Settings }
                    ].map(tab => (
                      <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap flex items-center space-x-1 min-h-[44px] ${
                          activeTab === tab.key
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-600 hover:text-gray-800'
                        }`}
                      >
                        <tab.icon className="w-3 h-3" />
                        <span>{tab.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                
                <div className="flex-1 overflow-y-auto">
                  {filteredChats.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                      <MessageCircle className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                      <p>No conversations found</p>
                    </div>
                  ) : (
                    filteredChats.map(chat => (
                      <ChatListItem key={chat.id} chat={chat} />
                    ))
                  )}
                </div>
              </div>
            ) : (
              /* Mobile Chat View */
              selectedChat && (
                <div className="h-[calc(100vh-120px)] flex flex-col">
                  
                  <div className="bg-gray-50 px-4 py-4 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <button
                        onClick={handleBackToList}
                        className="p-2 hover:bg-gray-200 rounded-lg transition-colors flex-shrink-0"
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </button>
                      <div className="relative flex-shrink-0">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-lg">
                          {selectedChat.avatar}
                        </div>
                        {selectedChat.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-base truncate">{selectedChat.name}</h3>
                        <p className="text-sm text-gray-500">
                          {selectedChat.isOnline ? 'Online' : 'Last seen recently'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      <button
                        onClick={() => toggleFavorite(selectedChat.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          selectedChat.isFavorite
                            ? 'bg-yellow-100 text-yellow-600'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <Star className={`w-4 h-4 ${selectedChat.isFavorite ? 'fill-current' : ''}`} />
                      </button>
                      <button
                        onClick={() => setShowCreateDeal(true)}
                        className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                      >
                        <ClipboardList className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {selectedChat.messages.map(msg => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[85%] px-4 py-3 rounded-2xl ${
                            msg.isOwn
                              ? 'bg-blue-600 text-white'
                              : msg.isDeal
                              ? 'bg-green-100 text-green-800 border border-green-200'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="whitespace-pre-line text-sm">{msg.message}</p>
                          <p className={`text-xs mt-1 ${
                            msg.isOwn ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  
                  <div className="bg-gray-50 px-4 py-4 border-t border-gray-200">
                    <div className="flex items-center space-x-3">
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                      <button
                        onClick={handleSendMessage}
                        className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>

          
          <div className="hidden lg:flex h-[700px]">
            
            <div className="w-1/3 border-r border-gray-200 flex flex-col">
              
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white flex items-center justify-between">
                  <span>Messages</span>
                  <span className="bg-white bg-opacity-20 text-sm px-2 py-1 rounded-full">
                    {getUnreadCount()} unread
                  </span>
                </h2>
              </div>

              
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>

              
              <div className="px-4 py-2 border-b border-gray-200">
                <div className="flex space-x-1">
                  {[
                    { key: 'all', label: 'All', icon: MessageCircle },
                    { key: 'favorites', label: 'Favorites', icon: Star },
                    { key: 'support', label: 'Support', icon: Settings }
                  ].map(tab => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1 ${
                        activeTab === tab.key
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      <tab.icon className="w-3 h-3" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              
              <div className="flex-1 overflow-y-auto">
                {filteredChats.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <MessageCircle className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                    <p>No conversations found</p>
                  </div>
                ) : (
                  filteredChats.map(chat => (
                    <div
                      key={chat.id}
                      onClick={() => setSelectedChat(chat)}
                      className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedChat?.id === chat.id ? 'bg-blue-50 border-blue-200' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="relative">
                          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xl">
                            {chat.avatar}
                          </div>
                          {chat.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-gray-900 truncate flex items-center">
                              {chat.name}
                              {chat.isFavorite && <Star className="ml-1 w-3 h-3 text-yellow-500 fill-current" />}
                              {chat.isSupport && <Settings className="ml-1 w-3 h-3 text-blue-500" />}
                            </h3>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-gray-500">
                                {new Date(chat.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                              {chat.unreadCount > 0 && (
                                <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                                  {chat.unreadCount}
                                </span>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 truncate mt-1">{chat.lastMessage}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            
            <div className="flex-1 flex flex-col">
              {selectedChat ? (
                <>
                  
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-lg">
                          {selectedChat.avatar}
                        </div>
                        {selectedChat.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{selectedChat.name}</h3>
                        <p className="text-sm text-gray-500">
                          {selectedChat.isOnline ? 'Online' : 'Last seen recently'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleFavorite(selectedChat.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          selectedChat.isFavorite
                            ? 'bg-yellow-100 text-yellow-600'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <Star className={`w-4 h-4 ${selectedChat.isFavorite ? 'fill-current' : ''}`} />
                      </button>
                      <button
                        onClick={() => setShowCreateDeal(true)}
                        className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                      >
                        <ClipboardList className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {selectedChat.messages.map(msg => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                            msg.isOwn
                              ? 'bg-blue-600 text-white'
                              : msg.isDeal
                              ? 'bg-green-100 text-green-800 border border-green-200'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="whitespace-pre-line">{msg.message}</p>
                          <p className={`text-xs mt-1 ${
                            msg.isOwn ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  
                  <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                    <div className="flex items-center space-x-3">
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                      <button
                        onClick={handleSendMessage}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                /* No Chat Selected */
                <div className="flex-1 flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No conversation selected</h3>
                    <p className="text-gray-600">Choose a conversation from the sidebar to start messaging</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      
      {showCreateDeal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-green-500 to-blue-600 px-4 sm:px-8 py-4 sm:py-6 rounded-t-2xl sm:rounded-t-3xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xl sm:text-2xl font-bold text-white">Create Deal Proposal</h3>
                <button
                  onClick={() => setShowCreateDeal(false)}
                  className="text-white hover:text-gray-200 transition-colors p-1"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-8 space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Deal Title *</label>
                  <input
                    type="text"
                    value={dealData.title}
                    onChange={(e) => setDealData({ ...dealData, title: e.target.value })}
                    placeholder="Enter deal title"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Amount *</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={dealData.amount}
                      onChange={(e) => setDealData({ ...dealData, amount: e.target.value })}
                      placeholder="0.00"
                      className="w-full p-3 pl-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <DollarSign className="w-4 h-4 text-gray-500" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Duration</label>
                <input
                  type="text"
                  value={dealData.duration}
                  onChange={(e) => setDealData({ ...dealData, duration: e.target.value })}
                  placeholder="e.g., 30 days, 3 months"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={dealData.description}
                  onChange={(e) => setDealData({ ...dealData, description: e.target.value })}
                  placeholder="Describe the deal details..."
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-base"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Terms & Conditions</label>
                <textarea
                  value={dealData.terms}
                  onChange={(e) => setDealData({ ...dealData, terms: e.target.value })}
                  placeholder="Enter terms and conditions..."
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-base"
                />
              </div>

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
                <button
                  onClick={() => setShowCreateDeal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateDeal}
                  className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Create Deal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inbox;