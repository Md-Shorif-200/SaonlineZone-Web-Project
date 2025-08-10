import { useState, useEffect } from "react";
import {
  FiSettings,
  FiBell,
  FiMenu,
  FiFileText,
  FiBriefcase,
  FiClipboard,
  FiCreditCard,
  FiMail,
  FiPlus,
  FiUser,
  FiLogOut,
  FiHome,
} from "react-icons/fi";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase"; // Adjust path as needed
import logo from "../../public/Picsart_24-12-18_17-11-57-456.png";
import WithDrawForm from "./WithDrawForm";
import AddFund from "./AddFund";
import BuySubscription from "./BuySubscription";
import ReferEarn from "./ReferEarn";
import MyOrders from "./MyOrders";
import ReceiveOrder from "./ReceiveOrder";
import PostManagement from "./PostManagement";
import Inbox from "./Inbox";
import History from "./History";
import Settings from "./Settings";
import Overview from "./Overview";
import DashboardHome from "./DashBoardHome";
import Profile from "./Profile";
import { Navigate, useNavigate } from "react-router-dom";
import useRole from "../Hooks/useRole";
import AdminRoute from "../Route/AdminRoute";
import UserRoute from "../Route/UserRoute";

const Dashboard = ({ user }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");
  const [isMobile, setIsMobile] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
  const { role, loading, error } = useRole();
  console.log(role);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarOpen &&
        isMobile &&
        !event.target.closest("aside") &&
        !event.target.closest("[data-sidebar-toggle]")
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarOpen, isMobile]);

  const navItems = [
    { name: "Dashboard", icon: FiBriefcase, badge: null },
    { name: "Add Fund", icon: FiPlus, badge: null },
    { name: "Buy Subscription", icon: FiCreditCard, badge: null },
    { name: "Withdraw", icon: FiCreditCard, badge: null },
    { name: "Refer & Earn", icon: FiUser, badge: null },
    { name: "My Order", icon: FiClipboard, badge: null },
    { name: "Receive Order", icon: FiMail, badge: null },
    { name: "Post", icon: FiFileText, badge: null },
    { name: "Inbox", icon: FiMail, badge: null },
    { name: "History", icon: FiFileText, badge: null },
    { name: "Settings", icon: FiSettings, badge: null },
    { name: "Overview", icon: FiBriefcase, badge: null },
    { name: "Profile", icon: FiUser, badge: null },
  ];

  // Conditionally add Home button only for admin
  const getFilteredNavItems = () => {
    const items = [...navItems];
    
    if (role === 'admin') {
      items.push({ name: "Home", icon: FiHome, badge: null });
    }
    
    return items;
  };

  const filteredNavItems = getFilteredNavItems();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut(auth);
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      alert("Failed to log out. Please try again.");
    } finally {
      setIsLoggingOut(false);
      setShowLogoutConfirm(false);
    }
  };

  const handleProfileClick = () => {
    setActivePage("Profile");
    setShowUserMenu(false); // Close any open menu
    if (isMobile) setSidebarOpen(false); // Close sidebar on mobile
  };

  const getUserDisplayName = () => {
    if (user?.displayName) return user.displayName;
    if (user?.email) return user.email.split("@")[0];
    return "User";
  };

  const getUserEmail = () => {
    return user?.email || "user@example.com";
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex h-screen overflow-hidden">
        <aside
          className={`fixed lg:sticky top-0 z-50 w-64 h-screen bg-blue-500 text-white shadow-xl border-r border-gray-300 transform transition-transform duration-300 ease-in-out flex flex-col ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="p-6 border-b border-gray-300 flex flex-col items-center text-center">
            <div
              className="w-20 h-20 bg-white rounded-full overflow-hidden mb-3 ring-4 ring-white/20 cursor-pointer hover:ring-white/40 transition-all duration-200"
              onClick={handleProfileClick}
            >
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src="https://i.pravatar.cc/80?img=13"
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <h2 className="text-lg font-bold">{getUserDisplayName()}</h2>
            <p className="text-sm text-gray-300">{getUserEmail()}</p>
          </div>

          <div className="flex-1 overflow-y-auto hide-scrollbar">
            <nav className="mt-6 px-4 flex flex-col gap-2">
              {filteredNavItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activePage === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      setActivePage(item.name);
                      if (isMobile) setSidebarOpen(false);
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-300 
                        ${
                          isActive
                            ? "bg-white text-blue-500 font-semibold shadow-md"
                            : "hover:bg-blue-600 text-white"
                        }`}
                  >
                    <IconComponent className="text-xl" />
                    <span className="text-sm flex-1">{item.name}</span>
                    {item.badge && (
                      <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-4 border-t border-blue-400/30">
            <button
              onClick={() => setShowLogoutConfirm(true)}
              disabled={isLoggingOut}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-300 bg-red-500/20 hover:bg-red-500/30 text-white border border-red-400/30 hover:border-red-400/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoggingOut ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm">Logging out...</span>
                </>
              ) : (
                <>
                  <FiLogOut className="text-xl" />
                  <span className="text-sm flex-1">Log Out</span>
                </>
              )}
            </button>
          </div>
        </aside>

        <div className="flex-1 overflow-y-auto hide-scrollbar">
          <div className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 flex items-center justify-between shadow-lg sticky top-0 z-30">
            <div className="flex items-center gap-3">
              <div className="bg-white w-10 h-10 rounded-full p-1 hidden md:inline shadow-md">
                <img
                  src={logo}
                  alt="Saonline Zone Logo"
                  className="w-full h-full rounded-full object-contain"
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold">Saonline Zone</h1>
                <p className="text-blue-100 text-xs">Dashboard</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <button className="hover:bg-white/10 p-2 rounded-full transition-all duration-200 hover:scale-105">
                  <FiBell className="text-xl" />
                </button>
                <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
              </div>

              <div className="relative">
                <button
                  onClick={handleProfileClick}
                  className="flex items-center gap-3 hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105"
                >
                  <img
                    src={user?.photoURL || "https://i.pravatar.cc/40?img=13"}
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 border-white/30 shadow-md"
                  />
                </button>
              </div>
            </div>
          </div>

          <main className="p-3 md:p-6 lg:p-8 min-h-screen">
            <button
              data-sidebar-toggle
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden fixed top-3 left-3 md:top-4 md:left-4 z-40 p-2.5 md:p-3 bg-white text-blue-500 shadow-lg hover:shadow-xl font-bold mt-2 transform hover:scale-105 transition-all duration-300 rounded-lg touch-manipulation"
            >
              <FiMenu className="text-lg md:text-xl" />
            </button>

            {activePage === "Dashboard" && <DashboardHome />}
            {activePage === "Add Fund" && (
              <UserRoute>
                <AddFund />
              </UserRoute>
            )}
            {activePage === "Buy Subscription" && (
              <UserRoute>
                <BuySubscription />
              </UserRoute>
            )}
            {activePage === "Withdraw" && (
              <AdminRoute>
                <WithDrawForm />
              </AdminRoute>
            )}
            {activePage === "Refer & Earn" && <ReferEarn />}
            {activePage === "My Order" && <MyOrders />}
            {activePage === "Receive Order" && <ReceiveOrder />}
            {activePage === "Post" && <PostManagement />}
            {activePage === "Inbox" && <Inbox />}
            {activePage === "History" && <History />}
            {activePage === "Settings" && <Settings />}
            {activePage === "Overview" && <Overview />}
            {activePage === "Profile" && <Profile />}
            {activePage === "Home" && (
              <AdminRoute>
                <Navigate to="/"></Navigate>
              </AdminRoute>
            )}
          </main>
        </div>
      </div>

      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiLogOut className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Confirm Logout
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to log out? You'll need to sign in again
                to access your account.
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
                    "Log Out"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {showUserMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;