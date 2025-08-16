import './index.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { Loader } from 'lucide-react';
import { useAuthStore } from './store/useAuthStore.js';

import Layout from './components/Layout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start">
      <Toaster />
      <Routes>
        {/* Protected routes */}
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={authUser ? <Dashboard /> : <Navigate to={'/login'} />}
          />
        </Route>

        {/* Public routes */}
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to={'/'} />}
        />
        <Route
          path="/register"
          element={!authUser ? <Register /> : <Navigate to={'/'} />}
        />
        
        {/* Catch-all route */}
        <Route path="*" element={<Navigate to={authUser ? '/' : '/login'} />} />
      </Routes>
    </div>
  );
}

export default App;