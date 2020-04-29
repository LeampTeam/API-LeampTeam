'use strict'

var mongoose= require('mongoose')
var app=require('./app')
var port= 4000;

mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/almacenFrontEnd',
 {useNewUrlParser: true,useCreateIndex:true,useUnifiedTopology: true})
    .then(()=>{
        console.log('La conexion a la base de datos fue creada')
        app.listen(port,()=>{
            console.log('Servidor corriendo')
        })
    })
    .catch(err=>console.log(err));