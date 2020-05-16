const { Courses, Clients, Chapters, ClientsCourses, Professionnals } = require('./models');

require('./sectionsReferences');
require('./accountsReferences');

Professionnals.Professionnals.hasMany(Courses.Courses, {
	as: 'courses',
	foreignKey: {
		name: 'authorId',
		field: 'authorId',
		allowNull: false
	}
});
Courses.Courses.belongsTo(Professionnals.Professionnals, {
	as: 'author'
});

Clients.Clients.belongsToMany(Courses.Courses, {
	through: ClientsCourses.ClientsCourses,
	as: 'courses'
});
ClientsCourses.ClientsCourses.belongsTo(Chapters.Chapters, {
	as: 'chapter'
});

module.exports = require('./models');