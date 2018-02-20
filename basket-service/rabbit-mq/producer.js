var Channel = require('./channel');


module.exports = send;

function send(queue, msg){
        
    Channel(queue, function(err, channel, conn) {  
        if (err) {
          console.error(err.stack);
        }
        else {
          console.log('channel and queue created');
          channel.sendToQueue(queue, encode(msg), {
            persistent: true
          });
          setImmediate(function() {
            channel.close();
            conn.close();
          });
        }
      });
}

function encode(doc) {  
  return new Buffer(JSON.stringify(doc));
}