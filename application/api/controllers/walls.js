const Wall = require('../models/wall');
const Controller = require('../../system/controller');

class Walls extends Controller {
    async index(req, res){
        if(super.isAuthorized(req, res)){
            let output = await Wall.getMessagesAndComments(res);
            res.view(`walls/wall`, output);  
        }
    }
    async saveMessage(req, res){
        if(super.isAuthorized(req, res)){
            let success = await Wall.insertMessage(req, res);
            if(success){
                res.redirect("/wall"); 
            } else {
                res.back();   
            }            
        }
    }
    async saveComment(req, res){
        if(super.isAuthorized(req, res)){
            let success = await Wall.insertComment(req, res);
            if(success){
                res.redirect("/wall"); 
            } else {
                res.back();  
            }       
        }
    }
}

module.exports = new Walls();