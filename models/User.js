var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

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
    }
});


userSchema.statics.generateHash = function(pw) {
    return bcrypt.hashSync(pw, bcrypt.genSaltSync(10));
}

userSchema.statics.validatePassword = function(pw, toCompair) {   
    return bcrypt.compareSync(toCompair, pw);
}

module.exports = mongoose.model('user', userSchema);