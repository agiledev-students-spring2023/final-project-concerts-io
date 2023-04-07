const express = require('express');
const TicketMasterRouter = express.Router();

const axios = require("axios");
const morgan = require("morgan") 

// get single concert from ticket master api
TicketMasterRouter.get("/:id", morgan("dev"),(req, res, next) => {
    // dummy place holder query that gets an ethel cain concert
    axios(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=8TyzvIJo1qYOzAkLo8ytUqpOsj2evcPb&id=${req.params.id}`)
    .then(apiResponse => {
        const concert = {
                id: apiResponse.data["_embedded"].events[0].id,
                name: apiResponse.data["_embedded"].events[0].name,
                artist: apiResponse.data["_embedded"].events[0].name,
                date: apiResponse.data["_embedded"].events[0].dates.start.localDate,
                description: apiResponse.data["_embedded"].events[0].info,
                location: apiResponse.data["_embedded"].events[0]["_embedded"].venues[0].city.name,
                image: apiResponse.data["_embedded"].events[0].images[0].url,
                ticketLink: apiResponse.data["_embedded"].events[0].url
        }
        // eslint-disable-next-line no-console
        console.log(concert)


        res.json(concert)
    })
   .catch(err => {
     console.log(`Get Nae Naed--No Data For you`)
     console.error(err)
    })

    
});




module.exports = TicketMasterRouter;
