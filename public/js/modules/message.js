define(['socketIO', 'jQuery'], function(io, $) {
    var messageModule = function () {
        this.init = function(socket, element) {
            socket.on("message", function(message) {
                $(element).fadeOut(400, function() {$(this).text(message.text)}).fadeIn(400).fadeOut(400).fadeIn(400);
            });
        };
    };
    return messageModule; 
});