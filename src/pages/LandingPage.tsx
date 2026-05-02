import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

const features = [
  ["📅", "Smart Timetable", "Auto display daily class schedules."],
  ["📝", "Leave Workflow", "Apply, approve and monitor leave requests."],
  ["📊", "Attendance Insights", "Track attendance and identify risk."],
  ["🧪", "Exam Tracker", "View exams and daily test attempts."],
  ["🧠", "AI Guidance", "Find weak areas and get suggestions."],
  ["👥", "Role Dashboards", "Separate views for every academic role."],
];

const steps = [
  ["01", "Select Role", "Choose Student, Teacher, HOD or Principal."],
  ["02", "Access Dashboard", "View personalized academic information."],
  ["03", "Manage Tasks", "Handle timetable, leave, exams and performance."],
  ["04", "Improve Outcomes", "Use insights to improve learning quality."],
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 transition-colors duration-300 dark:bg-[#070b16] dark:text-white">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-[#070b16]/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <h1 className="text-2xl font-black tracking-tight">
            <span className="text-blue-600 dark:text-blue-400">AI</span>{" "}
            Classroom
          </h1>

          <div className="hidden items-center gap-8 text-sm font-semibold text-slate-600 dark:text-slate-300 md:flex">
            <a
              href="#features"
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              Features
            </a>
            <a
              href="#how"
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              How it Works
            </a>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />

            <button
              onClick={() => navigate("/login")}
              className="rounded-xl px-4 py-2 font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
            >
              Sign In
            </button>

            <button
              onClick={() => navigate("/signup")}
              className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2.5 font-bold text-white shadow-lg shadow-blue-600/20 hover:shadow-purple-600/25"
            >
              Start for Free
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-blue-500/15 blur-3xl" />
        <div className="absolute right-0 top-16 h-96 w-96 rounded-full bg-purple-500/15 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2">
          <div className="page-animate">
            <div className="mb-6 inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700 dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-300">
              ✨ AI-powered education platform
            </div>

            <h1 className="text-5xl font-black leading-tight md:text-7xl">
              The Future of
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Smart Learning
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              Manage timetable, attendance, exams, leave requests and
              performance insights from one intelligent classroom platform.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/signup")}
                className="rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-7 py-4 font-black text-white shadow-xl shadow-blue-600/20 transition hover:-translate-y-1"
              >
                Start for Free →
              </button>

              <button
                onClick={() => navigate("/login")}
                className="rounded-2xl border border-slate-300 bg-white px-7 py-4 font-bold text-slate-900 transition hover:-translate-y-1 hover:border-blue-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
              >
                Sign In
              </button>
            </div>

            <div className="mt-12 grid max-w-lg grid-cols-3 gap-6">
              {[
                ["4", "Roles"],
                ["24/7", "Access"],
                ["AI", "Insights"],
              ].map(([value, label]) => (
                <div key={label}>
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white">
                    {value}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="page-animate">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-blue-600/10 dark:border-white/10 dark:bg-[#0f172a]">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-white">
                <div className="flex items-center justify-between">
                  <h3 className="font-black">Attendance Tracker</h3>
                  <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-bold text-green-600 dark:text-green-400">
                    Live
                  </span>
                </div>

                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                  87% attendance today across 6 classes
                </p>

                <div className="mt-4 h-3 rounded-full bg-slate-200 dark:bg-white/10">
                  <div className="h-3 w-[87%] rounded-full bg-gradient-to-r from-blue-600 to-purple-600" />
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 text-slate-900 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-[#020617] dark:text-white">
                  <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-300">
                    Class Analytics
                  </h2>

                  <p className="mt-2 text-4xl font-black text-blue-600 dark:text-blue-400">
                    87%
                  </p>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Average Score
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white/90 p-5 text-slate-900 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-[#020617] dark:text-white">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    ⏱️ Live Test
                  </p>
                  <h3 className="mt-2 text-xl font-black text-red-600 dark:text-red-400">
                    LIVE
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    24 students taking test now
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-3xl border border-slate-200 bg-white/90 p-5 text-slate-900 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-[#020617] dark:text-white">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-black">Today’s Timetable</h3>
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                    Working Day
                  </span>
                </div>

                {[
                  ["AI Lab", "09:00 AM"],
                  ["Mathematics", "10:30 AM"],
                  ["Project Session", "01:30 PM"],
                ].map(([subject, time]) => (
                  <div
                    key={subject}
                    className="mb-3 flex justify-between rounded-2xl bg-slate-100 p-3 text-sm text-slate-800 dark:bg-white/10 dark:text-slate-100"
                  >
                    <span>{subject}</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">
                      {time}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-3xl border border-slate-200 bg-white/90 p-5 text-slate-900 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-[#020617] dark:text-white">
                <p className="text-sm font-bold text-blue-600 dark:text-blue-400">
                  AI Suggestion
                </p>
                <h3 className="mt-1 text-xl font-black text-slate-900 dark:text-white">
                  Focus on weak areas this week
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        className="mx-auto max-w-7xl scroll-mt-24 px-6 py-20"
      >
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-black text-slate-900 dark:text-white md:text-5xl">
            Everything for a smart institution
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-300">
            Built for modern educators and learners
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(([icon, title, desc]) => (
            <div
              key={title}
              className="card-hover rounded-3xl border border-slate-200 bg-white p-6 text-slate-900 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-white"
            >
              <div className="mb-4 text-3xl">{icon}</div>
              <h3 className="text-xl font-black text-blue-600 dark:text-blue-400">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW */}
      <section
        id="how"
        className="mx-auto max-w-7xl scroll-mt-24 px-6 py-20"
      >
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-black text-slate-900 dark:text-white md:text-5xl">
            How it Works
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-300">
            Simple workflow for every academic role
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          {steps.map(([num, title, desc]) => (
            <div
              key={num}
              className="card-hover rounded-3xl border border-slate-200 bg-white p-6 text-slate-900 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-white"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 font-black text-white">
                {num}
              </div>
              <h3 className="font-black text-slate-900 dark:text-white">
                {title}
              </h3>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-slate-200 bg-white/90 px-8 py-16 text-center text-slate-900 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-gradient-to-r dark:from-blue-600 dark:to-purple-600 dark:text-white">
          <h2 className="text-4xl font-black md:text-5xl">
            Ready to transform your classroom?
          </h2>
          <p className="mt-4 text-slate-600 dark:text-blue-50">
            Build smarter academic workflows with AI classroom intelligence.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => navigate("/signup")}
              className="rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-7 py-4 font-black text-white transition hover:-translate-y-1 dark:bg-white dark:from-white dark:to-white dark:text-blue-600"
            >
              Get Started Free →
            </button>

            <button
              onClick={() => navigate("/login")}
              className="rounded-2xl border border-slate-300 px-7 py-4 font-bold text-slate-900 transition hover:-translate-y-1 hover:bg-slate-100 dark:border-white/40 dark:text-white dark:hover:bg-white dark:hover:text-blue-600"
            >
              Sign In
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}