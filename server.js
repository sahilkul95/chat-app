const app = require("express")();
const express = require("express");
const http = require("http").Server(app);
const port = process.env.PORT || 3000;

//app.get("/", function(req, res) {
//    res.sendFile(__dirname + "/views/index.html");
//});

app.use(express.static("public"));

http.listen(port, function() {
    console.log("Listening on http://localhost:" + port);
});




const io = require('socket.io')(http)

io.on('connection', (socket) => {
   socket.on("user_join", function(data) {
        this.username = data;
        console.log("New user is connected with name: ", data);
        socket.broadcast.emit("user_join", data);
    });

    socket.on("chat_message", function(data) {
        data.username = this.username;
        console.log(data.message);
        socket.broadcast.emit("chat_message", data);
    });

    socket.on("disconnect", function(data) {
        socket.broadcast.emit("user_leave", this.username);
    });
})
