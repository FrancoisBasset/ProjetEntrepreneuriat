const nodeMailer = require('nodemailer');

const transport = nodeMailer.createTransport({
	host: 'localhost'
});

module.exports = {
	sendMail: function(from, to, subject, text) {
		return transport.verify().then(function() {
			return transport.sendMail({
				from: from,
				to: to,
				subject: subject,
				text: text
			}).then(function() {
				return true;
			}).catch(function() {
				return false;
			});
		});
	}
};