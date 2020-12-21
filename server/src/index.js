const express = require('express');
const app = express();
const path = require('path')
const morgan = require('morgan')
const routes = require('./routes/index.js')
const ejs = require('ejs');
const db = require('./config/Connect Database')
db.connect();
app.use(express.static('public'))
app.use(morgan('combined'));
app.use(express.urlencoded({
	extended: true
}));
app.use(express.json());
app.set("view engine","ejs")
app.set('views',path.join(__dirname,'view'))
app.get('/',(req,res)=>{
    var lnk= [1,2,3];
    res.render("pages/index",{lnk})
});
routes(app);


var server = require('http').Server(app)
server.listen(3000,()=>{console.log("Listenning at port 3000");})



