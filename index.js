//express
var express=require('express');

//include datamanager
var dataManager=require('./moduli/datamanager.js');
dataManager.initEmp();

//init express
var app=express();

//for templates
var bind = require('bind');

//for URL
var url = require('url');

//POST
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

//listen in a specific port
app.set('port', (process.env.PORT || 1337));

//mount middlewear (allow to show static files)
app.use('/css',express.static(__dirname+'/css'));
app.use('/fonts',express.static(__dirname+'/fonts'));
app.use('/js',express.static(__dirname+'/js'));



app.get('/',function (req,res) {
    bind.toFile('tpl/home.tpl',{
        //first time empty
        hide:true
    },
    function (data)
    {
        //write response
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
    });
});

app.post('/insert',function (req,res) {
    if(typeof req.body!='undefined' && req.body){
        var mess;
        if(dataManager.insert(req.body.id,req.body.name,req.body.surname,req.body.level,req.body.salary)==1){
            mess="Satato Operazione: Ok";
        }
        else
            mess="Error: Some Input values are not Int !!";

        bind.toFile('tpl/home.tpl', 
        {
            //set up parameters
            msg:mess
        }, 
        function(data) 
        {
            //write response
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        });
    }
    else
        console.log("vuoto");
})

//router find
app.get('/find',function (req,res) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    var index=dataManager.find(parseInt(req.query.searchId));
    if(index>=0){
        //trovato
        emp=dataManager.getEmployeeByIndex(index);
        bind.toFile('tpl/home.tpl', 
        {
            //set up parameters
            id: emp.id,
            name: emp.name,
            surname : emp.surname,
            level:emp.level,
            salary:emp.salary,
            hide: false,
            msg:"Trovato!!"
        }, 
        function(data) 
        {
            //write response
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        });
    }
    else{
        //non ho trovato
        bind.toFile('tpl/home.tpl', 
        {
            //set up parameters
            msg:"Non ho trovato nulla!!",
            hide:true
        }, 
        function(data) 
        {
            //write response
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        });
    }
});

//router delete
app.get('/delete',function (req,res) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    var index=dataManager.find(parseInt(req.query.searchId));
    var mess;
    if(index>=0){
        //trovato
        //adesso elimino
        dataManager.deleteElem(index);
        mess="Eliminato !!!";
    }
    else{
        //non ho trovato
       mess="Non ho trovato elemento da elininare!!!";
    }
     bind.toFile('tpl/home.tpl', 
    {
        //set up parameters
        msg:mess,
        hide:true
    }, 
    function(data) 
    {
        //write response
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
    });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

