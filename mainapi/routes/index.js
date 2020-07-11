const uuid = require('uuid');
const session = require('express-session');

function createRoutes(app) {
	app.use(session({
		secret: uuid.v4(),
		resave: true,
		saveUninitialized: true
	}));

	app.use('/accounts', require('./accountsRoute'));
	app.use('/sections', require('./sectionsRoute'));
	app.use('/certifications', require('./certificationsRoute'));
	app.use('/notifications', require('./notificationsRoute'));
	app.use('/classes', require('./classesRoute'));
}

module.exports = {
	createRoutes
};