import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore.js';

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="navbar bg-base-100 shadow-lg px-4 md:px-8">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Finance Tracker</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          {authUser ? (
            <>
              <li>
                <a href="/" className="btn btn-ghost">Dashboard</a>
              </li>
              <li>
                <button onClick={handleLogout} className="btn btn-ghost">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <a href="/login" className="btn btn-ghost">Login</a>
              </li>
              <li>
                <a href="/register" className="btn btn-ghost">Register</a>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;