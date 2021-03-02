const Profiler = require('./profiler');

class Middleware {
    load(req, res, next){
        req.app.locals.previous_path = req.app.locals.current_path;
        req.app.locals.current_path = req.path;
        
        if(req.app.locals.enable_profiler){
            res.locals.profiler = new Profiler(req.session, req.body);
        }
        res.view = function(name, json=null){
            res.locals.page_name = name;
            if(json){
                res.locals.output = json;
            }
            Middleware.send(req,res);
        };
        res.debug = function(){
            res.locals.page_name = "default";
            Middleware.send(req,res);
        };
        res.setError = function(err){
            res.locals.validation = err;
        };  
        res.back = function(){
            res.redirect(req.app.locals.previous_path+"?validation="+res.locals.validation);            
        }
        res.recordSQLProfile = function(query, values){
            if(res.locals.profiler){
                res.locals.profiler.addDatabaseCall(query, values);
            }
        }
        next();  
    }
    static send(req, res){
        let profiler_html = "";
        if(res.locals.profiler){
            profiler_html = res.locals.profiler.getCompiledHTML();
        }
        let validation = req.query.validation || res.locals.validation || "";
        let json = { 
            current_user: req.session.current_user, 
            output: res.locals.output,
            profiler: profiler_html,
            validation: validation
        };
        res.render(res.locals.page_name, json);
    }
} 
module.exports = new Middleware();