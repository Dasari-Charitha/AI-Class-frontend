import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import Charts from "../components/Charts";
import DayStatusCard from "../components/DayStatusCard";
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

type HODData = {
  name: string;
  departments: number;
  faculty: number;
  reports: number;
  averageScore: number;
  attendanceRate: number;
  studentsAtRisk: number;
  bestDepartment: string;
  chartData: { name: string; value: number }[];
};

const departmentSchedule = [
  "CSE - AI Lab - 9:00 AM",
  "ECE - Digital Systems - 11:00 AM",
  "IT - Web Development - 2:00 PM",
];

const card =
  "card-hover rounded-3xl border border-white/10 bg-white/80 p-6 shadow-xl backdrop-blur-xl dark:bg-white/10";

const inner =
  "rounded-2xl border border-white/10 bg-slate-100/80 p-4 dark:bg-black/30";

const btn =
  "rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2 text-white font-semibold";

export default function HODDashboard() {
  const [data, setData] = useState<HODData | null>(null);
  const [leaves, setLeaves] = useState<LeaveRequest[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const snap = await getDoc(doc(db, "dashboards", "hod"));

      if (snap.exists()) {
        setData(snap.data() as HODData);
      }
    };

    fetchData();

    const unsubscribe = listenLeaveRequests((items) => {
      setLeaves(items.filter((leave) => leave.status === "Pending"));
    });

    return () => unsubscribe();
  }, []);

  const update = async (id: string, status: "Approved" | "Rejected") => {
    try {
      await updateLeaveStatus(id, status);
    } catch {
      alert("Failed to update leave status");
    }
  };

  if (!data) {
    return (
      <MainLayout>
        <p className="text-gray-300">Loading...</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mb-8 rounded-[2rem] bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white shadow-2xl">
        <p className="text-sm font-semibold text-blue-100">HOD Dashboard</p>
        <h1 className="mt-2 text-4xl font-black">{data.name}</h1>
        <p className="mt-2 text-blue-100">
          Monitor department performance, leave requests, faculty activity and
          academic progress.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-5">
        <DayStatusCard />

        <div className={card}>
          <p className="text-sm text-slate-500 dark:text-slate-300">
            Departments
          </p>
          <h2 className="mt-2 text-3xl font-black">{data.departments}</h2>
        </div>

        <div className={card}>
          <p className="text-sm text-slate-500 dark:text-slate-300">Faculty</p>
          <h2 className="mt-2 text-3xl font-black">{data.faculty}</h2>
        </div>

        <div className={card}>
          <p className="text-sm text-slate-500 dark:text-slate-300">Reports</p>
          <h2 className="mt-2 text-3xl font-black">{data.reports}</h2>
        </div>

        <div className={card}>
          <p className="text-sm text-slate-500 dark:text-slate-300">
            Avg Score
          </p>
          <h2 className="mt-2 text-3xl font-black">{data.averageScore}%</h2>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <ProgressCard
          label="Department Attendance Rate"
          value={data.attendanceRate}
        />
        <Notifications />
      </div>

      <AIInsights role="hod" />

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className={card}>
          <h2 className="mb-4 text-xl font-black text-blue-600 dark:text-blue-300">
            Leave Monitoring
          </h2>

          {leaves.length > 0 ? (
            <div className="space-y-3">
              {leaves.map((leave) => (
                <div key={leave.id} className={inner}>
                  <p>
                    <b>Name:</b> {leave.studentName}
                  </p>
                  <p>
                    <b>From:</b> {leave.fromDate}
                  </p>
                  <p>
                    <b>To:</b> {leave.toDate}
                  </p>
                  <p>
                    <b>Reason:</b> {leave.reason}
                  </p>

                  <div className="mt-3 flex gap-3">
                    <button
                      onClick={() => leave.id && update(leave.id, "Approved")}
                      className="rounded-xl bg-green-500 px-4 py-2 font-semibold text-white"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => leave.id && update(leave.id, "Rejected")}
                      className="rounded-xl bg-red-500 px-4 py-2 font-semibold text-white"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-600 dark:text-slate-300">
              No pending leave requests 📭
            </p>
          )}
        </div>

        <div className={card}>
          <h2 className="mb-4 text-xl font-black text-purple-600 dark:text-purple-300">
            Department Timetable Overview
          </h2>

          <div className="space-y-3">
            {departmentSchedule.map((item, index) => (
              <div key={index} className={inner}>
                {item}
              </div>
            ))}
          </div>

          <button className={`mt-4 ${btn}`}>View Full Timetable</button>
        </div>
      </div>

      <div className={`mt-6 ${card}`}>
        <Charts
          title1="Department Performance"
          title2="Department Comparison"
          data={data.chartData}
        />
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <div className={card}>
          <h2 className="mb-2 text-xl font-black text-blue-600 dark:text-blue-300">
            Attendance Rate
          </h2>
          <p className="text-3xl font-black">{data.attendanceRate}%</p>
        </div>

        <div className="card-hover rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white shadow-2xl">
          <h2 className="mb-2 text-xl font-black">Students At Risk</h2>
          <p className="text-3xl font-black">{data.studentsAtRisk}</p>
        </div>

        <div className={card}>
          <h2 className="mb-2 text-xl font-black text-purple-600 dark:text-purple-300">
            Best Department
          </h2>
          <p className="text-3xl font-black">{data.bestDepartment}</p>
        </div>
      </div>
    </MainLayout>
  );
}