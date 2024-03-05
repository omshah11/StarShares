import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../userSlice';
import "./profile.css"
import defaultImage from './default.png'; // import the default image
const Profile = () => {
  const userDetails = useSelector(selectUser).user;
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState({
    firstName: userDetails.firstName,
    lastName: userDetails.lastName,
    email: userDetails.email,
    password: userDetails.password,
    profileImage: userDetails.profileImage || defaultImage // use the user's profile image or the default image
  });

  const handleEdit = () => {
    setEditing(!editing);
  };

  const handleChange = (e) => {
    if (e.target.name === 'profileImage') {
      setUser({...user, profileImage: URL.createObjectURL(e.target.files[0])});
    } else {
      setUser({...user, [e.target.name]: e.target.value});
    }
  };

  return (
    <div className="profile">
      <h1>Profile</h1>
      <br></br>
      <img src={user.profileImage} alt="Profile" />
      {editing ? (
        <div class="edit">
          <br></br>
          <p>Choose Profile Image</p><input type="file" name="profileImage" onChange={handleChange} />
          <p>Change Email</p><input type="email" name="email" value={user.email} onChange={handleChange} />
          <p>Change Password</p><input type="password" name="password" value={user.password} onChange={handleChange} />
        </div>
      ) : (
        <div class="info">
          <br></br>
          <p>Email: {user.email}</p>
          <br></br>
          <p>Password: {user.password}</p>
          <br></br>
        </div>
      )}
      <br></br>
      <button onClick={handleEdit}>{editing ? 'Save' : 'Edit Profile'}</button>
      <div class="feed">
          <br></br>
          <h2>Your Feed</h2>
          <br></br>
          <image></image><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</p>
          <br></br>
          <image></image><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</p>
          <br></br>
          <image></image><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</p>
          <br></br>
          <image></image><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</p>
      </div>
    </div>
  );
};

export default Profile;
