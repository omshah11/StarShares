import { React, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Login from "../../features/user/login/login";
import Navbar from "../../features/user/navbar/navbar";
import AboutUs from "../../features/user/aboutUs/aboutUs";
import Portfolio from "../../features/user/portfolio/portfolio";
import Watchlist from "../../features/user/watchlist/watchlist";
import Profile from "../../features/user/profile/profile";
import LandingPage from "../../features/user/landingPage/landingPage";
import SignUp from "../../features/signup/signup";
import { useSelector, useDispatch } from "react-redux";
import { selectUser} from "../../features/user/userSlice";
import { login } from "../../features/user//userSlice";
import "./App.css";

const App = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if token exists in local storage or cookies
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      retrieveUser(storedToken);
      dispatch(
        login({
          token: storedToken,
        })
      );
    }
  }, []);

  const retrieveUser = async (userToken) => {
    try {
      const configuration = {
        method: "get", // Assuming you are using a GET request for login
        url: "http://localhost:5000/api/getUserByToken",
        params: { // Pass parameters as 'params' instead of 'data'
          userToken
        },
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      // Send the login request
      const response = await axios(configuration);

      const firstName = response.data.user.firstName;
      const lastName = response.data.user.lastName;
      const email = response.data.user.email;
      const password = response.data.user.password;
  
      // Assuming 'loggedIn' is derived from the userState or another logic
      const loggedIn = true;
  
      // Dispatching the login action with separate properties for user and isLoggedIn
      dispatch(
        login({
          user: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
          },
          isLoggedIn: loggedIn,
          token: userToken, // Include the token in the login action
        })
      );
    }catch (error) {
      // Handle error, log it, or show a user-friendly message
      console.error(error);
    }
  };

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
