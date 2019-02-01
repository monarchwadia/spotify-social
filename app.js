const express = require('express');

const app = new express();

app.get('/', (req, res) => {
  res.send('Spotify Social is up!');
})

module.exports = app;