module.exports = function(req, res, next) {
	if (req.session.account != null) {
		return next();
	}

	res.status(401).end();
};