// newsCard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewsCard = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://gnews.io/api/v4/search', {
          params: {
            q: 'music', // Example: Search query for music-related articles
            token: '68d7c1a522e4791acd8149f18f1fdfae', // Replace 'YOUR_API_KEY' with your GNews API key
            lang: 'en', // Language (optional, defaults to English)
            max: 10, // Maximum number of articles to fetch (optional, defaults to 10)
          },
        });
        setNews(response.data.articles);
        setIsLoading(false);
        setError(null);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);  
      }
    };

    fetchNews();
    // You can set up an interval to fetch data periodically
    const interval = setInterval(fetchNews, 60000); // Refresh every minute

    // Clean up function to clear the interval
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="news-card">
      <h2>Recent News Articles</h2>
      <ul className="news">
        {news.map((article, index) => (
          <li key={index} className="news">
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsCard;
