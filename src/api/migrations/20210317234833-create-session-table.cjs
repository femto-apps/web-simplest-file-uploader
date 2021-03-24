const { Sequelize } = require('sequelize');
const { DataTypes } = Sequelize;

async function up({ context: queryInterface }) {
  await queryInterface.createTable('Session', {
    sid: {
      type: Sequelize.STRING(36),
      allowNull: false,
      primaryKey: true
    },
    expires: DataTypes.DATE,
    data: DataTypes.TEXT,
    createdAt: {
      type: Sequelize.DATE,
    },
    updatedAt: {
      type: Sequelize.DATE,
    },
  })
}

async function down({ context: queryInterface }) {
  await queryInterface.dropTable('Session')
}

module.exports = { up, down }