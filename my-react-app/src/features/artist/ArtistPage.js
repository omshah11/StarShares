import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUserWatchlist } from "../user/userSlice";
import { fetchAccessToken } from "../user/landingPage/RecentlyViewedArtist";
import { fetchArtistDetails } from "../user/landingPage/RecentlyViewedArtist";
import { addRecentlyViewedArtist } from "../user/actions";

import axios from "axios";

const ArtistPage = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const location = useLocation();
  const [watchlist, setWatchlist] = useState(user.watchlist);
  const userId = user.userid;
  const queryParams = new URLSearchParams(location.search);

  const name = queryParams.get("name");
  const id = queryParams.get("id");

  const CLIENT_ID = "2f6e085b55bc4ede9131e2d7d7739c30";
  const CLIENT_SECRET = "88eeb98034e5422099cce4f6467a3d51";

  const [stockId, setStockId] = useState("");
  const [addedToWatchlist, setAddedToWatchlist] = useState(false);
  const [artistImage, setArtistImage] = useState(null);
  const [artistGenre, setArtistGenre] = useState(null);
  const [topTracks, setTopTracks] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [artistFollowers, setArtistFollowers] = useState(null);
  const [spotifyId, setSpotifyId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await fetchAccessToken(CLIENT_ID, CLIENT_SECRET);
        const artistDetails = await fetchArtistDetails(id, accessToken);
        setSpotifyId(artistDetails.id);
        setArtistImage(artistDetails.images[0].url);
        setArtistGenre(artistDetails.genres[0]);
        setArtistFollowers(artistDetails.followers.total);

        const topTracksData = await fetchArtistTopTracks(id, accessToken);
        setTopTracks(topTracksData.tracks);
      } catch (error) {
        console.error("Error fetching artist details:", error);
      }
    };
    getArtistStockId(name);
    fetchData();
  }, [id, watchlist]);

  useEffect(() => {
    console.log(id);
    if (id) {
      dispatch(addRecentlyViewedArtist(id));
    }
  }, [id, dispatch]);
  
  

  const fetchArtistTopTracks = async (artistID, accessToken) => {
    const artistResponse = await fetch(
      `https://api.spotify.com/v1/artists/${artistID}/top-tracks?country=US`,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );
    const topTracks = await artistResponse.json();
    return topTracks;
  };

  const playSnippet = (previewUrl) => {
    if (previewUrl === null) {
      alert("Preview not available");
      return;
    }

    if (!isPlaying) {
      const audio = new Audio(previewUrl);
      setIsPlaying(true);
      audio.play();
      setTimeout(() => {
        audio.pause();
        setIsPlaying(false);
      }, 15000); // Pause after 15 seconds
    }
  };

  const getArtistStockId = async (artistName) => {
    try {
      const getStockId = {
        method: "get",
        url: "http://localhost:5000/api/getStockByName",
        params: {
          artistName,
        },
        headers: {
          "Content-Type": "application/json",
        },
      };

      const getStockIdResponse = await axios(getStockId);
      setStockId(getStockIdResponse.data.stock._id);
      const isArtistInWatchlist = watchlist.includes(getStockIdResponse.data.stock._id);
      setAddedToWatchlist(isArtistInWatchlist);
    } catch (error) {
      console.error(error);
    }
  }

  const addToWatchlist = async (artistName, artistImage, spotifyId) => {
    const userId = user.user.userId;
    let stockId = "";

    try {
      const addStockToDB = {
        method: "post",
        url: "http://localhost:5000/api/addStock",
        data: {
          artistName,
          artistImage,
          spotifyId,
        },
        headers: {
          "Content-Type": "application/json",
        },
      };

      const addStockToDBresponse = await axios(addStockToDB);
      stockId = addStockToDBresponse.data.stock._id;
    } catch (error) {
      if (error.response.status === 400) {
        console.log(error.response);
        stockId = error.response.data.stock._id;
      } else {
        console.error(error);
      }
    }
    try {
      const addStockToWatchlist = {
        method: "post",
        url: "http://localhost:5000/api/addToWatchlist",
        data: {
          userId,
          stockId,
        },
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios(addStockToWatchlist);
      setWatchlist([...watchlist, stockId]); // Spread the previous watchlist and add the new stock

      dispatch(
        setUserWatchlist({
          watchlist: [...watchlist, stockId],
        })
      );
    } catch (error) {
      console.error(error);
    }

    setAddedToWatchlist(true);
  };

  const deleteFromWatchlist = async (stockId) => {
    const userId = user.user.userId;
    try {
      const deleteFromWatchlist = {
        method: "post",
        url: "http://localhost:5000/api/deleteFromWatchlist",
        data: {
          userId,
          stockId,
        },
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios(deleteFromWatchlist);
      setWatchlist(prevWatchlist => prevWatchlist.filter(stock => stock !== stockId));

      dispatch(
        setUserWatchlist({
          watchlist: watchlist.filter(stock => stock !== stockId),
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"
      />
      <link
        rel="stylesheet"
        href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
      />

      <main className="profile-page">
        <section className="relative block h-500-px">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://rachelcorbett.com.au/wp-content/uploads/2017/08/Can-you-use-music-in-your-podcast.jpg')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0px)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-blueGray-200">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <img
                        alt="..."
                        src={artistImage}
                        className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                      />
                    </div>
                  </div>
                  <div className="justify-right flex flex-row w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0">
                      <button
                        style={{ backgroundColor: "#00F000" }}
                        className="bg-green-500 active:bg-green-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        Buy
                      </button>
                      <button
                        style={{ backgroundColor: "#F00000" }}
                        className="bg-green-500 active:bg-green-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        Sell
                      </button>
                      {addedToWatchlist ? (
                        <button
                          style={{ backgroundColor: "#0F0F0F" }}
                          className="bg-green-500 active:bg-green-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => deleteFromWatchlist(stockId)}
                        >
                          Delete from Watchlist
                        </button>
                      ) : (
                        <button
                          style={{ backgroundColor: "#0F0F0F" }}
                          className="bg-green-500 active:bg-green-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => addToWatchlist(name, artistImage, spotifyId)}
                        >
                          Add to Watchlist
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          {artistGenre}
                        </span>
                        <span className="text-sm text-blueGray-400">Genre</span>
                      </div>
                      <div className="lg:mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          {artistFollowers}
                        </span>
                        <span className="text-sm text-blueGray-400">
                          Followers
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                    {name}
                  </h3>
                  <div className="text-left mb-2 text-blueGray-600 mt-10">
                    <p className="mx-4 text-xl mb-2">Top Tracks</p>
                    <div className="mx-10 grid grid-cols-5  justify-center">
                      {topTracks.map((track, index) => (
                        <img
                          key={index}
                          src={track.album.images[0].url}
                          alt={track.name}
                          style={{
                            width: "auto",
                            height: "auto",
                            maxHeight: "128px",
                            objectFit: "cover",
                            borderRadius: "8px",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            margin: "8px",
                            cursor: "pointer",
                          }}
                          onClick={() => playSnippet(track.preview_url)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                        Mariah Carey (born March 27, 1970) is an American
                        singer, songwriter, actress, record producer and #1 New
                        York Times bestselling author. Referred to as the
                        "Songbird Supreme", she is noted for her five-octave
                        vocal range, melismatic singing style and signature use
                        of the whistle reg…
                      </p>
                      <a href="#pablo" className="font-normal">
                        read more
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <footer className="relative bg-blueGray-200 pt-8 pb-6 mt-8">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap items-center md:justify-between justify-center">
                <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                  <div className="text-sm text-blueGray-500 font-semibold py-1">
                    Made with{" "}
                    <a
                      href="https://www.creative-tim.com/product/notus-js"
                      className="text-blueGray-500 hover:text-gray-800"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Notus JS
                    </a>{" "}
                    by{" "}
                    <a
                      href="https://www.creative-tim.com"
                      className="text-blueGray-500 hover:text-blueGray-800"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Creative Tim
                    </a>
                    .
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
};

export default ArtistPage;
