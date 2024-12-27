import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import TeacherSidebar from "../components/TeacherSidebar"; 
import Header from "../components/Header";
import Footer from "../components/Footer";

function ViewVacancies() {
  const navigate = useNavigate();
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/teacher/getAllVacancy`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setVacancies(response.data.allVacancy);
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
        <TeacherSidebar />
        <main className="flex-1 p-4 md:p-8 md:ml-64">
          <h1 className="text-3xl font-bold text-[#4A0E5C] mb-8">Available Vacancies</h1>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#A594F9]"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vacancies.map((vacancy) => (
                <div
                  key={vacancy._id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                >
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-[#4A0E5C] mb-2">
                      {vacancy.title}
                    </h2>
                    <h3 className="text-md text-[#6B7280] mb-4">{vacancy.company}</h3>
                    <p className="text-[#4A0E5C] mb-4">{vacancy.description}</p>
                    <p className="text-sm text-[#6B7280] mb-4">
                      Deadline:{" "}
                      {new Date(vacancy.lastDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <button
                      className="bg-[#A594F9] hover:bg-[#8B6BF2] text-white font-bold py-2 px-4 rounded transition duration-300"
                      onClick={() => navigate(`/applyforvacancy/${vacancy._id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default ViewVacancies;