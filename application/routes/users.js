const Express = require("express");
const Router = Express.Router();
const UserController = require(`../api/controllers/users`);

Router.get("/", UserController.index);
Router.get("/login", UserController.viewLoginPage);
Router.get("/register", UserController.viewRegisterPage);
Router.post("/login/validate", UserController.processLogin);
Router.post("/register/validate", UserController.processRegistration);
Router.get("/logoff", UserController.processLogoff);

module.exports = Router;