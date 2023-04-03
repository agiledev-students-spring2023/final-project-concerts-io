const express = require('express');
const FavoriteArtistsRouter = express.Router();

const axios = require("axios");
const morgan = require("morgan") 



FavoriteArtistsRouter.get("/", morgan("dev"),(req, res, next) => {
    // use axios to make a request to an API for artist data
    axios("https://my.api.mockaroo.com/artists.json?key=54687d90")
    .then(apiResponse => res.json(apiResponse.data))
    .catch(err => {
      console.log(`Get Nae Naed--No Data For you`)
      console.error(err)
      const backupData = [
         {
           id: 1,
           name: "Josh Minksy",
   
         },
         {
           id: 2,
           name: "Mindy Wu",
         }
    ]
    res.json(backupData);
  })

    
});

module.exports = FavoriteArtistsRouter;