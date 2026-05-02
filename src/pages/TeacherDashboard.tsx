import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import Charts from "../components/Charts";
import DayStatusCard, {
  getCurrentDayStatus,
} from "../components/DayStatusCard";
import AIInsights from "../components/AIInsights";
import Notifications from "../components/Notifications";
import ProgressCard from "../components/ProgressCard";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import {
  listenLeaveRequests,
  updateLeaveStatus,
} from "../services/leaveServices";
import type { LeaveRequest } from "../services/leaveServices";

type TeacherData = {
  name: string;
  classes: number;
  students: number;
  assignmentsGiven: number;
  averageScore: number;
  atRiskStudents: number;
  upcomingExam: string;
  chartData: { name: string; value: number }[];
};

const timetable: Record<string, string[]> = {
  Monday: ["Class 10-A Maths", "Class 9-B AI Basics"],
  Tuesday: ["Class 8-A Computer Science"],
  Wednesday: ["Class 10-A Revision", "Project Review"],
  Thursday: ["Class 9-B Lab"],
  Friday: ["Weekly Assessment"],
  Saturday: ["Doubt Session"],
};

const card = "card-hover rounded-3xl border border-white/10 bg-white/80 p-6 shadow-xl backdrop-blur-xl dark:bg-white/10";
const inner = "rounded-2xl border border-white/10 bg-slate-100/80 p-4 dark:bg-black/30";
const btn = "rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2 text-white font-semibold";

export default function TeacherDashboard() {
  const [data, setData] = useState<TeacherData | null>(null);
  const [leaves, setLeaves] = useState<LeaveRequest[]>([]);

  const day = getCurrentDayStatus();
  const schedule = day.isWorkingDay ? timetable[day.dayName] || [] : [];

  useEffect(() => {
    const fetch = async () => {
      const snap = await getDoc(doc(db, "dashboards", "teacher"));
      if (snap.exists()) setData(snap.data() as TeacherData);
    };
    fetch();

    const unsub = listenLeaveRequests((l) =>
      setLeaves(l.filter((i) => i.status === "Pending"))
    );
    return () => unsub();
  }, []);

  const update = (id: string, status: "Approved" | "Rejected") =>
    updateLeaveStatus(id, status);

  if (!data) return <MainLayout>Loading...</MainLayout>;

  return (
    <MainLayout>
      {/* HERO */}
      <div className="mb-8 rounded-[2rem] bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white shadow-2xl">
        <p className="text-sm text-blue-100">Teacher Dashboard</p>
        <h1 className="text-4xl font-black mt-2">{data.name}</h1>
        <p className="text-blue-100 mt-2">
          Manage classes, students and academic activities.
        </p>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-5 gap-6">
        <DayStatusCard />

        <div className={card}>
          <p className="text-sm text-gray-500">Today Classes</p>
          <h2 className="text-3xl font-black">{schedule.length}</h2>
        </div>

        <div className={card}>
          <p className="text-sm text-gray-500">Students</p>
          <h2 className="text-3xl font-black">{data.students}</h2>
        </div>

        <div className={card}>
          <p className="text-sm text-gray-500">Pending Leaves</p>
          <h2 className="text-3xl font-black">{leaves.length}</h2>
        </div>

        <div className={card}>
          <p className="text-sm text-gray-500">Avg Score</p>
          <h2 className="text-3xl font-black">{data.averageScore}%</h2>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <ProgressCard label="Class Performance" value={data.averageScore} />
        <Notifications />
      </div>

      <AIInsights role="teacher" />

      {/* SCHEDULE + LEAVES */}
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div className={card}>
          <h2 className="text-xl font-black text-blue-600 mb-4">
            Today Schedule
          </h2>

          {schedule.length ? (
            schedule.map((s, i) => (
              <div key={i} className={inner}>
                {s}
              </div>
            ))
          ) : (
            <p>No classes today</p>
          )}
        </div>

        <div className={card}>
          <h2 className="text-xl font-black text-purple-600 mb-4">
            Leave Requests
          </h2>

          {leaves.length ? (
            leaves.map((l) => (
              <div key={l.id} className={inner}>
                <p><b>{l.studentName}</b></p>
                <p>{l.fromDate} → {l.toDate}</p>
                <p>{l.reason}</p>

                <div className="flex gap-2 mt-3">
                  <button onClick={() => update(l.id!, "Approved")} className="bg-green-500 px-3 py-1 rounded text-white">
                    Approve
                  </button>
                  <button onClick={() => update(l.id!, "Rejected")} className="bg-red-500 px-3 py-1 rounded text-white">
                    Reject
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No pending leaves</p>
          )}
        </div>
      </div>

      {/* ACTIONS */}
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div className={card}>
          <h2 className="font-black text-blue-600 mb-3">Attendance</h2>
          <button className={btn}>Mark Attendance</button>
        </div>

        <div className={card}>
          <h2 className="font-black text-purple-600 mb-3">Create Exam</h2>
          <button className={btn}>Create Exam</button>
        </div>
      </div>

      {/* CHART */}
      <div className={`${card} mt-6`}>
        <Charts title1="Class Activity" title2="Weekly Trend" data={data.chartData} />
      </div>

      {/* INSIGHTS */}
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div className={card}>
          <h2 className="font-black text-blue-600">At Risk Students</h2>
          <p className="text-3xl font-black">{data.atRiskStudents}</p>
        </div>

        <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <h2 className="font-black">Upcoming Exam</h2>
          <p>{data.upcomingExam}</p>
        </div>
      </div>
    </MainLayout>
  );
}