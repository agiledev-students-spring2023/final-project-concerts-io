const express = require("express")
const app = express()
const path = require("path")


const multer = require("multer") 
const axios = require("axios") 
require("dotenv").config({ silent: true })
const morgan = require("morgan") 


module.exports = app