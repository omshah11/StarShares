import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  login,
  selectUser,
  setCurrentUser,
  setUserWatchlist,
} from "../userSlice";
import axios from "axios";
import "./login.css";

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

      const getWatchlist = {
        method: "get",
        url: "http://localhost:5000/api/getWatchlist",
        params: {
          userId,
        },
        headers: {
          "Content-Type": "application/json",
        },
      };

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
          token: token, // Include the token in the login action
        })
      );

      // Dispatching setCurrentUser with the user information
      dispatch(
        setCurrentUser({
          user: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
          },
        })
      );

      // Send the get Watchlist request
      try {
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
    <div className="login">
      <form className="login_form" onSubmit={(e) => handleSubmit(e)}>
        <h1>Login Here 📝</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="submit_btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
