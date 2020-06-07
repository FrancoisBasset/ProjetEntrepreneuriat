// eslint-disable-next-line no-unused-vars
const { DataTypes, Sequelize, Op } = require('sequelize');

/**
 * 
 * @param {Sequelize} database 
 */
module.exports = function(database) {
	const Pages = database.define('pages', {
		id: {
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
			unique: true,
				
			type: DataTypes.INTEGER
		},
		index: {
			allowNull: false,
	
			type: DataTypes.INTEGER
		}
	});

	return {
		Pages: Pages,

		getById: function(id) {
			return Pages.findOne({
				include: 'chapter',
				attributes: {
					exclude: ['chapterId']
				},
				where: {
					id: id
				}
			});
		},

		exists: function(index, chapterId) {
			return Pages.findOne({
				where: {
					index: index,
					chapterId: chapterId
				}
			}).then(function(page) {
				return page != null;
			});
		},

		create: function(index, chapterId) {
			return Pages.create({
				index: index,
				chapterId: chapterId
			}).then(page => {
				return this.getById(page.id);
			});
		},

		update: function(id, index, chapterId) {
			return Pages.update({
				index: index,
				chapterId: chapterId
			}, {
				where: {
					id: id
				}
			}).then(() => {
				return this.getById(id);
			});
		},

		delete: async function(id) {
			const page = await this.getById(id);

			await Pages.destroy({
				where: {
					id: id
				}
			});

			return page;
		}
	};
};