(function() {
    var pubnub = new PubNub({
        publishKey: 'pub-c-60cd9afe-8af7-459d-9884-50ed1238ea10',
        subscribeKey: 'sub-c-5d8a9e22-b644-11ec-8c3a-fe86d55faee6'
    });
    function $(id) {
        return document.getElementById(id);
    }
    var box = $('box'),
        input = $('input'),
        channel = '10chat-demo';
    pubnub.addListener({
        message: function(obj) {
            box.innerHTML = ('' + obj.message).replace(/[<>]/g, '') + '<br>' + box.innerHTML
        }
    });
    pubnub.subscribe({
        channels: [channel]
    });
    input.addEventListener('keyup', function(e) {
        if ((e.keyCode || e.charCode) === 13) {
            pubnub.publish({
                channel: channel,
                message: input.value,
                x: (input.value = '')
            });
        }
    });
})();