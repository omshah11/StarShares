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
import SearchPage from '../../features/user/search/searchPage';
import ArtistPage from '../../features/artist/ArtistPage';
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../features/user/userSlice";
import { login, logout } from "../../features/user/userSlice";
import "../../index.css"; // import Tailwind CSS main file 
const App = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if token exists in local storage or cookies
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      retrieveUser(storedToken);
    }
    
  }, []);

  const retrieveUser = async (userToken) => {
    try {
      const configuration = {
        method: "get", // Assuming you are using a GET request for login
        url: "https://intense-inlet-40544-607910b59282.herokuapp.com/api/getUserByToken",
        params: {
          // Pass parameters as 'params' instead of 'data'
          userToken,
        },
        headers: {
          "Content-Type": "application/json",
        },
      };

      // Send the login request
      const response = await axios(configuration);

      const userId = response.data.user._id;
      const firstName = response.data.user.firstName;
      const lastName = response.data.user.lastName;
      const email = response.data.user.email;
      const password = response.data.user.password;
      const watchlist = response.data.user.watchlist;
      const balance = response.data.user.balance;

      // Assuming 'loggedIn' is derived from the userState or another logic
      const loggedIn = true;

      // Dispatching the login action with separate properties for user and isLoggedIn
      dispatch(
        login({
          user: {
            userId: userId,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
          },
          userId: userId,
          isLoggedIn: loggedIn,
          token: userToken, // Include the token in the login action
          watchlist: watchlist,
          balance: balance
        })
      );
    } catch (error) {
      // Handle error, log it, or show a user-friendly message
      if (error.response.status === 401) {
        // Token is expired, handle it silently
        dispatch(
          logout({
            userId: null,
            user: {},
            isLoggedIn: false,
            token: null,
          })
        );
      } else {
        console.error(error);
      }
    }
  };


  return (
    <Router>
    <div>
      {user.isLoggedIn ? (
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/home" element={<LandingPage />}/>
            <Route path="/about-us" element={<AboutUs />}/>
            <Route path="/portfolio" element={<Portfolio />}/>
            <Route path="/watchlist" element={<Watchlist />}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/search-page" element={<SearchPage />}/>
            <Route path="/artist" element={<ArtistPage />}/>
          </Routes>
        </div>
      ) : (
        <div>
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      )}
    </div>
    </Router>
  );
};

export default App;
