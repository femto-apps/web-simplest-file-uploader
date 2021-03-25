const { Sequelize } = require('sequelize');
const { DataTypes } = Sequelize;

async function up({ context: queryInterface }) {
    await queryInterface.createTable('References', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        short: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        views: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        type: {
            type: DataTypes.ENUM('FILE', 'URL'),
            allowNull: false
        },
        ip: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: Sequelize.DATE,
        },
        updatedAt: {
            type: Sequelize.DATE,
        },
        UserId: {
            type: DataTypes.INTEGER,
            default: null
        },
        ItemId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
}

async function down({ context: queryInterface }) {
    await queryInterface.dropTable('References')
}

module.exports = { up, down }