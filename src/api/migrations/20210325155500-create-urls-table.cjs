const { Sequelize } = require('sequelize');
const { DataTypes } = Sequelize;

async function up({ context: queryInterface }) {
    await queryInterface.createTable('Urls', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: Sequelize.DATE,
        },
        updatedAt: {
            type: Sequelize.DATE,
        }
    })
}

async function down({ context: queryInterface }) {
    await queryInterface.dropTable('Urls')
}

module.exports = { up, down }