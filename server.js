const settings = require("./application/config/application");
const express = require("express");
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static(__dirname + "/assets"));
app.set('views', __dirname + '/application/api/views'); 
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(session(settings.session));


//config property
app.locals.enable_profiler = settings.properties["enable_profiler"];

//middleware
const middleware = require(`./application/system/middleware`);
app.use(middleware.load);

//load all routes
const loader = require("./application/system/loader");
app.use(loader.loadRoutes());


//listen
const hostname = settings.environment.hostname;
const port = settings.environment.port;

app.listen(port, hostname, function() {
  console.log(`listening on host ${hostname} port ${port}`);
})
