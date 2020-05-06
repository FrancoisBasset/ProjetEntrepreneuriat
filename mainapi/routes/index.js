function createRoutes(app) {
	app.use('/domains', require('./domainsRoute'));
	app.use('/branches', require('./branchesRoute'));
	app.use('/courses', require('./coursesRoute'));
	app.use('/chapters', require('./chaptersRoute'));
}

module.exports = {
	createRoutes
};