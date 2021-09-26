const { Sequelize } = require('sequelize');
const { DataTypes } = Sequelize;

async function up({ context: queryInterface }) {
  await queryInterface.createTable('Users', {
    id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    githubId: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: true
    },
    apikey: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    createdAt: {
      type: Sequelize.DATE,
    },
    updatedAt: {
      type: Sequelize.DATE,
    },
  })
}

async function down({ context: queryInterface }) {
  await queryInterface.dropTable('Users')
}

module.exports = { up, down }