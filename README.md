# MVC Framework
##### Developed By: Karen Marie E. Igcasan
This framework is built using NodeJS and ExpressJS with additional features. 

### Folder Structure
- application
    - api
        - controllers
        - models
        - views
            --  (folder per controller)
    - config
        - application.js
        - constants.js
        - database.js
        - environment-dev.yml
        - environment-prod.yml
    - helpers
    - routes
    - system
        - controller.js
        - loader.js
        - middleware.js
        - model.js
        - profiler.js
- assets
    - images
    - scripts
    - stylesheets
- node_modules
- package.json
- server.js

### Features
- Contains structured folder for MVC pattern for every Node, Express application.
- Application property enable_profiler - when set to TRUE, profiler will be displayed in bottom of the page or in seperate page.
- .debug(); - displays profiler page for every POST request. Use this in response object. Ex. res.debug();
- .back(); - this redirects to previous requested path. This is useful for navigating to default page after the failed process as this can response with validation messages. Use this in response object. Ex. res.back();
- .view(name, json<optional>) - an alternative to res.render(). This renders the page and continues to middleware logic. This responses a json:
```sh
{
    current_user: <session user>, 
    output: <json>,
    profiler: <profiler in html format>,
    validation: <string error validation>
}
```
- Controller.isAuthorized(req, res) - this can control the access of user to specific page. This function returns boolean value. If the user is not logged in, this automatically redirects to default page (make sure to configure in application/config/constants.js > user_path).
- Controller.viewPage(req, res, file_path) - this function renders a page with user checking. 

### Instructions
1. Place your codes according to its category in api/controllers, api/models, api/views. Make sure to extend classes with parent classes from application/system in your controllers, models. For the views, it is best practice to create subfolder with controller name and place view files that is according to.
Ex. 
    - application
    -   api
        - controllers
            -- users.js
        - models
            -- user.js
        - views
            -- users
                -- login.ejs
                -- register.ejs
2. Configure your application settings in application/config. 
    - application.js - use this to override server values (not recommended)
    - constants.js - use this to create custom constants to be used by your server codes
    - database.js - use this to override database values (not recommended)
    - environment-{name}.yml - create this to manipulate application values according to environment (See Environment (dev,prod) section)
3. Use application/helpers to create .js classes that shared by your multiple MVC files
4. Create route file per controller in application/routes. 
Ex. 
```sh
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
```
5. DO NOT modify application/system files. You may use "controller", "model" files to extend in your classes.
6. Place your image, script, stylesheet files in /assets folder accordingly.
7. You may configure the default node environment by setting the NODE_ENV variable in <directory>/package.json>start
8. DO NOT modify server.js file.


### Environment (dev,prod)
This contains configuration for local/production environment. Make sure to create this file and place under /application/config folder before running the application. Feel free to add .yml files for more environment (ex. staging, hotfix).
You may copy the format and replace the values with correct setup:
```sh
PORT: 1433
HOSTNAME: 127.0.0.1

DATABASE:
  user: postgres
  host: localhost
  database: sample
  password: admin
  port: 5432
```

### Running the application
1. Open a Terminal inside directory and run: npm install
2. Run: npm start

This will automatically run using dev/local environment. 