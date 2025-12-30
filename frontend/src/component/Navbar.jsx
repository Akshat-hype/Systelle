import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Calendar,
  HeartPulse,
  Dumbbell,
  User,
  HelpCircle,
  Info,
  LogOut,
  X,
} from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const location = useLocation();

  // ✅ Fetch user details from backend
  useEffect(() => {
    fetch("http://localhost:5000/home/profile", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 401) window.location.href = "/login";
        return res.json();
      })
      .then((data) => {
        if (data?.name) setUserName(data.name);
        if (data?.email) setUserEmail(data.email);
      })
      .catch((err) => console.error("Error fetching user details:", err));
  }, []);

  // ✅ Logout Function
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const res = await response.json();
      if (res.message === "Logged out successfully") {
        window.location.href = "/login";
      } else {
        alert("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const navItems = [
    { name: "Dashboard", path: "/home", icon: <LayoutDashboard size={22} /> },
    { name: "Calendar", path: "/calendar", icon: <Calendar size={22} /> },
    { name: "Health", path: "/health", icon: <HeartPulse size={22} /> },
    { name: "Exercises", path: "/exercise", icon: <Dumbbell size={22} /> },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* 🔹 Top Navigation Bar */}
      <nav className="flex justify-between items-center max-w-[85%] bg-white/80 p-3 rounded-2xl mx-auto shadow-lg backdrop-blur-md mt-3 transition-all duration-300">
        {/* Logo Section */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-md">
            <span className="text-white text-lg sm:text-xl font-bold">❄</span>
          </div>
          <h1 className="text-lg sm:text-2xl font-bold text-gray-800">
            Systelle
          </h1>
        </div>

        {/* Center Navigation */}
        <div className="hidden sm:flex items-center gap-5">
          {navItems.map((item) => (
            <Link key={item.name} to={item.path}>
              {isActive(item.path) ? (
                <motion.div
                  layout
                  className="bg-gradient-to-r from-pink-100 to-indigo-200 text-gray-800 px-5 py-2 rounded-full font-semibold shadow-sm flex items-center gap-2"
                >
                  {item.icon}
                  <span className="hidden sm:inline">{item.name}</span>
                </motion.div>
              ) : (
                <div className="text-gray-400 hover:text-gray-700 transition-all flex justify-center items-center p-2 rounded-full">
                  {item.icon}
                </div>
              )}
            </Link>
          ))}
        </div>

        {/* Profile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gray-200 flex items-center justify-center hover:scale-105 transition shadow-md border border-gray-300"
        >
          <User className="text-gray-700" size={20} />
        </button>
      </nav>

      {/* 🔹 Mobile Bottom Nav (Visible on small screens) */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md shadow-lg rounded-full px-5 py-2 flex justify-around items-center w-[90%] sm:hidden border border-gray-200 z-30">
        {navItems.map((item) => (
          <Link key={item.name} to={item.path} className="flex flex-col items-center">
            {isActive(item.path) ? (
              <div className="bg-gradient-to-r from-pink-100 to-indigo-200 p-2 rounded-full shadow-sm">
                {item.icon}
              </div>
            ) : (
              <div className="text-gray-400 hover:text-gray-700 transition-all p-2">
                {item.icon}
              </div>
            )}
          </Link>
        ))}
        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
        >
          <User className="text-gray-600" size={20} />
        </button>
      </div>

      {/* 🔹 Side Navigation Overlay */}
      <AnimatePresence>
        {open && (
          <>
            {/* Background Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Slide-in Menu */}
            <motion.div
              className="fixed top-0 right-0 w-[60%] sm:w-80 h-full bg-white/70 backdrop-blur-xl shadow-2xl z-50 flex flex-col p-6 space-y-6 rounded-l-3xl overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            >

              <hr className="border-gray-300/50" />

              {/* User Info */}
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-400 to-purple-400 flex items-center justify-center shadow-md">
                  <User className="text-white" size={32} />
                </div>
                <h3 className="font-semibold text-gray-800 text-lg">
                  {userName || "User"}
                </h3>
                <p className="text-gray-500 text-sm">
                  {userEmail || "user@example.com"}
                </p>
              </div>

              <hr className="border-gray-300/50" />

              {/* Menu Items */}
              <div className="flex flex-col space-y-4 text-gray-700 font-medium">
                <Link
                  to="/home/profile"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 hover:text-indigo-600 transition"
                >
                  <User size={20} /> Profile
                </Link>
                <Link
                  to="/home/help"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 hover:text-indigo-600 transition"
                >
                  <HelpCircle size={20} /> Help
                </Link>
                <Link
                  to="/home/aboutus"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 hover:text-indigo-600 transition"
                >
                  <Info size={20} /> About Us
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 text-red-500 hover:text-red-600 transition"
                >
                  <LogOut size={20} /> Logout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
