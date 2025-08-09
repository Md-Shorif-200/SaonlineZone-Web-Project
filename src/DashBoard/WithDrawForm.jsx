import React, { useState } from 'react';
import { FaWallet, FaArrowUp, FaMoneyCheckAlt } from 'react-icons/fa';
import Headline from '../HeadLine/Headline';

const WithDrawForm = () => {
  const [paymentMethod, setPaymentMethod] = useState('bkash');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [availableBalance, setAvailableBalance] = useState(3000);
  const [lastWithdraw, setLastWithdraw] = useState(0);
  const [totalWithdrawn, setTotalWithdrawn] = useState(2500);
  const [withdrawalHistory, setWithdrawalHistory] = useState([]);

  const generateTransactionId = () => {
    return 'WTD' + Date.now().toString().slice(-8) + Math.floor(Math.random() * 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const amount = parseFloat(withdrawAmount);
    if (!withdrawAmount || isNaN(amount) || amount <= 0 || !accountNumber) {
      alert('Please fill all fields correctly.');
      return;
    }

    if (amount > availableBalance) {
      alert('Insufficient balance.');
      return;
    }


    const withdrawalRecord = {
      id: Date.now(),
      transactionId: generateTransactionId(),
      paymentMethod: paymentMethod,
      accountNumber: accountNumber,
      amount: amount,
      date: new Date().toLocaleString(),
      status: 'Processing'
    };


    setAvailableBalance(prev => prev - amount);
    setLastWithdraw(amount);
    setTotalWithdrawn(prev => prev + amount);
    setWithdrawalHistory(prev => [withdrawalRecord, ...prev]);

    alert(`Successfully withdrawn ${amount}৳ via ${paymentMethod}.`);

    setWithdrawAmount('');
    setAccountNumber('');
  };

  const getPaymentMethodIcon = (method) => {
    const icons = {
      'bkash': '📱',
      'nagad': '💰',
      'rocket': '🚀',
      'bank': '🏦'
    };
    return icons[method] || '💳';
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      'Processing': 'bg-yellow-100 text-yellow-800',
      'Completed': 'bg-green-100 text-green-800',
      'Failed': 'bg-red-100 text-red-800'
    };
    return `px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`;
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-10 p-6 rounded-2xl bg-white text-gray-800 shadow-2xl">
      <Headline className='mb-10'  headlines={["Welcome to our amazing platform!"]} ></Headline>
      <h2 className="text-3xl font-bold text-center mb-10">💸 Withdraw Funds</h2>

      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white p-5 rounded-xl flex flex-col items-center shadow-lg">
          <FaWallet className="text-3xl mb-2" />
          <p className="text-sm">Available Balance</p>
          <h3 className="text-xl font-bold">{availableBalance} ৳</h3>
        </div>
        <div className="bg-gradient-to-r from-pink-600 to-rose-400 text-white p-5 rounded-xl flex flex-col items-center shadow-lg">
          <FaArrowUp className="text-3xl mb-2" />
          <p className="text-sm">Last Withdraw</p>
          <h3 className="text-xl font-bold">{lastWithdraw} ৳</h3>
        </div>
        <div className="bg-gradient-to-r from-green-600 to-emerald-400 text-white p-5 rounded-xl flex flex-col items-center shadow-lg">
          <FaMoneyCheckAlt className="text-3xl mb-2" />
          <p className="text-sm">Total Withdrawn</p>
          <h3 className="text-xl font-bold">{totalWithdrawn} ৳</h3>
        </div>
      </div>

      
      <form onSubmit={handleSubmit} className="space-y-6 p-6 rounded-xl border border-gray-200 bg-gray-50 mb-10">
        
        <div>
          <label className="block text-sm font-medium mb-1">Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white text-gray-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="" disabled>Select a method</option>
            <option value="bkash">bKash</option>
            <option value="nagad">Nagad</option>
            <option value="rocket">Rocket</option>
            <option value="bank">Bank Transfer</option>
          </select>
        </div>

        
        <div>
          <label className="block text-sm font-medium mb-1">Withdraw Amount</label>
          <input
            type="number"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            placeholder="e.g. 500"
            className="w-full rounded-lg border border-gray-300 bg-white text-gray-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            min="1"
            max={availableBalance}
          />
        </div>

        
        <div>
          <label className="block text-sm font-medium mb-1">Account Number</label>
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            placeholder="e.g. 01XXXXXXXXX"
            className="w-full rounded-lg border border-gray-300 bg-white text-gray-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-blue-700 to-sky-500 hover:opacity-90 text-white font-bold transition duration-300"
        >
          Submit Withdrawal
        </button>
      </form>

      
      {withdrawalHistory.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-700 to-sky-500 px-6 py-4">
            <h3 className="text-xl font-bold text-white">📋 Withdrawal History</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Method
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Account Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {withdrawalHistory.map((withdrawal) => (
                  <tr key={withdrawal.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                      {withdrawal.transactionId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <span className="mr-2">{getPaymentMethodIcon(withdrawal.paymentMethod)}</span>
                        <span className="capitalize">{withdrawal.paymentMethod}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                      {withdrawal.accountNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                      {withdrawal.amount} ৳
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {withdrawal.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getStatusBadge(withdrawal.status)}>
                        {withdrawal.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default WithDrawForm;