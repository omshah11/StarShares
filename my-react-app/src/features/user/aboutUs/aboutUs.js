// Import necessary dependencies
import React from 'react';
import './aboutUs.css'; // Don't forget to import the CSS file
import starsharesLogo from './starsharesLogo.png'; // Import the logo
// About Us page component
const AboutUs = () => {
  return (
    <div>
    <div className='AboutUsHeader'>
      <h1>About Us</h1>

      <img src={starsharesLogo}></img>
      </div>
    <div className="container">
      
      
      {/* Grid View */}
      <div className="grid-container">
        {/* First Row */}
        <div className="grid-item">
          <h2>Our Goal</h2>
          <p>
            Star Shares pioneers a revolutionary fusion of music and finance, allowing users to invest in popular musical artists as if they were tradable assets. This dynamic platform facilitates the buying, selling, and trading of shares in favorite musicians. The value of artist stocks is determined by a sophisticated algorithm, which analyzes Spotify stream popularity and past song playback ratios to create a real-time popularity metric that reflects the artist's current standing. By leveraging the volatility of the music industry, users can strategically manage their portfolios, taking advantage of market trends to maximize their investments.
          </p>
        </div>
        <img src="https://domf5oio6qrcr.cloudfront.net/medialibrary/8718/brain-music-health-memory.jpg"></img>

        {/* Second Row */}
        <img src='https://assets.publishing.service.gov.uk/government/uploads/system/uploads/image_data/file/185553/s960_music-Streaming.jpg'></img>
        <div className="grid-item">
          <h2>Who We Are</h2>
          <p>
            We want users to benefit from access to comprehensive data and analytics, providing them with the insights needed to make informed investment decisions. Additionally, Star Shares offers a unique revenue stream for artists, who receive a percentage of the trading activity associated with their stocks. In a music industry valued at over $50 billion globally, Star Shares targets music enthusiasts, investors, and fans seeking innovative platforms that blend entertainment and finance. By seamlessly combining the dynamics of burstiness and the intricacy of algorithmic valuation, Star Shares redefines how fans interact with their favorite musicians, positioning itself as a potential industry game-changer.
          </p>
        </div>

        {/* Third Row */}
        <div className="grid-item">
          <h2>Our Mission</h2>
          <p>
            Star Shares is revolutionizing the way people invest in creativity. We provide a platform where individuals can invest in the potential of talented artists, treating their careers like stocks in a dynamic market. Our mission is to empower both investors and artists, bridging the gap between financial markets and creative industries. At Star Shares, we believe in the power of art to generate value and create meaningful connections between investors and the next generation of artistic pioneers.
          </p>
        </div>
        <img src={starsharesLogo}></img>
      </div>
    </div>
    </div>
  );
};

export default AboutUs;
