import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ScanProduct from './pages/ScanProduct';
import Results from './pages/Results';
import CompareProducts from './pages/CompareProducts';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = React.useContext(AuthContext);
  
  if (loading) {
    return <div className="flex h-screen items-center justify-center text-tech glow-text-tech font-mono text-xl animate-pulse">Initializing Neural Link...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="relative min-h-screen overflow-hidden">
          {/* Ambient Background Particles/Glows */}
          <div className="pointer-events-none fixed inset-0 z-0">
             <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-tech/5 blur-[120px]"></div>
             <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-safe/5 blur-[150px]"></div>
          </div>
          
          <Navbar />
          
          <main className="relative z-10 pt-28 pb-12">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/scan" 
                element={
                  <ProtectedRoute>
                    <ScanProduct />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/results/:id" 
                element={
                  <ProtectedRoute>
                    <Results />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/compare" 
                element={
                  <ProtectedRoute>
                    <CompareProducts />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
