// eslint-disable-next-line no-unused-vars
const { DataTypes, Sequelize, Op } = require('sequelize');

/**
 * 
 * @param {Sequelize} database 
 */
module.exports = function(database) {
	const Certifications = database.define('certifications', {
		id: {
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
			unique: true,

			type: DataTypes.INTEGER
		},
		name: {
			allowNull: false,
			unique: true,

			type: DataTypes.STRING(100)
		},
		validated: {
			allowNull: false,
			defaultValue: false,

			type: DataTypes.BOOLEAN
		}
	});

	return {
		Certifications: Certifications,

		getAll: function() {
			return Certifications.findAll({
				attributes: {
					exclude: [
						'claimantId'
					]
				},
				include: [
					'claimant',
					'courses'
				]
			});
		},

		getById: function(id) {
			return Certifications.findOne({
				where: {
					id: id
				},
				attributes: {
					exclude: [
						'claimantId'
					]
				},
				include: [
					'claimant',
					'courses'
				]
			});
		},

		getByName: function(name) {
			return Certifications.findAll({
				where: {
					name: {
						[Op.like]: '%' + name + '%'
					}
				},
				attributes: {
					exclude: [
						'claimantId'
					]
				},
				include: [
					'claimant',
					'courses'
				]
			});
		},

		exists: function(name) {
			return Certifications.findOne({
				where: {
					name: name
				}
			}).then(function(certification) {
				return certification != null;
			});
		},

		create: async function(name, claimantId, coursesId) {
			const { CoursesCertifications } = require('../models');

			return Certifications.create({
				name: name,
				claimantId: claimantId
			}).then(async certification => {
				for (const courseId of coursesId) {
					await CoursesCertifications.create(certification.id, courseId);
				}

				return this.getById(certification.id);
			});
		},
		validate: function(id) {
			return Certifications.update({
				validated: true
			}, {
				where: {
					id: id
				}
			}).then(() => {
				return this.getById(id);
			});
		}
	};
};