const express = require('express');
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('yamljs').load('./swagger.yml');
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const cors = require('cors');
app.use(cors());

app.use('/assets', express.static('./assets'));

app.listen(80, function() {
	console.log('Start on 80');
});

const { database } = require('./models');
const { createRoutes } = require('./routes');

database.authenticate().then(function() {
	require('./tests/alimentation');
	createRoutes(app);
});