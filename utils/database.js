const Sequelize = require('sequelize')
const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER_NAME,
    process.env.MYSQL_PASSWORD, {
    dialect: 'mysql',
    host: process.env.MYSQL_HOST
}
);

console.log("process.env.MYSQL_DATABASE", process.env.MYSQL_DATABASE)

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


module.exports = sequelize