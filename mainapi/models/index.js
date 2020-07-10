const { Accounts, Courses, Chapters, ClientsCourses, Certifications, CoursesCertifications, ClientsCertifications, Cards, Payments } = require('./models');

require('./sectionsReferences');
require('./accountsReferences');

Accounts.Accounts.hasMany(Courses.Courses, {
	as: 'sentCourses',
	foreignKey: {
		name: 'authorId',
		field: 'authorId',
		allowNull: false
	}
});
Courses.Courses.belongsTo(Accounts.Accounts, {
	as: 'author'
});

Accounts.Accounts.belongsToMany(Courses.Courses, {
	through: ClientsCourses.ClientsCourses,
	as: 'courses'
});

ClientsCourses.ClientsCourses.belongsTo(Chapters.Chapters, {
	as: 'chapter'
});

Certifications.Certifications.belongsTo(Accounts.Accounts, {
	as: 'claimant',
	foreignKey: {
		allowNull: false,
		field: 'claimantId'
	}
});

Certifications.Certifications.belongsToMany(Courses.Courses, {
	through: CoursesCertifications.CoursesCertifications,
	as: 'courses'
});

Certifications.Certifications.belongsToMany(Accounts.Accounts, {
	through: ClientsCertifications.ClientsCertifications,
	as: 'certifications'
});

Accounts.Accounts.hasOne(Cards.Cards, {
	as: 'card',
	foreignKey: {
		name: 'accountId',
		field: 'accountId',
		allowNull: false
	}
});
Cards.Cards.belongsTo(Accounts.Accounts, {
	as: 'account'
});

Cards.Cards.hasMany(Payments.Payments, {
	as: 'payments',
	foreignKey: {
		name: 'cardId',
		field: 'cardId',
		allowNull: true
	}
});
Payments.Payments.belongsTo(Cards.Cards, {
	as: 'card'
});

module.exports = require('./models');