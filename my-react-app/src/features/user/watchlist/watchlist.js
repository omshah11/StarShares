import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUserWatchlist } from "../userSlice";
import axios from "axios";
import WatchlistedStocks from "./WatchlistedStocks";
import "./watchlist.css";

const CLIENT_ID = "2f6e085b55bc4ede9131e2d7d7739c30";
const CLIENT_SECRET = "88eeb98034e5422099cce4f6467a3d51";

const Watchlist = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [watchlist, setWatchlist] = useState(user.watchlist);
  console.log("watchlist: ", watchlist);
  const [stockDetailedList, setStockDetailedList] = useState([]);
  const [stock, setStock] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    var authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        CLIENT_ID +
        "&client_secret=" +
        CLIENT_SECRET,
    };
    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((result) => result.json())
      .then((data) => setAccessToken(data.access_token));

    // Call getStocks when the component mounts and whenever watchlist changes
    sampleArtist();
    getStocks();
  }, [watchlist]); // Dependency array ensures the effect is triggered when watchlist changes

  const sampleArtist = async () => {
    let searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };
    let artistID = await fetch(
      "https://api.spotify.com/v1/search?q=" + "Arijit" + "&type=album,artist",
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("data received: ", data);
        setItems(data.artists.items);
      });
  };

  const getStocks = async () => {
    setStockDetailedList([]);
    for (let i = 0; i < watchlist.length; i++) {
      const currentStockId = watchlist[i];

      const getStock = {
        method: "get",
        url: "http://localhost:5000/api/getStock",
        params: {
          stockId: currentStockId,
        },
        headers: {
          "Content-Type": "application/json",
        },
      };

      try {
        const stockDetails = await axios(getStock);
        setStockDetailedList((prevList) => [...prevList, stockDetails]);
      } catch (error) {
        console.error("Error fetching stock details:", error);
      }
    }
  };

  const createWatchlist = async () => {
    const userId = user.user.id;
    try {
      const createWatchlistConfig = {
        method: "post",
        url: "http://localhost:5000/api/createWatchlist",
        data: {
          userId,
        },
        headers: {
          "Content-Type": "application/json",
        },
      };

      const createWatchlist = await axios(createWatchlistConfig);
      const watchlistResp = createWatchlist.watchlist;
      setUserWatchlist(watchlist);

      dispatch(
        setUserWatchlist({
          watchlist: watchlistResp,
        })
      );
    } catch (error) {
      if (error.response.status === 201) {
        const watchlistResp = error.response.data.watchlist;
        setWatchlist(watchlistResp);
      } else {
        console.error(error);
      }
    }
  };

  const addToWatchlist = async () => {
    //sampleArtist();
    console.log("detailed stock list: ", stockDetailedList);
    //let updatedItems = await sampleArtist();
    console.log("exited sample artist function");
    console.log("item : ", items);
    let artistStock = items[0];
    const userId = user.user.id;
    let stockId = "";
    const artistName = artistStock.name;
    const artistImage = artistStock.images[0];

    try {
      const addStockToDB = {
        method: "post",
        url: "http://localhost:5000/api/addStock",
        data: {
          artistName,
          artistImage,
        },
        headers: {
          "Content-Type": "application/json",
        },
      };

      const addStockToDBresponse = await axios(addStockToDB);
      console.log(addStockToDBresponse);
      stockId = addStockToDBresponse.data.stock._id;
    } catch (error) {
      if (error.response.status === 400) {
        stockId = error.response.data.stock._id;
      } else {
        console.error(error);
      }
    }

    console.log("user Id: ", userId);
    console.log("stock Id: ", stockId);

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

      // Send the signup request
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
  };

  const deleteFromWatchlist = async (stockId) => {
    const userId = user.user.id;
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

      // Send the signup request
      const response = await axios(deleteFromWatchlist);
      setWatchlist(watchlist.filter((stock) => stock !== stockId));

      dispatch(
        setUserWatchlist({
          watchlist: watchlist,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="todo-list">
      {user.watchlist ? (
        <div>
          <WatchlistedStocks
            stockDetailedList={stockDetailedList}
            deleteStock={deleteFromWatchlist}
          />
        </div>
      ) : (
        <div>
          <p>You do not have a Watchlist yet!</p>
          <button onClick={() => createWatchlist()}>Create</button>
        </div>
      )}
      <div>
        {/* <input value={stock} onChange={(e) => setStock(e.target.value)} /> */}
        <button onClick={() => addToWatchlist()}>Add</button>
      </div>
    </div>
  );
};

export default Watchlist;
