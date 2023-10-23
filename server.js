const http = require('http');
const fs = require('fs');
const path = require('path');


const server = http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/index.html') {
    const indexPath = path.join(__dirname, 'public', 'index.html');
    serveFile(indexPath, 'text/html', res);
  } else if (req.url === '/loginstyle.css') {
    const cssPath = path.join(__dirname, 'public', 'loginstyle.css');
    serveFile(cssPath, 'text/css', res);
  } else {
    // Handle other routes or 404 Not Found
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

function serveFile(filePath, contentType, response) {
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // File not found
      response.writeHead(404, { 'Content-Type': 'text/plain' });
      response.end('Not Found');
    } else {
      // File exists, serve it
      fs.createReadStream(filePath).pipe(response);
      response.setHeader('Content-Type', contentType);
    }
  });
}



const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
