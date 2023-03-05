import React from "react"
import "./SavedConcerts.css"

const SavedConcerts = () => {
  const savedConcertsInfo = [
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
    {
      id: 4,
      name: 'Example Concert',
      artist: 'Example Artist',
      date: 'Example Date',
      location: 'Example Venue',
      image: 'https://example.com/image.jpg',
      link: 'http://localhost:3000/concerts/4',
    },
    {
      id: 5,
      name: 'Example Concert',
      artist: 'Example Artist',
      date: 'Example Date',
      location: 'Example Venue',
      image: 'https://example.com/image.jpg',
      link: 'http://localhost:3000/concerts/5',
    },
    {
      id: 6,
      name: 'Example Concert',
      artist: 'Example Artist',
      date: 'Example Date',
      location: 'Example Venue',
      image: 'https://example.com/image.jpg',
      link: 'http://localhost:3000/concerts/6',
    },
    {
      id: 7,
      name: 'Example Concert',
      artist: 'Example Artist',
      date: 'Example Date',
      location: 'Example Venue',
      image: 'https://example.com/image.jpg',
      link: 'http://localhost:3000/concerts/7',
    },
  ];

  return (
    <div className="SavedConcerts">
      <header className="header">
        <h1 className="savedConcerts-header">Concerts.io</h1>
        <h2>Saved Concerts</h2>
      </header>
      <div className="concerts-container">
        <div className="savedConcerts-container">
          {savedConcertsInfo.map(concert => (
            <div key={concert.id} className="saved-concert">
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
  );
};

export default SavedConcerts;
