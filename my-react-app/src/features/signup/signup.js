import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../user/userSlice";
import axios from "axios";

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
        url: "http://localhost:5000/api/signup",
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
    <div className="h-screen flex flex-col justify-center items-center font-inter">
      <form className="flex flex-col" onSubmit={(e) => handleSubmit(e)}>
        <h1 className="text-3xl font-bold mb-4">SignUp Here 📝</h1>
        <input
          type="name"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-80 py-4 px-2 border-b-2 border-black mb-4"
        />
        <input
          type="name"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-80 py-4 px-2 border-b-2 border-black mb-4"
        />
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
    </div>
  );
};
export default SignUp;
