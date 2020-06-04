var pdf = require('html-pdf');
exports.Pdf=function(contenido){
    var options = {
        "format": 'A4',
        "header": {
            "height": "60px"
        },
        "footer": {
            "height": "22mm"
        },
        "base": 'file://Users/midesweb/carpeta_base/'
       };
    
    pdf.create(contenido,options).toFile('./salida.pdf', function(err, res) {
        if (err){
            console.log(err);
        } else {
            console.log(res);
        }
    });

    
}
