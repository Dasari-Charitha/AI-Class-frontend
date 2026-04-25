import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function MainLayout({ children }: { children: ReactNode }) {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen flex text-white">
      <aside className="w-64 hidden md:flex flex-col p-6 border-r border-white/10">
        <h1 className="text-xl font-bold text-yellow-400 mb-8">
          AI Classroom
        </h1>

        <nav className="flex flex-col gap-4 text-gray-300">
          <Link to="/student">Student</Link>
          <Link to="/teacher">Teacher</Link>
          <Link to="/hod">HOD</Link>
          <Link to="/principal">Principal</Link>
          <Link to="/create-exam">Create Exam</Link>
          <Link to="/take-test">Take Test</Link>
        </nav>

        <button
          onClick={logout}
          className="mt-auto bg-yellow-400 text-black py-2 rounded"
        >
          Logout
        </button>
      </aside>

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}