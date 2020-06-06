'use strict'

var express=require('express')
var api=express.Router();
var usuario=require('../controller/usuario')
var multipart=require('connect-multiparty')
var md_upload = multipart({uploadDir:'./imagenes/usuarios'})
let md_auth=require('../middleware/authenticated')

api.post('/loguin',usuario.loguear)

api.post('/cargarImagen',md_auth.ensureAuth,md_upload,usuario.uploadImage)
api.get('/obtenerImagen/:img',usuario.getImageFile)




module.exports=api