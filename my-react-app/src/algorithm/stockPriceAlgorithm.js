const stockPriceAlgorithm = (popularity, followers) => {
  // Define weights for Spotify metrics
  const POPULARITY_WEIGHT = 0.4;
  const FOLLOWERS_WEIGHT = 0.3;
  const MONTHLY_LISTENERS_FOLLOWERS = 0.3;

  // Calculate valuation using weighted sum
  let valuation =
    (POPULARITY_WEIGHT * popularity) / 100 +
    (FOLLOWERS_WEIGHT * followers) / 100;
  valuation = Number(valuation.toFixed(2));
  return valuation;
};

export default stockPriceAlgorithm;
