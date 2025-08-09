import logo from '../../public/Picsart_24-12-18_17-11-57-456.png';
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
} from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-black text-white pt-16 pb-10 relative z-10">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
                
                <div className="flex flex-col items-start">
                    <div className="flex items-center gap-3">
                        <img className="w-12 h-12 object-contain" src={logo} alt="SA Online Zone Logo" />
                        <h2 className="text-2xl font-bold text-cyan-500">
                            SA Online Zone
                        </h2>
                    </div>
                    <p className="text-sm text-gray-400 mt-3">
                        Your trusted platform for online services & opportunities.
                    </p>
                </div>

                
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li>Email: <a href="mailto:support@saonlinezone.com" className="hover:underline">support@saonlinezone.com</a></li>
                        <li>Phone: <a href="tel:+8801234567890" className="hover:underline">+880-1234-567890</a></li>
                        <li>Address: Dhaka, Bangladesh</li>
                    </ul>
                </div>

                
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-white">Legal</h3>
                    <ul className="text-sm text-gray-400 space-y-2">
                        <li>
                            <a href="#" className="hover:underline hover:text-blue-400">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline hover:text-blue-400">Terms & Conditions</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline hover:text-blue-400">Refund Policy</a>
                        </li>
                    </ul>
                </div>

                
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-white">Follow Us</h3>
                    <div className="flex gap-4">
                        <a
                            href="#"
                            aria-label="Facebook"
                            className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition transform hover:scale-105"
                        >
                            <FaFacebookF size={18} color="#1877F2" />
                        </a>
                        <a
                            href="#"
                            aria-label="Twitter"
                            className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition transform hover:scale-105"
                        >
                            <FaTwitter size={18} color="#1DA1F2" />
                        </a>
                        <a
                            href="#"
                            aria-label="Instagram"
                            className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition transform hover:scale-105"
                        >
                            <FaInstagram size={18} color="#E1306C" />
                        </a>
                        <a
                            href="#"
                            aria-label="LinkedIn"
                            className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition transform hover:scale-105"
                        >
                            <FaLinkedinIn size={18} color="#0A66C2" />
                        </a>
                    </div>
                </div>
            </div>

            
            <div className="mt-12 border-t border-gray-700/50 pt-5">
                <p className="text-center text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} SA Online Zone. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
