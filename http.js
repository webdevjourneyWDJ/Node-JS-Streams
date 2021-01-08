const {createServer} = require('http');
const {stat, createReadStream, createWriteStream} = require('fs');
const {promisify} = require('util');
const multiparty = require('multiparty');

const filename = './anime_dancing.mp4';
const fileInfo = promisify(stat);

const sendOGVideo = async (req, res) => {
  const {size} = await fileInfo(filename); 
  const range = req.headers.range;
  if(range){
    let [start, end] = range.replace(/bytes=/, '').split('-');
    start = parseInt(start, 10);
    end = end ? parseInt(end, 10) : size-1;

    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${size}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': (start-end) + 1,
      'Content-Type': 'video/mp4'
    })

    createReadStream(filename, {start, end}).pipe(res);
  }else{
    res.writeHead(200, {
      'Content-Length': size,
      'Content-Type': 'video/mp4'
    });  
    createReadStream(filename).pipe(res);
  }
};

createServer((req, res) => {
  if(req.method === "POST"){
    let form = new multiparty.Form();
    form.on('part', (part) =>{
      part
        .pipe(createWriteStream(`./copy/${part.filename}`))
        .on('close', () => {
          res.writeHead(200, { 'Content-Type': 'text/html'});
          res.end(`<h1>File Uploaded: ${part.filename}</h1>`)
        })
    })
    form.parse(req);
  }
  else if(req.url === "/og"){
    sendOGVideo(req, res);
  } else{
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.end(`
      <form enctype="multipart/form-data" method="POST" action="/">
        <input type="file" name="upload-file">
        <button>Upload File</button>
      </form>
    `)
  }
}).listen(5050, () => console.log('server running on port 5050'));