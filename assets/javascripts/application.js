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

        chatbox.recognizer.onspeechstart = function(e) {
            $('.indicator').removeClass('processing').addClass('recording');
        };

        chatbox.recognizer.onspeechend = function(e) {
            $('.indicator').removeClass('recording').addClass('processing');
        };

        chatbox.recognizer.onend = function(e) {
            $('.indicator').removeClass('recording processing');
        };

        chatbox.recognizer.onresult = function(e) {
            var message = e.results[0][0].transcript;
            logger.log(message, 'sent');
            chatbox.send(message);
        };
    },
    send: function(message) {
        $.ajax({
            url: chatbox.endpoint,
            data: { text: message },
            type: 'POST',
            success: function(data) {
                logger.log(data.response, 'received');
                chatbox.listen();
            }
        });
    }
};

var logger = {
    container: $('.messages'),
    template: $('template#message').html(),
    log: function(message, type) {
        var template = $(logger.template).addClass(type);
        template.find('p').text(message);
        logger.container.append(template);
        logger.container.scrollTop(100000);
    }
};