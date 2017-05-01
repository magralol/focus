var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var filterSchema = new Schema({
	user: { 
        type: String, 
        required: true, 
        unique: false
    },
	name: { 
        type: String, 
        required: true, 
        unique: false
    },
    active: { 
        type: Boolean, 
        required: true, 
        unique: false
    },
    allawedtags:[
        { 
            type : String 
        }
    ]
});


module.exports = mongoose.model('filter', filterSchema);