const Model = require('../../system/model');
const FormHelper = require('../../helpers/form');
const md5 = require('md5');
const errors = require('../../config/constants').errors;

class User extends Model {
    async verifyLogin(req, res)
    {
        if(!this.hasValidFields(req, res)){
            return false;
        }
        const query = `SELECT * FROM users WHERE users.email=$1`;
        const value = [req.body.email];
        
        let result = await this.runQuery(query, value, res);
        let row = result[0];
        if(row && row.password == md5(req.body.password)){
            req.session.current_user = {id: row.id, first_name: row.first_name, last_name: row.last_name};
        } 
        else{
            res.setError(errors.FAILED_LOGIN);
            return false;
        }     
        return true;
    }
    async verifyRegistration(req, res)
    {
        if(!this.hasValidFields(req, res)){
            return false;
        }
        const query = `SELECT * FROM users WHERE users.email=$1`;
        const value = [req.body.email];

        let rows = await this.runQuery(query, value, res);
        if(rows.length > 0){
            res.setError(errors.EMAIL_EXISTS);
            return false;
        }
        return true;
    }
    async addNewUser(req, res)
    {
        const query = `INSERT INTO users(first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING id`;
        const values = [req.body.first_name, req.body.last_name, req.body.email, md5(req.body.password)];                    
        
        let rows = await this.runQuery(query, values, res);
        req.session.current_user = {id: rows[0].id, first_name: req.body.first_name, last_name: req.body.last_name};
    }
    hasValidFields(req, res)
    {
        if(FormHelper.hasMissingFields(req, res)){
            return false;
        }
        if(req.body.confirm_password && (req.body.confirm_password != req.body.password)){
            res.setError(errors.PASSWORDS_UNMATCH);
            return false;
        }
        if(!this.isValidEmail(req.body.email)){
            res.setError(errors.INVALID_EMAIL);
            return false;
        }
        return true;
    }
    isValidEmail(email){
        return /\S+@\S+\.\S+/.test(email);
    }
}

module.exports = new User();