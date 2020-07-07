const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
app.use(cookieParser());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/sddsdsd',{useNewUrlParser : true,useUnifiedTopology: true},()=>{
    console.log('successfully connected to database');
});

const userRouter = require('./routes/User');
app.use('/user',userRouter);

/*const User =require('./models/User');

const inputsUser ={
    nombres:" ",
    apellidos:"  ",
    telefono:"  ",
    institucion:"  ",
    carrera:"  ",
    fecha_nac:"  ",
    fecha_egr:" ",
    usuario:"dokso",
    contraseña:"2134",
    role:"admin",
    hash:" "
}

const user = new User (inputsUser);
user.save((err,document)=>{
    if(err)
        console.log(err)
    console.log(document)
});*/

app.listen(5000,()=>{
    console.log('express server started');
});