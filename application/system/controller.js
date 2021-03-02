const constants = require("../config/constants");
const path = constants.user_path;

class Controller {
    isAuthorized(req, res){
        if(!req.session.current_user){
            res.redirect(path.OFF_SESSION);
            return false;
        }
        return true;
    }
    viewPage(req, res, file_path){
        if(!req.session.current_user){
            res.view(file_path);
        } else {
            res.redirect(path.ON_SESSION);            
        }
    }
}


module.exports = Controller;