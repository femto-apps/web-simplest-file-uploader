import sequelize from 'sequelize';
const { DataTypes } = sequelize;

export default (sequelize, Sequelize) => {
    const Reference = sequelize.define("Reference", {
        short: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false
        },
        // user: {
        //     type: DataTypes.
        //     unique: false,
        //     allowNull: false
        // }
    })

    Reference.prototype.getItem = function () {
        console.log(this)
    }

    return Reference;
}