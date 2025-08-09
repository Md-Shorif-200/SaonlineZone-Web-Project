import React, { useEffect, useState } from 'react';

const AddList = () => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    fetch('/ad.json')
      .then(res => res.json())
      .then(data => setAds(data));
  }, []);

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-blue-500 mb-2">📢 Advertisement List</h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </div>

        
        <div className="bg-white rounded-2xl border border-blue-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-black">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="py-4 px-6 font-semibold border-r border-blue-500">#</th>
                  <th className="py-4 px-6 font-semibold border-r border-blue-500">Name</th>
                  <th className="py-4 px-6 font-semibold border-r border-blue-500">Email</th>
                  <th className="py-4 px-6 font-semibold border-r border-blue-500">Subject</th>
                  <th className="py-4 px-6 font-semibold border-r border-blue-500">Priority</th>
                  <th className="py-4 px-6 font-semibold border-r border-blue-500">Message</th>
                  <th className="py-4 px-6 font-semibold">Image</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-100">
                {ads.map((ad, index) => (
                  <tr key={ad.id} className="hover:bg-blue-50">
                    <td className="py-4 px-6 border-r border-blue-100">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                    </td>
                    <td className="py-4 px-6 border-r border-blue-100 font-semibold">
                      {ad.name}
                    </td>
                    <td className="py-4 px-6 border-r border-blue-100">
                      <a href={`mailto:${ad.email}`} className="text-blue-600 hover:underline">
                        {ad.email}
                      </a>
                    </td>
                    <td className="py-4 px-6 border-r border-blue-100">
                      {ad.subject}
                    </td>
                    <td className="py-4 px-6 border-r border-blue-100">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold
                        ${
                          ad.priority === 'High' ? 'bg-red-100 text-red-700' :
                          ad.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                        {ad.priority}
                      </span>
                    </td>
                    <td className="py-4 px-6 border-r border-blue-100 max-w-sm truncate">
                      {ad.message}
                    </td>
                    <td className="py-4 px-6">
                      <img
                        src={ad.image}
                        alt="ad"
                        className="w-14 h-14 rounded-xl object-cover border border-blue-200"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        
        {ads.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-3xl">📢</span>
            </div>
            <h3 className="text-xl font-semibold text-black mb-2">No advertisements yet</h3>
            <p className="text-gray-500">Advertisements will appear here once loaded.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default AddList;