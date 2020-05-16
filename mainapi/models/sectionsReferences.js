const { Sections, Domains, Branches, Courses, Chapters } = require('./models');

Domains.Domains.belongsTo(Sections.Sections, {
	as: 'section',
	foreignKey: {
		allowNull: false
	}
});

Branches.Branches.belongsTo(Sections.Sections, {
	as: 'section',
	foreignKey: {
		allowNull: false
	}
});

Courses.Courses.belongsTo(Sections.Sections, {
	as: 'section',
	foreignKey: {
		allowNull: false
	}
});

Chapters.Chapters.belongsTo(Sections.Sections, {
	as: 'section',
	foreignKey: {
		allowNull: false
	}
});


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