const express = require('express')

const{getSeatGeekConcerts} = require("../controllers/seatgeekcontroller")


const seatGeekApi = express.Router()

seatGeekApi.get('/',getSeatGeekConcerts)


module.exports = seatGeekApi