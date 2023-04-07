const express = require("express");
const axios = require("axios");

const SavedConcertsRouter = express.Router();

const API_URL = "https://my.api.mockaroo.com/concerts.json?key=54687d90";

const backupData = [
  {
    id: 1,
    name: "Example Concert 1",
    artist: "Example Artist 1",
    date: "Example Date 1",
    location: "Example Venue 1",
    image: "https://example.com/image1.jpg",
    link: "http://localhost:3000/concerts/1",
  },
  {
    id: 2,
    name: "Example Concert 2",
    artist: "Example Artist 2",
    date: "Example Date 2",
    location: "Example Venue 2",
    image: "https://example.com/image2.jpg",
    link: "http://localhost:3000/concerts/2",
  },
];

SavedConcertsRouter.get("/", async (req, res) => {
  try {
    const response = await axios.get(API_URL);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error from API: ", error.message);
    res.status(500).json(backupData);
  }
});

module.exports = SavedConcertsRouter;

