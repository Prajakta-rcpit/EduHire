import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import TeacherSidebar from "../components/TeacherSidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

function ApplyForVacancy() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [vacancy, setVacancy] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchVacancy = async (vacancyId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/college/getVacancyById/${vacancyId}`,
        { withCredentials: true }
      );

      if (response.data.success) {
        setVacancy(response.data.vacancy);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching vacancy details:", error);
      toast.error("Error Fetching the vacancy");
      setLoading(false);
    }
  };

  const applyVacancy = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/teacher/applyVacancy/${id}`,
        {},
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Applied for the Post");
        navigate("/viewvacancies");
      }
    } catch (error) {
      console.error("Error applying for vacancy:", error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVacancy(id);
  }, [id]);

  return (
    <div className="flex flex-col min-h-screen bg-[#F5EFFF]">
      <Header />
      <div className="flex flex-1">
        <TeacherSidebar />
        <main className="flex-1 p-4 md:p-8 md:ml-64">
          <h1 className="text-3xl font-bold text-[#4A0E5C] mb-8">Vacancy Details</h1>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#A594F9]"></div>
            </div>
          ) : vacancy ? (
            <>
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-semibold text-[#4A0E5C] mb-2">
                  {vacancy.title}
                </h2>
                <h3 className="text-lg text-[#6B7280] mb-2">{vacancy.department}</h3>
                <p className="text-[#4A0E5C] mb-4">{vacancy.description}</p>
                <p className="text-[#4A0E5C] mb-4">{vacancy.qualifications}</p>
                <p className="text-sm text-[#6B7280]">
                  Application Deadline:{" "}
                  {new Date(vacancy.lastDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <button
                onClick={applyVacancy}
                className="h-14 w-48 bg-[#A594F9] text-white font-semibold text-lg rounded-full transition-all duration-300 ease-in-out transform hover:bg-[#8B6BF2] hover:scale-105 shadow-lg"
              >
                Apply Here
              </button>
            </>
          ) : (
            <div className="text-center py-6 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-[#4A0E5C]">Vacancy not found</h2>
              <button
                onClick={() => navigate("/viewvacancies")}
                className="mt-4 px-4 py-2 bg-[#A594F9] text-white rounded hover:bg-[#8B6BF2] transition duration-300"
              >
                Back to Vacancies
              </button>
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default ApplyForVacancy;