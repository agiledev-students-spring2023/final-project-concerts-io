const request = require("supertest");
const express = require("express");
const axios = require("axios");

const FavoriteArtistsRouter = require("../routes/FavoriteArtists");

jest.mock("axios");

describe("FavoriteArtistsRouter", () => {
    const artists = [
        {
          id: 1,
          name: "Josh Minksy",
      
        },
        {
          id: 2,
          name: "Mindy Wu",
        }
      ];

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("GET /", () => {
    it("should return a list of artists from the API", async () => {
      axios.get.mockResolvedValueOnce({ data: artists });

      const response = await request(express().use(FavoriteArtistsRouter)).get("/");
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(artists);
    });

    it("should return a 500 error and a list of artists from the backup data when the API call fails", async () => {
      axios.get.mockRejectedValueOnce(new Error("API is down"));

      const response = await request(express().use(FavoriteArtistsRouter)).get("/");
      expect(response.status).toEqual(500);
      expect(response.body).toEqual(artists);
    });
  });
});