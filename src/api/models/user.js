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
            type: DataTypes.UUIDV4,
            unique: true,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
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