require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const { stringify } = require('querystring');
const { FindCursor } = require('mongodb');
const { error } = require('console');
const { truncate } = require('fs/promises');
const port = process.env.PORT || 8080;
const encrypt = require('mongoose-encryption')
app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}))



mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err))

    
const tryschema = new mongoose.Schema({
    name:String,
    email:String,
    Password:String

})

const secret = "thisislittlesecret"
tryschema.plugin(encrypt,{secret:secret,
    encryptedFields:["Password"]
})

const people = mongoose.model("peoples",tryschema)

app.use('/resources', express.static(path.join(__dirname, 'resources')));
var Error1="Null"
var hidepara=true

// Sign Up Render
app.get('/',function(req,res){
    res.render('SignUp',{error:Error1,
        hidePara:hidepara
    })
   

    
})



//SignUp Settings
app.post('/SignUp',async function(req,res){
    nameP = req.body.Name
    Password = req.body.password
    Email = req.body.email.toLowerCase()
    const user = await people.findOne({email:Email}) 
    if(user){
        
        res.redirect('/')

        Error1 = "User already Exist"
        hidepara=false




    }else{
        hidepara=true
         const p = new people({
                name:nameP,
                email:Email,
                Password:Password

            })
            await p.save();
            res.redirect('/SignIn')

    }
   
   
    

})

//Seting Up info
app.get('/info',async function(req, res) {
    hidepara=true
    try {
        const user = await people.findOne({email:req.query.id});
        res.render('Info', { name: user});
    } catch (err) {
        res.status(500).send('User not found');
    }
})

//SingIn Render
app.get('/SignIn',function(req,res){
    
    res.render('SignIn',{hidePara:hidepara})
})


//Setting up SingIn
app.post('/SignIn',async function(req,res){
    email = req.body.email.toLowerCase()
    password = req.body.password
    const user = await people.findOne({email:email}) 
    if(user){
        if(password === user.Password  ){
        res.redirect(`/info?id=${user.email.toLowerCase()}`)
        }else{
            hidepara=false
            res.redirect('/SignIn')
        }
    }else{
        hidepara=false
        res.redirect('/SignIn')
    }
})


//Changing from Sign-Up to Sign-In
app.post('/toSignIn',function(req,res){
    hidepara=true
    res.redirect('/SignIn')

})


//Changing from Sing-In to Sign-Up
app.post('/toSignUp',function(req,res){
    hidepara=true
    res.redirect('/')
    

})


//Listening the port.
app.listen(port,function(){
    console.log("Started")
})