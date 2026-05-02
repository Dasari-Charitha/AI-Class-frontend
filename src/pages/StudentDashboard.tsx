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

type TabType =
  | "dashboard"
  | "classes"
  | "attendance"
  | "leave"
  | "exams"
  | "performance";

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
  "card-hover rounded-3xl border border-slate-200 bg-white/90 p-6 text-slate-900 shadow-xl backdrop-blur-xl transition dark:border-white/10 dark:bg-white/10 dark:text-white";

const innerCardClass =
  "rounded-2xl border border-slate-200 bg-slate-100/90 p-4 text-slate-800 dark:border-white/10 dark:bg-black/30 dark:text-slate-100";

const buttonClass =
  "rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2 font-semibold text-white shadow-md transition hover:scale-105 hover:shadow-lg";

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 placeholder:text-slate-400 backdrop-blur-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 dark:border-white/20 dark:bg-white/10 dark:text-white dark:placeholder:text-gray-400";

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

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
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

  useEffect(() => {
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<TabType>;
      setActiveTab(customEvent.detail);
    };

    window.addEventListener("studentTabChange", handler);

    return () => {
      window.removeEventListener("studentTabChange", handler);
    };
  }, []);

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
      <div className="mb-8 rounded-[2rem] border border-slate-200 bg-white/90 p-8 text-slate-900 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-gradient-to-r dark:from-blue-600 dark:to-purple-600 dark:text-white">
        <p className="text-sm font-semibold text-blue-600 dark:text-blue-100">
          Student Dashboard
        </p>
        <h1 className="mt-2 text-4xl font-black">Welcome, {data.name}</h1>
        <p className="mt-2 text-slate-600 dark:text-blue-100">
          Today is {dayStatus.dayName}, {dayStatus.fullDate}. Here is your smart
          academic overview.
        </p>
      </div>

      {activeTab === "dashboard" && (
        <>
          <SectionHeader
            title="Dashboard Overview"
            description="Quick overview of your attendance, classes, exams, leave requests and AI-powered academic insights."
          />

          <div className="grid gap-6 md:grid-cols-5">
            <DayStatusCard />

            <div className={cardClass}>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Attendance
              </p>
              <h2 className="mt-2 text-3xl font-black">{data.attendance}%</h2>
            </div>

            <div className={cardClass}>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Today Classes
              </p>
              <h2 className="mt-2 text-3xl font-black">
                {todaySchedule.length}
              </h2>
            </div>

            <div className={cardClass}>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Exams Today
              </p>
              <h2 className="mt-2 text-3xl font-black">
                {dayStatus.isWorkingDay ? examsToday.length : 0}
              </h2>
            </div>

            <div className={cardClass}>
              <p className="text-sm text-slate-600 dark:text-slate-300">
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
        </>
      )}

      {activeTab === "classes" && (
        <>
          <SectionHeader
            title="Classes & Timetable"
            description="View your daily timetable, scheduled classes, lab sessions and academic activities."
          />

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
        </>
      )}

      {activeTab === "attendance" && (
        <>
          <SectionHeader
            title="Attendance Overview"
            description="Monitor your attendance percentage and maintain the required academic attendance level."
          />

          <div className="grid gap-6 lg:grid-cols-2">
            <div className={cardClass}>
              <h2 className="mb-3 text-xl font-black text-blue-600 dark:text-blue-300">
                Current Attendance
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Your current attendance percentage
              </p>
              <h3 className="mt-4 text-5xl font-black text-slate-900 dark:text-white">
                {data.attendance}%
              </h3>
            </div>

            <ProgressCard label="Attendance Progress" value={data.attendance} />
          </div>
        </>
      )}

      {activeTab === "leave" && (
        <>
          <SectionHeader
            title="Leave Application"
            description="Apply for leave and track the approval status of your submitted leave requests."
          />

          <div className="grid gap-6 lg:grid-cols-2">
            <div className={cardClass}>
              <h2 className="mb-4 text-xl font-black text-purple-600 dark:text-purple-300">
                Apply Leave
              </h2>

              <form onSubmit={handleLeaveSubmit}>
                <div className="mb-4 grid gap-4 md:grid-cols-2">
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className={inputClass}
                    required
                  />
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className={inputClass}
                    required
                  />
                </div>

                <textarea
                  value={leaveReason}
                  onChange={(e) => setLeaveReason(e.target.value)}
                  placeholder="Enter your leave reason..."
                  className={`${inputClass} h-32 resize-none p-4`}
                  required
                />

                <button className={`mt-4 ${buttonClass}`}>
                  Submit Leave Request
                </button>
              </form>
            </div>

            <div className={cardClass}>
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
                              ? "font-bold text-green-600 dark:text-green-400"
                              : leave.status === "Rejected"
                              ? "font-bold text-red-600 dark:text-red-400"
                              : "font-bold text-blue-600 dark:text-blue-400"
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
          </div>
        </>
      )}

      {activeTab === "exams" && (
        <>
          <SectionHeader
            title="Exams & Attempts"
            description="Check available tests, upcoming exams and your daily exam attempt status."
          />

          <div className={cardClass}>
            <h2 className="mb-4 text-xl font-black text-purple-600 dark:text-purple-300">
              Exam Attempts
            </h2>

            {dayStatus.isWorkingDay ? (
              <div className="grid gap-4 md:grid-cols-2">
                {examsToday.map((exam, index) => (
                  <div key={index} className={innerCardClass}>
                    <h3 className="font-black text-slate-900 dark:text-white">
                      {exam.subject}
                    </h3>
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
        </>
      )}

      {activeTab === "performance" && (
        <>
          <SectionHeader
            title="Performance Insights"
            description="Analyze your progress, feedback, weak areas, leaderboard rank and adaptive practice suggestions."
          />

          <div className={cardClass}>
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
              <p className="text-slate-700 dark:text-slate-200">
                {data.feedback}
              </p>
            </div>

            <div className={cardClass}>
              <h2 className="mb-2 text-xl font-black text-purple-600 dark:text-purple-300">
                Weak Area
              </h2>
              <p className="text-slate-700 dark:text-slate-200">
                {data.weakArea}
              </p>
            </div>
          </div>

          <div className={`mt-8 ${cardClass}`}>
            <h2 className="mb-3 text-xl font-black text-blue-600 dark:text-blue-300">
              Leaderboard
            </h2>
            <p>
              <b>Student:</b> {data.leaderboardName}
            </p>
            <p>
              <b>Rank:</b> #{data.rank}
            </p>
            <p>
              <b>Competitor:</b> {data.nearestCompetitor} +
              {data.competitorDelta}
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
        </>
      )}
    </MainLayout>
  );
}