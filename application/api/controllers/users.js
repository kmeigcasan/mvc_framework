const User = require('../models/user');
const Controller = require('../../system/controller');

class Users extends Controller {
    index(req, res){
        res.redirect("/login");
    }
    async processLogin(req, res){ 
        let is_valid = await User.verifyLogin(req, res);
        if(is_valid){
            res.redirect("/wall"); 
        } else{
            res.back();    
        }
    }
    async processRegistration(req, res){ 
        let is_valid = await User.verifyRegistration(req, res);
        if(is_valid){
            await User.addNewUser(req, res);
            res.redirect("/wall"); 
        } else{
            res.back(); 
        }
    }
    processLogoff(req, res){
        req.session.destroy();
        res.redirect("/login");
    }
    viewLoginPage(req, res){
        super.viewPage(req, res, "users/login");
    }
    viewRegisterPage(req, res){
        super.viewPage(req, res, "users/register");
    }
}
module.exports = new Users();