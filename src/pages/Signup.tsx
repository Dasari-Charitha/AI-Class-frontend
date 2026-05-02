import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    alert("Account created successfully!");
    navigate("/login");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050816] text-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="network-bg"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 w-[380px] rounded-3xl border border-white/15 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="text-sm font-semibold text-blue-300 hover:text-purple-300"
          >
            ← Go to Home
          </button>

          <ThemeToggle />
        </div>

        <h1 className="mb-2 text-center text-3xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Create Account
        </h1>

        <p className="mb-6 text-center text-gray-300">
          Start your AI classroom journey
        </p>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-gray-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30"
            required
          />

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-3 font-bold text-white"
          >
            Register
          </button>
        </form>

        <p
          onClick={() => navigate("/login")}
          className="mt-5 cursor-pointer text-center text-sm text-blue-300 hover:text-purple-300"
        >
          Already have an account? Sign In
        </p>
      </div>
    </div>
  );
}