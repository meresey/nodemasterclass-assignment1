const http = require('http');
const url = require('url')

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  const method = parsedUrl.method;
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');

  const chosenHandler = trimmedPath === 'hello' ? handlers.hello : handlers.rest;

  chosenHandler((statusCode = 404, message = {}) => {
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(statusCode)
    res.end(JSON.stringify(message))
  })
})

server.listen(8080, () => {
  console.log('Server listening on port 8080')
})

const handlers = {};

handlers.hello = cb => {
  cb(200, {'message': 'Hello World'})
}

handlers.rest = cb => {
  cb()
}