const app = require('./app');
const PORT = 3000;

// go
const listener = app.listen(
  PORT, 
  () =>{
    const pickedPort = listener.address().port;
    console.log(`Spotify Social is listening on port ${pickedPort}!`);
  } 
);
