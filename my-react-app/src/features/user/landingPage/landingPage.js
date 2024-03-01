import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { logout, selectToken, selectUser } from '../userSlice'
import "./landingPage.css";

const LandingPage = () => {
  const user = useSelector(selectUser);
  const userDetails = user.user;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout({
      isLoggedIn: false
    }
    ));
    navigate('/');
  };
    return (
        <div className="logout">
          <h1>
            Welcome {userDetails.email}<span className="user_name">{userDetails.firstName}</span>
          </h1>{""}
          <button className="logout_button" onClick={(e) => handleLogout(e)}>
            Logout
          </button>
        </div>
    );
};
export default LandingPage;