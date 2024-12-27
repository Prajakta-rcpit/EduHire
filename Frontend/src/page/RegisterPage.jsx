import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/college/register`, formData, { withCredentials: true });
      toast.success("Registration Successful");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-[#F5EFFF] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
      <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-[#4A0E5C] mb-2">EduHire</h1>
         
        </div>
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg overflow-hidden">
          <h2 className="text-2xl font-bold text-center text-white bg-[#4A0E5C] py-4">College Registration</h2>
          <div className="p-6 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#4A0E5C] mb-1">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full px-4 py-2 rounded-md border border-[#CDC1FF] focus:outline-none focus:ring-2 focus:ring-[#A594F9]"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#4A0E5C] mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-2 rounded-md border border-[#CDC1FF] focus:outline-none focus:ring-2 focus:ring-[#A594F9]"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#4A0E5C] mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-4 py-2 rounded-md border border-[#CDC1FF] focus:outline-none focus:ring-2 focus:ring-[#A594F9]"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#4A0E5C] mb-1">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="w-full px-4 py-2 rounded-md border border-[#CDC1FF] focus:outline-none focus:ring-2 focus:ring-[#A594F9]"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#A594F9] text-white py-2 px-4 rounded-md hover:bg-[#8B6BF2] transition duration-200"
            >
              Register
            </button>
            <div className="text-center">
              <p className="text-sm text-[#4A0E5C]">
                Already have an account?{' '}
                <a href="/" className="text-[#A594F9] hover:underline">Login</a>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}