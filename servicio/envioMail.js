var nodemailer = require('nodemailer'); 



exports.sendEmail = function(){
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'example@gmail.com',
            pass: 'password'
        }
    });
    var mailOptions = {
        from: 'Remitente',
        to: 'destinatario@gmail.com',
        subject: 'Asunto',
        text: 'Contenido del email'
 };
 transporter.sendMail(mailOptions, function(error, info){
    if (error){
        console.log(error);
        res.status(500).send( err.message);
    } else {
        console.log("Email sent");
        res.status(200).send('Email sent');
    }
});
};