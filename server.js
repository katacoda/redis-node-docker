// Inspired by https://github.com/mranney/node_redis/blob/master/examples/web_server.js

var http = require("http");
var redis_client = require("redis").createClient(6379, 'redis');

var server = http.createServer(function (request, response) {
  response.writeHead(200, {
    "Content-Type": "text/plain"
  });

  var total_requests;

  redis_client.incr("requests", function (err, reply) {
    total_requests = reply; // stash response in outer scope
  });
  redis_client.hincrby("ip", request.connection.remoteAddress, 1);
  redis_client.hgetall("ip", function (err, reply) {
    // This is the last reply, so all of the previous replies must have completed already
    response.write("This page was generated after talking to redis.\n\n" +
                   "Application Build: 1" + "\n\n" + 
                   "Total requests: " + total_requests + "\n\n" +
                   "IP count: \n");
    Object.keys(reply).forEach(function (ip) {
      response.write("    " + ip + ": " + reply[ip] + "\n");
    });
    response.end();
  });
}).listen(3000);
console.log('Listening on port 3000');
