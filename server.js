import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  fs.promises.access(filePath, fs.constants.F_OK)
    .then(() => {
      // File exists, serve it
      response.setHeader('Content-Type', contentType);
      fs.createReadStream(filePath).pipe(response);
    })
    .catch(() => {
      // File not found
      response.writeHead(404, { 'Content-Type': 'text/plain' });
      response.end('Not Found');
    });
}

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});

export default server;
