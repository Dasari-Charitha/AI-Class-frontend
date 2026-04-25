import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import Charts from "../components/Charts";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { getStudentDoc } from "../services/firestore";

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

export default function StudentDashboard() {
  const [data, setData] = useState<StudentData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getStudentDoc();
        if (!res) {
          setError("No data found");
        } else {
          setData(res);
        }
      } catch {
        setError("Failed to load data");
      }
    };

    load();
  }, []);

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
      <h1 className="text-3xl font-bold text-yellow-400 mb-4">
        {data.name}
      </h1>

      <div className="grid md:grid-cols-4 gap-6 mt-6">
        <div className="glass p-6 hover:scale-105 transition-transform">
          <p className="text-gray-400">Attendance</p>
          <h2 className="text-2xl font-bold text-yellow-400">
            {data.attendance}%
          </h2>
        </div>

        <div className="glass p-6 hover:scale-105 transition-transform">
          <p className="text-gray-400">Grade</p>
          <h2 className="text-2xl font-bold text-yellow-400">
            {data.grade}
          </h2>
        </div>

        <div className="glass p-6 hover:scale-105 transition-transform">
          <p className="text-gray-400">Rank</p>
          <h2 className="text-2xl font-bold text-yellow-400">
            #{data.rank}
          </h2>
        </div>

        <div className="glass p-6 hover:scale-105 transition-transform">
          <p className="text-gray-400">Percentile</p>
          <h2 className="text-2xl font-bold text-yellow-400">
            {data.percentile}%
          </h2>
        </div>
      </div>

      <div className="mt-6">
        <Charts
          title1="Performance Trend"
          title2="Weekly Performance"
          data={data.chartData}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div className="glass p-6 hover:scale-105 transition-transform">
          <h2 className="text-yellow-400 text-xl mb-2">
            Recent Feedback
          </h2>
          <p>{data.feedback}</p>
        </div>

        <div className="glass p-6 hover:scale-105 transition-transform">
          <h2 className="text-yellow-400 text-xl mb-2">
            Weak Area
          </h2>
          <p>{data.weakArea}</p>
        </div>
      </div>

      <div className="glass p-6 mt-6 hover:scale-105 transition-transform">
        <h2 className="text-yellow-400 text-xl mb-3">Leaderboard</h2>

        <p><b>Student:</b> {data.leaderboardName}</p>
        <p><b>Rank:</b> #{data.rank}</p>
        <p>
          <b>Competitor:</b> {data.nearestCompetitor} +{data.competitorDelta}
        </p>
      </div>

      <div className="glass p-6 mt-6 hover:scale-105 transition-transform">
        <h2 className="text-yellow-400 text-xl mb-3">
          Adaptive Practice
        </h2>

        <p><b>Topic:</b> {data.recommendedTopic}</p>
        <p><b>Level:</b> {data.practiceLevel}</p>
        <p><b>Questions:</b> {data.practiceQuestions}</p>

        <button className="mt-4 bg-yellow-400 text-black px-5 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition">
          Start Practice
        </button>
      </div>
    </MainLayout>
  );
}