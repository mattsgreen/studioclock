define(['jQuery', 'socketIO'], function($, io) {
    var showModule = function () {
        this.init = function(socket, element) {
            socket.on("show", function(message) {
                $(element).text(message.text);
            });
        };
    };
    return showModule;
});