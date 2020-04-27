let jwt=require('jwt-simple');
let moment=require('moment')
let secret='Es un secreto en desarrollo'

exports.ensureAuth=function(req,res,next){

    if(!req.headers.authorization){
        return res.status(403).send({message:'no tiene cabecera'})
    }

    var token=req.headers.authorization.replace(/['"]+/g,'');
    let payload='';
    try{
        payload=jwt.decode(token,secret);

        if(payload.exp<=moment().unix()){
            return res.status(403).send({
                message:'el token a expirado'
            })
        }

    }catch(ex){
        return res.status(403).send({
            message:'el token no es valido'
        })
    }
    req.user=payload;
    next()
}