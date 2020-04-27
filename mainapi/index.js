const express = require('express');
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('yamljs').load('./swagger.yml');
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(80, function() {
	console.log('Start on 80');
});

const { database } = require('./models');
const { createRoutes } = require('./routes');

database.authenticate().then(function() {
	createRoutes(app);
});