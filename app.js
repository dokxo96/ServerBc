const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
var cors = require('cors');

app.use(cookieParser());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mernauth',{useNewUrlParser : true,useUnifiedTopology: true},()=>{
    console.log('successfully connected to database');
});
const User = require('./models/User');

const SuperUser ={
    firstname:"SU",
    lastname:" ",
    username:"SUser",
    password:"1234",
    role:"SU"
}
const username="SUser";
 User.findOne({ username},(err,user)=>{
        if(err)
            console.log("Error has occured");
        if(user)
            console.log("Superuser is already created");
        else{
            const newUser = new User(SuperUser);
            newUser.save(err=>{
                if(err)
                    console.log("Error has occured");
                else
                    console.log("Superuser has been created");
            });
        }
    });

app.use(cors());
const userRouter = require('./routes/User');
app.use('/user',userRouter);

app.listen(5000,()=>{
    console.log('express server started');
});