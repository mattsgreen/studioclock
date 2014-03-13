define(['jQuery'], function($) {
    var clockModule = function () {
        var clockRadius;
        this.render = function(canvas, showSeconds, fgColour, dFont, sFont, tFont) {
            var ctx = canvas.getContext('2d');
            var date = new Date();
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var seconds = date.getSeconds();
    
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.beginPath();

            //Digital Clock
            ctx.font = dFont ? dFont : '12vw Sans-Serif';
            ctx.fillStyle = fgColour ? fgColour : '#f00';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(hours + ":" + (minutes < 10 ? "0" : "") + minutes, 0, clockRadius * -0.20);
            if (showSeconds) { 
                ctx.font = sFont ? sFont : '6vw Sans-Serif';
                ctx.fillText((seconds < 10 ? "0" : "") + seconds, 0, clockRadius * 0.50);
            }
            var timeString;
            //Text Time 
            if (minutes === 0) { 
                timeString = ((hours + 11) % 12 + 1) + " o'clock";
            } else if (minutes == 30) { 
                timeString = "Half past " + ((hours + 11) % 12 + 1);
            } else if (minutes == 15) { 
                timeString = "Quarter past " + ((hours + 11) % 12 + 1);
            } else if (minutes == 45) { 
                timeString = "Quarter to " + ((hours + 12) % 12 + 1);
            } else if (minutes > 30) {
                timeString = (60 - minutes) + " mins to " + ((hours + 12) % 12 + 1);
            } else { 
                timeString = minutes + " mins past " + ((hours + 11) % 12 + 1); 
            }
            ctx.font = tFont ? tFont : '4vw Sans-Serif';
            ctx.fillText(timeString, 0, clockRadius * 0.20); 
            var angle, x, y, i;
             //Hour Markers
            for (i = 1; i <= 12; i++) {
                angle = (i - 3) * (Math.PI * 2) / 12;
                x = clockRadius * 0.85 * Math.cos(angle);
                y = clockRadius * 0.85 * Math.sin(angle);
                ctx.beginPath();
                ctx.arc(x, y, clockRadius * 0.03, 0, Math.PI * 2, true);
                ctx.fill();
                ctx.closePath();
                ctx.strokeStyle = fgColour ? fgColour : '#f00';
                ctx.stroke();
            }
            //Second Dots
            for (i = 0; i <= seconds; i++) {
                angle = (i - 15) * (Math.PI * 2) / 60;
                x = clockRadius * 0.95 * Math.cos(angle);
                y = clockRadius * 0.95 * Math.sin(angle);
                ctx.beginPath();
                ctx.arc(x, y, clockRadius * 0.03, 0, Math.PI * 2, true);
                ctx.fill();
                ctx.closePath();
                ctx.stroke();
            }
            ctx.restore();
        };
        this.respondCanvas = function(canvas, container){ 
            canvas.width = $(container).width(); 
            canvas.height = $(container).height(); 
            if ($(container).width() < $(container).height()) {
                clockRadius = ($(container).width() * 0.5);
            } else {
                clockRadius = ($(container).height() * 0.5);
            }
        };
    };
    return clockModule;
});