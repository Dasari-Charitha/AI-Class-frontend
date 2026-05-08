import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "../components/ThemeToggle";

type Role = "student" | "teacher" | "hod" | "principal";

export default function Login() {
  const [role, setRoleState] = useState<Role>("student");
  const [hodBranch, setHodBranch] = useState("cse");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { loginWithGoogle, setRole, resetPassword } = useAuth();

  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    await loginWithGoogle();

    setRole(role);

    if (role === "hod") {
      localStorage.setItem("hodBranch", hodBranch);
    }

    navigate(`/${role}`);
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    setRole(role);

    if (role === "hod") {
      localStorage.setItem("hodBranch", hodBranch);
    }

    alert("Login successful!");
    navigate(`/${role}`);
  };

  const handleForgotPassword = async () => {
    if (!email) {
      alert("Please enter your email first.");
      return;
    }

    try {
      await resetPassword(email);

      alert(
        `Password reset link sent to ${email}. Please check your Spam/Junk folder if the mail is not visible in Inbox.`
      );
    } catch {
      alert("Failed to send reset email.");
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 text-slate-900 transition-colors duration-300 dark:bg-[#0a1128] dark:text-white">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute left-20 top-20 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl"></div>

        <div className="absolute bottom-20 right-20 h-80 w-80 rounded-full bg-accent-blue/8 blur-3xl dark:bg-accent-blue/12"></div>

        <div className="absolute left-1/2 top-1/3 h-48 w-48 -translate-x-1/2 rounded-full bg-gold-300/5 blur-3xl"></div>
      </div>

      {/* Floating Particles */}
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
      <div className="relative z-10 w-full max-w-[420px] rounded-3xl border border-slate-200/60 bg-white/90 p-8 text-slate-900 shadow-2xl backdrop-blur-xl dark:border-gold-600/15 dark:bg-[#111B33]/80 dark:text-white">
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="text-sm font-semibold text-gold-600 transition hover:text-gold-800 dark:text-gold-400"
          >
            ← Go to Home
          </button>

          <ThemeToggle />
        </div>

        {/* Logo */}
        <div className="mb-4 flex justify-center">
          <img
            src="/images/mascot-owl.png"
            alt=""
            className="h-16 w-16 rounded-2xl object-cover"
          />
        </div>

        {/* Heading */}
        <h2 className="mb-2 text-center font-display text-3xl font-black">
          <span className="gradient-text-gold">Welcome Back</span>
        </h2>

        <p className="mb-6 text-center text-slate-500 dark:text-slate-400">
          Sign in to continue your AI classroom journey
        </p>

        {/* Role Select */}
        <select
          value={role}
          onChange={(e) => setRoleState(e.target.value as Role)}
          className="mb-4 w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/30 dark:border-gold-600/15 dark:bg-[#0D1526] dark:text-white"
        >
          <option
            className="bg-white text-black dark:bg-[#0D1526] dark:text-white"
            value="student"
          >
            Student
          </option>

          <option
            className="bg-white text-black dark:bg-[#0D1526] dark:text-white"
            value="teacher"
          >
            Teacher
          </option>

          <option
            className="bg-white text-black dark:bg-[#0D1526] dark:text-white"
            value="hod"
          >
            HOD
          </option>

          <option
            className="bg-white text-black dark:bg-[#0D1526] dark:text-white"
            value="principal"
          >
            Principal
          </option>
        </select>

        {/* HOD Branch */}
        {role === "hod" && (
          <select
            value={hodBranch}
            onChange={(e) => setHodBranch(e.target.value)}
            className="mb-4 w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/30 dark:border-gold-600/15 dark:bg-[#0D1526] dark:text-white"
          >
            <option
              className="bg-white text-black dark:bg-[#0D1526] dark:text-white"
              value="cse"
            >
              CSE HOD
            </option>

            <option
              className="bg-white text-black dark:bg-[#0D1526] dark:text-white"
              value="ece"
            >
              ECE HOD
            </option>

            <option
              className="bg-white text-black dark:bg-[#0D1526] dark:text-white"
              value="eee"
            >
              EEE HOD
            </option>

            <option
              className="bg-white text-black dark:bg-[#0D1526] dark:text-white"
              value="mech"
            >
              MECH HOD
            </option>
          </select>
        )}

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white py-3 font-bold text-slate-800 shadow-lg transition hover:scale-105 hover:bg-slate-50 dark:border-white/10 dark:bg-[#0D1526] dark:text-white dark:hover:bg-[#17213A]"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="h-5 w-5"
          />

          Continue with Google
        </button>

        {/* Divider */}
        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-300 dark:bg-white/20"></div>

          <span className="text-sm text-slate-500 dark:text-slate-400">
            OR
          </span>

          <div className="h-px flex-1 bg-slate-300 dark:bg-white/20"></div>
        </div>

        {/* Email Login */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
          {/* Email */}
          <div className="relative">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-12 text-slate-900 placeholder:text-slate-400 outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/30 dark:border-gold-600/15 dark:bg-[#0D1526] dark:text-white"
            />

            <Mail
              size={20}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-12 text-slate-900 placeholder:text-slate-400 outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/30 dark:border-gold-600/15 dark:bg-[#0D1526] dark:text-white"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Forgot Password */}
          <p
            onClick={handleForgotPassword}
            className="cursor-pointer text-right text-sm font-semibold text-gold-600 hover:text-accent-blue dark:text-gold-400"
          >
            Forgot Password?
          </p>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-gold-600 to-gold-400 py-3 font-bold text-navy-900 shadow-lg shadow-gold-600/20 transition hover:scale-105 hover:shadow-gold-600/30"
          >
            Login
          </button>
        </form>

        {/* Signup */}
        <p
          onClick={() => navigate("/signup")}
          className="mt-5 cursor-pointer text-center text-sm font-medium text-gold-600 transition hover:text-accent-blue dark:text-gold-400"
        >
          Don't have an account? Sign Up
        </p>
      </div>
    </div>
  );
}