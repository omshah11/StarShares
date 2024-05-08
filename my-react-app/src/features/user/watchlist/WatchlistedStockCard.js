import React from "react";

const WatchlistedStockCard = ({ artist, deleteStock }) => {
    return (
        <div className="">
            <div className="card-container ">
                <div className="block rounded-lg shadow-secondary-1 "style={{
            backgroundColor: "#F0F0F0",}}>
                    <div
                        className="rounded-t-lg"
                        style={{
                            height: '400px',
                            backgroundImage: `url(${artist.data.stock.artistImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    ></div>
                    <div className="p-3 text-3xl text-surface">
                        <h5 className="mb-2 text-xl text-center font-medium leading-tight">{artist.data.stock.artistName}</h5>
                        <p className="justify-center text-center text-2xl mb-4 text-base text-black">{artist.data.stock.cost}</p>
                        <div className="flex justify-center"> {/* Center the delete button */}
                            <button
                                type="button"
                                className="text-black bg-red-300 inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal  shadow-primary-3 transition duration-150 ease-in-out hover:shadow-primary-2 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                                data-twe-ripple-init
                                data-twe-ripple-color="light"
                                onClick={() => deleteStock(artist.data.stock._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WatchlistedStockCard;
