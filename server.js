const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const path = require('path');
const bodyParser = require('body-parser');

const HTTP_PORT = process.env.PORT || 8080;

const urlencodedParser = bodyParser.urlencoded({extended: false})

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
    res.render("home",{
        
       
    });
});

app.get("/login", function(req,res){
    res.render("login",{
        

    });
});

//LISTENING PORT

app.listen(HTTP_PORT, onHttpStart);
