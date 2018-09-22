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
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.listen(process.env.PORT || 4201);

app.post("/application", function (req, res) {

    console.log("BODY: ", req.body);

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'cinder.and.ash.guild@gmail.com', // Your email id
            pass: 'B@t713F0rC1nd3r!' // Your password
        }
    });

    var mailOptions = {
        from: 'cinder.and.ash.guild@gmail.com', // sender address
        to: 'cinder.and.ash.guild@gmail.com', // list of receivers
        // to:'rbelldev@gmail.com',
        subject: 'Raider Application', // Subject line
        text: JSON.stringify(req.body) //, // plaintext body
        // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
    };

    // res.send(200);

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.send(500);
        } else {
            console.log('Message sent: ' + info.response);
            res.send(200);
        }
        ;
    });
});

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    //intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
        //respond with 200
        res.send(200);
    }
    else {
        //move on
        next();
    }
});

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);

    res.send();
});

module.exports = app;
