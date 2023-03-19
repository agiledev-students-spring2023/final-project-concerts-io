import React from "react"
import "./SavedConcerts.css"
import ConcertComponent from "../components/ConcertComponent"

//dummy data for concerts
const exampleConcerts = [
  {
    id: 1,
    name: "John Smith live at the Purple Lounge",
    artist: "John Smith",
    date: "September 22, 2040",
    description: "John Smith debuts his new record for the first time live",
    location: 'Example Venue',
    image: 'https://example.com/image.jpg',
    ticketLink: 'https://example.com/tickets',
  },
  {
    id: 2,
    name: "Barry Ken live at the Red Lounge",
    artist: "Barry Ken",
    date: "August 15, 2040",
    description: "The legendary Barry Ken returns for his first performace in years",
    location: 'Example Venue',
    image: 'https://example.com/image.jpg',
    ticketLink: 'https://example.com/tickets',
  
},
{
  id: 3,
  name: 'Example Concert',
  artist: 'Example Artist',
  date: 'Example Date',
  location: 'Example Venue',
  description: "Example Description",
  location: 'Example Venue',
  image: 'https://example.com/image.jpg',
  ticketLink: 'https://example.com/tickets'
},
{
  id: 4,
  name: 'Example Concert',
  artist: 'Example Artist',
  date: 'Example Date',
  location: 'Example Venue',
  description: "Example Description",
  location: 'Example Venue',
  image: 'https://example.com/image.jpg',
  ticketLink: 'https://example.com/tickets'
},
{
  id: 5,
  name: 'Example Concert',
  artist: 'Example Artist',
  date: 'Example Date',
  location: 'Example Venue',
  description: "Example Description",
  location: 'Example Venue',
  image: 'https://example.com/image.jpg',
  ticketLink: 'https://example.com/tickets'
},
{
  id: 6,
  name: 'Example Concert',
  artist: 'Example Artist',
  date: 'Example Date',
  location: 'Example Venue',
  description: "Example Description",
  location: 'Example Venue',
  image: 'https://example.com/image.jpg',
  ticketLink: 'https://example.com/tickets'
},
{
  id: 7,
  name: 'Example Concert',
  artist: 'Example Artist',
  date: 'Example Date',
  location: 'Example Venue',
  description: "Example Description",
  location: 'Example Venue',
  image: 'https://example.com/image.jpg',
  ticketLink: 'https://example.com/tickets'
},
]

const SavedConcerts = () => {

  return (
    <div className="SavedConcerts">
      <header className="header">
        <h1 className="savedConcerts-header">Concerts.io</h1>
        <h2>Saved Concerts</h2>
      </header>
      <div className="concerts-container">
        <div className="savedConcerts-container">
          {exampleConcerts.map(concert => (
              <div key={concert.id} className="saved-concert">
                <ConcertComponent key = {concert.id} details = {concert} />
              </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavedConcerts;
