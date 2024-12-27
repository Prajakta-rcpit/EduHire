import './App.css';
import { Routes, Route } from "react-router-dom";
import LoginPage from './page/LoginPage';
import VacanciesList from './page/VacanciesList';
import VacancyDetails from './page/VacancyDetails';
import RegisterPage from './page/RegisterPage';
import Dashboard from './page/DashBoard';
import AddVacancy from './page/AddVacancy';
import TeacherRegistration from './page/TeacherRegistration';
import TeacherLogin from './page/TeacherLogin';
import ViewVacancies from './page/ViewVacancies';
import ApplyForVacancy from './page/ApplyForVacancy';
import AboutUs from './page/AboutUs';

function App() {
  return (
    <div className="App">
       <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/vacancies" element={<VacanciesList />} />
          <Route path="/vacancies/:id" element={<VacancyDetails />} />
          <Route path="/registerpage" element={<RegisterPage />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/addvacancy" element={<AddVacancy />}></Route>
          <Route path="/teacherregistration" element={<TeacherRegistration />}></Route>
          <Route path="/teacherlogin" element={<TeacherLogin />}></Route>
          <Route path="/viewvacancies" element={<ViewVacancies />}></Route>
          <Route path="/applyforvacancy/:id" element={<ApplyForVacancy />}></Route>
          <Route path="/aboutus" element={<AboutUs />}></Route>
          


        </Routes>
    </div>
  );
}

export default App;
