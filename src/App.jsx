import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/common/Navbar';
import ProtectedRoute from './components/common/ProtectedRoute';
import Home from './pages/Home';
import Listings from './pages/Listings';
import HotelDetails from './pages/HotelDetails';
import Booking from './pages/Booking';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';

// Placeholder Pages (will implement next)
const NotFound = () => <div className="container" style={{ padding: '50px' }}><h1>404 Not Found</h1></div>;

// Layout Component (Navbar/Footer placeholder)
const Layout = ({ children }) => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1, backgroundColor: 'var(--background)' }}>
        {children}
      </main>
      <footer style={{ background: '#1c1c1c', color: 'white', padding: '2rem 1rem', marginTop: 'auto' }}>
        <div className="container">
          <p>&copy; 2026 Snoraa. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <WishlistProvider>
          <ThemeProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/hotels" element={<Listings />} />
                <Route path="/hotels/:id" element={<HotelDetails />} />

                <Route path="/booking" element={
                  <ProtectedRoute>
                    <Booking />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
            <Toaster position="top-right" />
          </ThemeProvider>
        </WishlistProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
