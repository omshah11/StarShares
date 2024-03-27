import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";
import { selectUser } from "../userSlice";
import axios from "axios";
import WatchlistedStocks from "./WatchlistedStocks";
import "./watchlist.css";

const CLIENT_ID = "2f6e085b55bc4ede9131e2d7d7739c30";
const CLIENT_SECRET = "88eeb98034e5422099cce4f6467a3d51";

const Watchlist = () => {
  const user = useSelector(selectUser);
  const [watchlist, setWatchlist] = useState(user.watchlist);
  const [stockDetailedList, setStockDetailedList] = useState([]);
  const [stock, setStock] = useState("");

  //
  const [accessToken, setAccessToken] = useState("");
  const [items, setItems] = useState([]);
  //

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
    //getStocks();

  }, []); // Dependency array ensures the effect is triggered when watchlist changes


  const sampleArtist = async () => {
    let searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }
    let artistID = await fetch('https://api.spotify.com/v1/search?q=' + "Weekend" + '&type=album,artist', searchParameters)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setItems(data.artists.items);
        console.log(items)
        //setItems(data.tracks.items);
      });
  };

  const getStocks = async () => {
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
        console.log(stockDetails.data.stock.cost);
        setStockDetailedList((prevList) => [...prevList, stockDetails]);
      } catch (error) {
        console.error("Error fetching stock details:", error);
      }
    }
  };

  const addToWatchlist = () => {
    const newStock = {
      id: Math.random().toString(), // Generate a unique ID for the new stock
      name: stock,
      completed: false,
    };
    setWatchlist([...watchlist, newStock]); // Spread the previous watchlist and add the new stock
    setStock("");
  };

  const deleteFromWatchlist = (id) => {
    setWatchlist(watchlist.filter((stock) => stock.id !== id));
  };

  return (
    <div className="todo-list">
      {/* {stockDetailedList.map((stock) => (
        <TodoItem
          stockname={stock.data.stock.artistName}
          stockcost={stock.data.stock.cost}
          deleteTask={deleteFromWatchlist}
        />
      ))} */}
      placeholder
      <div>
        <WatchlistedStocks />
      </div>
      <div>
      {items.map((item, i) => {
        <h3>key={i}>{item.name}</h3>
      })}
      </div>
      <input value={stock} onChange={(e) => setStock(e.target.value)} />
      <button>Add</button>
    </div>
  );
};

export default Watchlist;
