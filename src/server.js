const http = require('http'); //http module
const url = require('url'); //url module
const queryString = require('query-string');
const htmlHandler = require('./htmlResponses.js'); 
const jsonHandler = require('./responses.js'); 

const port = process.env.PORT || process.env.NODE_PORT || 3000;

//function to handle requests
const onRequest = (request, response) => {
  //parse url into individual parts
  //returns an object of url parts by name
  const parsedUrl = url.parse(request.url);

  //grab any query parameters
  const params = queryString.parse(parsedUrl.query);

  //grab the 'accept' headers (comma delimited) and split them into an array
  const acceptedTypes = request.headers.accept.split(',');

  //check the request method (get, head, post, etc)
  switch (request.method) {
    case 'GET':
      if (parsedUrl.pathname === '/') {
        //if homepage, send index
        htmlHandler.getIndex(request, response);
      } else if (parsedUrl.pathname === '/style.css') {
        //if stylesheet, send stylesheet
        htmlHandler.getCSS(request, response);
      } else if (parsedUrl.pathname === '/success') {
        jsonHandler.success(request, response, acceptedTypes[0]);
      } else if (parsedUrl.pathname === '/badRequest') {
        jsonHandler.badRequest(request, response, acceptedTypes[0], params);
      } else if (parsedUrl.pathname === '/unauthorized') {
        jsonHandler.unauthorized(request, response, acceptedTypes[0], params);
      } else if (parsedUrl.pathname === '/forbidden') {
        jsonHandler.forbidden(request, response, acceptedTypes[0]);
      } else if (parsedUrl.pathname === '/internal') {
        jsonHandler.internal(request, response, acceptedTypes[0]);
      } else if (parsedUrl.pathname === '/notImplemented') {
        jsonHandler.notImplemented(request, response, acceptedTypes[0]);
      } else {
        //if not found, send 404 message
        jsonHandler.notFound(request, response, acceptedTypes[0]);
      }
      break;
    default:
      //send 404 in any other case
      jsonHandler.notFound(request, response, acceptedTypes[0]);
  }
};

//start server
http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
