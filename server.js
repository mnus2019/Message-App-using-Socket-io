var express = require('express');
var bodyparser = require('body-parser');
var app = express();
var http =require("http").Server(app);
var mongoose =require("mongoose");
var io = require("socket.io")(http)


app.use(express.static(__dirname));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

// mongoose.Promise=Promise;

var Message=mongoose.model('Data',{
    name:String,
    message:String
})

var messages=[
    {name:"Tim",message:"Hi"},
    {name:"Jane",message:"hello"}
];
app.get("/messages",(req,res)=>{
    Message.find({},(err,messages)=>{
        if(err)sendStatus(500);
        res.send(messages);
    })
   
})

app.get("/messages/:user",(req,res)=>{
    var user= req.params.user;
    Message.findOne({name:user},(err,messages)=>{
        if(err)sendStatus(500);
        res.send(messages);
    })
   
})


io.on("connection",(socket)=>{
    console.log("IO user connected")
})

app.post("/messages",async(req,res)=>{
 try {
     
    var message =new Message(req.body);
    var savedMessage =await message.save();
    console.log("saved");
    var censored= await Message.findOne({message: 'word'});
    if(censored)
   { console.log("censored word found"+ censored)
       await Message.remove({_id:censored.id})
      }
    else
   { io.emit("message",req.body);
    res.sendStatus(200);}
 } catch (error) {
    res.sendStatus(500);
    console.log(error);
    
 }
 finally{
     console.log("post is triggered");
 }
})

mongoose.connect('mongodb://localhost:27017/learning-node',
       {useNewUrlParser:true},(err)=>{
           console.log("mongoose db connected")
       });

   var server= http.listen(3000,()=>{
    console.log("server is listening on port",server.address().port);
});