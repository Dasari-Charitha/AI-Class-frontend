import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import Charts from "../components/Charts";
import Loading from "../components/Loading";
import Error from "../components/Error";
import DayStatusCard, {
  getCurrentDayStatus,
} from "../components/DayStatusCard";
import AIInsights from "../components/AIInsights";
import Notifications from "../components/Notifications";
import ProgressCard from "../components/ProgressCard";
import { getStudentDoc } from "../services/firestore";
import { applyLeave, listenLeaveRequests } from "../services/leaveServices";
import type { LeaveRequest } from "../services/leaveServices";

type StudentData = {
  name: string;
  attendance: number;
  grade: string;
  chartData?: { name: string; value: number }[];
  rank: number;
  percentile: number;
  feedback: string;
  weakArea: string;
  leaderboardName: string;
  nearestCompetitor: string;
  competitorDelta: number;
  recommendedTopic: string;
  practiceLevel: string;
  practiceQuestions: number;
};

const timetable: Record<string, string[]> = {
  Monday: ["Maths - 9:00 AM", "Physics - 10:30 AM", "AI Lab - 1:00 PM"],
  Tuesday: ["English - 9:00 AM", "Chemistry - 11:00 AM", "Coding - 2:00 PM"],
  Wednesday: ["Maths - 9:30 AM", "Biology - 11:00 AM", "Aptitude - 3:00 PM"],
  Thursday: ["Physics Lab - 10:00 AM", "Computer Science - 12:00 PM"],
  Friday: ["Chemistry - 9:00 AM", "Project Session - 1:30 PM"],
  Saturday: ["Weekly Test - 10:00 AM", "Doubt Session - 12:00 PM"],
};

const examsToday = [
  { subject: "Mathematics Quiz", time: "2:00 PM", status: "Available" },
  { subject: "Physics MCQ Test", time: "4:00 PM", status: "Upcoming" },
];

const cardClass =
  "card-hover rounded-3xl border border-white/10 bg-white/80 p-6 shadow-xl backdrop-blur-xl dark:bg-white/10 hover:shadow-blue-500/10";

const innerCardClass =
  "rounded-2xl border border-white/10 bg-slate-100/80 p-4 dark:bg-black/30";

const buttonClass =
  "rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2 font-semibold text-white shadow-md hover:scale-105 hover:shadow-lg transition";

export default function StudentDashboard() {
  const [data, setData] = useState<StudentData | null>(null);
  const [error, setError] = useState("");

  const [leaveReason, setLeaveReason] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [myLeaves, setMyLeaves] = useState<LeaveRequest[]>([]);

  const dayStatus = getCurrentDayStatus();

  const todaySchedule = dayStatus.isWorkingDay
    ? timetable[dayStatus.dayName] || []
    : [];

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getStudentDoc();

        if (!res) setError("No data found");
        else setData(res);
      } catch {
        setError("Failed to load data");
      }
    };

    load();
  }, []);

  useEffect(() => {
    if (!data?.name) return;

    const unsubscribe = listenLeaveRequests((leaves) => {
      const filteredLeaves = leaves.filter(
        (leave) =>
          leave.studentName.toLowerCase().trim() ===
          data.name.toLowerCase().trim()
      );

      setMyLeaves(filteredLeaves);
    });

    return () => unsubscribe();
  }, [data]);

  const handleLeaveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!data) return;

    try {
      await applyLeave({
        studentName: data.name,
        role: "Student",
        reason: leaveReason,
        fromDate,
        toDate,
      });

      alert("Leave application submitted successfully!");
      setLeaveReason("");
      setFromDate("");
      setToDate("");
    } catch {
      alert("Failed to submit leave request");
    }
  };

  if (error) {
    return (
      <MainLayout>
        <Error message={error} />
      </MainLayout>
    );
  }

  if (!data) {
    return (
      <MainLayout>
        <Loading />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mb-8 rounded-[2rem] bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white shadow-2xl">
        <p className="text-sm font-semibold text-blue-100">Student Dashboard</p>
        <h1 className="mt-2 text-4xl font-black">Welcome, {data.name}</h1>
        <p className="mt-2 text-blue-100">
          Today is {dayStatus.dayName}, {dayStatus.fullDate}. Here is your smart
          academic overview.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-5">
        <DayStatusCard />

        <div className={cardClass}>
          <p className="text-sm text-slate-500 dark:text-slate-300">
            Attendance
          </p>
          <h2 className="mt-2 text-3xl font-black">{data.attendance}%</h2>
        </div>

        <div className={cardClass}>
          <p className="text-sm text-slate-500 dark:text-slate-300">
            Today Classes
          </p>
          <h2 className="mt-2 text-3xl font-black">{todaySchedule.length}</h2>
        </div>

        <div className={cardClass}>
          <p className="text-sm text-slate-500 dark:text-slate-300">
            Exams Today
          </p>
          <h2 className="mt-2 text-3xl font-black">
            {dayStatus.isWorkingDay ? examsToday.length : 0}
          </h2>
        </div>

        <div className={cardClass}>
          <p className="text-sm text-slate-500 dark:text-slate-300">
            Leave Requests
          </p>
          <h2 className="mt-2 text-3xl font-black">{myLeaves.length}</h2>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <ProgressCard label="Attendance Progress" value={data.attendance} />
        <Notifications />
      </div>

      <AIInsights role="student" />

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className={cardClass}>
          <h2 className="mb-4 text-xl font-black text-blue-600 dark:text-blue-300">
            Today’s Timetable
          </h2>

          {todaySchedule.length > 0 ? (
            <div className="space-y-3">
              {todaySchedule.map((item, index) => (
                <div key={index} className={innerCardClass}>
                  {item}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-600 dark:text-slate-300">
              No classes scheduled today because it is a leave day.
            </p>
          )}
        </div>

        <div className={cardClass}>
          <h2 className="mb-4 text-xl font-black text-purple-600 dark:text-purple-300">
            Leave Application
          </h2>

          <form onSubmit={handleLeaveSubmit}>
            <div className="mb-4 grid gap-4 md:grid-cols-2">
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full rounded-xl border border-white/20 bg-white/10 p-3 text-white backdrop-blur-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30"
                required
              />
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full rounded-xl border border-white/20 bg-white/10 p-3 text-white backdrop-blur-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30"
                required
              />
            </div>

            <textarea
              value={leaveReason}
              onChange={(e) => setLeaveReason(e.target.value)}
              placeholder="Enter your leave reason..."
              className="h-32 w-full resize-none rounded-xl border border-white/20 bg-white/10 p-4 text-white placeholder:text-gray-400 backdrop-blur-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30"
              required
            />

            <button className={`mt-4 ${buttonClass}`}>
              Submit Leave Request
            </button>
          </form>
        </div>
      </div>

      <div className={`mt-8 ${cardClass}`}>
        <h2 className="mb-4 text-xl font-black text-blue-600 dark:text-blue-300">
          My Leave Requests
        </h2>

        {myLeaves.length > 0 ? (
          <div className="space-y-3">
            {myLeaves.map((leave) => (
              <div key={leave.id} className={innerCardClass}>
                <p>
                  <b>From:</b> {leave.fromDate}
                </p>
                <p>
                  <b>To:</b> {leave.toDate}
                </p>
                <p>
                  <b>Reason:</b> {leave.reason}
                </p>
                <p>
                  <b>Status:</b>{" "}
                  <span
                    className={
                      leave.status === "Approved"
                        ? "font-bold text-green-500"
                        : leave.status === "Rejected"
                        ? "font-bold text-red-500"
                        : "font-bold text-blue-500"
                    }
                  >
                    {leave.status}
                  </span>
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-600 dark:text-slate-300">
            No leave requests submitted yet 📭
          </p>
        )}
      </div>

      <div className={`mt-8 ${cardClass}`}>
        <h2 className="mb-4 text-xl font-black text-purple-600 dark:text-purple-300">
          Exam Attempts
        </h2>

        {dayStatus.isWorkingDay ? (
          <div className="grid gap-4 md:grid-cols-2">
            {examsToday.map((exam, index) => (
              <div key={index} className={innerCardClass}>
                <h3 className="font-black">{exam.subject}</h3>
                <p className="text-slate-500 dark:text-slate-400">
                  {exam.time}
                </p>

                <button className={`mt-3 ${buttonClass}`}>
                  {exam.status === "Available" ? "Attempt Now" : "Upcoming"}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-600 dark:text-slate-300">
            No exams available on leave day.
          </p>
        )}
      </div>

      <div className={`mt-8 ${cardClass}`}>
        <Charts
          title1="Performance Trend"
          title2="Weekly Performance"
          data={data.chartData}
        />
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className={cardClass}>
          <h2 className="mb-2 text-xl font-black text-blue-600 dark:text-blue-300">
            Recent Feedback
          </h2>
          <p>{data.feedback}</p>
        </div>

        <div className={cardClass}>
          <h2 className="mb-2 text-xl font-black text-purple-600 dark:text-purple-300">
            Weak Area
          </h2>
          <p>{data.weakArea}</p>
        </div>
      </div>

      <div className="card-hover mt-8 rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white shadow-2xl">
        <h2 className="mb-3 text-xl font-black">Leaderboard</h2>

        <p>
          <b>Student:</b> {data.leaderboardName}
        </p>
        <p>
          <b>Rank:</b> #{data.rank}
        </p>
        <p>
          <b>Competitor:</b> {data.nearestCompetitor} +{data.competitorDelta}
        </p>
      </div>

      <div className={`mt-8 ${cardClass}`}>
        <h2 className="mb-3 text-xl font-black text-blue-600 dark:text-blue-300">
          Adaptive Practice
        </h2>

        <p>
          <b>Topic:</b> {data.recommendedTopic}
        </p>
        <p>
          <b>Level:</b> {data.practiceLevel}
        </p>
        <p>
          <b>Questions:</b> {data.practiceQuestions}
        </p>

        <button className={`mt-4 ${buttonClass}`}>Start Practice</button>
      </div>
    </MainLayout>
  );
}