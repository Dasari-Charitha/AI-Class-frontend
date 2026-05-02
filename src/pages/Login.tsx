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
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050816] text-white">
      {/* Particle Network Background */}
      <div className="absolute inset-0">
        <div className="network-bg"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Floating Nodes */}
      <div className="absolute inset-0 pointer-events-none">
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
      <div className="relative z-10 w-[370px] p-8 rounded-3xl bg-white/10 border border-white/15 shadow-2xl backdrop-blur-xl">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate("/")}
            className="text-sm font-semibold text-blue-300 hover:text-purple-300 transition"
          >
            ← Go to Home
          </button>

          <ThemeToggle />
        </div>

        <h2 className="text-3xl font-black mb-2 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Welcome Back
        </h2>

        <p className="text-center text-gray-300 mb-6">
          Select your role and continue
        </p>

        <select
          value={role}
          onChange={(e) => setRoleState(e.target.value as Role)}
          className="w-full p-3 rounded-xl mb-5 bg-black/40 border border-white/15 outline-none text-white"
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
          className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold hover:scale-105 transition"
        >
          Login with Google
        </button>

        <p
          onClick={() => navigate("/signup")}
          className="mt-5 text-center cursor-pointer text-sm text-blue-300 hover:text-purple-300 transition"
        >
          Don’t have an account? Start for Free
        </p>
      </div>
    </div>
  );
}