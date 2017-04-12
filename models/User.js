var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var Schema = mongoose.Schema;

var userSchema = new Schema({
	username: { 
        type: String, 
        required: true, 
        unique: true
    },
	email: { 
        type: String, 
        required: true, 
        unique: true
    },
	password: { 
        type: String,
        required: true, 
        unique: false
    },
	defaultfilter: { 
        type: String,
        required: true, 
        unique: false
    }
});


userSchema.statics.generateHash = function(pw) {
    return bcrypt.hashSync(pw, bcrypt.genSaltSync(10));
}

userSchema.statics.validatePassword = function(pw, toCompair) {
     return {pw: pw, toCompair: toCompair};    
    //return bcrypt.compareSync(pw, toCompair);
}

module.exports = mongoose.model('user', userSchema);