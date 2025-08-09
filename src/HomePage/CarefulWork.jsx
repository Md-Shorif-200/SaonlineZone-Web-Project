import React from "react";

const items = [
  { id: 1, img: "https://i.ibb.co/0jWBKjz/daria-nepriakhina-zo-CDWPui-Ru-A-unsplash.jpg" },
  { id: 2, img: "https://i.ibb.co/3YYPbth/mohammad-rahmani-1-VW6-HLOQE5-A-unsplash.jpg" },
  { id: 3, img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0" },
  { id: 4, img: "https://images.unsplash.com/photo-1581090700227-1e37b190418e" },
  { id: 5, img: "https://images.unsplash.com/photo-1612831455543-f6c4e08e3c44" },
  { id: 6, img: "https://images.unsplash.com/photo-1611078489935-3f3f5c8a3dcd" },
];

const CarefulWork = () => {
  return (
    <div className="py-16 bg-blue-50">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <p className="text-sm text-blue-500 uppercase tracking-wide mb-1">
              What we have done
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              We have careful work
            </h2>
          </div>
          <p className="text-gray-500 max-w-md mt-4 md:mt-0 text-sm">
            We specialize in providing creative and cost-effective business solutions tailored to your unique needs. Whether you’re a startup or an established enterprise, our strategies help you drive growth, increase efficiency, and stay ahead in your industry.
          </p>
        </div>

        
        <div className="flex flex-wrap gap-6 mb-10 text-xs font-semibold text-gray-800 uppercase">
          <span className="text-blue-500 border-b-2 border-blue-500">All</span>
          <span>User Experience</span>
          <span>Development</span>
          <span>Marketing</span>
          <span>Branding</span>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="w-full h-64 bg-white overflow-hidden shadow hover:shadow-lg transition"
            >
              <img
                src={item.img}
                alt={`Item ${item.id}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarefulWork;