import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";
import { selectUser } from "../userSlice";
import axios from "axios";
import WatchlistedStocks from "./WatchlistedStocks";
import "./watchlist.css";

const Watchlist = () => {
  const user = useSelector(selectUser);
  const [watchlist, setWatchlist] = useState(user.watchlist);
  const [stockDetailedList, setStockDetailedList] = useState([]);
  const [stock, setStock] = useState("");

  useEffect(() => {
    // Call getStocks when the component mounts and whenever watchlist changes
    getStocks();
  }, [watchlist]); // Dependency array ensures the effect is triggered when watchlist changes

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
        console.log(stockDetails.data.stock.cost)
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
      completed: false
    };
    setWatchlist([...watchlist, newStock]); // Spread the previous watchlist and add the new stock
    setStock("");
  };

  const deleteFromWatchlist = (id) => {
    setWatchlist(watchlist.filter((stock) => stock.id !== id));
  };


  return (
    <div className="todo-list">
      {stockDetailedList.map((stock) => (
        <TodoItem
          stockname={stock.data.stock.artistName}
          stockcost={stock.data.stock.cost}
          deleteTask={deleteFromWatchlist}
        />
      ))}
      <div>
        <WatchlistedStocks />
      </div>
      <input value={stock} onChange={(e) => setStock(e.target.value)} />
      <button onClick={addToWatchlist}>Add</button>
    </div>
  );
};

export default Watchlist;
