import React, { useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Carousal from './Components/Home/Carousal';
import AboutUs from './Components/Home/AboutUs';
import Features from './Components/Home/Features';
import Footer from './Components/Home/Footer';
import Login from './Components/Login/LoginParent';
import AdminLogin from './Components/Login/AdminLogin';
import AdminHome from './Components/Admin/AdminHome';
import LoginStudent from './Components/Login/LoginStudent';
import LoginTrainer from './Components/Login/LoginTrainer';
import LoginParent from './Components/Login/LoginParent';
import RegisterStudent from './Components/Registration/RegisterStudent';
import RegisterTrainer from './Components/Registration/RegisterTrainer';
import RegisterParent from './Components/Registration/RegisterParent';
import LoginNav from './Components/NavBar/LoginNav';
import AdminNav from './Components/NavBar/AdminNav';
import Nav from './Components/NavBar/Nav';
import StudentNav from './Components/NavBar/StudentNav';
import AdminViewStudents from './Components/Admin/AdminViewStudents';
import AdminViewTrainers from './Components/Admin/AdminViewTrainers';
import AdminViewTrainerReq from './Components/Admin/AdminViewTrainerReq';
import TrainerNav from './Components/NavBar/TrainerNav';
import TrainerViewCourse from './Components/Trainer/TrainerViewCourse';
import TrainerAddCourse from './Components/Trainer/TrainerAddCourse';
import AdminViewCourse from './Components/Admin/AdminViewCourse';
import AdminViewCourseReq from './Components/Admin/AdminViewCourseReq';

function App() {

  return (
    <BrowserRouter basename="/E-Learning">
      <div className="App">
        <Routes>
          <Route exact path="/" element={[<Nav />, <Carousal />, <Features />, <AboutUs />, <Footer />]} />
          <Route path="/about" element={[<Nav />, <AboutUs />, <Footer />]} />
          <Route path="/login" element={[<Nav />, <Login />, <Footer />]} />
          <Route path="/Adminlogin" element={[<LoginNav />, <AdminLogin />, <Footer />]} />

          {/* Admin */}
          <Route path="/AdminHome" element={[<AdminNav />, <AdminHome />]} />
          <Route path="/AdminViewStudent" element={[<AdminNav />, <AdminViewStudents />]} />
          <Route path="/AdminViewTrainers" element={[<AdminNav />, <AdminViewTrainers />]} />
          <Route path="/AdminViewTrainersReq" element={[<AdminNav />, <AdminViewTrainerReq />]} />
          <Route path="/AdminViewCourse" element={[<AdminNav />, <AdminViewCourse />]} />
          <Route path="/AdminViewCoureRequest" element={[<AdminNav />, <AdminViewCourseReq />]} />

          {/* Student */}
          <Route exact path="/StudentHome" element={[<StudentNav/>, <Carousal />, <Features />, <AboutUs />, <Footer />]} />
          <Route path="/Studentabout" element={[<StudentNav />, <AboutUs />, <Footer />]} />
          <Route path="/StudentLogin" element={[<LoginNav />, <LoginStudent />, <Footer />]} />
          <Route path="/StudentReg" element={[<LoginNav />, <RegisterStudent />, <Footer />]} />

          {/* Trainer */}
          <Route exact path="/TrainerHome" element={[<TrainerNav/>, <Carousal />, <Features />, <AboutUs />, <Footer />]} />
          <Route path="/Trainerabout" element={[<TrainerNav />, <AboutUs />, <Footer />]} />
          <Route path="/TrainerLogin" element={[<LoginNav />, <LoginTrainer />, <Footer />]} />
          <Route path="/TrainerReg" element={[<LoginNav />, <RegisterTrainer />, <Footer />]} />
          <Route path="/TrainerAddCourse" element={[<TrainerNav />, <TrainerAddCourse />, <Footer />]} />
          <Route path="/TrainerViewCourse" element={[<TrainerNav />, <TrainerViewCourse />, <Footer />]} />

          {/* Parent */}
          <Route path="/ParentLogin" element={[<LoginNav />, <LoginParent />, <Footer />]} />
          <Route path="/ParentReg" element={[<LoginNav />, <RegisterParent />, <Footer />]} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
