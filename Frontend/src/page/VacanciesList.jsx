import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Sidebar from "../components/Sidebarr";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function VacanciesList() {
  const navigate = useNavigate();
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/college/getVacancy`, {
        withCredentials: true,
      });
      
      if (response.data.success) {
        setVacancies(response.data.vacancies);
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
        <main className="flex-1 p-4 md:p-8 md:ml-64">
          <h1 className="text-3xl font-bold text-[#4A0E5C] mb-8">Your Vacancies</h1>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#A594F9]"></div>
            </div>
          ) : vacancies.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {vacancies.map((vacancy) => (
                <div
                  key={vacancy._id}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1"
                  onClick={() => navigate(`/vacancies/${vacancy._id}`)}
                >
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-[#4A0E5C] mb-2">{vacancy.title}</h2>
                    <p className="text-sm text-[#6B7280] mb-4 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-[#A594F9]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      {vacancy.department}
                    </p>
                    <p className="text-sm text-[#6B7280] flex items-center">
                      <svg className="w-4 h-4 mr-2 text-[#A594F9]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Last Date: {new Date(vacancy.lastDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="bg-[#E5D9F2] px-6 py-3">
                    <span className="text-[#4A0E5C] hover:text-[#A594F9] font-medium transition-colors duration-300">
                      View Details →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <p className="text-[#6B7280]">No vacancies found. Start adding some!</p>
              <button 
                className="mt-4 bg-[#A594F9] hover:bg-[#8B6BF2] text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                onClick={() => navigate('/add-vacancy')}
              >
                Add New Vacancy
              </button>
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}