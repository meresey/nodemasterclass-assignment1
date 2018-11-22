/*
* Simple HTTP server that listens on port 8080 and responds to /hello route
* with a JSON message. For any other route, it responds with a statuscode of 404
* 
*/


// Dependencies
const http = require('http');
const url = require('url')

// Create http server
const server = http.createServer((req, res) => {
  // Parse url object
  const parsedUrl = url.parse(req.url, true);
  // Retrieve path property from parsed URL
  const path = parsedUrl.pathname;
  // remove leading or trailing /
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');
  // select handler to respond with depending on path
  const chosenHandler = trimmedPath === 'hello' ? handlers.hello : handlers.rest;
  // Call chosen handler 
  chosenHandler((statusCode = 404, message = {}) => {
    // Set header 'content-type' to application/json
    res.setHeader('Content-Type', 'application/json')
    // write statuscode
    res.writeHead(statusCode)
    // send response back to user with message
    res.end(JSON.stringify(message))
  })
})

// Start Http server and listen on port 8080
server.listen(8080, () => {
  console.log('Server listening on port 8080')
})

// Container for handlers
const handlers = {};

// hello route handler
handlers.hello = cb => cb(200, {'message': 'Hello World'})

// Handler for the any other route
handlers.rest = cb => cb(404)
