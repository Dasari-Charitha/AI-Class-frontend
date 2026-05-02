import type { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "../components/ThemeToggle";

export default function MainLayout({ children }: { children: ReactNode }) {
  const { logout, role } = useAuth();
  const navigate = useNavigate();

  const links = [
    { to: "/student", label: "Student Dashboard", role: "student" },
    { to: "/teacher", label: "Teacher Dashboard", role: "teacher" },
    { to: "/hod", label: "HOD Dashboard", role: "hod" },
    { to: "/principal", label: "Principal Dashboard", role: "principal" },
  ];

  const visibleLinks = links.filter((item) => item.role === role);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="relative min-h-screen flex app-bg text-white transition">
      {/* Visible animated background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-120px] left-[-120px] w-[420px] h-[420px] rounded-full bg-blue-600/40 blur-3xl animate-pulse" />
        <div className="absolute top-[20%] right-[-140px] w-[460px] h-[460px] rounded-full bg-purple-600/35 blur-3xl animate-pulse" />
        <div className="absolute bottom-[-160px] left-[35%] w-[520px] h-[520px] rounded-full bg-cyan-500/25 blur-3xl animate-pulse" />

        <div className="absolute inset-0 opacity-[0.12] bg-[linear-gradient(rgba(96,165,250,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.45)_1px,transparent_1px)] bg-[size:80px_80px] animate-[gridMove_22s_linear_infinite]" />
      </div>

      <motion.aside
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.55 }}
        className="relative z-10 w-64 hidden md:flex flex-col p-6 bg-white/10 backdrop-blur-2xl border-r border-white/10"
      >
        <h1 className="text-xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          AI Classroom
        </h1>

        <nav className="flex flex-col gap-3 text-gray-300">
          {visibleLinks.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-xl px-4 py-3 hover:bg-white/10 hover:text-blue-300 hover:translate-x-2 transition"
            >
              {item.label}
            </Link>
          ))}

          <button
            onClick={() => navigate("/login")}
            className="text-left rounded-xl px-4 py-3 hover:bg-white/10 hover:text-blue-300 transition"
          >
            Switch Role
          </button>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-auto w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold"
        >
          Logout
        </button>
      </motion.aside>

      <motion.main
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative z-10 flex-1 p-6 page-animate"
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-white">Dashboard</h2>
            <p className="text-sm text-gray-300">
              AI Classroom Intelligence System
            </p>
          </div>

          <ThemeToggle />
        </div>

        {children}
      </motion.main>
    </div>
  );
}