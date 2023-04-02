const axios = require('axios');
require('dotenv').config({ silent: true });

// templating for seat geek requests

const getSeatGeekConcerts = async(req,res) => {
    axios("https://api.seatgeek.com/2/events/?client_id=MjU3MDQ5ODl8MTY4MDQ2Njc4NC4yNDg1NzU0&venue.state=NY")
    .then(apiResponse => res.json(apiResponse.data))
    .catch(err => {
     console.log(`Get Nae Naed--No Data For you`)
     console.log(err)
    })
}

module.exports = {
    getSeatGeekConcerts
}