const fs = require('fs');

const readStream = fs.createReadStream('./anime_dancing.mp4');

readStream.on('data', (chunk) => {
  console.log("size:", chunk.length);
})

readStream.on('end', () => {
  console.log("read stream ended");
})

readStream.on('error', (err) => {
  console.log("an err has occured");
  console.error(err);
})

readStream.pause();

process.stdin.on('data', (chunk) => {
  if(chunk.toString().trim() === 'finish'){
    readStream.resume();
  }
  readStream.read();
})