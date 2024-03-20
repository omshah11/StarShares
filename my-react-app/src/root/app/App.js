import { React, useEffect } from "react";
//import jwt from 'jsonwebtoken';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../../features/user/login/login";
import Navbar from "../../features/user/navbar/navbar";
import AboutUs from "../../features/user/aboutUs/aboutUs";
import Portfolio from "../../features/user/portfolio/portfolio";
import Watchlist from "../../features/user/watchlist/watchlist";
import Profile from "../../features/user/profile/profile";
import LandingPage from "../../features/user/landingPage/landingPage";
import SignUp from "../../features/signup/signup";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, selectToken } from "../../features/user/userSlice";
import { login } from "../../features/user//userSlice";
import "./App.css";
import { store } from "./store";

const App = () => {
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if token exists in local storage or cookies
    console.log("Reached inside useEffect");
    const storedToken = localStorage.getItem("token");
    console.log("retireved token from local storage: ", storedToken);
    console.log(user);
    const payload = jwt.verify(storedToken, 'your-secret-key');
    console.log(payload);
    if (storedToken) {
      // Dispatch login action with stored token
      dispatch(
        login({
          token: storedToken,
        })
      );
    }
  }, []);

  return (
    <Router>
      <div>
        {user && user.isLoggedIn ? (
          <div>
            <Navbar />
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<LandingPage />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/watchlist" element={<Watchlist />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
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
