define(['jQuery', 'socketIO', 'vendor/jquery.textfill'], function($, io, textfill) {
    var alertModule = function () {
        this.init = function(socket, overlayElement) {
            socket.on("alert", function(message) {
                var delay = message.time * 1000;
                $('body').prepend('<div id="overlay-shade"></div>');
                $('#overlay-shade').fadeTo(150, 0.6, function() {
                    var props = {
                        oLayWidth       : $(overlayElement).width(),
                        scrTop          : ($(window).height() - $(overlayElement).height())/2,
                        viewPortWidth   : $(window).width()
                    };
                    var leftPos = (props.viewPortWidth - props.oLayWidth) / 2;
                    $(overlayElement) .css({
                            display : 'block',
                            opacity : 0,
                            top : '-=300',
                            left : leftPos+'px'
                        })
                        .html('<span>' + message.text + '</span>').textfill({ maxFontPixels: 500 })
                        .animate({
                            top : props.scrTop,
                            opacity : 1             
                        }).delay(delay ? delay : 3000).animate({
                            top : '-=300',
                            opacity : 0
                        }, 300, function() {
                            $('#overlay-shade').fadeOut(150);
                            $(this).css('display','none');
                    });
                });
            });
        };
    };
    return alertModule;
});