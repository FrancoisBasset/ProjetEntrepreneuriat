const { Accounts, Courses, Chapters, ClientsCourses, ClientsClasses, Certifications, CoursesCertifications, ClientsCertifications, Cards, Payments, Classes } = require('./models');

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

Accounts.Accounts.hasMany(Payments.Payments, {
	as: 'payments',
	foreignKey: {
		name: 'accountId',
		field: 'accountId',
		allowNull: true
	}
});
Payments.Payments.belongsTo(Accounts.Accounts, {
	as: 'account'
});

Accounts.Accounts.hasMany(Classes.Classes, {
	as: 'givenClasses',
	foreignKey: {
		name: 'professionnalId',
		field: 'professionnalId',
		allowNull: true
	}
});
Classes.Classes.belongsTo(Accounts.Accounts, {
	as: 'professionnal'
});

Accounts.Accounts.belongsToMany(Classes.Classes, {
	through: ClientsClasses.ClientsClasses,
	as: 'classes'
});

module.exports = require('./models');