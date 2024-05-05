const stockPriceAlgorithm = (popularity, followers, transactionCount) => {
  // Define weights for Spotify metrics
  const POPULARITY_WEIGHT = 0.4;
  const FOLLOWERS_WEIGHT = 0.3;
  const TRADE_WEIGHT = 0.3;

  if (transactionCount === 0) {
    transactionCount = 1;
  }

  // Calculate valuation using weighted sum
  let valuation =
    ((POPULARITY_WEIGHT * popularity) / 100 + // 0.4 * 100 / 100 ==> 40
    (FOLLOWERS_WEIGHT * followers) / 1000 ) * // 0.3 * 20,000,000 / 1000 ==> 7,000
    (TRADE_WEIGHT * ( transactionCount /10 )); // 0.3 * (50 / 10) ==> 1.33
  valuation = Number(valuation.toFixed(2));
  return valuation;
};

export default stockPriceAlgorithm;
