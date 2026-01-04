
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { User, Saloon, Booking } from './types';
import HomeView from './views/HomeView';
import SaloonDetailView from './views/SaloonDetailView';
import BookingsView from './views/BookingsView';
import StyleLabView from './views/StyleLabView';
import AdminDashboard from './views/AdminDashboard';
import LoginView from './views/LoginView';

const Navbar: React.FC<{ user: User | null; onLogout: () => void }> = ({ user, onLogout }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path ? "text-indigo-600 font-bold" : "text-slate-600 hover:text-indigo-600 transition";

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-serif text-xl font-bold italic">G</span>
              </div>
              <span className="text-xl font-serif font-bold tracking-tight text-slate-900 hidden sm:block">Glow & Go</span>
            </Link>
          </div>

          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className={isActive('/')}>Discover</Link>
            <Link to="/lab" className={isActive('/lab')}>Style Lab AI</Link>
            {user && <Link to="/bookings" className={isActive('/bookings')}>My Appointments</Link>}
            {user?.role === 'admin' && <Link to="/admin" className={isActive('/admin')}>Admin</Link>}
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-slate-900">{user.name}</p>
                  <p className="text-xs text-slate-500 capitalize">{user.role}</p>
                </div>
                <button 
                  onClick={onLogout}
                  className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-full hover:bg-indigo-100 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/login"
                className="px-6 py-2 text-sm font-medium text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transition shadow-sm"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('glow_go_user');
    const savedBookings = localStorage.getItem('glow_go_bookings');
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedBookings) setBookings(JSON.parse(savedBookings));
  }, []);

  const handleLogin = (u: User) => {
    setUser(u);
    localStorage.setItem('glow_go_user', JSON.stringify(u));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('glow_go_user');
  };

  const handleAddBooking = (b: Booking) => {
    const updated = [...bookings, b];
    setBookings(updated);
    localStorage.setItem('glow_go_bookings', JSON.stringify(updated));
  };

  const handleUpdateBookingStatus = (id: string, status: any) => {
    const updated = bookings.map(b => b.id === id ? { ...b, status } : b);
    setBookings(updated);
    localStorage.setItem('glow_go_bookings', JSON.stringify(updated));
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar user={user} onLogout={handleLogout} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/saloon/:id" element={<SaloonDetailView user={user} onAddBooking={handleAddBooking} />} />
            <Route path="/bookings" element={<BookingsView user={user} bookings={bookings} />} />
            <Route path="/lab" element={<StyleLabView />} />
            <Route path="/admin" element={<AdminDashboard user={user} bookings={bookings} onUpdateStatus={handleUpdateBookingStatus} />} />
            <Route path="/login" element={<LoginView onLogin={handleLogin} />} />
          </Routes>
        </main>
        
        <footer className="bg-slate-900 text-slate-400 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-slate-800 pb-12">
              <div>
                <h3 className="text-white font-serif text-2xl mb-4">Glow & Go</h3>
                <p className="text-sm">Elevating beauty through technology. Book your next appointment in seconds.</p>
              </div>
              <div>
                <h4 className="text-white font-medium mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/" className="hover:text-white transition">Discover Saloons</Link></li>
                  <li><Link to="/lab" className="hover:text-white transition">AI Style Lab</Link></li>
                  <li><Link to="/bookings" className="hover:text-white transition">Manage Bookings</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-medium mb-4">Saloon Owners</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/login" className="hover:text-white transition">Partner with us</Link></li>
                  <li><Link to="/admin" className="hover:text-white transition">Admin Dashboard</Link></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs">
              <p>&copy; 2024 Glow & Go. All rights reserved.</p>
              <div className="flex space-x-6">
                <a href="#" className="hover:text-white transition">Privacy Policy</a>
                <a href="#" className="hover:text-white transition">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
