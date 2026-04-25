import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BrainCircuit,
  BarChart3,
  ShieldCheck,
  Users,
  Sparkles,
  Rocket,
  Activity,
} from "lucide-react";

export default function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden text-white px-6 md:px-10">
      {/* Animated glowing background */}
      <motion.div
        className="fixed top-20 left-10 h-80 w-80 rounded-full bg-blue-500/25 blur-3xl -z-10"
        animate={{ x: [0, 120, -80, 0], y: [0, 80, 120, 0], scale: [1, 1.3, 1] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <motion.div
        className="fixed bottom-10 right-10 h-96 w-96 rounded-full bg-purple-500/25 blur-3xl -z-10"
        animate={{ x: [0, -120, 80, 0], y: [0, -90, 60, 0], scale: [1, 1.25, 1] }}
        transition={{ duration: 14, repeat: Infinity }}
      />

      <motion.div
        className="fixed top-1/3 left-1/2 h-[520px] w-[520px] rounded-full border border-cyan-400/20 -z-10"
        animate={{ rotate: 360 }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
      />

      {/* Navbar */}
      <motion.nav
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="flex items-center justify-between border-b border-white/10 py-5"
      >
        <h1 className="text-2xl font-bold text-yellow-400">
          AI Classroom
        </h1>

        <div className="flex gap-3">
          <Link
            to="/login"
            className="rounded-lg border border-yellow-400/40 px-4 py-2 hover:bg-white/10"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="rounded-lg bg-yellow-400 px-4 py-2 font-semibold text-black"
          >
            Get Started
          </Link>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="relative py-24 text-center md:py-28">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="glass mx-auto mb-6 inline-flex items-center gap-2 px-4 py-2"
        >
          <Sparkles className="text-yellow-400" size={18} />
          <span className="text-sm text-gray-300">
            AI-powered academic intelligence platform
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 80, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9 }}
          className="text-4xl font-bold leading-tight md:text-7xl"
        >
          Transform Education With
          <br />
          <motion.span
            className="text-yellow-400"
            animate={{
              textShadow: [
                "0 0 8px rgba(76,201,240,0.2)",
                "0 0 28px rgba(76,201,240,0.9)",
                "0 0 8px rgba(76,201,240,0.2)",
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            AI Classroom Intelligence
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mx-auto mt-6 max-w-2xl text-base text-gray-300 md:text-lg"
        >
          A smart platform for Students, Teachers, HODs, and Principals with
          role-based dashboards, analytics, test interface, and intelligent insights.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-10 flex flex-col justify-center gap-4 sm:flex-row"
        >
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/signup"
              className="inline-block rounded-xl bg-yellow-400 px-7 py-3 font-semibold text-black"
            >
              Get Started
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/login"
              className="inline-block rounded-xl border border-yellow-400/40 px-7 py-3"
            >
              Explore Dashboard
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Animated feature cards */}
      <section className="grid grid-cols-1 gap-6 py-10 md:grid-cols-3">
        {[
          {
            icon: <Users size={34} />,
            title: "Role-Based Dashboards",
            desc: "Separate dashboards for Students, Teachers, HODs, and Principals.",
          },
          {
            icon: <BarChart3 size={34} />,
            title: "Smart Analytics",
            desc: "Visualize academic performance with charts, stats, and insights.",
          },
          {
            icon: <BrainCircuit size={34} />,
            title: "AI Insights",
            desc: "Highlight weak areas, feedback, leaderboard, and practice recommendations.",
          },
        ].map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 70, rotateX: -20 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            whileHover={{
              y: -16,
              scale: 1.05,
              boxShadow: "0 25px 70px rgba(76,201,240,0.25)",
            }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            viewport={{ once: true }}
            className="glass p-7"
          >
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: index * 0.25 }}
              className="mb-4 text-yellow-400"
            >
              {item.icon}
            </motion.div>

            <h2 className="text-xl font-bold text-yellow-400">
              {item.title}
            </h2>

            <p className="mt-3 text-gray-300">{item.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Animated stats */}
      <section className="grid grid-cols-2 gap-6 py-12 text-center md:grid-cols-4">
        {[
          ["95%", "Attendance Accuracy"],
          ["80%", "Performance Growth"],
          ["24/7", "Monitoring"],
          ["100+", "Institutions"],
        ].map(([num, label], index) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1, y: -12 }}
            transition={{ duration: 0.5, delay: index * 0.12 }}
            viewport={{ once: true }}
            className="glass p-6"
          >
            <motion.h2
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
              className="text-3xl font-bold text-yellow-400"
            >
              {num}
            </motion.h2>

            <p className="mt-2 text-gray-300">{label}</p>
          </motion.div>
        ))}
      </section>

      {/* Process section */}
      <section className="py-12">
        <motion.h2
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-center text-3xl font-bold text-yellow-400"
        >
          How It Works
        </motion.h2>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: <Rocket size={30} />,
              title: "Login & Select Role",
              desc: "Users enter through a role-based frontend flow.",
            },
            {
              icon: <Activity size={30} />,
              title: "View Dashboard",
              desc: "Each role gets a personalized academic dashboard.",
            },
            {
              icon: <ShieldCheck size={30} />,
              title: "Track Progress",
              desc: "Charts and insights help improve academic decisions.",
            },
          ].map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -70 : 70 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.04, y: -10 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="glass p-6 text-center"
            >
              <motion.div
                animate={{ rotate: [0, 8, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-yellow-400 text-black"
              >
                {step.icon}
              </motion.div>

              <h3 className="text-xl font-bold text-yellow-400">{step.title}</h3>
              <p className="mt-2 text-gray-300">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <motion.section
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-12"
      >
        <motion.div whileHover={{ scale: 1.02 }} className="glass p-10 text-center">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.12, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <ShieldCheck className="mx-auto mb-4 text-yellow-400" size={40} />
          </motion.div>

          <h2 className="text-3xl font-bold">
            Ready to upgrade your institution?
          </h2>

          <p className="mx-auto mt-4 mb-8 max-w-xl text-gray-300">
            Build a smarter academic environment with intelligent dashboards and
            modern frontend experiences.
          </p>

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/signup"
              className="inline-block rounded-xl bg-yellow-400 px-8 py-3 font-semibold text-black"
            >
              Start Now
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  );
}