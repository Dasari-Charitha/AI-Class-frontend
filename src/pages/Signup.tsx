import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    await createUserWithEmailAndPassword(auth, email, password);
    navigate("/select-role");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass p-8 w-full max-w-sm space-y-4"
      >
        <motion.h2
          animate={{ textShadow: ["0 0 8px #4cc9f0", "0 0 20px #4361ee", "0 0 8px #4cc9f0"] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-3xl font-bold text-center text-yellow-400"
        >
          Create Account
        </motion.h2>

        <p className="text-center text-sm text-gray-300">
          Start your AI Classroom journey
        </p>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded bg-gray-800/80 border border-white/10 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded bg-gray-800/80 border border-white/10 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSignup}
          className="w-full bg-yellow-400 text-black py-3 rounded font-semibold"
        >
          Sign Up
        </motion.button>

        <p className="text-center text-sm text-gray-300">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-400 hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}