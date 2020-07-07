const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    nombres :{
        type : String,
        required : true,
        min : 1,
        max : 50
    },
    apellidos :{
        type : String,
        required : true,
        min : 1,
        max : 50
    },
    telefono :{
        type : Number,
       

    },
    institucion :{
        type : String,
        
        min : 1,
        max : 50
    },
    carrera :{
        type : String,
        
        min : 1,
        max : 50
    },
    fecha_nac :{
        type : String,
        
    },
    fecha_egr:{
        type : String,
       
    },
    usuario :{
        type : String,
        required : true,
        min : 1,
        max : 50
    },
    contraseña : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum : ['user','admin'],
       
    },
    hash : {
        type : String,
        
    },
    
    cert : [{type : mongoose.Schema.Types.ObjectId, ref: 'Cert'}]
});

UserSchema.pre('save',function(next){
    if(!this.isModified('contraseña'))
        return next();
    bcrypt.hash(this.contraseña,10,(err,passwordHash)=>{
        if(err)
            return next(err);
        this.contraseña = passwordHash;
        next();
    });
});

UserSchema.methods.comparePassword = function(contraseña,cb){
    bcrypt.compare(contraseña,this.contraseña,(err,isMatch)=>{
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