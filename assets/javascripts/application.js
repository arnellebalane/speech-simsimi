$(document).ready(function() {
    chatbox.initialize();
});

var chatbox = {
    input: null,
    recognizer: null,
    endpoint: 'http://localhost:3000',
    initialize: function() {
        chatbox.listen();
    },
    listen: function() {
        chatbox.recognizer = new webkitSpeechRecognition();
        chatbox.recognizer.start();

        chatbox.recognizer.onresult = function(e) {
            var message = e.results[0][0].transcript;
            logger.log(message);
            chatbox.send(message);
        };
    },
    send: function(message) {
        $.ajax({
            url: chatbox.endpoint,
            data: { text: message },
            type: 'POST',
            success: function(data) {
                logger.log(data.response);
                chatbox.listen();
            }
        });
    }
};

var logger = {
    container: $('.messages'),
    template: $('template#message').html(),
    log: function(message) {
        var template = $(logger.template);
        template.find('p').text(message);
        logger.container.append(template);
    }
};