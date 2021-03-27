import sequelize from 'sequelize';
const { DataTypes } = sequelize;

export default (sequelize, Sequelize) => {
    const Contact = sequelize.define("Contact", {
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
        }
    })

    return Contact;
}