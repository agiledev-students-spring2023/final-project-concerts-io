import React  from 'react';
import "./Home.css"

const Home = () => {
    const recommendedConcerts = [
        {
          id: 1,
          name: 'Example Concert',
          artist: 'Example Artist',
          date: 'Example Date',
          location: 'Example Venue',
          image: 'https://example.com/image.jpg',
          link: 'http://localhost:3000/concerts/1',
        },
        {
          id: 2,
          name: 'Example Concert',
          artist: 'Example Artist',
          date: 'Example Date',
          location: 'Example Venue',
          image: 'https://example.com/image.jpg',
          link: 'http://localhost:3000/concerts/2',
        },
        {
          id: 3,
          name: 'Example Concert',
          artist: 'Example Artist',
          date: 'Example Date',
          location: 'Example Venue',
          image: 'https://example.com/image.jpg',
          link: 'http://localhost:3000/concerts/3',
        },
    ];

    return(
        <div className="Home">
            <div className="home-header">
                <h1>Concerts.io</h1>
                <h2>Recommended Concerts</h2>
            </div>
            <div className="concerts-container">
                <div className="recommendedConcerts-container">
                {recommendedConcerts.map(concert => (
                    <div key={concert.id} className="recommended-concert">
                    <img src={concert.imageUrl} alt={concert.artist} />
                    <div className="concert-details">
                        <h3>{concert.artist}</h3>
                        <p>{concert.date}</p>
                        <p>{concert.location}</p>
                        <a href={concert.link}>Link</a>
                    </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
        
    )
};

export default Home