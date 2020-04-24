'use strict'

var express=require('express')
var api=express.Router();
var usuario=require('../controller/usuario')

api.post('/loguin',usuario.loguear)
api.post('/registrar',usuario.registrar)



module.exports=api