const Loader = require("../system/loader");
const config = Loader.loadConfig();
const redis = require('redis');
const express_session = require('express-session');
const RedisStore = require('connect-redis')(express_session);
const redisClient = redis.createClient();

const environment = {}, session = {}, properties = {};

environment["hostname"] = config.HOSTNAME;
environment["port"] = config.PORT;

session["secret"] = "secretKey";
session["resave"] = false;
session["saveUninitialized"] = true;
session["cookie"] = { maxAge: 60000 };
session["store"] = new RedisStore({ client: redisClient })


properties["enable_profiler"] = true;

module.exports = {environment, session, properties};