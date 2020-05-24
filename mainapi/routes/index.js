function createRoutes(app) {
	app.use('/accounts', require('./accountsRoute'));
	app.use('/sections', require('./sectionsRoute'));
	app.use('/certifications', require('./certificationsRoute'));
}

module.exports = {
	createRoutes
};