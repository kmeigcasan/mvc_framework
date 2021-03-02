const Model = require('../../system/model');
const FormHelper = require('../../helpers/form');

class Wall extends Model {
    async getMessagesAndComments(res)
    {
        const query = `SELECT messages.id as message_id, messenger.first_name || ' ' || messenger.last_name as message_sender_name, message as message_content, messages.created_at as message_date, 
            commenter.first_name || ' '|| commenter.last_name as comment_sender_name, comment as comment_content, comments.created_at as comment_date FROM messages 
            LEFT JOIN users as messenger ON messenger.id=messages.user_id
            LEFT JOIN comments ON comments.message_id=messages.id
            LEFT JOIN users as commenter ON commenter.id=comments.user_id 
            ORDER BY messages.id DESC, comments.id ASC`;
        let rows = await this.runQuery(query, [], res);
        let output = {};
        for(let num in rows)
        {
            const row = rows[num];
            if(!output[row.message_id]){ 
                output[row.message_id] = Wall.formatEntry(row.message_date, row.message_sender_name, row.message_content, true);        
            }
            if(row.comment_sender_name){
                output[row.message_id].comments.push(Wall.formatEntry(row.comment_date, row.comment_sender_name, row.comment_content));
            }
        }
        return output;
    }
    static formatEntry(date, sender, content, is_message=false)
    {
        const formatted_date = new Date(date).toLocaleString();
        const header = `${sender} - ${formatted_date}`;
        if(is_message){
            return {header: header, body: content, comments: []};
        }        
        return {header: header, body: content};
    }
    async insertMessage(req, res)
    {
        if(!FormHelper.hasMissingFields(req, res)){
            const query = "INSERT INTO messages(user_id, message) VALUES ($1, $2)";
            const values = [req.session.current_user.id, req.body.message_input];        
            await this.runQuery(query, values, res);
            return true;
        }
        return false;      
    }
    async insertComment(req, res)
    {
        if(!FormHelper.hasMissingFields(req, res)){
            const query = "INSERT INTO comments(user_id, message_id, comment) VALUES ($1, $2, $3)";
            const values = [req.session.current_user.id, req.body.message_id, req.body.comment_input];       
            await this.runQuery(query, values, res);
            return true;
        }
        return false;
    }
}

module.exports = new Wall();