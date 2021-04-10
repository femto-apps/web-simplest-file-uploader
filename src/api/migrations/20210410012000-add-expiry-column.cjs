const { Sequelize } = require('sequelize')
const { DataTypes } = Sequelize

async function up({ context: queryInterface }) {
    return queryInterface.sequelize.transaction(t => {
        return Promise.all([
            queryInterface.addColumn('References', 'expiration', {
                type: Sequelize.DataTypes.DATE
            }, { transaction: t })
        ])
    })
}

async function down({ context: queryInterface }) {
    return queryInterface.sequelize.transaction(t => {
        return Promise.all([
            queryInterface.removeColumn('References', 'expiration', { transaction: t }),
        ])
    })
}

module.exports = { up, down }