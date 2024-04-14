import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectUser } from '../userSlice'
import Watchlist from '../watchlist/watchlist';

const Logout = () => {
  const user = useSelector(selectUser); // Retrieving user data from Redux store
  const dispatch = useDispatch(); // Creating a dispatch function for dispatching actions to Redux store
  
  // Function to handle logout action
  const handleLogout = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    dispatch(logout(
      user = [],
      isLoggedIn = false,
      token = null,
      currentUser = [],
      watchlist =  null
    )); // Dispatching logout action
  };
  
  // Rendering logout button and user information
  return (
      <div className="logout"> {/* Container for logout component */}
        <h1>
          Welcome {user.email}<span className="user_name">{user.name}</span> {/* Displaying user information */}
        </h1>{""}
        <button className="logout_button" onClick={(e) => handleLogout(e)}> {/* Logout button with click event listener */}
          Logout
        </button>
      </div>
  );
};

export default Logout; // Exporting Logout component for use in other parts of the application
