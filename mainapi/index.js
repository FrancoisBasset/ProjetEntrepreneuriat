const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

app.use('/assets', express.static('./assets'));

app.listen(81 || process.env.PORT, function() {
	console.log('Start on 80');
});

const { database } = require('./models');
const { createRoutes } = require('./routes');

database.authenticate().then(function() {
	require('./tests/alimentation');
	createRoutes(app);
});