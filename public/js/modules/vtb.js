define(['socketIO', 'jQuery'], function(io, $) {

    var vtbModule = function () {
        this.init = function(socket, messageElement, chatboxElement, usernameElement) {
            var user=prompt("Please enter your name");
            if (user) {
                $(messageElement).prop('disabled', false).focus();
                $(usernameElement).html("<span class='loggedin'>Logged in as: <strong>" + user + "</strong></span>"); 
            }
            socket.on("message", function(message) {
                $(chatboxElement).append("<span class='" + message.type + "'><strong>" + getTime() + " " + message.user + ":</strong>" + message.text + "<br/></span>");
            });
            socket.on("time", function(message) {
                $('#time').text(message.hours + ":" + message.minutes + ":" + message.seconds);
            });
            $(messageElement).keypress(function(e) {
                if (e.keyCode == 13) {
                    var message = $(messageElement).val().toString();
                    socket.emit("message", {text: message, user: user, type: 'user'});
                    $(messageElement).val("");
                    e.stopPropagation();
                    e.stopped = true;
                    e.preventDefault();
                }
            });
        };
        function getTime() {
            var date = new Date();
            var hours = date.getHours();
            var minutes = date.getMinutes();
            return hours + ":" + (minutes < 10 ? "0" : "") + minutes;
        }
    };
    return vtbModule; 
});