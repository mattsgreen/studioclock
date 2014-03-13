define(['jQuery', 'socketIO'], function($, io) {
    var songModule = function () {
        this.init = function(socket, element) {
            socket.on("song", function(message) {
                $(element).text(message.text);
            });
        };
    };
    return songModule;
});