/**
 * Module dependencies.
 */

 var express = require('express');
 var html = require('hyperstream');
 var read = require('fs').createReadStream;
 var Stream = require('stream').Readable;

 var server = express();

server.use('*', (req, res) => {
  read(__dirname + '/index.html')
    .pipe(html({
      '.main' : users()
    }))
    .pipe(res);
});

/**
 * Create read stream that returns a user name
 * every second.
 *
 * @return {Stream}
 * @api private
 */

function users() {
  var stream = new Stream;
  stream._read = function() {};
  var names = ['trump',  'clinton', 'obama', 'hollande'];
  var interval = setInterval(() => {
    stream.push(names.pop());
    if(!names.length) {
      clearInterval(interval);
      stream.push(null);
    }
  }, 1000);
  return stream;
}

 server.listen(8080);
