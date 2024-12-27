import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebarr"; 
import Header from "../components/Header";   
import Footer from "../components/Footer";
import axios from "axios";
import toast from "react-hot-toast";

export default function VacancyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vacancy, setVacancy] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVacancyDetails = async (vacancyId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/college/getVacancyById/${vacancyId}`, {
        withCredentials: true,
      });

      if (response.data.success) {
        setVacancy(response.data.vacancy);
        setApplicants(response.data.vacancy.applicants);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching vacancy details:", error);
      toast.error("Error Fetching the vacancy");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVacancyDetails(id);
  }, [id]);

  return (
    <div className="flex flex-col min-h-screen bg-[#F5EFFF]">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 md:p-8 md:ml-64">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#A594F9]"></div>
            </div>
          ) : !vacancy ? (
            <div className="text-center py-6 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-[#4A0E5C]">Vacancy not found</h2>
              <button
                onClick={() => navigate(-1)}
                className="mt-4 px-4 py-2 bg-[#A594F9] text-white rounded hover:bg-[#8B6BF2] transition duration-300"
              >
                Go Back
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6 flex justify-between items-center">
                <button
                  onClick={() => navigate(-1)}
                  className="text-[#4A0E5C] hover:text-[#A594F9] transition duration-300 flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Vacancies
                </button>
              </div>

              <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                <h1 className="text-3xl font-bold text-[#4A0E5C] mb-2">{vacancy.title}</h1>
                <p className="text-lg text-[#6B7280] mb-4">{vacancy.department}</p>
                <div className="border-t border-[#E5D9F2] pt-4 mt-4">
                  <p className="text-[#4A0E5C] mb-3">{vacancy.description}</p>
                  <p className="text-[#4A0E5C] mb-3">
                    <span className="font-semibold">Qualifications:</span> {vacancy.qualifications}
                  </p>
                  <p className="text-[#4A0E5C]">
                    <span className="font-semibold">Last Date to Apply:</span>{" "}
                    {new Date(vacancy.lastDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>

              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold text-[#4A0E5C] mb-6">Applicants</h2>
                {applicants.length > 0 ? (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {applicants.map((applicant) => (
                      <div
                        key={applicant.id}
                        className="bg-[#F5EFFF] p-4 rounded-lg shadow transition duration-300 hover:shadow-md"
                      >
                        <h3 className="text-xl font-semibold text-[#4A0E5C] mb-2">{applicant.name}</h3>
                        <p className="text-[#6B7280] mb-1">
                          <span className="font-medium">Email:</span> {applicant.email}
                        </p>
                        <p className="text-[#6B7280] mb-1">
                          <span className="font-medium">Qualifications:</span> {applicant.qualifications}
                        </p>
                        <p className="text-[#6B7280]">
                          <span className="font-medium">Experience:</span> {applicant.experience}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[#6B7280] text-center py-4">No applicants for this vacancy yet.</p>
                )}
              </div>
            </>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}