import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from '../../features/user/login/login';
import Navbar from '../../features/user/navbar/navbar';
import AboutUs from '../../features/user/aboutUs/aboutUs';
import LandingPage from '../../features/user/landingPage/landingPage';
import SignUp from '../../features/signup/signup';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/user/userSlice';
import './App.css';

const App = () => {
  const user = useSelector(selectUser);

  return (
    <Router>
    <div>
      {user ? (
        <div>
          <Navbar />
          <Routes>
            <Route path="/about-us" element={<AboutUs />}/>
          </Routes>
          <LandingPage />
        </div>
      ) : (
        <>
          <Login />
          <SignUp />
        </>
      )}
    </div>
    </Router>
  );
};

export default App;
