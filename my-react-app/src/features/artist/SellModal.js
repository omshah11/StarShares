import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setOwnedStocksList, setUserBalance } from "../user/userSlice";
import axios from "axios";

const SellModal = ({ showModal, closeModal, userId, stockId, artistImage, artistName, spotifyId, artistValue }) => {
    const [quantity, setQuantity] = useState(0);
    const user = useSelector(selectUser);
  const dispatch = useDispatch();

    const handleSell = async (userId, stockId, artistImage, artistName, spotifyId) => {
        try {
            // Proceed with adding the transaction
            const response = await axios.post(
                "https://intense-inlet-40544-607910b59282.herokuapp.com/api/addTransactionToPortfolio",
                {
                    userId: userId,
                    stockId: stockId,
                    transactionType: "sell",
                    quantity: quantity
                }
            );
        
            console.log("Sell successful:", response.data);
            dispatch(
                setUserBalance({
                  balance: response.data.balance,
                })
              )
            closeModal();
            alert(`You have successfully sold ${quantity} shares of ${artistName}!`);
            window.location.reload();
        } catch (error) {
            console.error("Error selling:", error);
        
            // Handle error
            if (error.response.data.status === 404) {
                alert("You don't own this stock!");
            } else if (error.response.data.status === 406){
                alert("Insufficient Stock To Sell!");
            }
            else{
                console.error("Unhandled error:", error);
                alert("Something Went Wrong!");
            }
            closeModal();
        }

        try {
            const encodedUserId = encodeURIComponent(userId); // URL encode the userId
            const response = await axios.get(
              `https://intense-inlet-40544-607910b59282.herokuapp.com/api/getOwnedStocks?userId=${encodedUserId}`
            );
            const ownedStockList = response.data.stocks;
            dispatch(
              setOwnedStocksList({
                ownedStockList: ownedStockList,
              })
            );
            //setOwnedStocks(response.data.stocks);
          } catch (error) {
            console.error("Error fetching owned stocks:", error);
          }
    }        

    return (
        <div className={showModal ? "block" : "hidden"}>
            <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>
                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
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
                                onClick={() => handleSell(userId, stockId, artistImage, artistName, spotifyId)}
                            >
                                Sell
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

export default SellModal;
