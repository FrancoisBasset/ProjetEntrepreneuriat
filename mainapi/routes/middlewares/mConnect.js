const session = require('../../session');

module.exports = function(req, res, next) {
	if (session.accountId != null) {
		return next();
	}

	res.status(401).end();
};