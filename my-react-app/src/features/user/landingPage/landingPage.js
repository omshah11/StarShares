import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, selectToken, selectUser, selectRecentlyViewedArtists } from '../userSlice'
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
    <div className='h-full bg-slate-200 px-48 w-full py-24 content-center justify-items-center'>
      <div className=" max-w-[1480px]  m-auto grid grid-cols-2 gap-x-8">
        <div className="flex flex-col justify-center  gap-4">
          <p className='text-[#37515F] font-medium text-xl'>Welcome back, </p>
          <h1><span className="pt-0 md:text-6xl text-5xl fontsemibold font-mono">{userDetails.firstName}</span></h1>
          <p>StarShares, a platform revolutionizing the way we interact with music.</p>
          <div> 
        <h1 className="text-3xl font-semibold text-[#37515F] mt-12">Discover new music</h1>
        <p>Explore new music from your favorite artists and discover new ones.</p>
      </div>
      <div>
        <h1 className="text-3xl font-semibold text-[#37515F] mt-12">Invest in your favorite artists</h1>
        <p>Invest in your favorite artists and earn money as they grow.</p>
      </div>
      <div>
        <h1 className="text-3xl font-semibold text-[#37515F] mt-12">Stay updated</h1>
        <p>Get the latest news and updates on your favorite artists.</p>
      </div>
        </div>
        <div>
          <img src={Logo} alt="StarShares Logo" className="rounded-lg drop-shadow-lg	" />
        </div>
      </div>
      <div>
        <h1 className='text-4xl font-semibold text-[#37515F] my-24'>Recently Viewed Artists</h1>
        IMPLEMENT WHEN SEARCH IS PULLED
      </div>

      <div>
        <button className="py-24" onClick={(e) => handleLogout(e)}>
        Logout
      </button>
      </div>
      <button className="" onClick={(e) => navigateToArtistPage(e)}> </button>
    </div>
  );
};

export default LandingPage;
