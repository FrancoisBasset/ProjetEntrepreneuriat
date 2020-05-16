function createRoutes(app) {
	app.use('/accounts', require('./accountsRoute'));
	app.use('/sections', require('./sectionsRoute'));
}

module.exports = {
	createRoutes
};