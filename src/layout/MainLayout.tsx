import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export default function MainLayout({ children }: { children: ReactNode }) {
  const { logout } = useAuth();

  const links = [
    { to: "/student", label: "Student" },
    { to: "/teacher", label: "Teacher" },
    { to: "/hod", label: "HOD" },
    { to: "/principal", label: "Principal" },
    { to: "/create-exam", label: "Create Exam" },
    { to: "/take-test", label: "Take Test" },
    { to: "/select-role", label: "Switch Role" },
  ];

  return (
    <div className="min-h-screen flex text-white">
      <motion.aside
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.55 }}
        className="w-64 hidden md:flex flex-col p-6 border-r border-white/10"
      >
        <motion.h1
          animate={{ textShadow: ["0 0 8px #4cc9f0", "0 0 20px #4361ee", "0 0 8px #4cc9f0"] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-xl font-bold text-yellow-400 mb-8"
        >
          AI Classroom
        </motion.h1>

        <nav className="flex flex-col gap-4 text-gray-300">
          {links.map((item, index) => (
            <motion.div
              key={item.to}
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.06 }}
              whileHover={{ x: 8, scale: 1.04 }}
            >
              <Link to={item.to}>{item.label}</Link>
            </motion.div>
          ))}
        </nav>

        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          onClick={logout}
          className="mt-auto bg-yellow-400 text-black py-2 rounded"
        >
          Logout
        </motion.button>
      </motion.aside>

      <motion.main
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="flex-1 p-6"
      >
        {children}
      </motion.main>
    </div>
  );
}