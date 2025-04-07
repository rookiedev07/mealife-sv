import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Footer from './components/footer';
import './styles/AboutUs.css';
import Header from './components/header';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Review from './components/review';
import Reservation from './components/reserve';
import Price from './components/price';
import Landing from './landing';
import Diner from './components/diner';
import SignIn from './components/Auth/SignIn'
import RequestCard from './components/RequestCard';
import AboutUs from './components/AboutUs'
import SignUp from './components/Auth/Signup'
import ProfileForm from './components/profileform';
import Performance from './components/performance';
import CustomerReviews from './components/customer-reviews';
import Reservations from './components/Reservations';
import RoleSelect from './components/Auth/RoleSelect';
import SearchResults from './components/Results';
import RequireRole from './components/RequireRole';
import BookingRequests from './components/BookingRequests';
import NoResultsFound from './components/NoResultsFound';
import ProfilePage from './components/profilepage';

function App() {
  const location = useLocation();
  console.log('Current route:', location.pathname); // Debug log for current route

  const hideHeaderFooterRoutes = [
    '/signin',
    '/signup',
    '/requests',
    '/new-dish',
    '/performance',
    '/customer-reviews',
    '/register-restaurant',
    '/bookings',
    '/usersetup',
    '/role-selection',
    '/diner'
  ];

  const shouldHideHeaderFooter = hideHeaderFooterRoutes.includes(location.pathname);

  return (
    <div className="parent">
      {/* Conditionally render Header */}
      {!shouldHideHeaderFooter && <Header />}

      <nav>
        {/* Links to navigate between pages */}
        <Link to="/"></Link>
        <Link to="/reserve"></Link>
        <Link to="/review"></Link>
        <Link to="/register-restaurant"></Link>
      </nav>

      {/* Consolidated Routes */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Landing />} />
        <Route path="/reserve" element={<Reservation />} />
        <Route path="/review" element={<Review />} />
        <Route path="/register-restaurant" element={<ProfileForm />} />
        <Route path="/role-selection" element={<RoleSelect />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/requests" element={<BookingRequests />} />
        <Route path="/no-results" element={<NoResultsFound />} />
        <Route path="/results" element={<SearchResults />} />
        <Route path="/profile" element={<ProfilePage />} /> 
        <Route path="/diner" element={<Diner />} />
        <Route path="/performance" element={<Performance />} />
        <Route path="/customer-reviews" element={<CustomerReviews />} />
        <Route path="/bookings" element={<Reservations />} />
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>

      {/* Conditionally render Footer */}
      {!shouldHideHeaderFooter && <Footer />}
    </div>
  );
}

export default App;
