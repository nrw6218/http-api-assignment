//function to send response
const respond = (request, response, content, status, type) => {
  //set status code (200 success) and content type
  response.writeHead(status, { 'Content-Type': type });
  //write the content string or buffer to response
  response.write(content);
  //send the response to the client
  response.end();
};

// get success message
const success = (request, response, acceptedType) => {
  if (acceptedType === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>This is a successful response.</message>`;
    responseXML = `${responseXML} </response>`;    

	  // return response passing out string and content type
    return respond(request, response, responseXML, 200, 'text/xml');
  }

  //create success message for response
  const responseJSON = {
    message: 'This is a successful response.',
  };

  const responseString = JSON.stringify(responseJSON);
  //return response passing json and content type
  return respond(request, response, responseString, 200, 'application/json');
};

// get bad request message
const badRequest = (request, response, acceptedType, queryParams) => {
  let responseMessage = 'Missing valid query parameter set to true.';
  let responseCode = 400;

  if (queryParams.valid && queryParams.valid == 'true') {
    responseMessage = 'This request has the required parameters.';
    responseCode = 200;
  }

  if (acceptedType === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseMessage}</message>`;
    if (queryParams.valid !== 'true') responseXML = `${responseXML} <id>badRequest</id>`;
    responseXML = `${responseXML} </response>`;    

	  // return response passing out string and content type
    return respond(request, response, responseXML, responseCode, 'text/xml');
  }

  //create success message for response
  let responseJSON = {
    message: responseMessage,
  };

  if (queryParams.valid !== 'true') responseJSON.id = 'badRequest';

  const responseString = JSON.stringify(responseJSON);
  
  //return response passing json and content type
  return respond(request, response, responseString, responseCode, 'application/json');
};

// get unauthorized user message
const unauthorized = (request, response, acceptedType, queryParams) => {
  let responseMessage = 'Missing loggedIn query parameter set to yes.';
  let responseCode = 401;

  if (queryParams.loggedIn && queryParams.loggedIn == 'yes') {
    responseMessage = 'You have successfully viewed the content.';
    responseCode = 200;
  }

  if (acceptedType === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseMessage}</message>`;
    if (queryParams.loggedIn !== 'yes') responseXML = `${responseXML} <id>unauthorized</id>`;
    responseXML = `${responseXML} </response>`;    

	  // return response passing out string and content type
    return respond(request, response, responseXML, responseCode, 'text/xml');
  }

  //create success message for response
  let responseJSON = {
    message: responseMessage,
  };

  if (queryParams.loggedIn !== 'yes') responseJSON.id = 'unauthorized';

  const responseString = JSON.stringify(responseJSON);
  
  //return response passing json and content type
  return respond(request, response, responseString, responseCode, 'application/json');
};

// get forbidden message
const forbidden = (request, response, acceptedType) => {
  if (acceptedType === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>You do not have access to this content.</message>`;
    responseXML = `${responseXML} <id>forbidden</id>`;
    responseXML = `${responseXML} </response>`;    

	  // return response passing out string and content type
    return respond(request, response, responseXML, 403, 'text/xml');
  }

  //create success message for response
  const responseJSON = {
    message: 'You do not have access to this content.',
    id: 'forbidden',
  };

  const responseString = JSON.stringify(responseJSON);
  
  //return response passing json and content type
  return respond(request, response, responseString, 403, 'application/json');
};

// get internal error message
const internal = (request, response, acceptedType) => {
  if (acceptedType === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>Internal Server Error. Something went wrong.</message>`;
    responseXML = `${responseXML} <id>internal</id>`;
    responseXML = `${responseXML} </response>`;    

	  // return response passing out string and content type
    return respond(request, response, responseXML, 500, 'text/xml');
  }

  //create success message for response
  const responseJSON = {
    message: 'Internal Server Error. Something went wrong.',
    id: 'internal',
  };

  const responseString = JSON.stringify(responseJSON);
  
  //return response passing json and content type
  return respond(request, response, responseString, 500, 'application/json');
};

// get not implemented message
const notImplemented = (request, response, acceptedType) => {
  if (acceptedType === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>A get request for this page has not been implemented yet. Check again later for updated content.</message>`;
    responseXML = `${responseXML} <id>notImplemented</id>`;
    responseXML = `${responseXML} </response>`;    

	  // return response passing out string and content type
    return respond(request, response, responseXML, 501, 'text/xml');
  }

  //create success message for response
  const responseJSON = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 'notImplemented',
  };

  const responseString = JSON.stringify(responseJSON);
  
  //return response passing json and content type
  return respond(request, response, responseString, 501, 'application/json');
};

// function for 404 not found requests with message
const notFound = (request, response, acceptedType) => {
  if (acceptedType === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>The page you are looking for was not found.</message>`;
    responseXML = `${responseXML} <id>notFound</id>`;
    responseXML = `${responseXML} </response>`;    

	  // return response passing out string and content type
    return respond(request, response, responseXML, 404, 'text/xml');
  }

  //create error message for response
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  const responseString = JSON.stringify(responseJSON);
  
  //return response passing json and content type
  return respond(request, response, responseString, 404, 'application/json');
};

//set public modules
module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
