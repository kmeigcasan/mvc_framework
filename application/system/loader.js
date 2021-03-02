const fs = require('fs');
const yaml = require('js-yaml');

class Loader {
    loadConfig(){
      let env_file = `environment-${process.env.NODE_ENV}.yml`;
      let file_contents = fs.readFileSync(__dirname+"/../config/"+env_file, "utf8");
      return yaml.load(file_contents);
    }

    loadRoutes(){
        const dir = `${__dirname}/../routes`;
        const files = fs.readdirSync(dir);
        let routes = [];

        for(const file of files){
          const name = file.substring(0, file.lastIndexOf("."));
          routes.push(require(`${dir}/${name}`));
        }
        return routes;
    }
}

module.exports = new Loader();