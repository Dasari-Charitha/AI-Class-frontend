import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/select-role");
    } catch (error: any) {
      console.error("Signup error:", error.code, error.message);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="glass p-8 w-full max-w-sm space-y-4">
        <h2 className="text-3xl font-bold text-center text-yellow-400">
          Create Account
        </h2>

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

        <button
          onClick={handleSignup}
          className="w-full bg-yellow-400 text-black py-3 rounded font-semibold hover:bg-yellow-300"
        >
          Sign Up
        </button>

        <p className="text-center text-sm text-gray-300">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-400 hover:underline">
            Login
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