var mongoose= require('mongoose');
var Schema =mongoose.Schema;


var ProducSchema=Schema({
   
    name:String,
    description:String,
    price:Number,
    code:String,  
    stock:Number,
    crateAt:String,
    marca:String,
    img:String,
    esFragancia:Boolean,
    categoria:String,
    fragancia:String,
    eliminado:Boolean

})



module.exports=mongoose.model('Producto',ProducSchema)