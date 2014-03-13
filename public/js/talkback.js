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
require(['modules/tally', 'modules/vtb', 'jQuery', 'socketIO'], function (tallyModule, vtbModule, $, io) {
    //Load required modules into local variables
    var tally = new tallyModule(); 
    var vtb = new vtbModule(); 
    //Connect to the socket server, and store the connection 
    var socket = io.connect();
    $(document).ready(function() {
        //Initialise modules and pass parameters to them
        tally.init(socket);
        //Resize Tally and Clock to fit the parent element on load 
        tally.respondTally();
        vtb.init(socket, '#messageInput','#messageWindow', '#username');
        //Resize Tally and Clock to fit the parent element when the window is resized 
        $(window).resize(function(){
            tally.respondTally();
        });
    });
});