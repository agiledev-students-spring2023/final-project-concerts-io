const express = require('express');
const TicketMasterManyRouter = express.Router();

const axios = require("axios");
const morgan = require("morgan") 


// get multiple concerts from ticket master api
// get single concert from ticket master api
TicketMasterManyRouter.get("/", morgan("dev"),(req, res, next) => {
    // dummy place holder query that gets multiple concerts
    axios("https://app.ticketmaster.com/discovery/v2/events.json?apikey=8TyzvIJo1qYOzAkLo8ytUqpOsj2evcPb")
    .then(apiResponse => {
        const events = apiResponse.data["_embedded"].events;
         // eslint-disable-next-line no-console
        // console.log(events)
        const eventsMapped = events.map(concert => (
               { id: concert.id ?? " ",
                name: concert.name ?? " ",
               artist: concert.name ?? " ",
               date: concert.dates.start.localDate ?? " ",
               description: concert.info ?? " ",
               location: concert["_embedded"].venues[0].city.name ?? " ",
               image: concert.images !== null ? concert.images[0].url : " ",
               ticketLink: concert.events !== null ? concert.url : " "
            }        
        ))
        // eslint-disable-next-line no-console
        console.log(eventsMapped)


        res.json(eventsMapped)
    })
   .catch(err => {
     console.log(`Get Nae Naed--No Data For you`)
     console.error(err)
    })

    
});


module.exports = TicketMasterManyRouter;
