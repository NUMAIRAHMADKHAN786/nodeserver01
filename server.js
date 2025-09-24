
const http = require('http'); // built-in http module
const fs = require('fs');   // built in file system module 
const path = require('path'); // built in path module  

const port = process.env.PORT || 3000; // making of port dynamics 
const host = 'localhost'; // localhost for local development 

// load files (synchronously is fine for small projects)
// utf8 to get string instead of buffer
// __dirname is the directory of the current module

const home = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8'); 
const about = fs.readFileSync(path.join(__dirname, 'about.html'), 'utf8');
const contact = fs.readFileSync(path.join(__dirname, 'contact.html'), 'utf8');
const css = fs.readFileSync(path.join(__dirname, 'style.css'), 'utf8');
// utility functions to send responses
function sendHtml(res, content) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(content);
}
// utility function to send css
function sendCss(res, content) {
    res.writeHead(200, { 'Content-Type': 'text/css; charset=utf-8' });
    res.end(content);
}
// create server and handle requests
const server = http.createServer((request, response) => {
    const reqUrl = decodeURIComponent(request.url.split('?')[0]);

    if (reqUrl === '/' || reqUrl === '/index.html') {
        return sendHtml(response, home);
    } else if (reqUrl === '/about' || reqUrl === '/about.html') {
        return sendHtml(response, about);
    } else if (reqUrl === '/contact' || reqUrl === '/contact.html') {
        return sendHtml(response, contact);
    } else if (reqUrl === '/style.css') {
        return sendCss(response, css);
    }
// console.log('Requested URL:', reqUrl);
// simple routing logic
    // fallback 404 not found 
    response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    response.end('<h1>404 - Page not found</h1>');
});

server.listen(port, host, () => {
    console.log(`server is running at http://${host}:${port}`);
});
