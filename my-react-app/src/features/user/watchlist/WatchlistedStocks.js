// OwnedStocks.js
import React from 'react';

// This component represents the section of the portfolio page that displays the list of owned stocks.
const WatchlistedStocks = () => {
  return (
    <div class="w-full  overflow-x-hidden border-t flex flex-col">
      <main class="w-full flex-grow pt-0 p-6">
        {/* This div contains the "Owned Stocks" section */}
        <div class="w-full mt-12">
          {/* This paragraph contains the title of the section */}
          <p class="text-xl pb-3 flex items-center font-semibold my-2">
            <i class="fas fa-list mr-3"></i> Watchlisted Shares
          </p>

          {/* This div contains the table of owned stocks */}
          <div class="bg-white overflow-auto">
            {/* This table displays the data for each owned stock */}
            <table class="min-w-full leading-normal">
              <thead>
                {/* This row contains the table headers */}
                <tr>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Artist
                  </th>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Shares
                  </th>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Price
                  </th>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Average Cost
                  </th>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Total Return
                  </th>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Equity
                  </th>
                  <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Gains
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* This row contains the data for the first owned stock */}
                <tr>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 w-10 h-10">
                        {/* This image represents the artist of the first owned stock */}
                        <img class="w-full h-full rounded-full" src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSNmANevq5C_6uKrTKHssGKOcELvMJNccZ_Omq5BumJD2YYZLzT" alt="" />
                      </div>
                      <div class="ml-3">
                        {/* This paragraph contains the name of the artist of the first owned stock */}
                        <p class="text-gray-900 whitespace-no-wrap">
                          Usher
                        </p>
                      </div>
                    </div>
                  </td>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {/* This paragraph contains the number of shares of the first owned stock */}
                    <p class="text-gray-900 whitespace-no-wrap">1000</p>
                  </td>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {/* This paragraph contains the price of the first owned stock */}
                    <p class="text-gray-900 whitespace-no-wrap">
                      $0.01
                    </p>
                  </td>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {/* This paragraph contains the average cost of the first owned stock */}
                    <p class="text-gray-900 whitespace-no-wrap">
                      $0.00
                    </p>
                  </td>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {/* This paragraph contains the total return of the first owned stock */}
                    <p class="text-gray-900 whitespace-no-wrap">
                      $0.00
                    </p>
                  </td>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {/* This paragraph contains the equity of the first owned stock */}
                    <p class="text-gray-900 whitespace-no-wrap">
                      $10.00
                    </p>
                  </td>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {/* This span contains the gains of the first owned stock */}
                    <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                      <span aria-hidden class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                      <span class="relative">Positive</span>
                    </span>
                  </td>
                </tr>
                {/* Repeat the above row for each owned stock */}
                <tr>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 w-10 h-10">
                        {/* This image represents the artist of the first owned stock */}
                        <img class="w-full h-full rounded-full" src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSNmANevq5C_6uKrTKHssGKOcELvMJNccZ_Omq5BumJD2YYZLzT" alt="" />
                      </div>
                      <div class="ml-3">
                        {/* This paragraph contains the name of the artist of the first owned stock */}
                        <p class="text-gray-900 whitespace-no-wrap">
                          Usher
                        </p>
                      </div>
                    </div>
                  </td>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {/* This paragraph contains the number of shares of the first owned stock */}
                    <p class="text-gray-900 whitespace-no-wrap">1000</p>
                  </td>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {/* This paragraph contains the price of the first owned stock */}
                    <p class="text-gray-900 whitespace-no-wrap">
                      $0.01
                    </p>
                  </td>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {/* This paragraph contains the average cost of the first owned stock */}
                    <p class="text-gray-900 whitespace-no-wrap">
                      $0.00
                    </p>
                  </td>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {/* This paragraph contains the total return of the first owned stock */}
                    <p class="text-gray-900 whitespace-no-wrap">
                      $0.00
                    </p>
                  </td>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {/* This paragraph contains the equity of the first owned stock */}
                    <p class="text-gray-900 whitespace-no-wrap">
                      $10.00
                    </p>
                  </td>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {/* This span contains the gains of the first owned stock */}
                    <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                      <span aria-hidden class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                      <span class="relative">Positive</span>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 w-10 h-10">
                        {/* This image represents the artist of the first owned stock */}
                        <img class="w-full h-full rounded-full" src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSNmANevq5C_6uKrTKHssGKOcELvMJNccZ_Omq5BumJD2YYZLzT" alt="" />
                      </div>
                      <div class="ml-3">
                        {/* This paragraph contains the name of the artist of the first owned stock */}
                        <p class="text-gray-900 whitespace-no-wrap">
                          Usher
                        </p>
                      </div>
                    </div>
                  </td>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {/* This paragraph contains the number of shares of the first owned stock */}
                    <p class="text-gray-900 whitespace-no-wrap">1000</p>
                  </td>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {/* This paragraph contains the price of the first owned stock */}
                    <p class="text-gray-900 whitespace-no-wrap">
                      $0.01
                    </p>
                  </td>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {/* This paragraph contains the average cost of the first owned stock */}
                    <p class="text-gray-900 whitespace-no-wrap">
                      $0.00
                    </p>
                  </td>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {/* This paragraph contains the total return of the first owned stock */}
                    <p class="text-gray-900 whitespace-no-wrap">
                      $0.00
                    </p>
                  </td>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {/* This paragraph contains the equity of the first owned stock */}
                    <p class="text-gray-900 whitespace-no-wrap">
                      $10.00
                    </p>
                  </td>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {/* This span contains the gains of the first owned stock */}
                    <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                      <span aria-hidden class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                      <span class="relative">Positive</span>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 w-10 h-10">
                        {/* This image represents the artist of the first owned stock */}
                        <img class="w-full h-full rounded-full" src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSNmANevq5C_6uKrTKHssGKOcELvMJNccZ_Omq5BumJD2YYZLzT" alt="" />
                      </div>
                      <div class="ml-3">
                        {/* This paragraph contains the name of the artist of the first owned stock */}
                        <p class="text-gray-900 whitespace-no-wrap">
                          Usher
                        </p>
                      </div>
                    </div>
                  </td>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {/* This paragraph contains the number of shares of the first owned stock */}
                    <p class="text-gray-900 whitespace-no-wrap">1000</p>
                  </td>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {/* This paragraph contains the price of the first owned stock */}
                    <p class="text-gray-900 whitespace-no-wrap">
                      $0.01
                    </p>
                  </td>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {/* This paragraph contains the average cost of the first owned stock */}
                    <p class="text-gray-900 whitespace-no-wrap">
                      $0.00
                    </p>
                  </td>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {/* This paragraph contains the total return of the first owned stock */}
                    <p class="text-gray-900 whitespace-no-wrap">
                      $0.00
                    </p>
                  </td>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {/* This paragraph contains the equity of the first owned stock */}
                    <p class="text-gray-900 whitespace-no-wrap">
                      $10.00
                    </p>
                  </td>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {/* This span contains the gains of the first owned stock */}
                    <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                      <span aria-hidden class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                      <span class="relative">Positive</span>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 w-10 h-10">
                        {/* This image represents the artist of the first owned stock */}
                        <img class="w-full h-full rounded-full" src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSNmANevq5C_6uKrTKHssGKOcELvMJNccZ_Omq5BumJD2YYZLzT" alt="" />
                      </div>
                      <div class="ml-3">
                        {/* This paragraph contains the name of the artist of the first owned stock */}
                        <p class="text-gray-900 whitespace-no-wrap">
                          Usher
                        </p>
                      </div>
                    </div>
                  </td>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {/* This paragraph contains the number of shares of the first owned stock */}
                    <p class="text-gray-900 whitespace-no-wrap">1000</p>
                  </td>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {/* This paragraph contains the price of the first owned stock */}
                    <p class="text-gray-900 whitespace-no-wrap">
                      $0.01
                    </p>
                  </td>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {/* This paragraph contains the average cost of the first owned stock */}
                    <p class="text-gray-900 whitespace-no-wrap">
                      $0.00
                    </p>
                  </td>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {/* This paragraph contains the total return of the first owned stock */}
                    <p class="text-gray-900 whitespace-no-wrap">
                      $0.00
                    </p>
                  </td>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {/* This paragraph contains the equity of the first owned stock */}
                    <p class="text-gray-900 whitespace-no-wrap">
                      $10.00
                    </p>
                  </td>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {/* This span contains the gains of the first owned stock */}
                    <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                      <span aria-hidden class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                      <span class="relative">Positive</span>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}

export default WatchlistedStocks;
