const { Domains } = require('../models');

module.exports = {
	getAllDomains: function() {
		return Domains.findAll();
	}
};