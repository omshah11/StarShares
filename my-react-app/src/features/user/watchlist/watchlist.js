import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUserWatchlist } from "../userSlice";
import { Modal, Form, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import WatchlistedStocks from "./WatchlistedStocks";
import "./watchlist.css";

const CLIENT_ID = "2f6e085b55bc4ede9131e2d7d7739c30";
const CLIENT_SECRET = "88eeb98034e5422099cce4f6467a3d51";

const Watchlist = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const [watchlist, setWatchlist] = useState(user.watchlist);
  const [stockDetailedList, setStockDetailedList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Call getStocks when the component mounts and whenever watchlist changes
    if (watchlist) {
      getStocks();
    }
  }, [watchlist]); // Dependency array ensures the effect is triggered when watchlist changes

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
    const userId = user.user.userId;
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
      setWatchlist([]);

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

  const deleteWatchlist = async () => {
    const userId = user.user.userId;
    try {
      const deleteWatchlistConfig = {
        method: "post",
        url: "http://localhost:5000/api/deleteWatchlist",
        data: {
          userId,
        },
        headers: {
          "Content-Type": "application/json",
        },
      };

      const deleteWatchlist = await axios(deleteWatchlistConfig);
      const watchlistResp = deleteWatchlist;
      setWatchlist(null);

      dispatch(
        setUserWatchlist({
          watchlist: null,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const addToWatchlist = async (artistName, artistImage) => {
    const userId = user.user.userid;
    let stockId = "";

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
      stockId = addStockToDBresponse.data.stock._id;
    } catch (error) {
      if (error.response.status === 400) {
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

  const handleAdd = () => setShowModal(true);

  const handleModalClose = () => setShowModal(false);

  const handleSearchClick = () => navigate(`/search-page?searchInput=${searchInput}`);

  return (
    <div className="todo-list">
      {watchlist ? (
        <div>
          <WatchlistedStocks
            stockDetailedList={stockDetailedList}
            deleteStock={deleteFromWatchlist}
          />
          <div class="flex justify-between">
            <button
              className="self-start px-10 py-3 text-lg font-medium rounded-3xl bgcolorSS whiteSS"
              onClick={() => handleAdd()}
            >Add to Watchlist</button>
            <button
              className="self-start px-10 py-3 text-lg font-medium rounded-3xl bgcolorSS whiteSS"
              onClick={() => deleteWatchlist()}
            >
              Delete this Watchlist
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p>You do not have a Watchlist yet!</p>
          <button onClick={() => createWatchlist()}>Create</button>
        </div>
      )}
      <div>
      <Modal show={showModal} onHide={handleModalClose}>
          <div className="modal-container">
            <div className="modal-content">
              <div class="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-gray-900 text-xl lg:text-2xl font-semibold dark:text-white">
                        Add to Watchlist
                    </h3>
                    <button onClick={handleModalClose} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="default-modal">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                    </button>
                </div>
              <Modal.Body>
                <div class="bg-gray-100 rounded border border-gray-200 flex items-center">
                  <input id="search" class="text-gray-600 font-normal w-full h-10 flex items-center pl-3 text-sm" placeholder="Search for Artist" onChange={event => setSearchInput(event.target.value)} onKeyDown={event => {
                    if (event.key === 'Enter') {
                      handleSearchClick(event.target.value)
                    }
                  }}/>
                </div>
                <button class="py-2 px-4 bg-white text-gray-600 rounded-l border-r border-gray-200 hover:bg-gray-50 active:bg-gray-200 disabled:opacity-50 inline-flex items-center focus:outline-none" onClick={handleSearchClick} >Search</button> 
              </Modal.Body>
            </div>
          </div>
        </Modal>
        
      </div>
    </div>
  );
};

export default Watchlist;
