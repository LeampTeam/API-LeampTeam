const bcrypt = require('bcryptjs');
const Usuario=require('../model/usuario')
let jwt=require('../servicio/jwt')

function registrar(req,res){
    let params=req.body;
    let usuario=new Usuario();

    if(params.email && params.password){
       
        usuario.name='';
        usuario.surname='';
        usuario.email=params.email;
        usuario.role='USUARIO';
        usuario.img=null;
        usuario.eliminado=false

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
}

function loguear(req,res){
    let params=req.body;

    let pass=params.password;
    let email=params.email;

    Usuario.findOne({email:email},function(err,user){
        if(err){res.status(500).send({message:'error en la peticion',err})}

        if(user){
            bcrypt.compare(pass,user.password,function(err,check){
                if(err){ return res.status(500).send({message:'error en la peticion',err})}

                if(check){
                    // if(params.gettoken){
                        return res.status(200).send({
                            token:jwt.createToken(user)
                        })
                    // }else{
                    //     user.password=undefined
                    //     return res.status(200).send({user})
                    
                   
                }else{
                     return res.status(404).send({message:'Error en el email o en la password'})
                }
            })
        }else{
            if(err){return res.status(404).send({message:'Error en el email o en la password'})}
        }
    })
}


module.exports={
registrar,
loguear

}