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

type TabType = "dashboard" | "classes" | "leaves" | "actions" | "performance";

const timetable: Record<string, string[]> = {
  Monday: ["Class 10-A Maths", "Class 9-B AI Basics"],
  Tuesday: ["Class 8-A Computer Science"],
  Wednesday: ["Class 10-A Revision", "Project Review"],
  Thursday: ["Class 9-B Lab"],
  Friday: ["Weekly Assessment"],
  Saturday: ["Doubt Session"],
};

const card =
  "card-hover rounded-3xl border border-slate-200 bg-white/90 p-6 text-slate-900 shadow-xl backdrop-blur-xl transition dark:border-white/10 dark:bg-white/10 dark:text-white";

const inner =
  "mb-3 rounded-2xl border border-slate-200 bg-slate-100/90 p-4 text-slate-800 dark:border-white/10 dark:bg-black/30 dark:text-slate-100";

const btn =
  "rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2 font-semibold text-white shadow-md transition hover:scale-105 hover:shadow-lg";

const SectionHeader = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="mb-6 rounded-3xl border border-slate-200 bg-white/90 p-6 text-slate-900 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-white/10 dark:text-white">
    <h2 className="text-2xl font-black text-slate-900 dark:text-white">
      {title}
    </h2>
    <p className="mt-2 text-slate-600 dark:text-slate-300">{description}</p>
  </div>
);

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
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

  useEffect(() => {
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<TabType>;
      setActiveTab(customEvent.detail);
    };

    window.addEventListener("teacherTabChange", handler);

    return () => {
      window.removeEventListener("teacherTabChange", handler);
    };
  }, []);

  const update = (id: string, status: "Approved" | "Rejected") =>
    updateLeaveStatus(id, status);

  if (!data) {
    return (
      <MainLayout>
        <p className="text-slate-700 dark:text-slate-200">Loading...</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mb-8 rounded-[2rem] border border-slate-200 bg-white/90 p-8 text-slate-900 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-gradient-to-r dark:from-blue-600 dark:to-purple-600 dark:text-white">
        <p className="text-sm font-semibold text-blue-600 dark:text-blue-100">
          Teacher Dashboard
        </p>
        <h1 className="mt-2 text-4xl font-black">{data.name}</h1>
        <p className="mt-2 text-slate-600 dark:text-blue-100">
          Manage classes, students and academic activities.
        </p>
      </div>

      {activeTab === "dashboard" && (
        <>
          <SectionHeader
            title="Teacher Overview"
            description="Overview of today’s classes, total students, pending leave requests and class performance insights."
          />

          <div className="grid gap-6 md:grid-cols-5">
            <DayStatusCard />

            <div className={card}>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Today Classes
              </p>
              <h2 className="mt-2 text-3xl font-black">{schedule.length}</h2>
            </div>

            <div className={card}>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Students
              </p>
              <h2 className="mt-2 text-3xl font-black">{data.students}</h2>
            </div>

            <div className={card}>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Pending Leaves
              </p>
              <h2 className="mt-2 text-3xl font-black">{leaves.length}</h2>
            </div>

            <div className={card}>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Avg Score
              </p>
              <h2 className="mt-2 text-3xl font-black">
                {data.averageScore}%
              </h2>
            </div>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <ProgressCard label="Class Performance" value={data.averageScore} />
            <Notifications />
          </div>

          <AIInsights role="teacher" />
        </>
      )}

      {activeTab === "classes" && (
        <>
          <SectionHeader
            title="Class Schedule"
            description="Review today’s teaching schedule, planned sessions and classroom responsibilities."
          />

          <div className={card}>
            <h2 className="mb-4 text-xl font-black text-blue-600 dark:text-blue-300">
              Today Schedule
            </h2>

            {schedule.length ? (
              schedule.map((s, i) => (
                <div key={i} className={inner}>
                  {s}
                </div>
              ))
            ) : (
              <p className="text-slate-600 dark:text-slate-300">
                No classes today
              </p>
            )}
          </div>
        </>
      )}

      {activeTab === "leaves" && (
        <>
          <SectionHeader
            title="Student Leave Requests"
            description="Review pending student leave applications and take approval or rejection actions."
          />

          <div className={card}>
            <h2 className="mb-4 text-xl font-black text-purple-600 dark:text-purple-300">
              Leave Requests
            </h2>

            {leaves.length ? (
              leaves.map((l) => (
                <div key={l.id} className={inner}>
                  <p>
                    <b>{l.studentName}</b>
                  </p>
                  <p>{l.fromDate} → {l.toDate}</p>
                  <p>{l.reason}</p>

                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => l.id && update(l.id, "Approved")}
                      className="rounded-xl bg-green-500 px-4 py-2 font-semibold text-white"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => l.id && update(l.id, "Rejected")}
                      className="rounded-xl bg-red-500 px-4 py-2 font-semibold text-white"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-600 dark:text-slate-300">
                No pending leaves
              </p>
            )}
          </div>
        </>
      )}

      {activeTab === "actions" && (
        <>
          <SectionHeader
            title="Quick Actions"
            description="Mark attendance, create exams and manage important classroom activities from one place."
          />

          <div className="grid gap-6 md:grid-cols-2">
            <div className={card}>
              <h2 className="mb-3 text-xl font-black text-blue-600 dark:text-blue-300">
                Attendance
              </h2>
              <p className="mb-4 text-slate-600 dark:text-slate-300">
                Mark and manage today’s class attendance.
              </p>
              <button className={btn}>Mark Attendance</button>
            </div>

            <div className={card}>
              <h2 className="mb-3 text-xl font-black text-purple-600 dark:text-purple-300">
                Create Exam
              </h2>
              <p className="mb-4 text-slate-600 dark:text-slate-300">
                Create and schedule tests for your students.
              </p>
              <button className={btn}>Create Exam</button>
            </div>
          </div>
        </>
      )}

      {activeTab === "performance" && (
        <>
          <SectionHeader
            title="Class Performance"
            description="Track class activity, weekly trends, at-risk students and upcoming assessments."
          />

          <div className={card}>
            <Charts
              title1="Class Activity"
              title2="Weekly Trend"
              data={data.chartData}
            />
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className={card}>
              <h2 className="mb-2 text-xl font-black text-blue-600 dark:text-blue-300">
                At Risk Students
              </h2>
              <p className="text-3xl font-black text-slate-900 dark:text-white">
                {data.atRiskStudents}
              </p>
            </div>

            <div className={card}>
              <h2 className="mb-2 text-xl font-black text-purple-600 dark:text-purple-300">
                Upcoming Exam
              </h2>
              <p className="text-lg font-medium text-slate-700 dark:text-slate-200">
                {data.upcomingExam}
              </p>
            </div>
          </div>
        </>
      )}
    </MainLayout>
  );
}