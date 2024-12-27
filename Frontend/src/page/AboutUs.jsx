import React from "react";
import TeacherSidebar from "../components/TeacherSidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AboutUs() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F5EFFF]">
      <Header />
      <div className="flex flex-1">
        <TeacherSidebar />
        <main className="flex-1 p-4 md:p-8 md:ml-64">
          <h1 className="text-4xl font-bold text-[#4A0E5C] mb-8">About EduHire</h1>

          {/* Project Overview */}
          <section className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold text-[#4A0E5C] mb-4">Project Overview</h2>
            <div className="space-y-4">
              <p>
                EduHire is an innovative online platform designed to bridge the gap between educational institutions and teaching professionals. Our mission is to streamline the hiring process in the education sector, making it easier for colleges to find qualified teachers and for educators to discover exciting career opportunities.
              </p>
              <p>
                With EduHire, colleges can easily post job vacancies, manage applications, and connect with potential candidates. Teachers, on the other hand, can create comprehensive profiles, search for relevant positions, and apply directly through our user-friendly interface.
              </p>
            </div>
          </section>

          {/* Our Team */}
          <section className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold text-[#4A0E5C] mb-4">Our Team</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { name: "Prajakta Dhanraj Mahajan", roll: "112", prn: "231101119" },
                { name: "Khushi Jagdish Chaudhari", roll: "67", prn: "231101074" },
                { name: "Shruti Kishor Patil", roll: "129", prn: "231101137" },
                { name: "Aayush Milind Chaudhari", roll: "108", prn: "231101115" },
              ].map((member, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-medium text-[#4A0E5C] mb-2">{member.name}</h3>
                  <p className="text-[#6B7280]">Roll No: {member.roll}</p>
                  <p className="text-[#6B7280]">PRN: {member.prn}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Project Guide */}
          <section className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold text-[#4A0E5C] mb-4">Project Guide</h2>
            <div>
              <h3 className="text-xl font-medium text-[#4A0E5C] mb-2">Prof.Dr.R.B.Wagh</h3>
              <p className="text-[#6B7280]">
                We extend our sincere gratitude to Prof.Dr.R.B.Wagh for their invaluable guidance and support throughout the development of this project. Their expertise and mentorship have been crucial in shaping EduHire into a robust and innovative platform.
              </p>
            </div>
          </section>

          {/* Project Information */}
          <section className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold text-[#4A0E5C] mb-4">Project Information</h2>
            <p className="text-[#6B7280] mb-4">
              EduHire is a semester project developed as part of our academic curriculum. This project showcases our skills in full-stack web development and demonstrates our ability to create a practical solution for the education sector.
            </p>
            <p className="text-[#6B7280]">
              Through this project, we've applied our knowledge of modern web technologies, database management, and user experience design to create a platform that addresses real-world challenges in educational recruitment.
            </p>
          </section>

          {/* Key Features */}
          <section className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold text-[#4A0E5C] mb-4">Key Features</h2>
            <ul className="list-disc list-inside text-[#6B7280] space-y-2">
              <li>User-friendly interface for both colleges and teachers</li>
              <li>Efficient vacancy posting and management for educational institutions</li>
              <li>Comprehensive teacher profiles with qualifications and experience</li>
              <li>Advanced search and filter options for job seekers</li>
              <li>Secure authentication and data protection</li>
              <li>Responsive design for seamless use across devices</li>
              <li>Real-time notifications for application updates</li>
              <li>Analytics dashboard for colleges to track hiring metrics</li>
            </ul>
          </section>

          {/* Tech Stack */}
          <section className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-[#4A0E5C] mb-4">Tech Stack</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-medium text-[#4A0E5C] mb-3">Frontend:</h3>
                <ul className="list-disc list-inside text-[#6B7280]">
                  <li>React.js - A JavaScript library for building user interfaces</li>
                  <li>React Router - For handling routing in our single-page application</li>
                  <li>Axios - Promise-based HTTP client for making API requests</li>
                  <li>Tailwind CSS - A utility-first CSS framework for rapid UI development</li>
                  <li>React Hot Toast - For displaying notifications and alerts</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-medium text-[#4A0E5C] mb-3">Backend:</h3>
                <ul className="list-disc list-inside text-[#6B7280]">
                  <li>Node.js - JavaScript runtime built on Chrome's V8 JavaScript engine</li>
                  <li>Express.js - Web application framework for Node.js</li>
                  <li>MongoDB - NoSQL database for storing application data</li>
                  <li>Mongoose - MongoDB object modeling for Node.js</li>
                  <li>JSON Web Tokens (JWT) - For secure authentication</li>
                  <li>Bcrypt - For password hashing and security</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-medium text-[#4A0E5C] mb-3">Development Tools:</h3>
                <ul className="list-disc list-inside text-[#6B7280]">
                  <li>Git & GitHub - For version control and collaboration</li>
                  <li>VS Code - Code editor with extensions for React and Node.js development</li>
                  <li>Postman - For API testing and documentation</li>
                  <li>npm - Package manager for JavaScript</li>
                </ul>
              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
}
