const { Sequelize } = require('sequelize')
const { DataTypes } = Sequelize

async function up({ context: queryInterface }) {
    return queryInterface.sequelize.transaction(t => {
        return Promise.all([
            queryInterface.addColumn('Users', 'email', {
                type: Sequelize.DataTypes.STRING
            }, { transaction: t }),
            queryInterface.addColumn('Users', 'password', {
                type: Sequelize.DataTypes.STRING
            }, { transaction: t })
        ])
    })
}

async function down({ context: queryInterface }) {
    return queryInterface.sequelize.transaction(t => {
        return Promise.all([
            queryInterface.removeColumn('Users', 'email', { transaction: t }),
            queryInterface.removeColumn('Users', 'password', { transaction: t })
        ])
    })
}

module.exports = { up, down }