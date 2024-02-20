import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, selectUser, setCurrentUser } from "../userSlice";
import axios from "axios";
import "../../../index.css";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const configuration = {
        method: "get", // Assuming you are using a GET request for login
        url: "http://localhost:5000/api/getUserByEmail",
        params: { // Pass parameters as 'params' instead of 'data'
          email,
          password,
        },
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      // Send the login request
      const response = await axios(configuration);
  
      // Assuming your server returns a token upon successful login
      const token = response.data.token;
      const firstName = response.data.user.firstName;
      const lastName = response.data.user.lastName
  
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
      navigate("/home"); // Redirect to home page after successful login
    } catch (error) {
      // Handle error, log it, or show a user-friendly message
      console.error("Error during login:", error);
      // Kanayo Anyakpor Worked On Styling Components.
    }
  };

  return (
    <div className="h-screen bgcolorSS">
    <div className="flex items-center justify-center h-screen">
      <img className="ml-auto rounded-lg object-left object-cover h-96 w-210" src="https://s3-alpha-sig.figma.com/img/cc49/f321/e7983b799f4436b161310d1e24f960b6?Expires=1709510400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=EBsNY7LJXCdyeMjZP2769EayTr~sT6ohWZ1pKEYUfEpgIegkk~kpyeIn3yASkLTTiqINePWLQARVT~laHHjk5Zycj93LxiNo4UuPYqfvHw4qo44LK1FkKRvcLEV3fQ0NhBvuy0OIYeVjzoIWqXTVzLPf2fAdjxJoSnU79oM9Ksd1z97kvVEr78vFfp21ZFq-eDs8GoZkOBa0ng8dTkzNyk8MtTf6A8zwLzAKqO2EqL5Fr5epKHgNZsXN8ZC-8R7y5F-QybZsMHHQZGgLc2bW-6Sf0vnBAaarOX~b4urtawVO7-hEwCB3eCsq7nDbtGXmYkAlr~-9yCQnbHtOdn0g5g__"/>
      
    <div className="border-black relative border-2  rounded-md bgcolorSS2 container mx-auto h-96 w-96 flex flex-col justify-center items-center font-inter">
      <form className=" flex flex-col" onSubmit={(e) => handleSubmit(e)}>
        <h1 className="text-white absolute left-24 top-6 text-3xl font-bold mb-4">Login Here 📝</h1>
        <input
          type="email"
          placeholder="Email"
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          className="w-80 py-4 px-2 border-b-2 border-black mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-80 py-4 px-2 border-b-2 border-black mb-4"
        />
        <button
          type="submit"
          className="bg-black text-white py-4 px-6 rounded-lg"
        >
          Submit
        </button>
      </form>
      <p className="text-white">Not On Star Shares? <span className="underline font-semibold"><a href="/signup">Create an Account</a></span></p>
    </div>
    </div>
    </div>
  );
};

export default Login;

