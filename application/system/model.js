const { Pool } = require('pg');
const config = require('../config/database');

class Model {
    constructor(){
        this.pool = new Pool({
            user: config.user,
            host: config.host,
            database: config.database,
            password: config.password,
            port: config.port
        });
    }
    async runQuery(query, values, res){
        res.recordSQLProfile(query, values);
        let result = await this.pool.query(query, values);
        return result.rows;
    }
}

module.exports = Model;