// BiographyCard.js
import React, { useState } from 'react';

const BiographyCard = ({ initialBio, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(initialBio);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onSave(bio); // Call the parent component's onSave function
    setIsEditing(false);
  };

  return (
    <div className="biography-card">
      <h1>Bio</h1>
      {isEditing ? (
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows="5"
          placeholder="Write your biography here"
        />
      ) : (
        <p>{bio}</p>
      )}
      {isEditing ? (
        <button onClick={handleSave}>Save</button>
      ) : (
        <button onClick={handleEdit}>Edit</button>
      )}
    </div>
  );
};

export default BiographyCard;
