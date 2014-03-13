var express = require("express");
var app = express();
var port = process.env.PORT || 1337;
var stateStorage = require("./storage");
var stateMachine = require('./stateMachine.json'); 
app.set('views', __dirname + '/public/template');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.use(express.static(__dirname + '/public'));

app.get("/page/:template", function(req, res){
    res.render(req.params.template, {stateMachine:stateMachine});
});
app.get("/", function(req, res){
    res.render("talkback", {stateMachine:stateMachine});
});
app.get("/api", function(req, res){
    res.json({application: 'Studio Clock', version: '1.0'});
});
app.get("/api/stateMachine", function(req, res){
    res.json(stateMachine);
});
app.get("/api/flash/:number", function(req, res){
    io.sockets.emit("flash", {id: req.params.number, text: req.query.text});
    stateMachine["box" + req.params.number].state = "flash";
    if (req.query.text) {stateMachine["box" + req.params.number].text = req.query.text}
    res.json({method: 'flash', tally: req.params.number, text: req.query.text, result: 'success'});
});
app.get("/api/on/:number", function(req, res){
    io.sockets.emit("on", {id: req.params.number, text: req.query.text});
    if (!stateMachine["box" + req.params.number]) { stateMachine["box" + req.params.number] = {}}
    stateMachine["box" + req.params.number] = (req.query.text ? {state: "on", text: req.query.text} : {state: "on", text: stateMachine["box" + req.params.number].text});
    res.json({method: 'on', tally: req.params.number, text: req.query.text, result: 'success'});
});
app.get("/api/off/:number", function(req, res){
    io.sockets.emit("off", {id: req.params.number, text: req.query.text});
    if (!stateMachine["box" + req.params.number]) { stateMachine["box" + req.params.number] = {}}
    stateMachine["box" + req.params.number] = (req.query.text ? {state: "off", text: req.query.text} : {state: "off", text: stateMachine["box" + req.params.number].text});
    res.json({method: 'off', tally: req.params.number, text: req.query.text, result: 'success'});
});
app.get("/api/song", function(req, res){
    var songString = req.query.artist + " - " + req.query.title; 
    io.sockets.emit("song", {text: songString});
    stateMachine.song = songString;
    res.json({method: 'song', text: songString, result: 'success'});
});
app.get("/api/show", function(req, res){
    io.sockets.emit("show", {text: req.query.show});
    stateMachine.show = req.query.show; 
    res.json({method: 'show', text: req.query.show, result: 'success'});
});
app.get("/api/message", function(req, res){
    var type = req.query.type || "system";
    var user = req.query.user || "System";
    io.sockets.emit("message", {text: req.query.message, user: user, type: type});
    stateMachine.lastMessage = req.query.message; 
    res.json({method: 'message', text: req.query.message, result: 'success'});
});
app.get("/api/alert", function(req, res){
    io.sockets.emit("alert", {text: req.query.message, time: req.query.time});
    res.json({method: 'alert', text: req.query.message, time: req.query.time, result: 'success'});
});

var io = require("socket.io").listen(app.listen(port));
io.set('log level', 1);
io.sockets.on("connection", function(socket) {
    socket.on("flash", function(id, text) {
            io.sockets.emit("flash", {id: id, text: text});
    });
    socket.on("on", function(id, text) {
            io.sockets.emit("on", {id: id, text: text});
    });
    socket.on("off", function(id, text) {
            io.sockets.emit("off", {id: id, text: text});
    });
    socket.on("song", function(text) {
            io.sockets.emit("song", {text: text});
    });
    socket.on("show", function(text) {
            io.sockets.emit("show", {text: text});
    });
    socket.on("message", function(message) {
            io.sockets.emit("message", {text: message.text, user: message.user});
    });
    socket.on("alert", function(text) {
            io.sockets.emit("alert", {text: text});
    });

});
console.log("Listening on port " + port);
setInterval(function() {
    var date = new Date();
    io.sockets.emit('time', { 
        hours: date.getHours(),
        minutes: date.getMinutes(), 
        seconds: date.getSeconds() 
    });},
500);
setInterval(function() {stateStorage.save(stateMachine)}, 60000);
