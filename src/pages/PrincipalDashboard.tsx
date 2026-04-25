import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import Charts from "../components/Charts";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

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

export default function PrincipalDashboard() {
  const [data, setData] = useState<PrincipalData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "dashboards", "principal");
      const snap = await getDoc(docRef);

      if (snap.exists()) {
        setData(snap.data() as PrincipalData);
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
          <p className="text-gray-400">Total Students</p>
          <h2 className="text-2xl font-bold text-yellow-400">
            {data.totalStudents}
          </h2>
        </div>

        <div className="glass p-6">
          <p className="text-gray-400">Faculty</p>
          <h2 className="text-2xl font-bold text-yellow-400">
            {data.faculty}
          </h2>
        </div>

        <div className="glass p-6">
          <p className="text-gray-400">Departments</p>
          <h2 className="text-2xl font-bold text-yellow-400">
            {data.departments}
          </h2>
        </div>

        <div className="glass p-6">
          <p className="text-gray-400">Performance</p>
          <h2 className="text-2xl font-bold text-yellow-400">
            {data.institutionPerformance}%
          </h2>
        </div>
      </div>

      <div className="mt-6">
        <Charts
          title1="Institution Growth"
          title2="Monthly Performance"
          data={data.chartData}
        />
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-6">
        <div className="glass p-6">
          <h2 className="text-yellow-400 text-xl mb-2">
            Institutional Health Index
          </h2>
          <p className="text-2xl font-bold">{data.healthIndex}/100</p>
        </div>

        <div className="glass p-6">
          <h2 className="text-yellow-400 text-xl mb-2">
            Critical Alerts
          </h2>
          <p className="text-2xl font-bold">{data.criticalAlerts}</p>
        </div>

        <div className="glass p-6">
          <h2 className="text-yellow-400 text-xl mb-2">
            Top Department
          </h2>
          <p className="text-2xl font-bold">{data.topDepartment}</p>
        </div>
      </div>
    </MainLayout>
  );
}