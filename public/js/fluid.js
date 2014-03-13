require.config({
    paths: {
        'jQuery': 'vendor/jquery',
        'socketIO': '/socket.io/socket.io'
    },
    shim: {
        'jQuery': {
            exports: '$'
        },
        'socketIO': {
            exports: 'io'
        }
    }
});
require(['modules/clock', 'modules/tally','modules/show','modules/song', 'modules/message', 'modules/alert', 'jQuery', 'socketIO'], function (clockModule, tallyModule, showModule, songModule, messageModule, alertModule, $, io) {
    //Load required modules into local variables
    var tally = new tallyModule(); 
    var show = new showModule();
    var song = new songModule(); 
    var message = new messageModule(); 
    var alert = new alertModule(); 
    var clock = new clockModule();
    //Connect to the socket server, and store the connection 
    var socket = io.connect();
    $(document).ready(function() {
        //Put elements into local variables
        var canvas = $('#canvas')[0];
        var container = $('#clock'); 
        //Initialise modules and pass parameters to them
        tally.init(socket);
        show.init(socket, "#toptext");
        song.init(socket, "#bottomtext");
        message.init(socket, "#bottomtext");
        alert.init(socket, '#overlay-box');
        //Resize Tally and Clock to fit the parent element on load 
        tally.respondTally();
        clock.respondCanvas(canvas, container);
        //Set timer to render the clock every half second
        setInterval(function() {
            clock.render(canvas)} //, true, '#0f0', '6vw Sans-Serif', '4vw Sans-Serif', '2vw Sans-Serif')}
        ,500);
        //Resize Tally and Clock to fit the parent element when the window is resized 
        $(window).resize(function(){
            clock.respondCanvas(canvas,container);
            tally.respondTally();
        });
    });
});