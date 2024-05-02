// WatchlistedStocks.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Watchlist from "./watchlist";

const WatchlistedStocks = ({ stockDetailedList, deleteStock }) => {
  return (
    <div className="w-full max-w-4xl overflow-x-hidden border-t flex flex-col">
      <main className="w-full flex-grow pt-0 p-6">
        <div className="w-full mt-12">
          <h1 className="text-xl pb-3 flex items-center font-semibold my-2">
            <i className="fas fa-list mr-3"></i> Watchlisted Shares
          </h1>
          <div className="flex justify-center">
            <div className="bg-white overflow-auto">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                      colSpan="3"
                    >
                      Artist
                    </th>
                    <th
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                      colSpan="3"
                    >
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {stockDetailedList.map((artist, index) => (
                    <tr key={index}>
                      <td
                        className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                        colSpan="3"
                      >
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10">
                            <img
                              className="w-full h-full rounded-full"
                              src={artist.data.stock.artistImage}
                              alt={artist}
                            />
                          </div>
                          <div className="ml-3">
                            <Link className="text-gray-900 whitespace-no-wrap" to={`/artist?name=${artist.data.stock.artistName}&id=${artist.data.stock.spotifyId}`}>{artist.data.stock.artistName}</Link>
                          </div>
                        </div>
                      </td>
                      <td
                        className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                        colSpan="3"
                      >
                        <p className="text-gray-900 whitespace-no-wrap">
                          {artist.data.stock.cost}
                        </p>
                      </td>
                      <td
                        className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                        colSpan="3"
                      >
                        <div>
                          <button
                            class="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20"
                            type="button"
                            onClick={() => deleteStock(artist.data.stock._id)}
                          >
                            <span class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                aria-hidden="true"
                                class="h-4 w-4"
                              >
                                <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"></path>
                              </svg>
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WatchlistedStocks;
