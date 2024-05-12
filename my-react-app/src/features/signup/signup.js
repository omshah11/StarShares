import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../user/userSlice";
import {Link} from 'react-router-dom';
import axios from "axios";
import SignupImg from "../../Imgs/landing.jpg"

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const configuration = {
        method: "post",
        url: "https://intense-inlet-40544-607910b59282.herokuapp.com/api/signup",
        data: {
          firstName,
          lastName,
          email,
          password,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      };

      // Send the signup request
      const response = await axios(configuration)

      // Assuming your server returns a token upon successful signup
      const token = response.data.token;

      // Dispatch the login action with the token
      dispatch(login({ email, token }));
    } catch (error) {
      // Handle error, log it, or show a user-friendly message
      console.error("Error during signup:", error);
    }
  };

  return (
  <section className="flex flex-col md:flex-row h-screen items-center bgcolorSS">
    <div className="hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
      <img
        className="ml-auto object-left object-cover w-full h-full"
        src={SignupImg}
        alt="Signup Background"
      />
    </div>

    <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">
      <div className="w-full h-100">
        <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
          Sign Up for an Account
        </h1>

        <form className="flex flex-col mt-6" onSubmit={(e) => handleSubmit(e)}>
          <input
            type="name"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
          />

          <input
            type="name"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
          />

          <button
            type="submit"
            className="w-full block bgcolorSS2 hover:bgcolorSS focus:bgcolorSS text-white font-semibold rounded-lg px-4 py-3 mt-6"
          >
            Submit
          </button>
        </form>

        <p className="text-black mt-8">
          Already have an account?{" "}
          <span className="underline font-semibold">
            <Link to="/login">Login</Link>
          </span>
        </p>
      </div>
    </div>
  </section>
);

};

export default SignUp;
