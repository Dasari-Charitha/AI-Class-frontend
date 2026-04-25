import { Link } from "react-router-dom";
import { BrainCircuit, BarChart3, ShieldCheck, Users } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen text-white px-6 md:px-10">
      <nav className="flex justify-between items-center py-5 border-b border-white/10">
        <h1 className="text-2xl font-bold text-yellow-400">AI Classroom</h1>

        <div className="flex gap-3">
          <Link
            to="/login"
            className="border border-yellow-400/40 px-4 py-2 rounded-lg hover:text-yellow-400"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300"
          >
            Get Started
          </Link>
        </div>
      </nav>

      <section className="text-center py-24 md:py-28">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Transform Education With
          <br />
          <span className="text-yellow-400">AI Classroom Intelligence</span>
        </h1>

        <p className="text-gray-300 mt-6 max-w-2xl mx-auto text-base md:text-lg">
          A smart platform for students, teachers, HODs, and principals with
          role-based dashboards, analytics, charts, and academic insights.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/signup"
            className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-300"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="border border-yellow-400/40 px-6 py-3 rounded-xl hover:text-yellow-400"
          >
            Explore
          </Link>

          
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 py-10">
        <div className="glass p-6">
          <Users className="text-yellow-400 mb-4" size={28} />
          <h2 className="text-xl font-bold text-yellow-400">
            Role-Based Dashboards
          </h2>
          <p className="text-gray-300 mt-2">
            Separate dashboards for students, teachers, HODs, and principals.
          </p>
        </div>

        <div className="glass p-6">
          <BarChart3 className="text-yellow-400 mb-4" size={28} />
          <h2 className="text-xl font-bold text-yellow-400">
            Smart Analytics
          </h2>
          <p className="text-gray-300 mt-2">
            Track attendance, performance, and progress through visual charts.
          </p>
        </div>

        <div className="glass p-6">
          <BrainCircuit className="text-yellow-400 mb-4" size={28} />
          <h2 className="text-xl font-bold text-yellow-400">AI Insights</h2>
          <p className="text-gray-300 mt-2">
            Make informed academic decisions with intelligent observations.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 py-12 text-center">
        <div className="glass p-6">
          <h2 className="text-3xl font-bold text-yellow-400">95%</h2>
          <p className="text-gray-300 mt-2">Attendance Accuracy</p>
        </div>

        <div className="glass p-6">
          <h2 className="text-3xl font-bold text-yellow-400">80%</h2>
          <p className="text-gray-300 mt-2">Performance Growth</p>
        </div>

        <div className="glass p-6">
          <h2 className="text-3xl font-bold text-yellow-400">24/7</h2>
          <p className="text-gray-300 mt-2">Monitoring</p>
        </div>

        <div className="glass p-6">
          <h2 className="text-3xl font-bold text-yellow-400">100+</h2>
          <p className="text-gray-300 mt-2">Institutions</p>
        </div>
      </section>

      <section className="py-12">
        <div className="glass p-8 md:p-10 text-center">
          <ShieldCheck className="mx-auto text-yellow-400 mb-4" size={32} />
          <h2 className="text-3xl font-bold">
            Ready to upgrade your institution?
          </h2>

          <p className="text-gray-300 mt-4 mb-8">
            Build a smarter academic environment with AI Classroom.
          </p>

          <Link
            to="/signup"
            className="bg-yellow-400 text-black px-8 py-3 rounded-xl font-semibold hover:bg-yellow-300"
          >
            Start Now
          </Link>
        </div>
      </section>
    </div>
  );
}