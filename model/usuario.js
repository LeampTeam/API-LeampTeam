var mongoose= require('mongoose');
var Schema =mongoose.Schema;


var UsuarioFrontSchema=Schema({
   
    name:String,
    surname:String,
    email:String,
    password:String,  
    articulos:[{ type: Schema.Types.ObjectId, ref: 'Articulo' }],
    role:String,
    crateAt:String,
    img:String,
    eliminado:Boolean

})



module.exports=mongoose.model('UsuarioFront',UsuarioFrontSchema)