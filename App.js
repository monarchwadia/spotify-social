const express = require('express');
const { spotifyService } = require('./context');

const App = new express();

/* 
  The user needs to permit this app via Spotify oAuth-style authorization flow. See the following link:
  https://developer.spotify.com/documentation/general/guides/authorization-guide/

  Steps:
  1. SS open a login panel for the user at `https://accounts.spotify.com/authorize`
    *. see SpotifyService::authlink for params, and how the link is generated
  2. User clicks 'accept'
  3. Spotify sends SS the auth token at the `/authcallback` webhook.
  4. SS registers the token for the user
  5. SS sends the user to the main SS app

  Note: the 'state' variable can be sent to the Spotify auth URL. That state variable is echoed back in `/authcallback`.
  See https://developer.spotify.com/documentation/general/guides/authorization-guide/
*/
App.get('/', (req, res) => {
  const authlink = spotifyService.authlink();

  res.send(`
    <h1>
      <a href="${authlink}">Welcome to Spotify Social! Visit this link to authorize with Spotify.</a>
      
    </h1>
  `)
});

/*
  Spotify sends SS the auth token back at this webhook.
*/
App.get('/authcallback', async (req, res) => {
  const { code, error } = req.query;

  // Webhook failures are reported in the `error` query parameter
  if (error) {
    throw new Error('Failed to authorize', error);
  }
  
  // everything looks fine, lets try to get the token
  try {
    const token = await spotifyService.getToken(code);

    if (!token) {
      // login failed at API level
      return res.status(401).json({ message: 'Login failed' })
    }

    return res.json(token);
  } catch (e) {
    // internal server error
    console.error(e);
    return res.status(500).json({ message: 'Internal server error' })
  }
});

module.exports = { App };