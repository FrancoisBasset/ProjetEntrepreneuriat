const { Courses, Clients, Chapters, ClientsCourses, Professionnals } = require('./models');

require('./sectionsReferences');
require('./accountsReferences');

Courses.Courses.belongsTo(Professionnals.Professionnals, {
	as: 'author',
	foreignKey: {
		allowNull: false
	}
});

Clients.Clients.belongsToMany(Courses.Courses, {
	through: ClientsCourses.ClientsCourses,
	as: 'courses'
});

ClientsCourses.ClientsCourses.belongsTo(Chapters.Chapters, {
	as: 'chapter'
});

module.exports = require('./models');