const express = require('express');
const TicketMasterRouter = express.Router();

const axios = require("axios");
const morgan = require("morgan") 

TicketMasterRouter.get("/", morgan("dev"),(req, res, next) => {
    // use axios to make a request to an API for concert data
    axios("https://app.ticketmaster.com/discovery/v2/events.json?apikey=8TyzvIJo1qYOzAkLo8ytUqpOsj2evcPb")
    .then(apiResponse => res.json(apiResponse.data))
   .catch(err => {
     console.log(`Get Nae Naed--No Data For you`)
     console.error(err)
    })

    
});

module.exports = TicketMasterRouter;
