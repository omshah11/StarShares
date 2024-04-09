import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, selectUser } from '../userSlice'; // Import selectors from userSlice
import RecentlyViewedArtist from './RecentlyViewedArtist';
import Logo from '../../../Imgs/starsharesLogo.png';

const LandingPage = () => {
  const user = useSelector(selectUser);
  const userDetails = user.user;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout({
      user: {},
      isLoggedIn: false,
      token: null
    }));
    navigate('/');
  };

  const navigateToArtistPage = (e) => {
    e.preventDefault();
    navigate('/artist');
  }

  return (
    <div className="bg-slate-200 h-full w-full">
    <div className="landing_page">
      <div className='px-48 pb-24'>
        
        <div>
          <h1 className='text-4xl font-semibold text-[#37515F] py-24'>Recently Viewed Artists</h1>
          <RecentlyViewedArtist/>
        </div>

        <div>
          <button className="py-24" onClick={(e) => handleLogout(e)}>
            Logout
          </button>
        </div>

      </div>

      <button className="" onClick={(e) => navigateToArtistPage(e)}> </button>

    </div>

      <h1>
        Welcome {userDetails.email}<span className="user_name">{userDetails.firstName}</span>
      </h1>
      <button className="logout_button" onClick={(e) => handleLogout(e)}>
        Logout
      </button>
      <button className="" onClick={(e) => navigateToArtistPage(e)}>Go to Artist Page</button>
      
      
    </div>
  );
};

export default LandingPage;
