const { Domains, Branches, Courses, Chapters, Pages } = require('./models');

Domains.Domains.hasMany(Branches.Branches, {
	as: 'branches',
	foreignKey: {
		allowNull: false
	}
});
Branches.Branches.belongsTo(Domains.Domains, {
	as: 'domain'
});

Branches.Branches.hasMany(Courses.Courses, {
	as: 'courses',
	foreignKey: {
		allowNull: false
	}
});
Courses.Courses.belongsTo(Branches.Branches, {
	as: 'branch'
});

Courses.Courses.hasMany(Chapters.Chapters, {
	as: 'chapters',
	foreignKey: {
		allowNull: false
	}
});
Chapters.Chapters.belongsTo(Courses.Courses, {
	as: 'course'
});

Chapters.Chapters.hasMany(Pages.Pages, {
	as: 'pages',
	foreignKey: {
		allowNull: false
	}
});
Pages.Pages.belongsTo(Chapters.Chapters, {
	as: 'chapter'
});