import React, { useState } from "react";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";
import { selectUser } from "../userSlice";

import "./watchlist.css";

const Watchlist = () => {
  const user = useSelector(selectUser);
  const [watchlist, setWatchlist] = useState(user.watchlist);
  console.log(watchlist);
  const [stock, setStock] = useState("");

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
      {watchlist.map((stock) => (
        <TodoItem
          key={stock} // Use stock.id as the key
          task={stock}
          deleteTask={deleteFromWatchlist}
        />
      ))}
      <input value={stock} onChange={(e) => setStock(e.target.value)} />
      <button onClick={addToWatchlist}>Add</button>
    </div>
  );
};

export default Watchlist;
