const express =require('express');
const app = express();

//setup of socket io
const http=require("http");
//Socket run on http server so we create a http server
const socketio=require("socket.io");

const server=http.createServer(app);

const io=socketio(server);

const path = require("path");
app.set("view engine","ejs");

app.use(express.static(path.join(__dirname,"public"))); //set the static files directory 
io.on("connection",function(socket){
    socket.on("send-location",function(data){
        io.emit("receive-location",{id:socket.id,...data}); //socket have unique id we are sending and receiving location
    });

    socket.on("disconnect",function(){
        io.emit("user-disconnect",socket.id); //when user disconnects we emit a message to all clients
    });
    console.log("Connected");
});




app.get("/",function(req, res) {
    res.render("index");
});

server.listen(3000);
//server is running on socket io so we can say server and socket io is connected

