const Express = require("express");
const Router = Express.Router();
const WallController = require(`../api/controllers/walls`);

Router.get("/wall", WallController.index);
Router.post("/wall/message", WallController.saveMessage);
Router.post("/wall/comment", WallController.saveComment);

module.exports = Router;