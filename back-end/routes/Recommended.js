const express = require('express');

const ReccomendedRouter = express.Router();

const axios = require('axios');
const morgan = require('morgan');
const passport = require('passport');

const User = require('../models/User');
const Artist = require('../models/Artist');
const Concert = require('../models/Concert');
const { error } = require('../config/jwt-config');



ReccomendedRouter.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      // Extract search criteria from URL parameter
      const { user } = req;
      await user.populate('reccomendations');
      if(user.reccomendations === []){
        await user.populate('favoriteArtists'); // populate favoriteArtists with actual artist docs
        const {favoriteArtists} = user;
        const artists = favoriteArtists
        const delay = (ms = 100) => new Promise((r) => setTimeout(r, ms));
        const getAllArtists = async function (items) {
          const results = [];
          for (let index = 0; index < items.length; index++) {
            await delay();
            const resp = await axios.get('https://app.ticketmaster.com/discovery/v2/events.json', {
              params: {
              apikey: process.env.TICKETMASTER_API_KEY,
              keyword: items[index].name
            },});
            if(resp.data._embedded !== undefined){
              const mapped = resp.data._embedded.events.map(concert => {
                 console.log(concert.id)
                 const value = new Concert({
                  ticketmasterID: concert.id ?? ' ',
                  name: concert.name ?? ' ',
                  artist: concert.name ?? ' ',
                  date: concert.dates.start.localDate ?? ' ',
                  description: concert.info ?? ' ',
                  location: concert._embedded.venues[0].city.name ?? ' ',
                  image: concert.images !== null ? concert.images[0].url : ' ',
                  ticketLink: concert.events !== null ? concert.url : ' ',
                })
                value.save();
                return value;
              });
              results.push(...mapped)
            }
          }
          return results;
        };
        const responses = await getAllArtists(artists)
        const flattenedArray = [].concat.apply([], responses);
       
        user.reccomendations = flattenedArray;
        await user.save();
        res.json(user.reccomendations);
      }
      else{
        res.json(user.reccomendations);
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: 'Error finding artist data.',
        error: err,
      });
    }
  }
);

ReccomendedRouter.get(
  '/update',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      // Extract search criteria from URL parameter
      const { user } = req;
      await user.populate('reccomendations');
      await user.populate('favoriteArtists'); // populate favoriteArtists with actual artist docs
      const {favoriteArtists} = user;
      const artists = favoriteArtists
      const delay = (ms = 100) => new Promise((r) => setTimeout(r, ms));
      const getAllArtists = async function (items) {
        const results = [];
        for (let index = 0; index < items.length; index++) {
          await delay();
          const resp = await axios.get('https://app.ticketmaster.com/discovery/v2/events.json', {
            params: {
            apikey: process.env.TICKETMASTER_API_KEY,
            keyword: items[index].name
          },});
          if(resp.data._embedded !== undefined){
            const mapped = resp.data._embedded.events.map(concert => {
                console.log(concert.id)
                const value = new Concert({
                ticketmasterID: concert.id ?? ' ',
                name: concert.name ?? ' ',
                artist: concert.name ?? ' ',
                date: concert.dates.start.localDate ?? ' ',
                description: concert.info ?? ' ',
                location: concert._embedded.venues[0].city.name ?? ' ',
                image: concert.images !== null ? concert.images[0].url : ' ',
                ticketLink: concert.events !== null ? concert.url : ' ',
              })
              value.save();
              return value;
            });
            results.push(...mapped)
          }
        }
        return results;
      };
      const responses = await getAllArtists(artists)
      const flattenedArray = [].concat.apply([], responses);
      user.reccomendations = flattenedArray;
      await user.save();
      res.json(user.reccomendations);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: 'Error finding artist data.',
        error: err,
      });
    }
  }
);
module.exports = ReccomendedRouter;