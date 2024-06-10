const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const url = require('node:url');

// Create a local server to receive data from
const server = http.createServer((req, res) => {

    // Parse the request URL to get the pathname
    const parsedUrl = url.parse(req.url);
    let pathname = '.'+ parsedUrl.pathname;

    // Default to serving index.html if root is requested
    if (pathname === './') {pathname = './index.html';}
    
    // Get the file extension to determine the content type
    let ext = path.parse(pathname).ext;

    if (ext === '') {
        pathname = pathname + '.html';
        ext = '.html';
    }
    const map = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.wasm': 'application/wasm'
    };

    // Read the requested file from the filesystem
    fs.readFile(pathname, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.write('404 Not Found');
            return res.end();
        }

        // Set the content type based on the file extension
        res.writeHead(200, { 'Content-Type': map[ext] || 'application/octet-stream' });
        res.write(data);
        return res.end();
    });
});

server.listen(8080, () => {
    console.log('Server listening on port 8080');
});
