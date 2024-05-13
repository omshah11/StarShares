// BiographyCard.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, updateProfileBio } from '../userSlice';

const BiographyCard = () => {
  const userDetails = useSelector(selectUser).user;
  const defaultBio = "This is the Default Bio"; // Default bio text
  const [editing, setEditing] = useState(false);
  const [profileBio, setProfileBio] = useState(userDetails.profileBio || defaultBio); // Initialize with user's bio or default
  const dispatch = useDispatch();

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    setEditing(false);
    dispatch(updateProfileBio(profileBio)); // Dispatch action to update profileBio
    // Now the updated profileBio will be saved in the Redux store
  };

  return (
    <div className="biography-card">
      <h2>Bio</h2>
      {editing ? (
        <textarea
          value={profileBio}
          onChange={(e) => setProfileBio(e.target.value)} // Update profileBio state
          rows="5"
          placeholder="Write your biography here"
        />
      ) : (
        <p>{profileBio}</p>
      )}
      {editing ? (
        <button onClick={handleSave}>Save</button>
      ) : (
        <button onClick={handleEdit}>Edit</button>
      )}
    </div>
  );
};

export default BiographyCard;
