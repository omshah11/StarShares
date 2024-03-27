import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from '../../features/user/login/login';
import Navbar from '../../features/user/navbar/navbar';
import AboutUs from '../../features/user/aboutUs/aboutUs';
import Portfolio from '../../features/user/portfolio/portfolio';
import Watchlist from '../../features/user/watchlist/watchlist';
import Profile from '../../features/user/profile/profile';
import LandingPage from '../../features/user/landingPage/landingPage';
import SignUp from '../../features/signup/signup';
import ArtistPage from '../../features/artist/ArtistPage';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/user/userSlice';
import "../../index.css"; // import Tailwind CSS main file 

const App = () => {
  const user = useSelector(selectUser);

  return (
    <Router>
    <div>
      {user.isLoggedIn ? (
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/home" element={<LandingPage />}/>
            <Route path="/about-us" element={<AboutUs />}/>
            <Route path="/portfolio" element={<Portfolio />}/>
            <Route path="/watchlist" element={<Watchlist />}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/artist" element={<ArtistPage />}/>
          </Routes>
        </div>
      ) : (
        <div>
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      )}
    </div>
    </Router>
  );
};

export default App;
