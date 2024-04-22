import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  login,
  selectUser,
  setCurrentUser,
  setUserWatchlist,
} from "../userSlice";
import {Link} from 'react-router-dom';
import axios from "axios";
import "../../../index.css";
import Loginimg from "../../../Imgs/landing.jpg"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const getUser = {
        method: "get", // Assuming you are using a GET request for login
        url: "http://localhost:5000/api/getUserByEmail",
        params: {
          // Pass parameters as 'params' instead of 'data'
          email,
          password,
        },
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      // Assuming 'loggedIn' is derived from the userState or another logic
      const loggedIn = true;

      // Send the login request
      const userResponse = await axios(getUser);

      // Assuming your server returns a token upon successful login
      const token = userResponse.data.token;
      const userId = userResponse.data.user._id;
      const firstName = userResponse.data.user.firstName;
      const lastName = userResponse.data.user.lastName;

      // Dispatching the login action with separate properties for user and isLoggedIn
      dispatch(
        login({
          user: {
            userId: userId,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
          },
          isLoggedIn: loggedIn,
          token: token, // Include the token in the login action
        })
      );

      // Dispatching setCurrentUser with the user information
      dispatch(
        setCurrentUser({
          user: {
            userId: userId,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            token: token
          },
        })
      );

      // Send the get Watchlist request
      try {
        const getWatchlist = {
          method: "get",
          url: "http://localhost:5000/api/getWatchlist",
          params: {
            userId
          },
          headers: {
            "Content-Type": "application/json",
          },
        };

        const watchlistResponse = await axios(getWatchlist);
        // Server returns a token successfully
        
        const watchlist = watchlistResponse.data.watchlist.stocks;
        dispatch(
          setUserWatchlist({
            watchlist: watchlist,
          })
        );
      } catch (error) {
        console.error("Error fetching watchlist:", error);
      }

      // Redirect to home page after successful login
      navigate("/home");
    } catch (error) {
      // Handle error, log it, or show a user-friendly message
      console.error("Error during login:", error);
    
    }
  };

  return (
    <section className="flex flex-col md:flex-row h-screen items-center bgcolorSS">
    

      <div className=" hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
      <img className="ml-auto object-left object-cover w-full h-full" src={Loginimg } alt="login"/>
      </div>

    <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center">

    <div className="w-full h-100">

      <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">Log in to your account</h1>

      <form className=" flex flex-col mt-6" onSubmit={(e) => handleSubmit(e)}>
        <div>
        <label class="block text-gray-700">Email Address</label>
        <input
          type="email"
          placeholder="Enter Email Address"
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
        />
        </div>
        <div className="mt-4">
        <label class="block text-gray-700">Password</label>
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
        />
        </div>
        <button
          type="submit"
          className="w-full block bgcolorSS2 hover:bgcolorSS focus:bgcolorSS text-white font-semibold rounded-lg
          px-4 py-3 mt-6"
        >
          Submit
        </button>
      </form>
      <p className="text-black mt-8">Not On StarShares? <span className="underline font-semibold"><Link to="/">Create an Account</Link></span></p>
    </div>
    </div>
    </section>
  );
};

export default Login;

