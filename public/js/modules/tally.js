define(['jQuery','socketIO', 'vendor/jquery.textfill'], function($, io, textfill) {
    var tallyModule = function () {
        this.init = function(socket) {
            var intervalArray = [];
            //Handle incoming message - Flash
            socket.on("flash", function(message) {
                var id = "box" + message.id;
                intervalArray[id] = setInterval(function () {
                    if (message.text) { 
                        $('#' + id).html('<span>' + message.text + '</span>').textfill({ maxFontPixels: 100 });
                    }
                    $('#' + id).toggleClass("on");
                }, 500);
            });
            //Handle incoming message - On
            socket.on("on", function(message) {
                var id = "box" + message.id;
                clearInterval(intervalArray[id]);
                intervalArray[id] = "";
                if (message.text) { 
                    $('#' + id).html('<span>' + message.text + '</span>').textfill({ maxFontPixels: 100 });
                }
                $('#' + id).addClass("on");
            });
            //Handle incoming message - Off
            socket.on("off", function(message) {
                var id = "box" + message.id;
                clearInterval(intervalArray[id]);
                intervalArray[id] = "";
                if (message.text) { 
                    $('#' + id).html('<span>' + message.text + '</span>').textfill({ maxFontPixels: 100 });
                }
                $('#' + id).removeClass("on");
            });
        };
        this.respondTally = function() {
            $("li").each(function(index) {
                $(this).textfill({ maxFontPixels: 100 });
            });
        };
    };
    return tallyModule;
});