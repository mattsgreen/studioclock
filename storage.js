var fs = require('fs');
var saveState = function(stateMachine) {
    fs.writeFile('./stateMachine.json',JSON.stringify(stateMachine),function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log("The file was saved!");
            }
    });
};
exports.save = saveState;