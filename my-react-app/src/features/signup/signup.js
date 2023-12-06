import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../user/userSlice";
import axios from "axios";
import "../user/login/login.css";
const SignUp = () => {
    
    const [name, setName] = useState('');
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
            name,
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
        <div className="login">
          <form className="login_form" onSubmit={(e) => handleSubmit(e)}>
            <h1>SignUp Here 📝</h1>
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
export default SignUp