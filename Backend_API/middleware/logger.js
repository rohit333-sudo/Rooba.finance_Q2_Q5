// middleware/logger.js
const moment = require('moment');

const requestLogger = (req, res, next) => {
  const timestamp = moment().toISOString();
  const method = req.method;
  const url = req.originalUrl;
  const accessToken = req.headers.cookie || 'No Access Token';
// console.log( req.headers)
  const logMessage = `Timestamp: [${timestamp}] ,  Method:  ${method} ,   URL: ${url} ,   AccessToken:  "${accessToken}"`;
  console.log(logMessage);

  next();
};

module.exports = requestLogger;
