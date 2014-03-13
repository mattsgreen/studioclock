require.config({
    paths: {
        'jQuery': 'vendor/jquery',
    },
    shim: {
        'jQuery': {
            exports: '$'
        }
    }
});
require(['modules/clock', 'jQuery'], function (clockModule, $) {
    //Load required modules into local variables
    var clock = new clockModule();
    $(document).ready(function() {
        //Put elements into local variables
        var canvas = $('#canvas')[0];
        var container = $('#clock'); 
        clock.respondCanvas(canvas, container);
        //Set timer to render the clock every half second
        setInterval(function() {
            clock.render(canvas, true)} //, true, '#0f0', '6vw Sans-Serif', '4vw Sans-Serif', '2vw Sans-Serif')}
        ,500);
        //Resize Tally and Clock to fit the parent element when the window is resized 
        $(window).resize(function(){
            clock.respondCanvas(canvas,container);
        });
    });
});