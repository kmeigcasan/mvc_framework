const Loader = require("../system/loader");
const config = Loader.loadConfig().DATABASE;
const database = {};

database["user"] = config.user;
database["host"] = config.host;
database["database"] = config.database;
database["password"] = config.password;
database["port"] = config.port;


module.exports = database;