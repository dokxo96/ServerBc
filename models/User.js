const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    firstname :{
        type : String,
        required : true,
        min : 1,
        max : 50
    },
    lastname :{
        type : String,
        required : true,
        min : 1,
        max : 50
    },
    username :{
        type : String,
        required : true,
        min : 6,
        max : 15
    },
    password : {
        type : String,
        required : true
    },
    phone : {
        type : String,
       
    },
    department :{
        type : String,
        min : 1,
        max : 50
    },
    job :{
        type : String,
       
        min : 1,
        max : 50
    },
    role : {
        type : String,
        enum : ['user','admin','SU'],
        
    },
    cert : [{type : mongoose.Schema.Types.ObjectId, ref: 'Cert'}]
});

UserSchema.pre('save',function(next){
    if(!this.isModified('password'))
        return next();
    bcrypt.hash(this.password,10,(err,passwordHash)=>{
        if(err)
            return next(err);
        this.password = passwordHash;
        next();
    });
});

UserSchema.methods.comparePassword = function(password,cb){
    bcrypt.compare(password,this.password,(err,isMatch)=>{
        if(err)
            return cb(err);
        else{
            if(!isMatch)
                return cb(null,isMatch);
            return cb(null,this);
        }
    });
}

module.exports = mongoose.model('User',UserSchema);
