// newsCard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewsCard = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const apiKey = '9ad02fd22ecf4647ae47a4484b8d8aba'; // Replace with your News API key
        const response = await axios.get('https://newsapi.org/v2/everything', {
          params: {
            q: 'music', // Example: Search query for music-related articles
            apiKey: apiKey,
          },
        });
        setArticles(response.data.articles);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div className="news-card">
      <h2>Recent News Articles</h2>
      <div className="articles">
        {articles.map((article, index) => (
          <div key={index} className="article">
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsCard;
