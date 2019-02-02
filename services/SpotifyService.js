const Axios = require('axios');
const querystring = require('querystring');

const axios = Axios.create({
  validateStatus: false
});

// get required env vars
const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, DOMAIN } = process.env;
if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !DOMAIN) {
  throw new Error('SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET and DOMAIN must be defined in env vars');
}

const redirectUri = () => DOMAIN + '/authcallback';

class SpotifyService {
  authlink() {
    const scopes = '';

    // The user needs to visit this in order to authorize with the app
    const address = 'https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    '&client_id=' + SPOTIFY_CLIENT_ID +
    (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    '&redirect_uri=' + encodeURIComponent(redirectUri());

    return address;
  }

  async getToken(code) {
    // create the base64 hash as per documentation and oAuth standards
    const hash = Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64');

    const options = {
      url: 'https://accounts.spotify.com/api/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        // TODO: dynamically generate this from client id and secret
        'Authorization': `Basic ${hash}`
      },
      data: querystring.stringify({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri()
      })
    }
    
    const result = await axios.request(options);
    const { data } = result;
    const { error } = data;

    // failure at API level. return null for token.
    if (error) {
      console.log(data);
      return null;
    }

    // success
    return data;
  }
}

module.exports = { SpotifyService };