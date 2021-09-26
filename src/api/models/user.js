import sequelize from 'sequelize'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'

const { DataTypes } = sequelize;

export default (sequelize, Sequelize) => {
    async function encryptPasswordIfChanged(user) {
        if (user.changed('password')) {
            user.password = await bcrypt.hash(user.get('password'), 8)
        }
    }

    const User = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false,
            primaryKey: true,
            defaultValue: () => {
                return Math.floor(Math.random() * Math.pow(10, 12)) + Math.pow(10, 9)
            }
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unqiue: true,
            allowNull: true
        },
        password: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false,
            defaultValue: () => {
                return ""
            }
        },
        apikey: {
            type: DataTypes.STRING,
            unqiue: true,
            allowNull: false,
            defaultValue: () => {
                return uuidv4()
            }
        }
    })

    User.beforeCreate(encryptPasswordIfChanged)
    User.beforeUpdate(encryptPasswordIfChanged)

    return User;
}