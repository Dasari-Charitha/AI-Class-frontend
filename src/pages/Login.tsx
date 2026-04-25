import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { loginWithGoogle } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/select-role");
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate("/select-role");
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      alert("Please enter your email first.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent. Please check your inbox.");
    } catch (error: any) {
      alert(error.message);
    }
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
          animate={{
            textShadow: [
              "0 0 8px #4cc9f0",
              "0 0 20px #4361ee",
              "0 0 8px #4cc9f0",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-3xl font-bold text-center text-yellow-400"
        >
          Login
        </motion.h2>

        <p className="text-center text-sm text-gray-300">
          Access your AI Classroom dashboard
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

        <p
          onClick={handleResetPassword}
          className="text-sm text-right text-yellow-400 cursor-pointer hover:underline"
        >
          Forgot Password?
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleEmailLogin}
          className="w-full bg-yellow-400 text-black py-3 rounded font-semibold"
        >
          Login
        </motion.button>

        <div className="text-center text-gray-400">OR</div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleGoogleLogin}
          className="w-full border border-yellow-400/30 py-3 rounded"
        >
          Continue with Google
        </motion.button>

        <p className="text-center text-sm text-gray-300">
          New user?{" "}
          <Link to="/signup" className="text-yellow-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}