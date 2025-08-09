import React from "react";
import { BsBoxArrowInUpRight } from "react-icons/bs";
import img_1 from "../../public/01_about.jpg";

const WhyChooseUs = () => {
  return (
    <div className="w-full bg-blue-50 pb-30 px-4 pt-40 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
        
        
        <div className="w-full sm:w-[80%] md:w-[60%] lg:w-1/2 mx-auto relative h-[280px]">
          <img
            src={img_1}
            alt="About Us"
            className="w-full h-full object-cover absolute top-0 left-6 z-20 rounded-md shadow-md"
          />
          <div className="w-full h-full bg-[#F1F1F1] absolute top-4 left-3 z-10 rounded-md"></div>
          <div className="w-full h-full bg-blue-500 absolute top-8 left-0 z-0 rounded-md"></div>
        </div>

        
        <div className="w-full sm:w-[80%] md:w-[60%] lg:w-1/2 px-2 sm:px-4 space-y-5 text-center lg:text-left">
          <h4 className="text-sm sm:text-base md:text-lg font-bold uppercase tracking-widest text-blue-600">
            Who We Are
          </h4>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 leading-tight">
            PROVIDE AWESOME AND BEST BUSINESS SOLUTIONS
          </h2>
          <p className="text-gray-600 leading-relaxed border-l-4 border-blue-500 pl-4 my-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-orange-500 font-semibold uppercase text-sm sm:text-base transition-colors duration-300"
          >
            <BsBoxArrowInUpRight className="text-base sm:text-lg" />
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;