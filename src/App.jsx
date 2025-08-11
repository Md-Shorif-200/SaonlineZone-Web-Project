
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider } from './Provider/AuthProvider';

import Navbar from './Navbar/Navbar';
import Home from './HomePage/Home';
import About from './About/About';
import Footer from './Footer/Footer';
import Dashboard from './DashBoard/DashBoard';
import SignUp from './Authentication/SignUp';
import Spinner from './Components/Spinner';
import NotFoundPage from './Components/NotFoundPage';
import ContactPage from './Contact/ContactPage';
import useAuth from './Hooks/useAuth';
import LogIn from './Authentication/LogIn';
import { ToastContainer } from 'react-toastify';


const ProtectedRoute = ({ children, redirectTo = "/sign-in" }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) return <Spinner></Spinner>;
  
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }
  
  return children;
};


// const PublicRoute = ({ children, redirectTo = "/" }) => {
//   const { isAuthenticated, loading } = useAuth();
  
//   if (loading) return <Spinner></Spinner>;
  
//   if (isAuthenticated) {
//     return <Navigate to={redirectTo} replace />;
//   }
  
//   return children;
// };

function AppContent() {
  const location = useLocation();
  const { user, loading } = useAuth();

  const routeConfig = {
    '/': { showNavbar: true, showFooter: true, title: 'Home' },
    '/about-us': { showNavbar: true, showFooter: true, title: 'About Us' },
    '/blog': { showNavbar: true, showFooter: true, title: 'Blog' },
    '/dashboard': { showNavbar: false, showFooter: false, title: 'Dashboard' },
    '/sign-in': { showNavbar: false, showFooter: false, title: 'Sign In' },
    '/sign-up': { showNavbar: false, showFooter: false, title: 'Sign Up' },
    '/contact-us': { showNavbar: true, showFooter: true, title: 'Contact Us' }
  };

  const currentRouteConfig = routeConfig[location.pathname] || { 
    showNavbar: true, 
    showFooter: true, 
    title: 'Page' 
  };

  useEffect(() => {
    document.title = `${currentRouteConfig.title} - Your App Name`;
  }, [currentRouteConfig.title]);

  if (loading) {
    return <Spinner></Spinner>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {currentRouteConfig.showNavbar && <Navbar user={user} />}
      
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/about-us" element={<About user={user} />} />
          <Route path="/contact-us" element={<ContactPage user={user} />} />
          
          <Route 
            path="/sign-in" 
            element={
              // <PublicRoute>
              //   <SignUp />
              // </PublicRoute>
               <LogIn></LogIn>
            } 
          />

          <Route 
            path="/sign-up" 
            element={
              // <PublicRoute>
              //   <SignUp />
              // </PublicRoute>
               <SignUp></SignUp>
            } 
          />
          
          <Route 
            path="/dashboard/*" 
            element={
              <ProtectedRoute>
                <Dashboard user={user} />
              </ProtectedRoute>
            } 
          />
          
          <Route path="*" element={<NotFoundPage></NotFoundPage>} />
        </Routes>
      </main>
      
      {currentRouteConfig.showFooter && <Footer user={user} />}
    </div>
  );
}

function App() {
  return (
     <BrowserRouter>
      <AuthProvider>
        <AppContent />
        <ToastContainer position="top-right" autoClose={3000} />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;