import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser } from '../userSlice';
import { useNavigate} from 'react-router-dom';

const StockCard = ({ stock }) => {
  const navigate = useNavigate();

  const handleStockBtn = () => {
    console.log('Stock button clicked');
    // Navigate to the artist page
    navigate(`/artist?name=${stock.artistName}&id=${stock.spotifyId}`);
  };
  return (
    <div className="block rounded-lg shadow-secondary-1 bg-white">
      <div className="rounded-t-lg" onClick={handleStockBtn} style={{ cursor: 'pointer' }}>
      <img
          src={stock.artistImage}
          alt={stock.artistName}
          style={{ width: '100%', height: '350px', objectFit: 'cover', borderTopLeftRadius: '0.5rem', borderTopRightRadius: '0.5rem' }}
        />
        </div>
      <div className="p-3 text-3xl text-surface">
        <h5 className="mb-2 text-xl text-center font-medium leading-tight">{stock.artistName}</h5>
        {/* Add other stock information here */}
      </div>
    </div>
  );
};

const OwnedStocks = () => {
  const [ownedStocks, setOwnedStocks] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const user = useSelector(selectUser);
  const userId = user.user.userId;

  useEffect(() => {
    const fetchOwnedStocks = async () => {
      try {
        const encodedUserId = encodeURIComponent(userId);
        console.log(userId);
        console.log(encodedUserId);
        const response = await axios.get(`http://localhost:5000/api/getOwnedStocks?userId=${encodedUserId}`);
        setOwnedStocks(response.data.stocks);
      } catch (error) {
        console.error('Error fetching owned stocks:', error);
        // Display error message to the user
      } finally {
        setLoading(false); // Update loading state when done
      }
    };

    fetchOwnedStocks();
  }, [userId]);

  return (
    <div className="w-full overflow-x-hidden border-t flex flex-col">
      <main className="w-full flex-grow pt-0 p-6">
        <div className="w-full mt-12">
          <p className="text-xl pb-3 flex items-center font-semibold my-2">
            <i className="fas fa-list mr-3"></i> Owned Shares
          </p>
          {loading ? (
            <p>Loading...</p> 
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {ownedStocks.map((stock, index) => (
                <StockCard key={index} stock={stock} />
              ))}
            </div>
          )}
          <p className="pt-1 text-gray-600">
            Source: <a className="underline" href="https://tailwindcomponents.com/component/table-responsive-with-filters">https://tailwindcomponents.com/component/table-responsive-with-filters</a>
          </p>
        </div>
      </main>
    </div>
  );
};


export default OwnedStocks;
