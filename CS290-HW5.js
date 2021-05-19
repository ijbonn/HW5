var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 4492);

app.get('/',function(req,res){
  var qParams = [];
  for (var p in req.query){
    qParams.push({'name':p,'value':req.query[p]})
  }
  var context = {};
  context.reqType = 'GET';
  context.queryList = qParams;
  res.render('home', context);
});

app.post('/', function(req,res){
  var bParams = [];
  for (var b in req.body){
    bParams.push({'name':b,'value':req.body[b]})
  }
  var bcontext = {};
  context.reqType = 'POST';
  context.bodyList = bParams;
  
  var qParams = [];
  for (var p in req.query){
    qParams.push({'name':p,'value':req.query[p]})
  }
  context.queryList = qParams;
  
  res.render('home', context);
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
