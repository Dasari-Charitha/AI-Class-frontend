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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-100 px-4 text-slate-900 transition-colors duration-300 dark:bg-[#050816] dark:text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="network-bg opacity-30 dark:opacity-100"></div>
        <div className="absolute left-20 top-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-600/20"></div>
        <div className="absolute bottom-20 right-20 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl dark:bg-purple-600/20"></div>
      </div>

      <div className="relative z-10 w-full max-w-[380px] rounded-3xl border border-slate-200 bg-white/90 p-8 text-slate-900 shadow-2xl backdrop-blur-xl dark:border-white/15 dark:bg-white/10 dark:text-white">
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="text-sm font-semibold text-blue-600 transition hover:text-purple-600 dark:text-blue-300 dark:hover:text-purple-300"
          >
            ← Go to Home
          </button>

          <ThemeToggle />
        </div>

        <h1 className="mb-2 text-center text-3xl font-black text-slate-900 dark:bg-gradient-to-r dark:from-blue-400 dark:to-purple-400 dark:bg-clip-text dark:text-transparent">
          Create Account
        </h1>

        <p className="mb-6 text-center text-slate-600 dark:text-gray-300">
          Start your AI classroom journey
        </p>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 dark:border-white/15 dark:bg-white/10 dark:text-white dark:placeholder:text-gray-400"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 dark:border-white/15 dark:bg-white/10 dark:text-white dark:placeholder:text-gray-400"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 dark:border-white/15 dark:bg-white/10 dark:text-white dark:placeholder:text-gray-400"
            required
          />

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-3 font-bold text-white shadow-lg transition hover:scale-105"
          >
            Register
          </button>
        </form>

        <p
          onClick={() => navigate("/login")}
          className="mt-5 cursor-pointer text-center text-sm font-medium text-blue-600 transition hover:text-purple-600 dark:text-blue-300 dark:hover:text-purple-300"
        >
          Already have an account? Sign In
        </p>
      </div>
    </div>
  );
}