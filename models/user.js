const sequelize = require('../utils/database')
const bcrypt = require("bcrypt");

module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING,
            field: 'firstName'
        },
        lastName: {
            type: DataTypes.STRING,
            field: 'lastName'
        },
        email: DataTypes.STRING,
        password: DataTypes.STRING
    }, {
        freezeTableName: true,
        hooks: {
            beforeCreate: async (user, options) => {
                user.password = await bcrypt.hash(user.password, bcrypt.genSaltSync(8))
            }
        },
        classMethods: {

        },
        instanceMethods: {
            generateHash(password) {
                return bcrypt.hash(password, bcrypt.genSaltSync(8))
            }
        }
    });
    return User;
}