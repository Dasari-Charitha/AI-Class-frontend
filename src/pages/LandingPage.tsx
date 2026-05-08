import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

const features = [
  { icon: "📅", title: "Smart Timetable", desc: "Auto-generated class schedules that adapt to your academic calendar.", color: "from-gold-600 to-gold-400" },
  { icon: "📝", title: "Leave Workflow", desc: "Apply, approve and monitor leave requests with real-time status tracking.", color: "from-accent-blue to-accent-purple" },
  { icon: "📊", title: "Attendance Insights", desc: "AI-powered attendance analysis with risk identification and alerts.", color: "from-gold-500 to-accent-orange" },
  { icon: "🧪", title: "Exam Tracker", desc: "View exams, attempt tests and monitor daily academic assessments.", color: "from-accent-purple to-accent-pink" },
  { icon: "🧠", title: "AI Guidance", desc: "Personalized AI suggestions based on weak areas and performance data.", color: "from-gold-600 to-gold-300" },
  { icon: "👥", title: "Role Dashboards", desc: "Dedicated views for Students, Teachers, HODs and Principals.", color: "from-accent-blue to-accent-teal" },
];

const steps = [
  { num: "01", title: "Select Role", desc: "Choose Student, Teacher, HOD or Principal.", icon: "🎯" },
  { num: "02", title: "Access Dashboard", desc: "View personalized academic information.", icon: "📊" },
  { num: "03", title: "Manage Tasks", desc: "Handle timetable, leave, exams and performance.", icon: "⚙️" },
  { num: "04", title: "Improve Outcomes", desc: "Use insights to improve learning quality.", icon: "🚀" },
];

const stats = [
  { value: "4+", label: "Role Dashboards", color: "text-gold-400" },
  { value: "24/7", label: "Always Available", color: "text-accent-blue" },
  { value: "AI", label: "Powered Insights", color: "text-gold-500" },
  { value: "100%", label: "Cloud Based", color: "text-accent-teal" },
];

// Bubble animation component
function BubbleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const colors = [
      "rgba(200, 149, 46, 0.12)",
      "rgba(37, 99, 235, 0.10)",
      "rgba(147, 51, 234, 0.08)",
      "rgba(255, 193, 7, 0.10)",
      "rgba(20, 184, 166, 0.07)",
    ];

    const bubbles: HTMLDivElement[] = [];

    for (let i = 0; i < 25; i++) {
      const bubble = document.createElement("div");
      bubble.className = "bubble";
      const size = Math.random() * 60 + 15;
      const color = colors[Math.floor(Math.random() * colors.length)];

      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${Math.random() * 100}%`;
      bubble.style.bottom = `-${size}px`;
      bubble.style.background = color;
      bubble.style.animationDuration = `${Math.random() * 12 + 8}s`;
      bubble.style.animationDelay = `${Math.random() * 10}s`;

      container.appendChild(bubble);
      bubbles.push(bubble);
    }

    return () => {
      bubbles.forEach((b) => b.remove());
    };
  }, []);

  return <div ref={containerRef} className="pointer-events-none fixed inset-0 z-0 overflow-hidden" />;
}

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-[#0a1128] dark:text-white">
      <BubbleBackground />

      {/* ═══════════ NAVBAR ═══════════ */}
      <nav className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl dark:border-gold-600/10 dark:bg-[#0a1128]/85">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <img src="/images/mascot-owl.png" alt="AI Classroom" className="h-10 w-10 rounded-xl object-cover" />
            <h1 className="font-display text-xl font-black tracking-tight">
              <span className="text-gold-600 dark:text-gold-400">AI</span>{" "}
              <span className="text-slate-800 dark:text-white">Classroom</span>
            </h1>
          </div>

          <div className="hidden items-center gap-8 text-sm font-semibold text-slate-600 dark:text-gold-200 md:flex">
            <a href="#features" className="transition hover:text-gold-500">Features</a>
            <a href="#how" className="transition hover:text-gold-500">How it Works</a>
            <a href="#stats" className="transition hover:text-gold-500">Stats</a>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />

            <button
              onClick={() => navigate("/login")}
              className="hidden rounded-xl border border-gold-500/30 px-4 py-2 font-semibold text-gold-600 transition hover:bg-gold-50 dark:border-gold-500/20 dark:text-gold-400 dark:hover:bg-gold-500/10 sm:block"
            >
              🔑 Login
            </button>

            <button
              onClick={() => navigate("/signup")}
              className="rounded-xl bg-gradient-to-r from-gold-600 to-gold-400 px-5 py-2.5 font-bold text-navy-900 shadow-lg shadow-gold-600/20 transition hover:shadow-gold-600/35"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* ═══════════ HERO SECTION ═══════════ */}
      <section className="relative overflow-hidden">
        {/* Background glows */}
        <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-gold-500/8 blur-[100px]" />
        <div className="absolute right-0 top-20 h-[400px] w-[400px] rounded-full bg-accent-blue/8 blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 h-[300px] w-[300px] rounded-full bg-accent-purple/6 blur-[80px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:py-24">
          {/* Left Content */}
          <div className="page-animate relative z-10">
            <p className="mb-4 text-sm font-bold uppercase tracking-widest text-gold-500 dark:text-gold-400">
              Transform Your Learning Journey!
            </p>

            <h1 className="font-display text-5xl font-black leading-[1.1] md:text-6xl lg:text-7xl">
              <span className="text-slate-900 dark:text-white">Let's Make</span>
              <br />
              <span className="text-slate-900 dark:text-white">Learning </span>
              <span className="gradient-text-gold">Smarter!</span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              Connecting Students, Teachers, and Institutions through an
              Intelligent AI-Powered Education Platform.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/signup")}
                className="group flex items-center gap-2 rounded-2xl bg-gradient-to-r from-gold-600 to-gold-400 px-7 py-4 font-black text-navy-900 shadow-xl shadow-gold-600/20 transition hover:-translate-y-1 hover:shadow-gold-600/30"
              >
                🚀 Start My Journey
              </button>

              <button
                onClick={() => navigate("/login")}
                className="flex items-center gap-2 rounded-2xl border-2 border-slate-300 px-7 py-4 font-bold text-slate-700 transition hover:-translate-y-1 hover:border-gold-500 hover:text-gold-600 dark:border-white/15 dark:text-white dark:hover:border-gold-400 dark:hover:text-gold-400"
              >
                👥 Sign In
              </button>
            </div>

            {/* Mini stats row */}
            <div className="mt-12 flex flex-wrap gap-8">
              {[
                { val: "500+", lbl: "Students", clr: "text-gold-500" },
                { val: "50+", lbl: "Teachers", clr: "text-accent-blue" },
                { val: "AI", lbl: "Powered", clr: "text-gold-400" },
              ].map((s) => (
                <div key={s.lbl}>
                  <p className={`text-2xl font-black ${s.clr}`}>{s.val}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{s.lbl}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Hero Image */}
          <div className="page-animate relative z-10 flex items-center justify-center">
            <div className="relative">
              {/* Glow behind image */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-gold-500/20 via-accent-blue/10 to-accent-purple/15 blur-3xl" />
              <img
                src="/images/hero-classroom.png"
                alt="AI Classroom Smart Learning"
                className="float-image relative w-full max-w-lg rounded-3xl"
              />
              {/* Floating mini card bottom left */}
              <div className="absolute -bottom-4 -left-4 rounded-2xl border border-gold-500/20 bg-white/90 px-4 py-3 shadow-xl backdrop-blur-xl dark:bg-[#111B33]/90">
                <p className="text-xs font-bold text-gold-600 dark:text-gold-400">📊 Live Analytics</p>
                <p className="text-lg font-black text-slate-900 dark:text-white">87% Avg Score</p>
              </div>
              {/* Floating mini card top right */}
              <div className="absolute -right-4 -top-4 rounded-2xl border border-accent-blue/20 bg-white/90 px-4 py-3 shadow-xl backdrop-blur-xl dark:bg-[#111B33]/90">
                <p className="text-xs font-bold text-accent-blue">🧠 AI Insights</p>
                <p className="text-lg font-black text-slate-900 dark:text-white">Active</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex flex-col items-center pb-8 text-sm text-slate-400">
          <p>Scroll to explore</p>
          <div className="mt-2 h-8 w-5 rounded-full border-2 border-gold-400/40 p-1 dark:border-gold-500/30">
            <div className="mx-auto h-2 w-1 animate-bounce rounded-full bg-gold-500" />
          </div>
        </div>
      </section>

      {/* ═══════════ FEATURES ═══════════ */}
      <section id="features" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-20">
        <div className="mb-4 flex items-center gap-2">
          <span className="text-2xl">✨</span>
          <h2 className="font-display text-3xl font-black md:text-4xl">
            <span className="gradient-text-gold">Explore Our Platform</span>
          </h2>
        </div>
        <p className="mb-12 max-w-xl text-slate-500 dark:text-slate-400">
          Discover all the amazing features and services we offer in our platform.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="feature-card card-hover group rounded-3xl border border-slate-200/60 bg-white p-6 shadow-card transition dark:border-gold-600/8 dark:bg-[#111B33]"
            >
              <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${f.color} text-2xl shadow-lg`}>
                {f.icon}
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ HOW IT WORKS ═══════════ */}
      <section id="how" className="relative mx-auto max-w-7xl scroll-mt-24 px-6 py-20">
        <div className="mb-12 text-center">
          <h2 className="font-display text-3xl font-black md:text-4xl">
            <span className="text-slate-900 dark:text-white">How </span>
            <span className="gradient-text-gold">it Works</span>
          </h2>
          <p className="mt-4 text-slate-500 dark:text-slate-400">
            Simple workflow for every academic role
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          {steps.map((s) => (
            <div
              key={s.num}
              className="card-hover group relative rounded-3xl border border-slate-200/60 bg-white p-6 shadow-card dark:border-gold-600/8 dark:bg-[#111B33]"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-gold-600 to-gold-400 text-xl font-black text-navy-900 shadow-lg">
                  {s.num}
                </div>
                <span className="text-2xl">{s.icon}</span>
              </div>
              <h3 className="font-black text-slate-900 dark:text-white">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ STATS ═══════════ */}
      <section id="stats" className="px-6 py-16">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-gold-500/15 bg-gradient-to-r from-white via-gold-50/20 to-white p-10 shadow-2xl dark:border-gold-600/10 dark:from-[#111B33] dark:via-[#0D1526] dark:to-[#111B33]">
          <div className="mb-8 text-center">
            <h2 className="font-display text-3xl font-black">
              <span className="gradient-text-gold">Platform</span>
              <span className="text-slate-900 dark:text-white"> at a Glance</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className={`font-display text-4xl font-black ${s.color}`}>{s.value}</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CTA + MASCOT ═══════════ */}
      <section className="px-6 py-20">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-gradient-to-r from-navy-800 via-navy to-navy-800 px-8 py-16 text-center text-white shadow-2xl dark:from-[#0B1F3D] dark:via-navy dark:to-[#0B1F3D]">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute left-10 top-10 h-32 w-32 rounded-full border-4 border-gold-400/30" />
            <div className="absolute bottom-10 right-10 h-48 w-48 rounded-full border-4 border-gold-400/30" />
            <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-gold-400/30" />
          </div>

          <div className="relative z-10">
            <h2 className="font-display text-4xl font-black md:text-5xl">
              Ready to transform your classroom?
            </h2>
            <p className="mt-4 text-slate-300">
              Build smarter academic workflows with AI classroom intelligence.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => navigate("/signup")}
                className="rounded-2xl bg-gradient-to-r from-gold-600 to-gold-400 px-7 py-4 font-black text-navy-900 shadow-lg shadow-gold-600/25 transition hover:-translate-y-1 hover:shadow-gold-600/40"
              >
                Get Started Free →
              </button>

              <button
                onClick={() => navigate("/login")}
                className="rounded-2xl border-2 border-gold-500/40 px-7 py-4 font-bold text-gold-400 transition hover:-translate-y-1 hover:bg-gold-500/10"
              >
                Sign In
              </button>
            </div>
          </div>

          {/* Mascot */}
          <img
            src="/images/mascot-owl.png"
            alt="AI Classroom Mascot"
            className="absolute -bottom-2 -right-2 hidden h-36 w-36 object-contain opacity-90 md:block"
          />
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="border-t border-slate-200/60 bg-white/60 px-6 py-8 backdrop-blur-xl dark:border-gold-600/8 dark:bg-[#0a1128]/80">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <img src="/images/mascot-owl.png" alt="" className="h-8 w-8 rounded-lg object-cover" />
            <p className="font-display font-bold text-slate-700 dark:text-white">
              AI <span className="text-gold-600 dark:text-gold-400">Classroom</span>
            </p>
          </div>
          <p className="text-sm text-slate-400">
            © 2026 AI Classroom. All rights reserved.
          </p>
          <p className="text-sm font-semibold text-gold-600 dark:text-gold-500">v1.0.0</p>
        </div>
      </footer>
    </div>
  );
}