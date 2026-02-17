import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Dashboard from "./pages/Dashboard";
import Backlog from "./pages/Backlog";
import ActiveSprints from "./pages/ActiveSprints";
import Report from "./pages/Report";
import Settings from "./pages/settings/settings";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    navigate("/dashboard");
  };

  const handleSignup = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    navigate("/dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const publicRoutes = ["/", "/login", "/signup"];
  const isPublicRoute = publicRoutes.includes(location.pathname);

  if (!user && !isPublicRoute) {
    return <Navigate to="/login" />;
  }

  if (user && isPublicRoute) {
    return <Navigate to="/dashboard" />;
  }

  if (isPublicRoute) {
    return (
      <Routes>
        <Route path="/" element={<Signup onSignup={handleSignup} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
      </Routes>
    );
  }

  return (
    <div className="flex w-full h-screen bg-gray-50">
      <Sidebar user={user} />

      <div className="flex-1 flex flex-col">
        <Topbar user={user} onLogout={handleLogout} />

        <div className="p-6 overflow-auto h-full">
          <Routes>
            <Route path="/dashboard" element={<Dashboard user={user} />} />
            <Route path="/backlog" element={<Backlog user={user} />} />
            <Route path="/sprints" element={<ActiveSprints user={user} />} />
            <Route path="/report" element={<Report user={user} />} />
            <Route path="/settings/*" element={<Settings user={user} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
