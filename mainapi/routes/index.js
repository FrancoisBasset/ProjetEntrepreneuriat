function createRoutes(app) {
	app.use('/domains', require('./domainsRoute'));
	app.use('/branches', require('./branchesRoute'));
}

module.exports = {
	createRoutes
};