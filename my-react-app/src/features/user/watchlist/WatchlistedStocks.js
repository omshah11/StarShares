import React from "react";
import WatchlistedStockCard from "./WatchlistedStockCard";

const WatchlistedStocks = ({ stockDetailedList, deleteStock }) => {
  return (
    <div className="w-full max-w-4xl overflow-x-hidden border-t flex flex-col">
      <main className="w-full flex-grow pt-0 p-6">
        <div className="w-full mt-12">
          <h1 className="text-xl pb-3 flex items-center font-semibold my-2">
            <i className="fas fa-list mr-3"></i> Watchlisted Shares
          </h1>
          <div className="mx-20 m-auto grid grid-cols-5 gap-4 gap-x-4">
            {stockDetailedList.map((artist, index) => (
              <WatchlistedStockCard
                key={index}
                artist={artist}
                deleteStock={deleteStock}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default WatchlistedStocks;
