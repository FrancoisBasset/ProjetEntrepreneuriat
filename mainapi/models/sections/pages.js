// eslint-disable-next-line no-unused-vars
const { DataTypes, Sequelize, Op } = require('sequelize');
const fs = require('fs');

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
			}).then(function(page) {
				if (page != null) {
					const text = fs.readFileSync(`assets/pages/page_${id}.json`, 'utf8');
					const json = JSON.parse(text);
					
					page.dataValues.elements = json.elements;
				}

				return page;
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
				fs.writeFileSync(`assets/pages/page_${page.id}.json`, '{"elements": []}');

				return this.getById(page.id);
			});
		},

		update: function(id, index, chapterId, elements) {
			return Pages.update({
				index: index,
				chapterId: chapterId
			}, {
				where: {
					id: id
				}
			}).then(() => {
				elements = '{"elements":' + elements + '}';

				fs.writeFileSync(`assets/pages/page_${id}.json`, elements);

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