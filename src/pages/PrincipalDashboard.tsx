import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import Charts from "../components/Charts";
import DayStatusCard from "../components/DayStatusCard";
import AIInsights from "../components/AIInsights";
import Notifications from "../components/Notifications";
import ProgressCard from "../components/ProgressCard";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { listenLeaveRequests } from "../services/leaveServices";
import type { LeaveRequest } from "../services/leaveServices";

type PrincipalData = {
  name: string;
  totalStudents: number;
  faculty: number;
  departments: number;
  institutionPerformance: number;
  healthIndex: number;
  criticalAlerts: number;
  topDepartment: string;
  chartData: { name: string; value: number }[];
};

const smartAlerts = [
  "12 students are below 75% attendance",
  "CSE department has highest performance this week",
  "3 leave requests require urgent review",
];

const card =
  "card-hover rounded-3xl border border-white/10 bg-white/80 p-6 shadow-xl backdrop-blur-xl dark:bg-white/10";

const inner =
  "rounded-2xl border border-white/10 bg-slate-100/80 p-4 dark:bg-black/30";

export default function PrincipalDashboard() {
  const [data, setData] = useState<PrincipalData | null>(null);
  const [leaveOverview, setLeaveOverview] = useState<LeaveRequest[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const snap = await getDoc(doc(db, "dashboards", "principal"));

      if (snap.exists()) {
        setData(snap.data() as PrincipalData);
      }
    };

    fetchData();

    const unsubscribe = listenLeaveRequests((leaves) => {
      setLeaveOverview(leaves);
    });

    return () => unsubscribe();
  }, []);

  if (!data) {
    return (
      <MainLayout>
        <p className="text-gray-300">Loading...</p>
      </MainLayout>
    );
  }

  const totalLeaves = leaveOverview.length;
  const pendingLeaves = leaveOverview.filter(
    (leave) => leave.status === "Pending"
  ).length;
  const approvedLeaves = leaveOverview.filter(
    (leave) => leave.status === "Approved"
  ).length;
  const rejectedLeaves = leaveOverview.filter(
    (leave) => leave.status === "Rejected"
  ).length;

  return (
    <MainLayout>
      <div className="mb-8 rounded-[2rem] bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white shadow-2xl">
        <p className="text-sm font-semibold text-blue-100">
          Principal Dashboard
        </p>
        <h1 className="mt-2 text-4xl font-black">{data.name}</h1>
        <p className="mt-2 text-blue-100">
          Institution-wide analytics, academic health monitoring, leave
          overview and smart alerts.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-5">
        <DayStatusCard />

        <div className={card}>
          <p className="text-sm text-slate-500 dark:text-slate-300">
            Total Students
          </p>
          <h2 className="mt-2 text-3xl font-black">{data.totalStudents}</h2>
        </div>

        <div className={card}>
          <p className="text-sm text-slate-500 dark:text-slate-300">Faculty</p>
          <h2 className="mt-2 text-3xl font-black">{data.faculty}</h2>
        </div>

        <div className={card}>
          <p className="text-sm text-slate-500 dark:text-slate-300">
            Departments
          </p>
          <h2 className="mt-2 text-3xl font-black">{data.departments}</h2>
        </div>

        <div className={card}>
          <p className="text-sm text-slate-500 dark:text-slate-300">
            Performance
          </p>
          <h2 className="mt-2 text-3xl font-black">
            {data.institutionPerformance}%
          </h2>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <ProgressCard
          label="Institution Performance"
          value={data.institutionPerformance}
        />
        <Notifications />
      </div>

      <AIInsights role="principal" />

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className={card}>
          <h2 className="mb-4 text-xl font-black text-blue-600 dark:text-blue-300">
            Leave Overview
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div className={inner}>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Total Leaves
              </p>
              <h3 className="text-3xl font-black">{totalLeaves}</h3>
            </div>

            <div className={inner}>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Pending
              </p>
              <h3 className="text-3xl font-black text-blue-500">
                {pendingLeaves}
              </h3>
            </div>

            <div className={inner}>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Approved
              </p>
              <h3 className="text-3xl font-black text-green-500">
                {approvedLeaves}
              </h3>
            </div>

            <div className={inner}>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Rejected
              </p>
              <h3 className="text-3xl font-black text-red-500">
                {rejectedLeaves}
              </h3>
            </div>
          </div>
        </div>

        <div className={card}>
          <h2 className="mb-4 text-xl font-black text-purple-600 dark:text-purple-300">
            Smart Institutional Alerts
          </h2>

          <div className="space-y-3">
            {smartAlerts.map((alert, index) => (
              <div key={index} className={inner}>
                {alert}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`mt-6 ${card}`}>
        <Charts
          title1="Institution Growth"
          title2="Monthly Performance"
          data={data.chartData}
        />
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <div className={card}>
          <h2 className="mb-2 text-xl font-black text-blue-600 dark:text-blue-300">
            Institutional Health Index
          </h2>
          <p className="text-3xl font-black">{data.healthIndex}/100</p>
        </div>

        <div className="card-hover rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white shadow-2xl">
          <h2 className="mb-2 text-xl font-black">Critical Alerts</h2>
          <p className="text-3xl font-black">{data.criticalAlerts}</p>
        </div>

        <div className={card}>
          <h2 className="mb-2 text-xl font-black text-purple-600 dark:text-purple-300">
            Top Department
          </h2>
          <p className="text-3xl font-black">{data.topDepartment}</p>
        </div>
      </div>
    </MainLayout>
  );
}