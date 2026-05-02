import type { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

type MainLayoutProps = {
  children: ReactNode;
};

const roleTabs = {
  student: [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "classes", label: "Classes", icon: "📚" },
    { id: "attendance", label: "Attendance", icon: "📈" },
    { id: "leave", label: "Leave Application", icon: "📝" },
    { id: "exams", label: "Exams", icon: "🧪" },
    { id: "performance", label: "Performance", icon: "🏆" },
  ],
  teacher: [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "classes", label: "Classes", icon: "📚" },
    { id: "leaves", label: "Leave Requests", icon: "📝" },
    { id: "actions", label: "Actions", icon: "⚙️" },
    { id: "performance", label: "Performance", icon: "📈" },
  ],
  hod: [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "leaves", label: "Leave Monitoring", icon: "📝" },
    { id: "timetable", label: "Timetable", icon: "📚" },
    { id: "performance", label: "Performance", icon: "📈" },
  ],
  principal: [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "leaves", label: "Leave Overview", icon: "📝" },
    { id: "alerts", label: "Smart Alerts", icon: "🚨" },
    { id: "performance", label: "Performance", icon: "📈" },
  ],
};

export default function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const role = location.pathname.includes("teacher")
    ? "teacher"
    : location.pathname.includes("principal")
    ? "principal"
    : location.pathname.includes("hod")
    ? "hod"
    : "student";

  const currentRole =
    role === "teacher"
      ? "Teacher Dashboard"
      : role === "principal"
      ? "Principal Dashboard"
      : role === "hod"
      ? "HOD Dashboard"
      : "Student Dashboard";

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/login");
  };

  const changeTab = (tabId: string) => {
    window.dispatchEvent(
      new CustomEvent(`${role}TabChange`, { detail: tabId })
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 transition-colors duration-300 dark:bg-[#020617] dark:text-white">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 flex-col justify-between border-r border-slate-200 bg-white/90 p-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-white/10 lg:flex">
          <div>
            <div className="mb-10 flex items-center gap-3">
              <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-3 text-2xl text-white shadow-lg">
                🎓
              </div>

              <div>
                <h1 className="text-xl font-black text-slate-900 dark:text-white">
                  AI Classroom
                </h1>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  Intelligence System
                </p>
              </div>
            </div>

            <nav className="space-y-2">
              {roleTabs[role].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => changeTab(tab.id)}
                  className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left font-semibold text-slate-700 transition hover:bg-blue-100 hover:text-blue-700 dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  <span>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-2xl bg-red-100 px-4 py-3 font-bold text-red-600 transition hover:bg-red-200 dark:bg-red-500/20 dark:text-red-300 dark:hover:bg-red-500/30"
          >
            <span>🚪</span>
            Logout
          </button>
        </aside>

        <main className="flex-1">
          <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 px-6 py-4 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-[#020617]/90">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Dashboard
                </p>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                  {currentRole}
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <ThemeToggle />

                <Link
                  to="/roles"
                  className="hidden rounded-xl border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-800 shadow-sm transition hover:bg-blue-50 dark:border-white/10 dark:bg-white/10 dark:text-white md:block"
                >
                  🔄 Switch Roles
                </Link>
              </div>
            </div>
          </header>

          <div className="border-b border-slate-200 bg-white/90 px-4 py-3 dark:border-white/10 dark:bg-white/10 lg:hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 p-2 text-xl text-white">
                  🎓
                </div>

                <div>
                  <h1 className="text-base font-black text-slate-900 dark:text-white">
                    AI Classroom
                  </h1>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Intelligence System
                  </p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="rounded-xl bg-red-100 px-3 py-2 text-sm font-bold text-red-600 dark:bg-red-500/20 dark:text-red-300"
              >
                Logout
              </button>
            </div>
          </div>

          <section className="p-4 text-slate-900 dark:text-white md:p-8">
            {children}
          </section>
        </main>
      </div>
    </div>
  );
}