import sequelize from 'sequelize';
const { DataTypes } = sequelize;

export default (sequelize, Sequelize) => {
    const Thumb = sequelize.define("Thumb", {
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
        }
    })

    return Thumb;
}