const model = require('../model/userUtil')
const amapp =  require('../model/firebaseConfig')
const express = require('express')
const app = express();
/* const ls = require('local-storage'); */
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');
var nodemailer = require("nodemailer");


class MessErrorLogin{
    constructor() {
        this.msg ="Test msg"
        this.msgRegister="Test msg"
        this.msgCode ="Test msg"
    }
    getMsg(){
        return this.msg
    }
    setMsg(newMsg){
        this.msg = newMsg
    }
}
class MessErrorRegister{
    constructor() {
        this.msg ="Test msg"
        this.msgRegister="Test msg"
        this.msgCode ="Test msg"
    }
    getMsg(){
        return this.msg
    }
    setMsg(newMsg){
        this.msg = newMsg
    }
}

class MessErrorVerification { 
    constructor() {
        this.msg ="Test msg"
        this.msgRegister="Test msg"
        this.msgCode ="Test msg"
    }
    getMsg(){
        return this.msg
    }
    setMsg(newMsg){
        this.msg = newMsg
    }
}
   var msgLogin = new MessErrorLogin;
   var msgRegister = new MessErrorRegister;
   var msgVerify = new MessErrorVerification;

class UtilUserController{
    
    login(req,res,next){

        model.findOne({email:req.body.email,password:req.body.password})
        .then(user=>{ 
            if(user){
                const userid = user.email
            if(user.status){
                res.render('pages/homePage');      
            }
            else{
                var msg="This account has not been verified! Please"+ "<a href='/verify-account/?user="+userid+"'>verify-account</a> to continue"
                msgLogin.setMsg(msg)
                res.redirect('back');
                }
            }
            else{
                msgLogin.setMsg("Incorrect email or password!")
                    
                var database = amapp.database().ref().child('InfomationCenter/yym15naI10VGGoK94hR1Pa7eFX52/')
              
                    database.on('value', (dataSnapshot)=> {
                        console.log("often")
                        console.log(dataSnapshot.val())
                        var a = dataSnapshot.val().center_id;
                        localStorage.setItem("user_ID","dsfddddddhsd,sa")
                        console.log(a)
                        localStorage.setItem('myFirstKey', 'myFirstValue');
                        console.log(localStorage.getItem('myFirstKey'));
                      /*   ls.set('baz', 'tar');
                        ls.get('baz'); */
                      })
             
                console.log("Sometimes")    
                res.redirect('back');
              
            }})
        .catch(next)       
    }
    register(req,res,next){
        var userEmail = req.body.email
        model.findOne({email:userEmail})
        .then(user=>{
            if(user){
                if(user.email==userEmail){
                    msgRegister.setMsg("This account is already registered")
                    res.redirect('back');   
                }
            }
            else{
                var object = req.body
                 const user = new model(object)
                 user.save(err=>{
                if(!err){   
                    var rand,mailOptions,host,link; 
                    var smtpTransport = nodemailer.createTransport({
                        service: "Gmail",
                        auth: {
                            user: "ductaidn99@gmail.com",
                            pass: "ductai123456"
                        }
                    });
                    rand=Math.floor((Math.random() * 100) + 54);
                    host=req.get('host');
                    link="http://"+req.get('host')+"/verify-account/user/?user="+userEmail+"&&id=123456";
                    mailOptions={
                        to : "h33784848@gmail.com",
                        subject : "Sendmail",
                        html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
                    }
                    console.log(mailOptions);
                    smtpTransport.sendMail(mailOptions, function(error, response){
                     if(error){
                            console.log(error);
                        res.end("error");
                     }else{
                            console.log("Message sent: " + response.message);
                        res.end("sent");
                         }
                });
                  
                  
                    var url ="verify-account/?user="+userEmail
                    res.redirect(url)
                }
                else{
                    msgRegister.setMsg("Có lỗi đã xảy ra, vui long thử lại")
                    res.redirect('back');   
                }
            })}
            

        }) .catch(next)
       }

    verify(req,res){
        res.render('pages/verify-account',{
            msg: msgVerify.getMsg()
        })
    }
    verifyaccount(req,res,next){
        if(req.query.id && req.query.user)
        {
            var codeId = req.query.id 
            var userId = req.query.user
            console.log("id của người dùng là K "+userId);
            model.findOne({email:userId})
            .then((user)=>{
                if(user){
                    if(user.code == codeId )
                    {
                        model.updateOne({email:userId},{
                            "status":true,
                            "name":"letrunghieu"
                        }).then(()=>{
                            msgVerify.setMsg("Xác thực tài khoản thành công!")
                            res.redirect('back')
                        }).catch(next)

                       
                    }    
                    else{
                        msgVerify.setMsg("Mã code không chính xác! Vui lòng xác nhận lại!")
                        res.redirect('back')
                    }
                }
                else{
                    msgVerify.setMsg("Người dùng không tồn tại!")
                    res.redirect('back')
                }
            })
            .catch(next)
        }
    }
 
    send(req,res){
        res.render('pages/login-register',{
             msgLg: msgLogin.getMsg(),
             msgRg: msgRegister.getMsg()
        });
    }
   

}


module.exports = new UtilUserController();



