const Usuario=require('../model/usuario');
const Articulo=require('../model/articulo')
var Producto= require('../model/producto');
var Marca=require('../model/marca')
var Categoria=require('../model/categoria')
var Fragancia=require('../model/fragancia')

    function enviarArticulos(req,res){
        let id=req.user.sub
        Usuario.findById(id,function(err,user){
            return res.status(200).send(user.articulos)
        }).populate('articulos')
    }

    async function comprarProductos(req,res){

    let user=req.user
    let producto=req.body
    console.log(producto)
    let prod= await Producto.findById(producto.id)
    let articulo=new Articulo();
        
    console.log("producto",prod)
    
    let usuario= await Usuario.findById(user.sub).populate('articulos')
    console.log('usuario',usuario)
    let articulosUsuario=usuario.articulos;
        if(articulosUsuario!=null && articulosUsuario.length >0 ){
            await articulosUsuario.forEach(element => {
                console.log(element)
                if(element.code==prod.code){
                    return res.status(200).send({message:'Este articulo fue cargado'})
                }else{
                    articulo.name=prod.name;
                    articulo.description=prod.description;
                    articulo.price=prod.price;
                    articulo.code=prod.code
                    articulo.marca=prod.marca.name;
                    articulo.categoria=prod.categoria.name;
                    articulo.fragancia=prod.fragancia!=null?prod.fragancia.name:"";
                    articulo.cantidad=producto.cantidad;
                    articulo.eliminado=false
                    articulo.save(async function(err,art){
                        console.log("array id",art)
                        let usurio= await Usuario.findById(user.sub)
                        usurio.articulos.push(art)
                        await usurio.save();
                        return res.status(200).send({ok:'ok'})
                        })
                }
            });
        }else{
        articulo.name=prod.name;
        articulo.description=prod.description;
        articulo.price=prod.price;
        articulo.code=prod.code
        articulo.marca=prod.marca.name;
        articulo.categoria=prod.categoria.name;
        articulo.fragancia=prod.fragancia!=null?prod.fragancia.name:"";
        articulo.cantidad=producto.cantidad;
        articulo.eliminado=false
        articulo.save(async function(err,art){
            console.log("array id",art)
            let usurio= await Usuario.findById(user.sub)
            usurio.articulos.push(art)
            await usurio.save();
            return res.status(200).send({ok:'ok'})
            })
        }
        
    }

    function confirmarCompra(req,res){
        let user=req.user
        Usuario.findById(user.sub).populate('articulos').exec(function(err,user){
            //Generar pdf
            //mandar mail con el pdf
            //eliminar Articulos del array
            //mandar a un historial
        })
    }
    
module.exports={
    comprarProductos,
    enviarArticulos,
    confirmarCompra

    
    }
   
    //  Usuario.findById(user.sub,function(err,userFront){
    //         if(err) return res.status(500).send({message:'Error en el servidor'})


    //  })

    // let productos=[{id:"5e9878a39afac124e4f5e259",cantidad:2}]


    
    // console.log(productos)
    // console.log(user)
    //     devolverId(productos).then(async ids=>{
    //         console.log("array id",ids)
    //         let usurio= Usuario.findById(user.sub)
    //         usurio.articulos.push(ids)
    //         await usurio.save();
    //         await res.redirect('/shop/enviarArticulos')
    //     })


// async function devolverId(productos){
//     let articuloId=null;
   
//        await guardarArticulos(productos.id,productos.cantidad)
//         .then(articulo=>{
//             console.log("articulo id",articulo)
//             articuloId=articulo
//         })

   
//     return articuloId;
// }

// async function guardarArticulos(productoId,cantidad){
//         console.log(productoId)
//         console.log(cantidad)
       
//         let articulo=new Articulo();
        
//         console.log("producto",prod)
//         articulo.name=prod.name;
//         articulo.description=prod.description;
//         articulo.price=prod.price;
//         articulo.code=prod.code
//         articulo.marca=prod.marca.name;
//         articulo.categoria=prod.categoria.name;
//         articulo.fragancia=prod.fragancia!=null?prod.fragancia.name:"";
//         articulo.cantidad=cantidad;
//         articulo.eliminado=false
            
//         let art= 
//         console.log("articulo",art)
//         return art
// }


