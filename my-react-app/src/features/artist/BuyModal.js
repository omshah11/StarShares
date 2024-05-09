import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setOwnedStocksList } from "../user/userSlice";
import axios from "axios";

const BuyModal = ({
  showModal,
  closeModal,
  userId,
  stockId,
  artistImage,
  artistName,
  spotifyId,
}) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(0);
  const [ownedStockList, setOwnedStockList] = useState(user.ownedStockList);

  useEffect(() => {
    getOwnedStockList();
  }, []);

  const handleBuy = async (
    userId,
    stockId,
    artistImage,
    artistName,
    quantity,
    spotifyId
  ) => {
    let newStockId;

    try {
      // Attempt to add the stock
      const addStock = await axios.post("http://localhost:5000/api/addStock", {
        artistName: artistName,
        artistImage: artistImage,
        spotifyId: spotifyId,

        // You can define cost to be a call to the algorithm
      });

      // Log the result of adding the stock
      console.log("Stock added to DB:", addStock.data);

      // Extract the newly added stock ID from the response
      newStockId = addStock.data.stock?._id;

      if (!newStockId) {
        throw new Error("Failed to retrieve newly added stock ID");
      }

      // Update stockId with newStockId
      stockId = newStockId;
    } catch (error) {
      // Log the error if adding the stock fails
      console.error("Error adding stock:", error);
    }

    try {
      // Add the newly added stock to the user's portfolio
      const addToPortfolio = await axios.post(
        "http://localhost:5000/api/addStockToPortfolio",
        {
          userId: userId,
          stockId: stockId,
          quantity: 0,
        }
      );

      // Log the result of adding the stock to the portfolio
      console.log("Stock added to Portfolio:", addToPortfolio.data);
    } catch (error) {
      // Log the error if adding the stock to the portfolio fails
      console.error("Error adding stock to portfolio:", error);

      // Handle error
    }

    try {
      // Proceed with adding the transaction
      const response = await axios.post(
        "http://localhost:5000/api/addTransactionToPortfolio",
        {
          userId: userId,
          stockId: stockId,
          transactionType: "buy",
          quantity: quantity,
        }
      );

      console.log("Buy successful:", response.data);
      // dispatch(
      //   setOwnedStocksList({
      //     ownedStockList: ownedStockList,
      //   })
      // );
      closeModal();
      alert(
        `You have successfully bought ${quantity} shares of ${artistName}!`
      );
    } catch (error) {
      // Log the error if adding the transaction fails
      console.log({
        userId: userId,
        stockId: stockId,
        transactionType: "buy",
        quantity: quantity,
      });
      console.error("Error buying:", error);
      // Handle error
      if (error.response.data.status === 406) {
        alert("Insufficient Stock");
      } else if (error.response.data.status === 402) {
        alert("Insufficient Funds");
      } else {
        // Handle other errors
        console.error("Unhandled error:", error);
      }

      closeModal();
    }
      return;
    }
  };

  const getOwnedStockList = async () => {
    try {
      const encodedUserId = encodeURIComponent(userId); // URL encode the userId
      const response = await axios.get(`http://localhost:5000/api/getOwnedStocks?userId=${encodedUserId}`);
      setOwnedStockList(response.data.stocks);
      dispatch(
        setOwnedStocksList({
          ownedStockList: ownedStockList,
        })
      );
    } catch (error) {
      console.error('Error fetching owned stocks:', error);
    }
  
  return (
    <div className={showModal ? "block" : "hidden"}>
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-title"
                  >
                    Enter Quantity
                  </h3>
                  <div className="mt-2">
                    <input
                      type="number"
                      className="border border-gray-300 rounded-md px-3 py-2 w-36"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() =>
                  handleBuy(
                    userId,
                    stockId,
                    artistImage,
                    artistName,
                    quantity,
                    spotifyId
                  )
                }
              >
                Buy
              </button>

              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyModal;
