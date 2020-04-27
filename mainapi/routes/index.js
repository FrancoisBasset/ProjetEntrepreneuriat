function createRoutes(app) {
	app.use('/domains', require('./domains'));
}

module.exports = {
	createRoutes
};