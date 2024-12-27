import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Sidebar from "../components/Sidebarr";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Dashboard = () => {
  const navigate = useNavigate();
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalApplicants, setTotalApplicants] = useState(0);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/college/getVacancy`, {
        withCredentials: true,
      });
      if (response.data.success) {
        const sortedVacancies = response.data.vacancies.sort(
          (a, b) => new Date(b.datePosted) - new Date(a.datePosted)
        );

        setVacancies(sortedVacancies);

        const totalApplicant = sortedVacancies.reduce((accum, vacancy) => {
          return accum + vacancy.applicants.length;
        }, 0);
        setTotalApplicants(totalApplicant);
      } else {
        toast.error(response.data.message || "No vacancies found.");
      }
    } catch (error) {
      console.error("Error fetching vacancies:", error);
      toast.error("Something went wrong while fetching vacancies.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#F5EFFF]">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 md:p-8 md:ml-64"> {/* Added md:ml-64 to offset the sidebar width */}
          <h1 className="text-3xl font-bold text-[#4A0E5C] mb-8">Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <SummaryCard title="Total Vacancies" value={vacancies.length} icon="📊" />
            <SummaryCard title="Total Applicants" value={totalApplicants} icon="👥" />
            <SummaryCard title="Open Positions" value={vacancies.filter(v => new Date(v.lastDate) > new Date()).length} icon="🚀" />
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <h2 className="text-xl font-semibold text-[#4A0E5C] p-4 bg-[#E5D9F2]">Recent Vacancies</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#CDC1FF]">
                  <tr>
                    <th className="px-4 py-2 text-left text-[#4A0E5C]">Title</th>
                    <th className="px-4 py-2 text-left text-[#4A0E5C]">Department</th>
                    <th className="px-4 py-2 text-left text-[#4A0E5C]">Applications</th>
                    <th className="px-4 py-2 text-left text-[#4A0E5C]">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {vacancies.slice(0, 5).map((vacancy) => (
                    <tr key={vacancy._id} className="border-b border-[#E5D9F2]">
                      <td className="px-4 py-2 text-[#4A0E5C]">{vacancy.title}</td>
                      <td className="px-4 py-2 text-[#4A0E5C]">{vacancy.department}</td>
                      <td className="px-4 py-2 text-[#4A0E5C]">{vacancy.applicants.length}</td>
                      <td className="px-4 py-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            new Date(vacancy.lastDate) > new Date()
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {new Date(vacancy.lastDate) > new Date() ? "Open" : "Closed"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

const SummaryCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#4A0E5C]">{title}</h3>
        <span className="text-2xl">{icon}</span>
      </div>
      <p className="text-3xl font-bold text-[#A594F9]">{value}</p>
    </div>
  );
};

export default Dashboard;