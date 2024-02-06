import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, selectUser, setCurrentUser } from "../userSlice";
import "./login.css";

const Login = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const handleSubmit = (e) => {
    e.preventDefault();

    // Assuming 'loggedIn' is derived from the userState or another logic
    const loggedIn = true;

    // Dispatching the login action with separate properties for user and isLoggedIn
    dispatch(login({
      user: {
        name: name,
        email: email,
        password: password,
      },
      isLoggedIn: loggedIn,
    }));

    // Dispatching setCurrentUser with the user information
    dispatch(setCurrentUser({
      user: {
        name: name,
        email: email,
        password: password,
      }
    }));
    navigate('/home');
  };

  return (
    <div className="login">
      <form className="login_form" onSubmit={(e) => handleSubmit(e)}>
        <h1>Login Here 📝</h1>
        <input
          type="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
