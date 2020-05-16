const { Accounts, Clients, Professionnals, Organizations, Operators } = require('./models');

Clients.Clients.belongsTo(Accounts.Accounts, {
	as: 'account',
	foreignKey: {
		allowNull: false
	}
});

Professionnals.Professionnals.belongsTo(Accounts.Accounts, {
	as: 'account',
	foreignKey: {
		allowNull: false
	}
});

Organizations.Organizations.belongsTo(Accounts.Accounts, {
	as: 'account',
	foreignKey: {
		allowNull: false
	}
});

Operators.Operators.belongsTo(Accounts.Accounts, {
	as: 'account',
	foreignKey: {
		allowNull: false
	}
});