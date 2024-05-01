// BiographyCard.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../userSlice';

const BiographyCard = () => {
  const defaultBio = "This is the Default Bio"; // Default bio text
  const userDetails = useSelector(selectUser).user;
  const [editing, setEditing] = useState(false);
  const [profileBio, setProfileBio] = useState(userDetails.profileBio || defaultBio); // Initialize with user's bio or default

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    setEditing(false);
    // Save the updated profileBio (you'll need to implement this logic)
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
