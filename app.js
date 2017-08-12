'use strict';

var SwaggerExpress = require('swagger-express-mw');
var express = require('express');
var app = express();
var server = require("http").Server(app);
module.exports = app; // for testing

app.use('/swagger-ui', express.static(__dirname + '/swagger-ui'));
app.use('/swagger', express.static(__dirname + '/api/swagger'));


var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  server.listen(port);

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://localhost:' + port);
  }
});
