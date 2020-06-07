const bcrypt = require('bcryptjs');
const Usuario=require('../model/usuario')
let jwt=require('../servicio/jwt')
var path = require('path');
var fs = require('fs');

// function registrar(req,res){
//     let params=req.body;
//     let usuario=new Usuario();

//     if(params.email && params.password){
       
//         usuario.name='';
//         usuario.surname='';
//         usuario.email=params.email;
//         usuario.role='USUARIO';
//         usuario.img=null;
//         usuario.eliminado=false

//         Usuario.find({email:usuario.email}).exec(function(err,users){
//                 if(err){return res.status(500).send({message:'error en la peticion'})}

//                 if(users && users.length>=1){
//                     return res.status(200).send({message:'el usario ya existe'})
//                 }else{
//                     bcrypt.genSalt(10, function(err, salt) {
//                         bcrypt.hash(params.password,salt,function(err,hash){
//                             usuario.password=hash
            
//                             usuario.save((err,usuarioguardado)=>{
//                                 if(err) return res.status(500).send({
//                                     message:'error al guardar el usuario',
//                                     err
//                                 })
//                                 if(usuarioguardado){
//                                     res.status(200).send({usuario:usuarioguardado})
//                                 }else{
//                                     res.status(404).send({message:'No se registro el usario'})
//                                 }
//                             })
//                         })
//                     })
//                 }
//         })
       

//     }else{
//         res.status(200).send({
//             message:'El usuario no fue registrado'
//         })
//     }
// }

function loguear(req,res){
    let params=req.body;

    let pass=params.password;
    let email=params.email;
    let tipo=params.tipo

    switch(tipo){
        case "login":
   
            Usuario.findOne({email:email},function(err,user){
                if(err){res.status(500).send({message:'error en la peticion',err})}

                if(user){
                    bcrypt.compare(pass,user.password,function(err,check){
                        if(err){ return res.status(500).send({message:'error en la peticion',err})}

                        if(check){
                            // if(params.gettoken){
                                return res.status(200).send({
                                    token:jwt.createToken(user),img:user.img,email:user.email
                                })
                            // }else{
                            //     user.password=undefined
                            //     return res.status(200).send({user})
                            
                        
                        }else{
                            return res.status(200).send({message:'Errorr en el email o en la password'})
                        }
                    })
                }else{
                    if(err){return res.status(200).send({message:'Error en el email o en la password'})}
                }
            })
        break;
        case "registrar":
            let params=req.body;
            let usuario=new Usuario();
        
            if(params.email && params.password){
            
                usuario.name='';
                usuario.surname='';
                usuario.email=params.email;
                usuario.role='USUARIO';
                usuario.img=null;
                usuario.eliminado=false;
                usuario.artiuclos=null;
        
                Usuario.find({email:usuario.email}).exec(function(err,users){
                        if(err){return res.status(500).send({message:'error en la peticion'})}
        
                        if(users && users.length>=1){
                            return res.status(200).send({message:'el usario ya existe'})
                        }else{
                            bcrypt.genSalt(10, function(err, salt) {
                                bcrypt.hash(params.password,salt,function(err,hash){
                                    usuario.password=hash
                    
                                    usuario.save((err,usuarioguardado)=>{
                                        if(err) return res.status(500).send({
                                            message:'error al guardar el usuario',
                                            err
                                        })
                                        if(usuarioguardado){
                                            res.status(200).send({usuario:usuarioguardado})
                                        }else{
                                            res.status(404).send({message:'No se registro el usario'})
                                        }
                                    })
                                })
                            })
                        }
                })
            
        
            }else{
                res.status(200).send({
                    message:'El usuario no fue registrado'
                })
            }
        break;
    }
}
function uploadImage(req, res) {
    
    let user=req.user

    if (req.files) {
        var file_path = req.files.file.path;
        console.log(file_path)
        var file_split = file_path.split('/');
        console.log(file_split)
        var file_name = file_split[2];
        console.log(file_name)
        var ext_split = file_name.split('.');
        console.log(ext_split)
        var file_ext = ext_split[1]

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif') {
            Usuario.findById(user.sub,(err,usu)=>{
                if(usu.img!=null){
                    fs.unlinkSync('./imagenes/usuarios/'+usu.img)
                }
               
            })
           
            Usuario.findByIdAndUpdate(user.sub, { img: file_name }, { new: true }, (err, usuarioUpdate) => {
                if (err) return res.status(500).send({ message: 'Error en la peticion' })

                if (!usuarioUpdate) return res.status(404).send({ message: 'No se ha podido Actualizar' })

                return res.status(200).send({mensaje:'ok',img:usuarioUpdate.img})
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
    var pathFile = './imagenes/usuarios/' + imageFile

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

loguear,
getImageFile,
uploadImage

}