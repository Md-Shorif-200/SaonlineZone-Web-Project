import React from "react";
import {
  FaTruck,
  FaHtml5,
  FaPaintBrush,
  FaBootstrap,
  FaRocket,
  FaHandsHelping,
} from "react-icons/fa";
import img_1 from "../../public/02_about.jpg";

const WhatWeProvide = () => {
 const features = [
  {
    icon: <FaRocket className="text-xl text-blue-500" />,
    text: "High Scalability",
  },
  {
    icon: <FaHtml5 className="text-xl text-blue-500" />,
    text: "API First Design",
  },
  {
    icon: <FaPaintBrush className="text-xl text-blue-500" />,
    text: "UI Integration",
  },
  {
    icon: <FaTruck className="text-xl text-blue-500" />,
    text: "Fast Delivery",
  },
  {
    icon: <FaBootstrap className="text-xl text-blue-500" />,
    text: "Modular Code",
  },
  {
    icon: <FaHandsHelping className="text-xl text-blue-500" />,
    text: "24/7 Support",
  },
];


  return (
    <div className="bg-blue-50 pt-20 pb-20 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        <div className="w-full sm:w-[80%] md:w-[60%] lg:w-1/2 px-2 sm:px-4 space-y-5 text-center lg:text-left">
          <h4 className="text-base sm:text-lg font-bold uppercase tracking-widest text-blue-600">
            What We Provide You
          </h4>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 leading-tight">
            Delivering Outstanding Business Solutions
          </h2>
          <p className="text-gray-600 text-base leading-relaxed border-l-4 border-blue-500 pl-4 my-6">
            We offer a wide range of services to help your business thrive in
            the digital world. Our solutions are crafted with care, precision,
            and a focus on results. Whether it’s design, development, or ongoing
            support — we ensure top quality with performance and customer
            satisfaction.
          </p>

          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 font-medium mt-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-2">
                {feature.icon}
                <span>{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        
        <div className="relative w-full sm:w-[80%] md:w-[60%] lg:w-1/2 mx-auto h-[280px]">
          <img
            src={img_1}
            alt="What We Provide"
            className="w-full h-full object-cover absolute top-0 left-6 z-20 rounded-md shadow-md"
          />
          <div className="w-full h-full bg-[#F1F1F1] absolute top-4 left-3 z-10 rounded-md"></div>
          <div className="w-full h-full bg-blue-500 absolute top-8 left-0 z-0 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default WhatWeProvide;