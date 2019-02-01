// Makes API calls against spotify and returns promises
const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env;

if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
  throw new Error('SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET must both be defined in env vars');
}

class SpotifyService {
  authorize() {

  }
}

module.exports = { SpotifyService };