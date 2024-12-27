import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast';
import Sidebar from "../components/Sidebarr";
import Header from "../components/Header";
import Footer from "../components/Footer";

const departments = [
  "Computer",
  "ENTC",
  "Mechanical",
  "Civil",
  "Electrical",
  "Data Science",
];

export default function AddVacancy() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    description: "",
    qualifications: "",
    lastDate: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const addVacancy = async (formData) => {
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/college/addVacancy`, formData, { withCredentials: true });
      navigate("/vacancies");
      toast.success("Vacancy Added");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();    
    addVacancy(formData);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F5EFFF]">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 md:p-8 md:ml-64">
          <h1 className="text-3xl font-bold text-[#4A0E5C] mb-8">Add New Vacancy</h1>
          <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-[#4A0E5C]">
                  Vacancy Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm h-12 ${
                    errors.title
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-[#CDC1FF] focus:ring-[#A594F9] focus:border-[#A594F9]"
                  }`}
                  placeholder="Enter vacancy title"
                />
                {errors.title && (
                  <p className="text-sm text-red-600 mt-1">{errors.title}</p>
                )}
              </div>

              <div>
                <label htmlFor="department" className="block text-sm font-medium text-[#4A0E5C]">
                  Department
                </label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm h-12 ${
                    errors.department
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-[#CDC1FF] focus:ring-[#A594F9] focus:border-[#A594F9]"
                  }`}
                >
                  <option value="">Select a department</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
                {errors.department && (
                  <p className="text-sm text-red-600 mt-1">{errors.department}</p>
                )}
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-[#4A0E5C]">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                    errors.description
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-[#CDC1FF] focus:ring-[#A594F9] focus:border-[#A594F9]"
                  }`}
                  placeholder="Enter job description"
                />
                {errors.description && (
                  <p className="text-sm text-red-600 mt-1">{errors.description}</p>
                )}
              </div>

              <div>
                <label htmlFor="qualifications" className="block text-sm font-medium text-[#4A0E5C]">
                  Qualifications
                </label>
                <textarea
                  id="qualifications"
                  name="qualifications"
                  rows="4"
                  value={formData.qualifications}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                    errors.qualifications
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-[#CDC1FF] focus:ring-[#A594F9] focus:border-[#A594F9]"
                  }`}
                  placeholder="Enter required qualifications"
                />
                {errors.qualifications && (
                  <p className="text-sm text-red-600 mt-1">{errors.qualifications}</p>
                )}
              </div>

              <div>
                <label htmlFor="lastDate" className="block text-sm font-medium text-[#4A0E5C]">
                  Last Date to Apply
                </label>
                <input
                  type="date"
                  id="lastDate"
                  name="lastDate"
                  value={formData.lastDate}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm h-12 ${
                    errors.lastDate
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-[#CDC1FF] focus:ring-[#A594F9] focus:border-[#A594F9]"
                  }`}
                />
                {errors.lastDate && (
                  <p className="text-sm text-red-600 mt-1">{errors.lastDate}</p>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => navigate("/vacancies")}
                className="py-2 px-4 border border-[#CDC1FF] shadow-sm rounded-md text-[#4A0E5C] bg-white hover:bg-[#F5EFFF] mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2 px-4 border border-transparent shadow-sm rounded-md text-white bg-[#A594F9] hover:bg-[#8B6BF2]"
              >
                Submit Vacancy
              </button>
            </div>
          </form>
        </main>
      </div>
      <Footer />
    </div>
  );
}