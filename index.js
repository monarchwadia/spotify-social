require('dotenv').config();

const { App } = require('./App');
const PORT = 3000;

// go
const listener = App.listen(
  PORT, 
  () =>{
    const pickedPort = listener.address().port;
    console.log(`Spotify Social is listening on port ${pickedPort}!`);
  } 
);
