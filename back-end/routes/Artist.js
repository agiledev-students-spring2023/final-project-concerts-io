
const express = require('express');

const ArtistRouter = express.Router();

const axios = require("axios");



ArtistRouter.get("/:id", async (req,res) =>{
    try {
        // eslint-disable-next-line no-console
        console.log(req.params)
        const response = await axios.get(
          `https://my.api.mockaroo.com/artists/${req.params.id}.json?key=54687d90`
        )
        res.json(response.data) 
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
        const exampleArtist = [
            {
              id: 1,
              name: "John Smith",
            }
          ];
        
        
        res.json(exampleArtist)
      }
})

module.exports = ArtistRouter