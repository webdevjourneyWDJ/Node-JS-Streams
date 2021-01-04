const {Duplex, PassThrough} = require('stream');
const {createReadStream, createWriteStream} = require('fs');
const readStream = createReadStream('./anime_dancing.mp4');
const writeStream = createWriteStream('./copy.mp4');

class Throttle extends Duplex {

  constructor(ms) {
    super();
    this.delay = ms;
  }

  _read(){}

  _write(chunk, encoding, callback) {
    this.push(chunk);
    setTimeout(callback, this.delay);
  }

  _final(){
    this.push(null)
  }
}

const report = new PassThrough();
const throttle = new Throttle(100);

let total = 0;
report.on('data', (chunk) => {
  total += chunk.length;
  console.log('bytes: ', total);
})

readStream.pipe(throttle).pipe(report).pipe(writeStream);