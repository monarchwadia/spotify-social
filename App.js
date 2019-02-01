const express = require('express');
const { SpotifyService } = require('./services/SpotifyService');

const App = new express();

App.get('/', (req, res) => {
  const spotifyService = new SpotifyService();
  spotifyService.authorize();
  res.send('Spotify Social is up!');
})

module.exports = { App };