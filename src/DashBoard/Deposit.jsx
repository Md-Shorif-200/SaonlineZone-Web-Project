import React, { useState } from 'react';
import { FaWallet, FaArrowDown, FaMoneyBillWave } from 'react-icons/fa';

const Deposit = () => {
  const [paymentMethod, setPaymentMethod] = useState('bkash');
  const [amount, setAmount] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [currentBalance, setCurrentBalance] = useState(2000);
  const [lastDeposit, setLastDeposit] = useState(0);
  const [totalDeposited, setTotalDeposited] = useState(5000);
  const [depositHistory, setDepositHistory] = useState([]);

  const generateDepositId = () => {
    return 'DEP' + Date.now().toString().slice(-8) + Math.floor(Math.random() * 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const depositAmount = parseFloat(amount);

    if (!amount || isNaN(depositAmount) || depositAmount <= 0 || !transactionId) {
      alert('Please enter all fields correctly.');
      return;
    }


    const depositRecord = {
      id: Date.now(),
      depositId: generateDepositId(),
      paymentMethod: paymentMethod,
      transactionId: transactionId,
      amount: depositAmount,
      date: new Date().toLocaleString(),
      status: 'Completed'
    };


    setCurrentBalance(prev => prev + depositAmount);
    setLastDeposit(depositAmount);
    setTotalDeposited(prev => prev + depositAmount);
    setDepositHistory(prev => [depositRecord, ...prev]);

    alert(`Successfully deposited ${depositAmount}৳ via ${paymentMethod}!`);

    setAmount('');
    setTransactionId('');
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
      'Completed': 'bg-green-100 text-green-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Failed': 'bg-red-100 text-red-800'
    };
    return `px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`;
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-10 p-6 rounded-2xl bg-white text-gray-800 shadow-2xl">
      <h2 className="text-3xl font-bold text-center mb-10">💳 Deposit Funds</h2>

      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white p-5 rounded-xl flex flex-col items-center shadow-lg">
          <FaWallet className="text-3xl mb-2" />
          <p className="text-sm">Current Balance</p>
          <h3 className="text-xl font-bold">{currentBalance} ৳</h3>
        </div>
        <div className="bg-gradient-to-r from-pink-600 to-rose-400 text-white p-5 rounded-xl flex flex-col items-center shadow-lg">
          <FaArrowDown className="text-3xl mb-2" />
          <p className="text-sm">Last Deposit</p>
          <h3 className="text-xl font-bold">{lastDeposit} ৳</h3>
        </div>
        <div className="bg-gradient-to-r from-green-600 to-emerald-400 text-white p-5 rounded-xl flex flex-col items-center shadow-lg">
          <FaMoneyBillWave className="text-3xl mb-2" />
          <p className="text-sm">Total Deposited</p>
          <h3 className="text-xl font-bold">{totalDeposited} ৳</h3>
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
          <label className="block text-sm font-medium mb-1">Deposit Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g. 1000"
            className="w-full rounded-lg border border-gray-300 bg-white text-gray-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            min="1"
          />
        </div>

        
        <div>
          <label className="block text-sm font-medium mb-1">Transaction ID</label>
          <input
            type="text"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            placeholder="e.g. TX123456789"
            className="w-full rounded-lg border border-gray-300 bg-white text-gray-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-blue-700 to-sky-500 hover:opacity-90 text-white font-bold transition duration-300"
        >
          Submit Deposit
        </button>
      </form>

      
      {depositHistory.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-700 to-sky-500 px-6 py-4">
            <h3 className="text-xl font-bold text-white">📋 Deposit History</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Deposit ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Method
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
                {depositHistory.map((deposit) => (
                  <tr key={deposit.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                      {deposit.depositId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                      {deposit.transactionId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <span className="mr-2">{getPaymentMethodIcon(deposit.paymentMethod)}</span>
                        <span className="capitalize">{deposit.paymentMethod}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                      {deposit.amount} ৳
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {deposit.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getStatusBadge(deposit.status)}>
                        {deposit.status}
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

export default Deposit;