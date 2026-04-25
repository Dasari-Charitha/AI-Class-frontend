import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import Charts from "../components/Charts";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

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

export default function TeacherDashboard() {
  const [data, setData] = useState<TeacherData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "dashboards", "teacher");
      const snap = await getDoc(docRef);

      if (snap.exists()) {
        setData(snap.data() as TeacherData);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return (
      <MainLayout>
        <p className="text-white">Loading...</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold text-yellow-400">
        {data.name}
      </h1>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mt-6">
        <div className="glass p-6">
          <p className="text-gray-400">Classes</p>
          <h2 className="text-2xl font-bold text-yellow-400">
            {data.classes}
          </h2>
        </div>

        <div className="glass p-6">
          <p className="text-gray-400">Students</p>
          <h2 className="text-2xl font-bold text-yellow-400">
            {data.students}
          </h2>
        </div>

        <div className="glass p-6">
          <p className="text-gray-400">Assignments</p>
          <h2 className="text-2xl font-bold text-yellow-400">
            {data.assignmentsGiven}
          </h2>
        </div>

        <div className="glass p-6">
          <p className="text-gray-400">Avg Score</p>
          <h2 className="text-2xl font-bold text-yellow-400">
            {data.averageScore}%
          </h2>
        </div>
      </div>

      {/* Chart */}
      <div className="mt-6">
        <Charts
          title1="Class Activity"
          title2="Weekly Distribution"
          data={data.chartData}
        />
      </div>

      {/* Insights */}
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div className="glass p-6">
          <h2 className="text-yellow-400 text-xl mb-2">
            At-Risk Students
          </h2>
          <p className="text-2xl font-bold">
            {data.atRiskStudents} Students
          </p>
        </div>

        <div className="glass p-6">
          <h2 className="text-yellow-400 text-xl mb-2">
            Upcoming Exam
          </h2>
          <p className="text-lg">{data.upcomingExam}</p>
        </div>
      </div>
    </MainLayout>
  );
}