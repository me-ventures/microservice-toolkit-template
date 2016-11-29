var config = require('config');
var toolkit = require('microservice-toolkit').initFromConfig(config);
var log = toolkit.logger;
var metrics = toolkit.metrics;
var context = toolkit.context;
var http = toolkit.http;


http.addRouter('/', require('./src/routes/example'));

// Listen on a specific message bus
context.consume("test-exchange", ["update"], handler);

// Send some messages
var x = 0;
sendMessage();

function sendMessage() {
    log.info("Sending message");
    context.publishToExchange("test-exchange", "update", { message: "Message #" + x});
    x++;

    setTimeout(function() {
        sendMessage();
    }, 1000);
}

function handler(message) {
    console.log(message);
    return message
}
