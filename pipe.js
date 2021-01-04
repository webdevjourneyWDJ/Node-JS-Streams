const {createReadStream, createWriteStream} = require('fs');

// const readStream = createReadStream('./anime_dancing.mp4');
const writeStream = createWriteStream('./file.txt');

// readStream.pipe(writeStream).on('error', console.error);

process.stdin.pipe(writeStream);