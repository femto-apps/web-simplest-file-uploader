const { Sequelize } = require('sequelize');
const { DataTypes } = Sequelize;

async function up({ context: queryInterface }) {
    await queryInterface.createTable('Contacts', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        method: {
            type: DataTypes.ENUM('EMAIL', 'DISCORD', 'OTHER', 'NONE'),
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ip: {
            type: DataTypes.STRING,
            allowNull: true
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
    await queryInterface.dropTable('Contacts')
}

module.exports = { up, down }