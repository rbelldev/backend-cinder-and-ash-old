var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

// var index = require('./routes/index');
// app.use('/', index);

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.listen(process.env.PORT || 4201);

app.post("/application", function (req, res) {

    console.log("BODY: ", req.body);

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'cinder.and.ash.guild@gmail.com', // Your email id
            pass: 'C1nd3r@nd@$h3!1482' // Your password
        }
    });

    var mailOptions = {
        from: 'cinder.and.ash.guild@gmail.com', // sender address
        // to: 'cinder.and.ash.guild@gmail.com', // list of receivers
        to:'rbelldev@gmail.com',
        subject: 'Test From Knute', // Subject line
        text: "Test Message From Knute sent by the web application!" //, // plaintext body
        // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
    };

    // transporter.sendMail(mailOptions, function(error, info){
    //     if(error){
    //         console.log(error);
    //         res.json({yo: 'error'});
    //     }else{
    //         console.log('Message sent: ' + info.response);
    //         res.json({yo: info.response});
    //     };
    // });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
