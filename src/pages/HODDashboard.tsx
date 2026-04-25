import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import Charts from "../components/Charts";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

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

export default function HODDashboard() {
  const [data, setData] = useState<HODData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "dashboards", "hod");
      const snap = await getDoc(docRef);

      if (snap.exists()) {
        setData(snap.data() as HODData);
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

      <div className="grid md:grid-cols-4 gap-6 mt-6">
        <div className="glass p-6">
          <p className="text-gray-400">Departments</p>
          <h2 className="text-2xl font-bold text-yellow-400">
            {data.departments}
          </h2>
        </div>

        <div className="glass p-6">
          <p className="text-gray-400">Faculty</p>
          <h2 className="text-2xl font-bold text-yellow-400">
            {data.faculty}
          </h2>
        </div>

        <div className="glass p-6">
          <p className="text-gray-400">Reports</p>
          <h2 className="text-2xl font-bold text-yellow-400">
            {data.reports}
          </h2>
        </div>

        <div className="glass p-6">
          <p className="text-gray-400">Avg Score</p>
          <h2 className="text-2xl font-bold text-yellow-400">
            {data.averageScore}%
          </h2>
        </div>
      </div>

      <div className="mt-6">
        <Charts
          title1="Department Performance"
          title2="Department Comparison"
          data={data.chartData}
        />
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-6">
        <div className="glass p-6">
          <h2 className="text-yellow-400 text-xl mb-2">
            Attendance Rate
          </h2>
          <p className="text-2xl font-bold">{data.attendanceRate}%</p>
        </div>

        <div className="glass p-6">
          <h2 className="text-yellow-400 text-xl mb-2">
            Students At Risk
          </h2>
          <p className="text-2xl font-bold">{data.studentsAtRisk}</p>
        </div>

        <div className="glass p-6">
          <h2 className="text-yellow-400 text-xl mb-2">
            Best Department
          </h2>
          <p className="text-2xl font-bold">{data.bestDepartment}</p>
        </div>
      </div>
    </MainLayout>
  );
}