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


//router di default
app.get('/',function (req,res) {
    bind.toFile('tpl/home.tpl',{
        //invia a template con il parametro di visualizzazione form
        hide:true
    },
    function (data)
    {
        //write response
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
    });
});

//router per insert, nel body post riceve i parametri di un employee da inserire
app.post('/insert',function (req,res) {
    if(typeof req.body!='undefined' && req.body){
        var mess;
       //provo a inserire unsando la funzione insert del dataManager
        if(dataManager.insert(req.body.id,req.body.name,req.body.surname,req.body.level,req.body.salary)==1){
            //ho inserito, alla varibile mess scrivo un messaggio di successo
            mess="Inserito con successo !!!";
        }
        else{
            //non ho inserito, alla varibile mess scrivo un messaggio di errore
            mess="Error: Some Input values are not Int !!";
        }
        //invio al template home.tpl con il parametro messaggio da visualizzare
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

//router find; cerca un employee
app.get('/find',function (req,res) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    var index=dataManager.find(parseInt(req.query.searchId));
    if(index>=0){
        //trovato, allora invio al template le info del emplyee trovato
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
        //non ho trovato, invio solo un messaggio e dico di tenere il form insert nascosto
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

//router delete: elimina un employee
app.get('/delete',function (req,res) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    var index=dataManager.find(parseInt(req.query.searchId));
    var mess;
    if(index>=0){
        //trovato un employee che ha quel id
        //adesso elimino e fisso un messaggio di successo
        dataManager.deleteElem(index);
        mess="Eliminato !!!";
    }
    else{
        //non ho trovato, fisso un messaggio di errore
       mess="Non ho trovato elemento da elininare!!!";
    }
    //invio al template il risultato del delete, e nascondo insert form
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

//avvio il server
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

