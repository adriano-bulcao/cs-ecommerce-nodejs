var settings = require('./rabbit-topology');
const rabbit = require('rabbot');

var started = false;
var start = () => {
    if (!started) {
        started = true;
        rabbit.configure(settings).then(() => console.log('connected!'));
    }
}

module.exports = {
    start: start
};