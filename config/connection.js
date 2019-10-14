var Sequelize = require("sequelize");

var sequelizeConn = new Sequelize("clothing_db", "root", "password", {
    host: "localhost",
    port: 3305,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

module.exports = sequelizeConn;