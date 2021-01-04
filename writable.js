const {createReadStream, createWriteStream} = require('fs');
const readStream = createReadStream('./anime_dancing.mp4');
const writeStream = createWriteStream('./copy.mp4');

readStream.on('data', (chunk) => {
  writeStream.write(chunk);
})

readStream.on('error', (err) => {
  console.log("An err has occured");
  console.error(err);
})

readStream.on('end', () => {
  writeStream.end();
})

writeStream.on('close', () => {
  process.stdout.write('file copied \n');
})