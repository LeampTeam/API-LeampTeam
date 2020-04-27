'use strict'

var express=require('express')
var api=express.Router();
var carroCompra=require('../controller/carroCompra')
let md_auth=require('../middleware/authenticated')

api.post('/cargaProductos',md_auth.ensureAuth,carroCompra.comprarProductos)
api.get('/enviarArticulos',md_auth.ensureAuth,carroCompra.enviarArticulos)




module.exports=api