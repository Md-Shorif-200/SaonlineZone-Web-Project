import { Link, NavLink } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase"; // Adjust path as needed
import { FiUser, FiSettings, FiLogOut, FiChevronDown } from "react-icons/fi";


import nav_logo from '../../public/Picsart_24-12-18_17-11-57-456.png'

const Navbar = ({ user }) => {
    const [isActive, setIsActive] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);


    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showUserMenu && !event.target.closest('.user-menu-container')) {
                setShowUserMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showUserMenu]);


    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await signOut(auth);
            console.log('User signed out successfully');
            setShowUserMenu(false);
            setShowLogoutConfirm(false);
        } catch (error) {
            console.error('Logout error:', error);
            alert('Failed to log out. Please try again.');
        } finally {
            setIsLoggingOut(false);
        }
    };


    const getUserDisplayName = () => {
        if (user?.displayName) return user.displayName;
        if (user?.email) return user.email.split('@')[0];
        return 'User';
    };

    const getUserEmail = () => {
        return user?.email || '';
    };

    const navLink = (
        <>
            <li className='text-lg mx-0 md:mx-6 my-4 md:my-0 font-medium transition-all duration-300 hover:text-blue-500'>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `relative hover:text-blue-500 transition-all duration-300 ${isActive ? 'text-blue-500' : ''
                        } after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-blue-500 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full ${isActive ? 'after:w-full' : ''
                        }`
                    }
                >
                    Home
                </NavLink>
            </li>
            <li className='text-lg mx-0 md:mx-6 my-4 md:my-0 font-medium transition-all duration-300 hover:text-blue-500'>
                <NavLink
                    to="/about-us"
                    className={({ isActive }) =>
                        `relative hover:text-blue-500 transition-all duration-300 ${isActive ? 'text-blue-500' : ''
                        } after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-blue-500 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full ${isActive ? 'after:w-full' : ''
                        }`
                    }
                >
                    About us
                </NavLink>
            </li>
            <li className='text-lg mx-0 md:mx-6 my-4 md:my-0 font-medium transition-all duration-300 hover:text-blue-500'>
                <NavLink
                    to="/contact-us"
                    className={({ isActive }) =>
                        `relative hover:text-blue-500 transition-all duration-300 ${isActive ? 'text-blue-500' : ''
                        } after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-blue-500 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full ${isActive ? 'after:w-full' : ''
                        }`
                    }
                >
                    Contact
                </NavLink>
            </li>
            <li className='text-lg mx-0 md:mx-6 my-4 md:my-0 font-medium transition-all duration-300 hover:text-blue-500'>
                <NavLink
                    to="/privacy-policy"
                    className={({ isActive }) =>
                        `relative hover:text-blue-500 transition-all duration-300 ${isActive ? 'text-blue-500' : ''
                        } after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-blue-500 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full ${isActive ? 'after:w-full' : ''
                        }`
                    }
                >
                    Privacy Policy
                </NavLink>
            </li>
            
            {user && (
                <li className='text-lg mx-0 md:mx-6 my-4 md:my-0 font-medium transition-all duration-300 hover:text-blue-500'>
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `relative hover:text-blue-500 transition-all duration-300 ${isActive ? 'text-blue-500' : ''
                            } after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-blue-500 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full ${isActive ? 'after:w-full' : ''
                            }`
                        }
                    >
                        Dashboard
                    </NavLink>
                </li>
            )}
        </>
    );

    const mobileNavLink = (
        <>
            <li className="transform hover:translate-x-2 transition-transform duration-300">
                <div className="p-3 rounded-lg hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 transition-all duration-300">
                    <NavLink
                        to="/"
                        onClick={() => setIsActive(false)}
                        className={({ isActive }) =>
                            `text-lg font-medium transition-all duration-300 ${isActive ? 'text-cyan-500' : 'hover:text-cyan-500'
                            }`
                        }
                    >
                        Home
                    </NavLink>
                </div>
            </li>
            <li className="transform hover:translate-x-2 transition-transform duration-300">
                <div className="p-3 rounded-lg hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 transition-all duration-300">
                    <NavLink
                        to="/about-us"
                        onClick={() => setIsActive(false)}
                        className={({ isActive }) =>
                            `text-lg font-medium transition-all duration-300 ${isActive ? 'text-cyan-500' : 'hover:text-cyan-500'
                            }`
                        }
                    >
                        About us
                    </NavLink>
                </div>
            </li>
            <li className="transform hover:translate-x-2 transition-transform duration-300">
                <div className="p-3 rounded-lg hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 transition-all duration-300">
                    <NavLink
                        to="/contact-us"
                        onClick={() => setIsActive(false)}
                        className={({ isActive }) =>
                            `text-lg font-medium transition-all duration-300 ${isActive ? 'text-cyan-500' : 'hover:text-cyan-500'
                            }`
                        }
                    >
                        Contact
                    </NavLink>
                </div>
            </li>
            <li className="transform hover:translate-x-2 transition-transform duration-300">
                <div className="p-3 rounded-lg hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 transition-all duration-300">
                    <NavLink
                        to="/privacy-policy"
                        onClick={() => setIsActive(false)}
                        className={({ isActive }) =>
                            `text-lg font-medium transition-all duration-300 ${isActive ? 'text-cyan-500' : 'hover:text-cyan-500'
                            }`
                        }
                    >
                        Privacy Policy
                    </NavLink>
                </div>
            </li>
            
            {user && (
                <li className="transform hover:translate-x-2 transition-transform duration-300">
                    <div className="p-3 rounded-lg hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 transition-all duration-300">
                        <NavLink
                            to="/dashboard"
                            onClick={() => setIsActive(false)}
                            className={({ isActive }) =>
                                `text-lg font-medium transition-all duration-300 ${isActive ? 'text-cyan-500' : 'hover:text-cyan-500'
                                }`
                            }
                        >
                            Dashboard
                        </NavLink>
                    </div>
                </li>
            )}
        </>
    );

    const handleMenuIcon = () => setIsActive(true);

    return (
        <div className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled
            ? ' backdrop-blur-md shadow-lg border-b border-gray-100'
            : 'bg-transparent '
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
                <div className="flex items-center justify-between py-3 relative">

                    
                    <div className="nav-start flex items-center gap-x-3 group">
                        <div className="relative overflow-hidden rounded-full ring-2 ring-cyan-500/20 transition-all duration-300 group-hover:ring-cyan-500/40">
                            <img
                                src={nav_logo}
                                alt="Logo"
                                className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                        </div>
                        <div className="flex flex-col">
                            <h2 className="text-xl sm:text-2xl font-bold text-cyan-500">
                                Saonline <span className="text-[#A62783]">Zone</span>
                            </h2>
                            <div className="h-0.5 w-0 bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500 group-hover:w-full"></div>
                        </div>
                    </div>

                    
                    <div className="nav-center mr-10 hidden lg:flex">
                        <ul className="flex items-center space-x-2">
                            {navLink}
                        </ul>
                    </div>

                    
                    <div className="flex items-center gap-x-4">
                        
                        <div className="lg:hidden">
                            <button
                                onClick={handleMenuIcon}
                                className="p-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                            >
                                {!isActive && <IoMenu className="w-6 h-6" />}
                            </button>
                        </div>

                        
                        <div className="hidden lg:block">
                            {user ? (
                                /* User Menu for Desktop */
                                <div className="relative user-menu-container">
                                   <button 
                                            onClick={() => {
                                                setIsActive(false);
                                                setShowLogoutConfirm(true);
                                            }}
                                            className="w-full relative overflow-hidden bg-gradient-to-r from-red-500 to-red-600 text-white px-4 text-sm py-3 rounded-full font-semibold uppercase tracking-wide shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                                        >
                                            <FiLogOut className="w-4 h-4" />
                                            <span className="relative z-10">Sign Out</span>
                                        </button>

                                    
                                    {showUserMenu && (
                                        <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 overflow-hidden">
                                            
                                            <div className="px-4 py-4 border-b border-gray-100 bg-gradient-to-r from-cyan-50 to-blue-50">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center overflow-hidden">
                                                        {user?.photoURL ? (
                                                            <img 
                                                                src={user.photoURL} 
                                                                alt="Profile" 
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <FiUser className="w-6 h-6 text-white" />
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-semibold text-gray-900 truncate">{getUserDisplayName()}</p>
                                                        <p className="text-sm text-gray-500 truncate">{getUserEmail()}</p>
                                                        <div className="flex items-center gap-1 mt-1">
                                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                            <span className="text-xs text-green-600 font-medium">Online</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            
                                            <div className="py-2">
                                                <Link to="/dashboard" onClick={() => setShowUserMenu(false)}>
                                                    <button className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                                                        <FiUser className="w-4 h-4 text-gray-400" />
                                                        Dashboard
                                                    </button>
                                                </Link>
                                                <button className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                                                    <FiSettings className="w-4 h-4 text-gray-400" />
                                                    Settings
                                                </button>
                                                <hr className="my-2 border-gray-100" />
                                                <button 
                                                    onClick={() => {
                                                        setShowUserMenu(false);
                                                        setShowLogoutConfirm(true);
                                                    }}
                                                    className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors"
                                                >
                                                    <FiLogOut className="w-4 h-4 text-red-400" />
                                                    Sign Out
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                /* Login Button for Non-authenticated Users */
                                <Link to="/sign-in">
                                    <button className="relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2.5 rounded-full font-semibold uppercase tracking-wide shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 before:absolute before:inset-0 before:bg-white/20 before:transform before:-skew-x-12 before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700">
                                        <span className="relative z-10">Log In</span>
                                    </button>
                                </Link>
                            )}
                        </div>
                    </div>

                    
                    <div
                        tabIndex={0}
                        className={`fixed inset-0 w-screen h-screen bg-black/50 backdrop-blur-sm transition-all duration-300 ease-in-out lg:hidden z-50 ${isActive ? "opacity-100 visible" : "opacity-0 invisible"
                            }`}
                        onClick={() => setIsActive(false)}
                    >
                        <div
                            className={`fixed top-0 right-0 h-screen bg-white shadow-2xl transition-all duration-200 ease-in-out ${isActive ? "w-2/3" : "w-0 overflow-hidden"
                                }`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            
                            <div className="flex justify-end items-center p-4 border-b border-gray-100 bg-gradient-to-r from-cyan-50 to-blue-50 flex-shrink-0">
                                <button
                                    onClick={() => setIsActive(false)}
                                    className="p-2 rounded-full bg-gray-100 hover:bg-red-100 transition-colors duration-300 group"
                                >
                                    <MdClose className="w-6 h-6 text-gray-600 group-hover:text-red-500 transition-colors duration-300" />
                                </button>
                            </div>

                            
                            {user && (
                                <div className="px-4 py-4 border-b border-gray-100 bg-gradient-to-r from-cyan-50 to-blue-50">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center overflow-hidden">
                                            {user?.photoURL ? (
                                                <img 
                                                    src={user.photoURL} 
                                                    alt="Profile" 
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <FiUser className="w-6 h-6 text-white" />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-gray-900 truncate">{getUserDisplayName()}</p>
                                            <p className="text-sm text-gray-500 truncate">{getUserEmail()}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            
                            <div className="px-4 py-6 bg-white flex-1 overflow-y-auto hide-scrollbar">
                                <ul className="space-y-2">
                                    {mobileNavLink}
                                </ul>

                                
                                <div className="my-6 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

                                
                                <div className="pt-4">
                                    {user ? (
                                        /* Logout Button for Authenticated Users */
                                        <button 
                                            onClick={() => {
                                                setIsActive(false);
                                                setShowLogoutConfirm(true);
                                            }}
                                            className="w-full relative overflow-hidden bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-full font-semibold uppercase tracking-wide shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                                        >
                                            <FiLogOut className="w-4 h-4" />
                                            <span className="relative z-10">Sign Out</span>
                                        </button>
                                    ) : (
                                        /* Login Button for Non-authenticated Users */
                                        <Link to="/sign-in" onClick={() => setIsActive(false)}>
                                            <button className="w-full relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-full font-semibold uppercase tracking-wide shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 before:absolute before:inset-0 before:bg-white/20 before:transform before:-skew-x-12 before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700">
                                                <span className="relative z-10">Log In / Sign Up</span>
                                            </button>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            
            {showLogoutConfirm && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FiLogOut className="w-8 h-8 text-red-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Confirm Logout</h3>
                            <p className="text-gray-600 mb-6">
                                Are you sure you want to log out? You'll need to sign in again to access your account.
                            </p>
                            
                            <div className="flex space-x-3">
                                <button
                                    onClick={() => setShowLogoutConfirm(false)}
                                    disabled={isLoggingOut}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleLogout}
                                    disabled={isLoggingOut}
                                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {isLoggingOut ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            Logging out...
                                        </>
                                    ) : (
                                        'Sign Out'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;