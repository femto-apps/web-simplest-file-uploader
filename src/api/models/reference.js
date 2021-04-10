import sequelize from 'sequelize'
const { DataTypes } = sequelize;

export default (sequelize, Sequelize) => {
    const Reference = sequelize.define("Reference", {
        short: {
            type: DataTypes.INTEGER,
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
            allowNull: true
        },
        expiration: {
            type: DataTypes.DATE,
            allowNull: true
        },
        ItemId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })

    return Reference;
}