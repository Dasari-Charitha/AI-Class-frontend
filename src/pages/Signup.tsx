import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

export default function Signup() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="glass p-8 rounded-xl w-96">
        <div className="flex justify-end mb-3">
          <ThemeToggle />
        </div>

        <h1 className="text-2xl font-bold text-yellow-400 mb-4">
          Create Account
        </h1>

        <input placeholder="Name" className="input" />
        <input placeholder="Email" className="input mt-2" />
        <input placeholder="Password" className="input mt-2" />

        <button
          onClick={() => navigate("/login")}
          className="w-full bg-yellow-400 text-black py-2 rounded-lg font-semibold mt-4"
        >
          Register
        </button>

        <p
          onClick={() => navigate("/login")}
          className="mt-4 text-center cursor-pointer text-yellow-400"
        >
          Already have an account?
        </p>
      </div>
    </div>
  );
}