import sequelize from 'sequelize';
const { DataTypes } = sequelize;

export default (sequelize, Sequelize) => {
    const Url = sequelize.define("Url", {
        url: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    return Url;
}