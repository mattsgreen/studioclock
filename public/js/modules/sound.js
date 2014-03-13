define(['socketIO'], function(io) {
    var soundModule = function () {
        this.init = function(socket) {
            socket.on("alert", function(message) {
                console.log('play');
                var snd = new Audio("../sounds/alarm.wav"); // buffers automatically when created
                snd.play();
            });
        };
    };
    return soundModule;
});