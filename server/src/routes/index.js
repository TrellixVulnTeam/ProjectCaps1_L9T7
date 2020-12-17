const dealing = require('./utilUser')
const verification = require('./verification') 

function route(app){
   
   app.use('/verify-account',verification); 
    app.use('/',dealing);

}
module.exports = route;


