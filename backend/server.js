//jshint esversion:6
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require("cors");
const session =  require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const { json } = require('body-parser');


const app = express();


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.use(session({
    secret:process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    // cookie: {}
  }));
app.use(passport.initialize());
app.use(passport.session());

mongoose.set('strictQuery', true);

mongoose.connect("mongodb+srv://"+process.env.DB_USERNAME+":"+process.env.DB_PASSWORD+"@cluster0.bn8mc.mongodb.net/NotesApp?retryWrites=true&w=majority", { useNewUrlParser: true });

const Schema = mongoose.Schema;


const userSchema = new Schema({
 username:String

});


const dataSchema = new Schema({
  username:String,
  notes:[Object]
})
userSchema.plugin(passportLocalMongoose);


const User = mongoose.model('User', userSchema);
const Data = mongoose.model('Data', dataSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.post("/addNote",async (req,res)=>{
    const note = {noteId:req.body.noteId,
        title:req.body.title,
        content:req.body.content};
        
    const notesFound = await Data.findOneAndUpdate(
        { username: req.body.username}, 
         {$push: {notes: note} } ,{
            new: true
          }
    );
    if(notesFound){
        res.json({notes:notesFound.notes})
    }


});

app.post("/editNote",async(req,res)=>{
    await Data.findOneAndUpdate(
        {"username": req.body.username,"notes": { "$elemMatch": { "noteId": req.body.noteId }}},
        {"$set": { "notes.$.title":req.body.title,"notes.$.content":req.body.content}}

    );
    
    const notesFound = await Data.findOne(
        { username: req.body.username});
    if(notesFound){
        res.json({notes:notesFound.notes})
    }

})


app.post("/deleteNote",async(req,res)=>{
await Data.findOneAndUpdate({ username:req.body.username}, { $pull: { notes: { noteId: req.body.id } }}, { safe: true, multi:true } );
const notesFound = await Data.findOne(
    { username: req.body.username});
if(notesFound){
    res.json({notes:notesFound.notes})
}
});

app.post("/register", async (req, res) => {
    const result = await User.findOne({username:req.body.username});
    if(!result){
        try{
            User.register({username:req.body.username},req.body.password,function(err,user){
                if(err){
                  
                }else{

                    passport.authenticate("local")(req,res,async()=>{
                        const data = new Data({username:req.body.username,notes:[]});
                        const foundResult = await data.save();
                        res.json({exist:false,
                            status:true});
                        
                    });
                }
            });
          }
          catch(err){
            console.log("err");
          }
        
    }
    else{
        res.json({exist:true,
        status:false});
    }
 


});




app.post("/login", passport.authenticate("local"), async(req, res)=>{
    if(req.isAuthenticated()){
        const notesFound = await Data.findOne(
            { username: req.body.username} );
        if(notesFound){
            res.json({status:true,
                notes:notesFound.notes})
        }
    }
    else{res.json({status:false,
    err:true});}
});


app.get("/logout",(req,res)=>{
    req.logOut((err)=>{
        if(!err){
            res.json({status:false })
        }
    });
  
    
})





app.listen(5000, function () {
    console.log("server started at port 5000");
})
