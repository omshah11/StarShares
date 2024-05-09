import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectRecentlyViewedArtists } from '../userSlice'; // Import selectors from userSlice
import { fetchRecentlyViewedArtists } from '../actions';

const CLIENT_ID = "2f6e085b55bc4ede9131e2d7d7739c30";
const CLIENT_SECRET = "88eeb98034e5422099cce4f6467a3d51";

export const fetchArtistDetails = async (artistID, accessToken) => {
  const artistResponse = await fetch(`https://api.spotify.com/v1/artists/${artistID}`, {
    headers: {
      'Authorization': 'Bearer ' + accessToken
    }
  });
  const artistData = await artistResponse.json();
  return artistData;
}

export const fetchAccessToken = async (CLIENT_ID, CLIENT_SECRET) => {
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
  const dispatch = useDispatch();

  const recentlyViewedArtists = useSelector(selectRecentlyViewedArtists);
  const [artistDetailsList, setArtistDetailsList] = useState([]);

  useEffect(() => {
    console.log("this is recently:" + recentlyViewedArtists);
    // fetch recentlyviewedartists from db
    if (recentlyViewedArtists) {
      fetchAccessToken(CLIENT_ID, CLIENT_SECRET).then(async accessToken => {
        console.log(accessToken);
        const detailsPromises = recentlyViewedArtists.map(artistID => fetchArtistDetails(artistID, accessToken));
        const artistDetails = await Promise.all(detailsPromises);

        // Filter out duplicate artists
        const uniqueArtists = [];
        artistDetails.forEach(artist => {
          if (!uniqueArtists.some(a => a.id === artist.id)) {
            uniqueArtists.push(artist);
          }
        });

        setArtistDetailsList(uniqueArtists);
      });
    }
  }, [recentlyViewedArtists]);

  useEffect(() => {
    dispatch(fetchRecentlyViewedArtists());
  }, [dispatch]);

  return (
    <div className="mx-20 m-auto grid grid-cols-5 gap-4 gap-x-4">
      {artistDetailsList.map(artistDetails => (
        <div key={artistDetails.id} className="card-container">
          <div className="block rounded-lg bg-white shadow-secondary-1 dark:bg-surface-dark">
            {artistDetails && artistDetails.external_urls && (
              <a href={artistDetails.external_urls.spotify}>
                <div
                  className="rounded-t-lg"
                  style={{
                    height: '400px',
                    backgroundImage: `url(${artistDetails.images[0]?.url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                ></div>
              </a>
            )}

            <div className="p-6 text-surface dark:text-white">
              {artistDetails && (
                <>
                  <h5 className="mb-2 text-xl font-medium leading-tight">{artistDetails.name}</h5>
                  <p className="mb-4 text-base text-black">
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                  </p>
                </>
              )}
              {artistDetails && artistDetails.external_urls && (
                <button
                  type="button"
                  className="text-black bg-green-300 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal  shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                  data-twe-ripple-init
                  data-twe-ripple-color="light" onClick={() => window.open(artistDetails.external_urls.spotify, '_blank')}>
                  Spotify
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>

  );
};

export default RecentlyViewedArtist;
