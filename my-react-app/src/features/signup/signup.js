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
    <div className="h-screen bgcolorSS">
      <div className="flex items-center justify-center h-screen">
        <img className="ml-auto rounded-lg object-left object-cover h-96 w-210" src="https://s3-alpha-sig.figma.com/img/cc49/f321/e7983b799f4436b161310d1e24f960b6?Expires=1709510400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=EBsNY7LJXCdyeMjZP2769EayTr~sT6ohWZ1pKEYUfEpgIegkk~kpyeIn3yASkLTTiqINePWLQARVT~laHHjk5Zycj93LxiNo4UuPYqfvHw4qo44LK1FkKRvcLEV3fQ0NhBvuy0OIYeVjzoIWqXTVzLPf2fAdjxJoSnU79oM9Ksd1z97kvVEr78vFfp21ZFq-eDs8GoZkOBa0ng8dTkzNyk8MtTf6A8zwLzAKqO2EqL5Fr5epKHgNZsXN8ZC-8R7y5F-QybZsMHHQZGgLc2bW-6Sf0vnBAaarOX~b4urtawVO7-hEwCB3eCsq7nDbtGXmYkAlr~-9yCQnbHtOdn0g5g__"/>
        <div className="border-black relative border-2  rounded-md bgcolorSS2 container mx-auto h-130 w-96 flex flex-col justify-center items-center font-inter">
          <form className="h-130 flex flex-col pt-16" onSubmit={(e) => handleSubmit(e)}>
            <h1 className="text-white absolute left-24 top-3 text-3xl font-bold mb-4">SignUp Here 📝</h1>
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
          <p className="text-white">Already have an account? <span className="underline font-semibold"><a href="/login">Login</a></span></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
