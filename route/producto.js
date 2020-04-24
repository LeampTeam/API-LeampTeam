'use strict'

var express=require('express')
var api=express.Router();
var producto=require('../controller/producto')
let md_auth=require('../middleware/authenticated')

api.get('/getProductos',md_auth.ensureAuth,producto.getproductos)
api.get('/getProducto/:id',producto.getproductoById)

api.get('/getImageFile/:img',producto.getImageFile );


module.exports=api