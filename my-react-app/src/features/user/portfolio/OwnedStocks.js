import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser } from '../userSlice';

const OwnedStocks = () => {
  const [ownedStocks, setOwnedStocks] = useState([]);
  const user = useSelector(selectUser);
  const userId = user.user.userId;


  useEffect(() => {
    const fetchOwnedStocks = async () => {
      try {
        const encodedUserId = encodeURIComponent(userId); // URL encode the userId
        const response = await axios.get(`http://localhost:5000/api/getOwnedStocks?userId=${encodedUserId}`);
        setOwnedStocks(response.data.stocks);
      } catch (error) {
        console.error('Error fetching owned stocks:', error);
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
          <div className="bg-white overflow-auto">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Artist
                  </th>
                  {/* Add other table headers here */}
                </tr>
              </thead>
              <tbody>
                {ownedStocks.map((stock, index) => (
                  <tr key={index}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10">
                          <img className="w-full h-full rounded-full" src={stock.artistImage} alt={stock.artistName} />
                        </div>
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">{stock.artistName}</p>
                        </div>
                      </div>
                    </td>
                    {/* Add other table data here */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="pt-1 text-gray-600">
            Source: <a className="underline" href="https://tailwindcomponents.com/component/table-responsive-with-filters">https://tailwindcomponents.com/component/table-responsive-with-filters</a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default OwnedStocks;
