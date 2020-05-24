const { Accounts, Courses, Chapters, ClientsCourses } = require('./models');

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

module.exports = require('./models');