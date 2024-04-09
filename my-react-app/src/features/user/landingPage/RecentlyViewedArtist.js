import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectRecentlyViewedArtists } from '../userSlice'; // Import selectors from userSlice

const CLIENT_ID =                                                                         "2f6e085b55bc4ede9131e2d7d7739c30";
const CLIENT_SECRET =                                                                      "88eeb98034e5422099cce4f6467a3d51";

const fetchArtistDetails = async (artistID, accessToken) => {
  const artistResponse = await fetch(`https://api.spotify.com/v1/artists/${artistID}`, {
    headers: {
      'Authorization': 'Bearer ' + accessToken
    }
  });
  const artistData = await artistResponse.json();
  return artistData;
}

const fetchAccessToken = async () => {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
    },
    body: 'grant_type=client_credentials'
  });
  const data = await response.json();
  return data.access_token;
}

const RecentlyViewedArtist = () => {
  const recentlyViewedArtists = useSelector(selectRecentlyViewedArtists);
  const [artistDetailsList, setArtistDetailsList] = useState([]);

  useEffect(() => {
    console.log("this is recently:" + recentlyViewedArtists);
    // fetch recentlyviewedartists from db
    if (recentlyViewedArtists) {
      fetchAccessToken().then(async accessToken => {
        console.log(accessToken);
        const detailsPromises = recentlyViewedArtists.map(artistID => fetchArtistDetails(artistID, accessToken));
        const artistDetails = await Promise.all(detailsPromises);
        setArtistDetailsList(artistDetails);
      });
    }
  }, [recentlyViewedArtists]);

  return (
    <div>
      {artistDetailsList.map(artistDetails => (
        <div className="block rounded-lg bg-white shadow-secondary-1 dark:bg-surface-dark" key={artistDetails.id}>
          <h2>{artistDetails.name}</h2>
          <a href={artistDetails.external_urls.spotify}>
          <img  className="rounded-t-lg"
                src={artistDetails.images[0]?.url} 
                alt={artistDetails.name}
               />
          </a>

          <div className="p-6 text-surface dark:text-white">
          <h5 className="mb-2 text-xl font-medium leading-tight">{artistDetails.name}</h5>
          <p className="mb-4 text-base">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <button
            type="button"
            className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
            data-twe-ripple-init
            data-twe-ripple-color="light"
          >
            Button
          </button>
        </div>

          <a href={artistDetails.external_urls.spotify}>Spotify Link</a>
          {/* Display bio or any other artist details */}
        </div>
      ))}
    </div>
  );
};

export default RecentlyViewedArtist;
