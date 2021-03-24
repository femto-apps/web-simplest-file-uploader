const { Sequelize } = require('sequelize');
const { DataTypes } = Sequelize;

async function up({ context: queryInterface }) {
  await queryInterface.createTable('Items', {
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
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mime: {
      type: DataTypes.STRING,
      allowNull: false
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false
    },
    virus: {
      type: DataTypes.BOOLEAN,
      default: null
    },
    virusTotalID: {
      type: DataTypes.STRING,
      default: null
    },
    store: {
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
    UserId: {
      type: DataTypes.INTEGER,
      default: null
    }
  })
}

async function down({ context: queryInterface }) {
  await queryInterface.dropTable('Items')
}

module.exports = { up, down }