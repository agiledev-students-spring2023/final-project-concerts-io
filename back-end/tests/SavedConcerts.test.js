const request = require("supertest");
const express = require("express");
const morgan = require("morgan");
const axios = require("axios");

const SavedConcertsRouter = require("../routes/SavedConcerts");

jest.mock("axios");

describe("SavedConcertsRouter", () => {
  const concerts = [
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

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("GET /", () => {
    it("should return a list of concerts from the API", async () => {
      axios.get.mockResolvedValueOnce({ data: concerts });

      const response = await request(express().use(SavedConcertsRouter)).get("/");
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(concerts);
    });

    it("should return a 500 error and a list of concerts from the backup data when the API call fails", async () => {
      axios.get.mockRejectedValueOnce(new Error("API is down"));

      const response = await request(express().use(SavedConcertsRouter)).get("/");
      expect(response.status).toEqual(500);
      expect(response.body).toEqual(concerts);
    });
  });
});
