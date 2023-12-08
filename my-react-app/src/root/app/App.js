import React from 'react';
import Login from '../../features/user/login/login';
import Logout from '../../features/user/logout/logout';
import SignUp from '../../features/signup/signup';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/user/userSlice';
import './App.css';

const App = () => {
  const user = useSelector(selectUser);

  return (
    <div>
      {user ? (
          <Logout />
      ) : (
        <>
          <Login />
          <SignUp />
        </>
      )}
    </div>
  );
};

export default App;
