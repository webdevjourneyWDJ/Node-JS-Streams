var fs = require('fs');
var http =  require('http');
var file = './anime_dancing.mp4';

http.createServer((req, res) => {

    res.writeHeader(200, { 'Content-Type': 'video/mp4' });
    fs.createReadStream(file)
        .pipe(res)
        .on('error', console.error);

}).listen(3000, () => console.log('stream - http://localhost:3000'));
