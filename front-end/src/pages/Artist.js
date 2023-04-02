import React, { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import "./Artist.css";
import axios from "axios";
import ConcertComponent from "../components/ConcertComponent";

const exampleArtists = [
  {
    id: 1,
    name: "John Smith",
  },
  {
    id: 2,
    name: "Barry Ken",
  },
];

//dummy data for concerts
const exampleConcerts = [
  {
    id: 1,
    title: "John Smith live at the Purple Lounge",
    artist: "John Smith",
    date: "September 22, 2040",
    description: "John Smith debuts his new record for the first time live",
    link: "fakeTicketLink.com",
  },
  {
    id: 2,
    title: "Barry Ken live at the Red Lounge",
    artist: "Barry Ken",
    date: "August 15, 2040",
    description:
      "The legendary Barry Ken returns for his first performace in years",
    link: "fakeTicketLink.com",
  },
];

const Artist = (props) => {
  const [concerts, setConcerts] = useState([]);
  const [artist, setArtist] = useState([]);

  const { artistId } = useParams(); // get any params passed to this component from the router

  useEffect(() => {
    axios("https://my.api.mockaroo.com/artists.json?key=54687d90")
      .then((response) => {
        setArtist(response.data);
        axios(
          "https://my.api.mockaroo.com/concerts/123.json?key=54687d90"
        ).then((response) => {
          setConcerts(response.data);
        });
      })
      .catch((err) => {
        const foundArtist = exampleArtists.filter((x) => {
          return x.id == artistId;
        })[0];
        setArtist(foundArtist);
        setConcerts(
          exampleConcerts.filter((x) => {
            return x.artist == foundArtist.name;
          })
        );
        console.log(concerts);
      });
  }, []); //will run only once

  // if the user is not logged in, redirect them to the login route
  if (!props.user || !props.user.success) {
    return <Navigate to="/login?error=protected" />;
  }

  return (
    <div className="Artist">
      <h1>{artist.name}</h1>
      <h2>Upcoming Concerts</h2>
      <div className="concerts-container">
        <div className="artistConcerts-container">
          <ConcertComponent key={concerts.id} details={concerts} />
        </div>
      </div>
    </div>
  );
};

export default Artist;
