(function() {
    var channel = $("#chat_title").text()
    console.log(channel)
    var staff = $("#chat_staff").text()
    console.log(staff)
    var user = $("#chat_user").text()
    console.log(user)
    var pubnub = new PubNub({
        publishKey: 'pub-c-60cd9afe-8af7-459d-9884-50ed1238ea10',
        subscribeKey: 'sub-c-5d8a9e22-b644-11ec-8c3a-fe86d55faee6',
        // uuid: "1234567890qwertyuioplkjhgfdsazxcvbnm",
        secretKey: 'sec-c-NWQxMmM2NzQtNjcwYi00MTQ0LTkwNGItMjg5Nzg0MjllMTY3'
    });
    // generate a random username
    var randomName = function() {
        var animals = ['pigeon', 'seagull', 'bat', 'owl', 'sparrows', 'robin', 'bluebird', 'cardinal', 'hawk', 'fish', 'shrimp', 'frog', 'whale', 'shark', 'eel', 'seal', 'lobster', 'octopus', 'mole', 'shrew', 'rabbit', 'chipmunk', 'armadillo', 'dog', 'cat', 'lynx', 'mouse', 'lion', 'moose', 'horse', 'deer', 'raccoon', 'zebra', 'goat', 'cow', 'pig', 'tiger', 'wolf', 'pony', 'antelope', 'buffalo', 'camel', 'donkey', 'elk', 'fox', 'monkey', 'gazelle', 'impala', 'jaguar', 'leopard', 'lemur', 'yak', 'elephant', 'giraffe', 'hippopotamus', 'rhinoceros', 'grizzlybear']    
        var colors = ['silver', 'gray', 'black', 'red', 'maroon', 'olive', 'lime', 'green', 'teal', 'blue', 'navy', 'fuchsia', 'purple'];

        return colors[Math.floor(Math.random() * colors.length)] + '_' + animals[Math.floor(Math.random() * animals.length)];
    }
    
    var me = $('#whoami').text();
    console.log(me)
    var $input = $('#chat-input');
    var $output = $('#chat-output');
    
    var pubnub = PUBNUB.init({
        publish_key: 'demo',
        subscribe_key: 'demo'
    });
    
    var channel = 'memewarz-lobby-demo-2';
    
    $('#chat').submit(function() {
        pubnub.publish({
        channel: channel,
        message: {
            text: $input.val(),
            username: me
        }
        });
        $input.val('');
        return false;
    });
    
    
    pubnub.subscribe({
        channel: channel,
        message: function(data) {
        
        var $line = $('<li class="list-group-item"><strong>' + data.username + ':</strong> </span>');
        var $message = $('<span class="text" />').text(data.text).html();
        
        if(data.username == me) {
            $line.addClass('me');  
        }

        $line.append($message);
        $output.append($line);
        $output.scrollTop($output[0].scrollHeight);
        }
    });
})();