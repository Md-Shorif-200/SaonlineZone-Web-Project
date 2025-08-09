import React from "react";
import { FaLaptopCode, FaMobileAlt, FaGift } from "react-icons/fa";
import { MdDesignServices, MdOutlineBrandingWatermark } from "react-icons/md";
import { BiWorld } from "react-icons/bi";

const services = [
  {
    icon: <FaLaptopCode className="text-3xl text-blue-500" />,
    title: "Web Design",
    description: "Craft responsive, modern, and user-friendly website layouts tailored to your brand and business goals.",
  },
  {
    icon: <MdDesignServices className="text-3xl text-blue-500" />,
    title: "Graphic Design",
    description: "Create stunning visual designs including banners, posters, and social media content to elevate your identity.",
  },
  {
    icon: <MdOutlineBrandingWatermark className="text-3xl text-blue-500" />,
    title: "Branding",
    description: "Build a strong brand presence with unique logos, color schemes, and consistent messaging across platforms.",
  },
  {
    icon: <FaMobileAlt className="text-3xl text-blue-500" />,
    title: "Mobile Apps",
    description: "Develop high-performance mobile applications for both Android and iOS with seamless user experiences.",
  },
  {
    icon: <FaGift className="text-3xl text-blue-500" />,
    title: "Online Marketing",
    description: "Promote your business with digital marketing strategies including SEO, social media, and email campaigns.",
  },
  {
    icon: <BiWorld className="text-3xl text-blue-500" />,
    title: "Development",
    description: "Turn your ideas into powerful digital solutions with scalable and secure backend & frontend development.",
  },
];

const ImportantServices = () => {
  return (
    <section className="py-30 px-4 bg-blue-50">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-black">
              Best & Important Services
            </h2>
          </div>
          <p className="text-sm text-gray-500 max-w-md mt-4 md:mt-0">
            Explore our core services designed to help your business grow digitally. We deliver creative and technical solutions to meet your unique goals.
          </p>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="flex items-start space-x-4 bg-blue-100 p-4 rounded-md border border-blue-200 shadow-sm transition-transform transform hover:scale-105 duration-300"
            >
              <div className="shrink-0">{service.icon}</div>
              <div>
                <h3 className="text-lg font-semibold text-black mb-1">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm mb-2 border-l-2 border-blue-500 pl-4">
                  {service.description}
                </p>
                <a
                  href="#"
                  className="text-xs font-semibold text-blue-500"
                >
                  ▸ Read More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImportantServices;
