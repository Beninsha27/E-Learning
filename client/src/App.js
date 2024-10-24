import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import  {BrowserRouter, Route, Routes } from 'react-router-dom'
import Nav from './Components/Home/Nav';
import Carousal from './Components/Home/Carousal';
import AboutUs from './Components/Home/AboutUs';
import Features from './Components/Home/Features';
import Footer from './Components/Home/Footer';
import ContactUs from './Components/Home/ContactUs';
import Login from './Components/Login/Login';
import AdminLogin from './Components/Login/AdminLogin';

function App() {
  return (
    <BrowserRouter exact path='/E-Larning'>
      <div className="App">
        <Routes>
          <Route exact path='/' element={[<Nav/>,<Carousal/>,<Features/>,<AboutUs/>,<ContactUs/>,<Footer/>]}/>
          <Route path='/about' element={[<Nav/>,<AboutUs />,<Footer/>]}/>
          <Route path='/contact' element={[<Nav/>,<ContactUs />,<Footer/>]}/>
          <Route path='/login' element={[<Nav/>,<Login />,<Footer/>]}/>
          <Route path='/Adminlogin' element={[<Nav/>,<AdminLogin />,<Footer/>]}/>



        </Routes>
        
      </div>
    </BrowserRouter>
  );
}

export default App;
