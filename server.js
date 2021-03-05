const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const path = require('path');
const bodyParser = require('body-parser');
const patientDatabase = require('./HealthData');
const clincianDatabase = require('./Clinicians');

var currentClinician;
var isClinician = false;

const HTTP_PORT = process.env.PORT || 8080;

const urlencodedParser = bodyParser.urlencoded({extended: true})
app.use(bodyParser.json())

app.use(express.static("./public/"));

function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
  }

  app.set('views',path.join(__dirname,'views'));

  app.engine('handlebars', exphbs({ 
    
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials'
}));

app.set('view engine', 'handlebars')

//Routes
app.get("/", function(req,res){
     if(isClinician){
    res.render("home",{
       
            HealthInfo: patientDatabase,
            Clinician: currentClinician,
            isClinician: true
   
    });
}else{
    res.render("home",{

    })
}
    
});


app.get("/login", function(req,res){
  
    res.render("login");
      
});

app.post('/login', urlencodedParser, function (req, res) {
    res.render('login', ()=>{
        for(let i = 0;i < clincianDatabase.length;i++){
        if(clincianDatabase[i].password === req.body.pwd && clincianDatabase[i].username === req.body.userID){
            currentClinician = clincianDatabase[i].name;
            isClinician = true;
            res.redirect('/')
            
            
        }else if(clincianDatabase[i].password === req.body.pwd || clincianDatabase[i].username === req.body.userID){
            isClinician = false;
            res.redirect('/')
        }else{
            isClinician = false;
            res.redirect('/')
        }
    }
       

    });

    
   
}

);


//LISTENING PORT

app.listen(HTTP_PORT, onHttpStart);
