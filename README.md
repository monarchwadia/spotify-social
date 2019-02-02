# Spotify Social

## Environment variables

Set up your `.env` file (or system variables).
The following are test credentials that you can copy-paste into your `.env`.
(Please note, the `DOMAIN` variable will have to be set to your deployed root in production, or to your `ngrok` URL in 
local development).

```
SPOTIFY_CLIENT_ID=79b2119413eb43a6bbc24935f7ac9ea0
SPOTIFY_CLIENT_SECRET=4e5c87556f4d48968d6a62603406518f
DOMAIN=http://7ecbd8bf.ngrok.io
```

## Starting the project

### Development

See section called "Environment variables".

For dev, you'll want to get `ngrok` in order to get dev going. First download it (I used `snap install ngrok` on Ubuntu).

Ngrok instructions:

1. Run `ngrok http 3000` to forward all HTTP requests 
2. IMPORTANT: set DOMAIN env var to your new ngrok URI

Live reload should work during development mode.

* `yarn install` to install dependencies
* `yarn dev` to start livereload
* `yarn debug` to start livereload with inline terminal debugger

### Production

See section called "Environment variables"

`yarn install` and `yarn start`
