var Producto= require('../model/producto');
var fs = require('fs');
var path = require('path');

function getproductos(req,res){
    Producto.find({eliminado: { $ne: true }},
    '_id name description price code stock img categoria marca fragancia ')
        .exec((err,producto)=>{
            console.log(err)
            console.log(producto)
            let productosVista=[]
           for(let i=0;i<producto.length;i++){
               produ={
                   id:producto[i].id,
                   name:producto[i].name,
                   description:producto[i].description,
                   code:producto[i].code,
                   price:producto[i].price,
                   fragancia:producto[i].fragancia,
                   categoria:producto[i].categoria,
                   marca:producto[i].marca,
                   img:"http://127.0.0.1:4000/producto/getImageFile/"+producto[i].img

               }
               productosVista.push(produ)
           }
            res.send(
                productosVista
               
            )  
        })
}

function getproductoById(req,res){
    let idEdit=req.params.id
    console.log(idEdit)
    Producto.findById(idEdit,function(err,producto){
        produ={
            id:producto._id,
            name:producto.name,
            description:producto.description,
            code:producto.code,
            price:producto.price,
            fragancia:producto.fragancia,
            categoria:producto.categoria,
            marca:producto.marca,
            img:"http://127.0.0.1:4000/producto/getImageFile/"+producto.img

        }
        res.send(
            produ
        );
    })
}

function uploadImage(req, res) {
    console.log(req.body.productId)
    var productid = req.body.productId
    if (req.files) {
        var file_path = req.files.image.path;
        console.log(file_path)
        var file_split = file_path.split('/');
        console.log(file_split)
        var file_name = file_split[2];
        console.log(file_name)
        var ext_split = file_name.split('.');
        console.log(ext_split)
        var file_ext = ext_split[1]

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif') {
            Producto.findByIdAndUpdate(productid, { img: file_name }, { new: true }, (err, productUpdated) => {
                if (err) return res.status(500).send({ message: 'Erro en la peticion' })

                if (!productUpdated) return res.status(404).send({ message: 'No se ha podido Actualizar' })

                return res.redirect('/producto/grilla')
            })
        } else {
            removeFilesOfUploads(res, file_path, 'La extencion no es valida')

        }
    } else {
        return res.status(200).send({ message: 'No se han subido archivos' })
    }
}

function getImageFile(req, res) {
    var imageFile = req.params.img;
    console.log(imageFile)
    var pathFile = './imagenes/producto/' + imageFile

    fs.exists(pathFile, (exists) => {
        if (exists) {
            res.sendFile(path.resolve(pathFile))
        } else {
            res.status(400).send({ message: 'El archivo no fue encotrado' })
        }
    })
}
function removeFilesOfUploads(res, file_path, message) {
    fs.unlink(file_path, (err) => {
        return res.status(200).send({ message: message })
    })
}

module.exports={
    
    getproductos,
    getproductoById,
    uploadImage,
    getImageFile
  

}