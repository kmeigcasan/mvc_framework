const errors = require('../config/constants').errors;

class FormHelper {
    static hasMissingFields(req, res){
        for(const [key,value] of Object.entries(req.body)){
            if(!value){
                res.setError(errors.INCOMPLETE_FIELDS);
                return true;
            }
        }
        return false;
    }

}


module.exports = FormHelper;