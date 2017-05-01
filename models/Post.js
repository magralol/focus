var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
	user: { 
        type: String, 
        required: true, 
        unique: false
    },
	body: { 
        type: String, 
        required: true, 
        unique: false
    },
    tags:[
        { 
            type : String 
        }
    ],
	date: { 
        type: String, 
        required: true, 
        unique: false
    }
});


module.exports = mongoose.model('post', postSchema);