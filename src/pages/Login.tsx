import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "../components/ThemeToggle";

type Role = "student" | "teacher" | "hod" | "principal";

export default function Login() {
  const [role, setRoleState] = useState<Role>("student");
  const { loginWithGoogle, setRole } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    await loginWithGoogle();
    setRole(role);
    navigate(`/${role}`);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-100 px-4 text-slate-900 transition-colors duration-300 dark:bg-[#050816] dark:text-white">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="network-bg opacity-30 dark:opacity-100"></div>
        <div className="absolute left-20 top-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-600/20"></div>
        <div className="absolute bottom-20 right-20 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl dark:bg-purple-600/20"></div>
      </div>

      {/* Floating Nodes */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 18 }).map((_, index) => (
          <span
            key={index}
            className="particle-node"
            style={{
              top: `${10 + Math.random() * 80}%`,
              left: `${10 + Math.random() * 80}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-[370px] rounded-3xl border border-slate-200 bg-white/90 p-8 text-slate-900 shadow-2xl backdrop-blur-xl dark:border-white/15 dark:bg-white/10 dark:text-white">
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="text-sm font-semibold text-blue-600 transition hover:text-purple-600 dark:text-blue-300 dark:hover:text-purple-300"
          >
            ← Go to Home
          </button>

          <ThemeToggle />
        </div>

        <h2 className="mb-2 text-center text-3xl font-black text-slate-900 dark:bg-gradient-to-r dark:from-blue-400 dark:to-purple-400 dark:bg-clip-text dark:text-transparent">
          Welcome Back
        </h2>

        <p className="mb-6 text-center text-slate-600 dark:text-gray-300">
          Select your role and continue
        </p>

        <select
          value={role}
          onChange={(e) => setRoleState(e.target.value as Role)}
          className="mb-5 w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 dark:border-white/15 dark:bg-black/40 dark:text-white"
        >
          <option className="text-black" value="student">
            Student
          </option>
          <option className="text-black" value="teacher">
            Teacher
          </option>
          <option className="text-black" value="hod">
            HOD
          </option>
          <option className="text-black" value="principal">
            Principal
          </option>
        </select>

        <button
          onClick={handleLogin}
          className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-3 font-bold text-white shadow-lg transition hover:scale-105"
        >
          Login with Google
        </button>

        <p
          onClick={() => navigate("/signup")}
          className="mt-5 cursor-pointer text-center text-sm font-medium text-blue-600 transition hover:text-purple-600 dark:text-blue-300 dark:hover:text-purple-300"
        >
          Don’t have an account? Start for Free
        </p>
      </div>
    </div>
  );
}