import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { GraduationCap, Users, BookOpen, BarChart3 } from "lucide-react";

type Role = "student" | "teacher" | "hod" | "principal";

export default function RoleSelection() {
  const navigate = useNavigate();
  const { setRole, user } = useAuth();

  const handleSelect = (role: Role) => {
    setRole(role);
    navigate(`/${role}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="glass w-full max-w-5xl p-8 md:p-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-yellow-400 text-black mb-4">
            <GraduationCap size={28} />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-yellow-400">
            Select Your Role
          </h1>

          <p className="text-gray-300 mt-3">
            {user?.email ? `Signed in as ${user.email}` : "Choose a role to continue"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => handleSelect("student")}
            className="glass text-left p-6 border border-white/10 hover:border-yellow-400/50 hover:-translate-y-1 transition"
          >
            <div className="flex items-center gap-3 mb-4">
              <Users className="text-yellow-400" size={24} />
              <h2 className="text-2xl font-semibold">Student</h2>
            </div>
            <p className="text-gray-300">
              View attendance, assignments, marks, progress, and academic insights.
            </p>
          </button>

          <button
            onClick={() => handleSelect("teacher")}
            className="glass text-left p-6 border border-white/10 hover:border-yellow-400/50 hover:-translate-y-1 transition"
          >
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="text-yellow-400" size={24} />
              <h2 className="text-2xl font-semibold">Teacher</h2>
            </div>
            <p className="text-gray-300">
              Manage classes, monitor student activity, and review performance.
            </p>
          </button>

          <button
            onClick={() => handleSelect("hod")}
            className="glass text-left p-6 border border-white/10 hover:border-yellow-400/50 hover:-translate-y-1 transition"
          >
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="text-yellow-400" size={24} />
              <h2 className="text-2xl font-semibold">HOD</h2>
            </div>
            <p className="text-gray-300">
              Track department analytics, faculty insights, and academic reports.
            </p>
          </button>

          <button
            onClick={() => handleSelect("principal")}
            className="glass text-left p-6 border border-white/10 hover:border-yellow-400/50 hover:-translate-y-1 transition"
          >
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="text-yellow-400" size={24} />
              <h2 className="text-2xl font-semibold">Principal</h2>
            </div>
            <p className="text-gray-300">
              Access institution-wide performance, summaries, and key insights.
            </p>
          </button>
        </div>

        <p className="text-center text-sm text-gray-300 mt-8">
          <Link to="/" className="hover:text-yellow-400">
            Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
}