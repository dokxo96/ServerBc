const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');
const User = require('../models/User');
const Todo = require('../models/Todo');
const Cert = require('../models/Cert');
const CertPendiente = require('../models/CertPendiente');

const signToken = userID =>{
    return JWT.sign({
        iss : "NoobCoder",
        sub : userID
    },"NoobCoder",{expiresIn : "1h"});
}

//registrar usuario comun
userRouter.post('/register',(req,res)=>{
    const { firstname,lastname,username,password,role } = req.body;
    User.findOne({username},(err,user)=>{
        if(err)
            res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
        if(user)
            res.status(400).json({message : {msgBody : "Username is already taken", msgError: true}});
        else{
            const newUser = new User({firstname,lastname,username,password,role});
            newUser.save(err=>{
                if(err)
                    res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
                else
                    res.status(201).json({message : {msgBody : "Account successfully created", msgError: false}});
            });
        }
    });
});
//registrar Administrador
userRouter.post('/registerAdmins',(req,res)=>{
    const { firstname,lastname,username,password,phone,department,job,role } = req.body;
    User.findOne({username},(err,user)=>{
        if(err)
            res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
        if(user)
            res.status(400).json({message : {msgBody : "Admin Username is already taken", msgError: true}});
        else{
            const newUser = new User({ firstname,lastname,username,password,phone,department,job,role });
            newUser.save(err=>{
                if(err)
                    res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
                else
                    res.status(201).json({message : {msgBody : "Admin account successfully created", msgError: false}});
            });
        }
    });
});
//insertar un usuario 
userRouter.post('/certregister',(req,res)=>{
    const { firstname,lastname,username,password,phone,institution,carrer,finish,role } = req.body;
    User.findOne({username},(err,user)=>{
        if(err)
            res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
        if(user)
            res.status(400).json({message : {msgBody : "Username is already taken", msgError: true}});
        else{
            const newUser = new User({firstname,lastname,username,password,phone,institution,carrer,finish,role  });
            newUser.save(err=>{
                if(err)
                    res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
                else
                    res.status(201).json({message : {msgBody : "Cert successfully created", msgError: false}});
            });
        }
    });
});
// READ Students

userRouter.route('/get-student').get((req, res) => {
    User.find({role:"user"},(error, data) => {
      if (error) {
        return error
      } else {
        res.json(data)
      }
    })
  });
  userRouter.route('/get-student/:id').get((req, res) => {
    User.findById(req.params.id,(error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  });
  //delete student
  userRouter.route('/delete-student/:id').delete((req, res, next) => {
    User.findByIdAndRemove(req.params.id, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({
          msg: data
        })
      }
    })
  });
  //get student by id
  userRouter.route('/edit-student/:id').get((req, res) => {
    User.findById(req.params.id, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })
  
  //update an student by id
  userRouter.route('/update-student/:id').put((req, res, next) => {
    User.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, (error, data) => {
      if (error) {
        return next(error);
        console.log(error)
      } else {
       // res.json(data)
        res.json({message : {msgBody : "Student updated successfully !", msgError : false}});
        console.log('Student updated successfully !')
      }
    })
  })

  //logearse
userRouter.post('/login',passport.authenticate('local',{session : false}),(req,res)=>{
    if(req.isAuthenticated()){
       const {_id,username,role} = req.user;
       const token = signToken(_id);
       res.cookie('access_token',token,{httpOnly: true, sameSite:true}); 
       res.status(200).json({isAuthenticated : true,user : {username,role}});
    }
});
userRouter.get('/logout',passport.authenticate('jwt',{session : false}),(req,res)=>{
    res.clearCookie('access_token');
    res.json({user:{username : "", role : ""},success : true});
});

userRouter.post('/cert/:id',passport.authenticate('jwt',{session : false}),(req,res)=>{
    const cert = new Cert(req.body);
    cert.save(err=>{
        if(err)
            res.status(500).json({message : {msgBody : "Error has occured1", msgError: true}});
        else{
        
            User.findById(req.params.id, (error, data) => {
              if (error) {
                return next(error)
              } else {
                data.cert.push(cert);
                data.save(err=>{
                if(err){}
                //  res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
                else{console.log("dfgfg")}
                 //   res.status(200).json({message : {msgBody : "The hash have been saved", msgError : false}});
            });
                //res.json(data)
              
              }
            })
          
           // console.log(req.user,req.params.id)
            //req.user.cert.push(cert);
            //req.user.save(err=>{
             //   if(err)
              //      res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
              //  else
              //7/      res.status(200).json({message : {msgBody : "The hash have been saved", msgError : false}});
            //});
        }
    })
});
 userRouter.route('/update-student/:id').put((req, res, next) => {
    User.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, (error, data) => {
      if (error) {
        return next(error);
        console.log(error)
      } else {
       // res.json(data)
        res.json({message : {msgBody : "Student updated successfully !", msgError : false}});
        console.log('Student updated successfully !')
      }
    })
  })
userRouter.get('/cert',passport.authenticate('jwt',{session : false}),(req,res)=>{
    User.findById({_id : req.user._id}).populate('cert').exec((err,document)=>{
        if(err)
            res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
        else{
            res.status(200).json({cert : document.cert, authenticated : true});
        }
    });
});

userRouter.get('/students',passport.authenticate('jwt',{session : false}),(req,res)=>{
    User.find({role:"user"}).exec((err,document)=>{
        if(err)
        return next(error)
         //   res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
        else{
            res.json(document)
            //res.status(200).json(document);
        }
    });
});

userRouter.get('/admin',passport.authenticate('jwt',{session : false}),(req,res)=>{
    if(req.user.role === 'admin'){
        res.status(200).json({message : {msgBody : 'You are an admin', msgError : false}});
    }
    else
        res.status(403).json({message : {msgBody : "You're not an admin,go away", msgError : true}});
});

userRouter.get('/authenticated',passport.authenticate('jwt',{session : false}),(req,res)=>{
    const {username,role} = req.user;
    res.status(200).json({isAuthenticated : true, user : {username,role}});
});

//registrar solicitud de estampado de certificado
userRouter.post('/solCert', (req, res)=>{
    const { title, file } = req.body;
    CertPendiente.findOne({file}, (err, reg)=>{
        if(err)
            res.status(500).json({message: {msgBody: "Error has occured", msgError: true}});
        if(reg)
            res.status(400).json({message: {msgBody: "This file is already received", msgError: true}});
        else{
            const newCert = new CertPendiente({ title, file });
            newCert.save(err=>{
                if(err)
                    res.status(500).json({message: {msgBody: "Error has occured", msgError: true}});
                else
                    res.status(201).json({message: {msgBody: "Request successfully created", msgError: false}});
            });
        }
    });
});

userRouter.get('/get-solCert',passport.authenticate('jwt',{session : false}),(req,res)=>{
    CertPendiente.find({}).exec((err,document)=>{
        if(err){
            return next(error)
        }
        else{
            res.json(document)
        }
    });
});


module.exports = userRouter;
