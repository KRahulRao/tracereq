
// Module imports for dependencies 
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var request = require('request');
var fs = require("fs");
var mongoose = require("mongoose");

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();


mongoose.Promise =Promise;

mongoose.connect('mongodb://localahost/tracereq',function(err,data){
   if(err)
      console.log("DB  could not connected........");
   else
      console.log("DB connected.........");    
});

app.get('/exp',function(req,res){
res.sendFile(path.resolve('./main.html'));  
});


  var reqLog = [];
  app.get('/tracereq',function(req,res){


 // var a = req.headers['X-Forwarded-For'] || req.connection.remoteAddress || req.socket.remoteAddress|| req.connection.socket.remoteAddress;
 //  var a = req.ips;
   var a = "182.156.75.82";
  console.log("Connetion from ------>" , a);
  res.status(200).send("Received the request");
   
   var options = {
     host:'freegeoip.net',
     path:'/json/'+ a,
     method:'GET'
       };
     console.log("Request url is ----> ", options.path);  
      var req = http.request(options,function(res){
      var body = "";
      res.on('data',function(data){
        body+=data;
        console.log(body);
        reqLog.push(JSON.stringify(body));
        //res.send("Received data.....");
      });
      res.on('end',function(){
        //var finalres = JSON.parse(body);
        console.log('End of Response....')

      });

      console.log("Final Response----->");
    });
    req.end();
    req.on('error', function(e) {
        console.log('Problem with request: ' + e.message);
    });   
});

app.get('/showLog',function(req,res){
  res.send(JSON.stringify(reqLog));
});
app.listen(3000,'127.0.0.1',function(){
  console.log("Just a Test");
});
