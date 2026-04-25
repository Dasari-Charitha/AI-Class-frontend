import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Login() {
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/select-role");
    } catch (err: any) {
      console.error("Login error:", err.code, err.message);
      alert(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate("/select-role");
    } catch (error: any) {
      console.error("Google login error:", error.code, error.message);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="glass p-8 w-full max-w-sm space-y-4">
        <h2 className="text-3xl font-bold text-center text-yellow-400">
          Login
        </h2>

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

        <button
          onClick={handleEmailLogin}
          className="w-full bg-yellow-400 text-black py-3 rounded font-semibold hover:bg-yellow-300"
        >
          Login
        </button>

        <div className="text-center text-gray-400">OR</div>

        <button
          onClick={handleGoogleLogin}
          className="w-full border border-yellow-400/30 py-3 rounded hover:border-yellow-400"
        >
          Continue with Google
        </button>

        <p className="text-center text-sm text-gray-300">
          New user?{" "}
          <Link to="/signup" className="text-yellow-400 hover:underline">
            Sign Up
          </Link>
        </p>

        <p className="text-center text-sm text-gray-300">
          <Link to="/" className="hover:text-yellow-400">
            Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
}