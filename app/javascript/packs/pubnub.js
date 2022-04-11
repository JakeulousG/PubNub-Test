var pubnub = null;
var me = null;
var Users = null;

///21
var channel = $("#chat_title").text()
console.log(channel)

var $online_users = $('#online-users');
var $input = $('#chat-input');
var $output = $('#chat-output');

var User_factory = function() {
  var user_list = {};
  var self = this;

  self.remove = function(uuid) {
    delete user_list[uuid];
  };

  self.get = function(uuid) {
    if(user_list.hasOwnProperty(uuid)) {
      return user_list[uuid];
    } else {
      console.error('Trying to retrieve user that is not present.');
    }
  };

  self.set = function(uuid, data) {
    if(!user_list.hasOwnProperty(uuid)) {
      user_list[uuid] = new User(uuid, data);
    }
    return user_list[uuid];
  };
  
  self.all = function() {
    return user_list;
  }

};
  
var User = function(uuid) {
  var self = this;
  self.uuid = uuid;

  var $tpl = $('\
    <li id="' + self.uuid + '" class="list-group-item"> \
    ' + self.uuid + ' \
    </li>');

  self.chat = function(text, $target) {

    var $line = $('<li class="list-group-item"><strong>' + self.uuid + ':</strong> </span>');
    var $message = $('<span class="text" />').text(text).html();

    $line.append($message);
    $target.append($line);
    $target.scrollTop($target[0].scrollHeight);
  };

  self.leave = function() {
    $tpl.remove();
  };

  self.init = function() {  
    $tpl.click(function() {
      me.private_chat(self);
      return false;
    });
    $('#online-users').append($tpl);
  };
  return self;
};

var Client = function() {
  
  var self = new User($("#current_user").text());
  return self;
};

var App = function() {
  
  Users = new User_factory();
  me = new Client();
  console.log(me);

  pubnub = PUBNUB.init({
    publish_key: 'pub-c-60cd9afe-8af7-459d-9884-50ed1238ea10',
    subscribe_key: 'sub-c-5d8a9e22-b644-11ec-8c3a-fe86d55faee6',
    secret_key: 'sec-c-NWQxMmM2NzQtNjcwYi00MTQ0LTkwNGItMjg5Nzg0MjllMTY3',
    uuid: me.uuid,
    auth_key: me.uuid,
    ssl: true
  });
  pubnub.history({
    channel: channel,
    includeUUID: true,
    includeMessageActions: true,
    callback: function(data){
      $data = data[0];
      $.each($data, function(index, item){
      var $line = $('<li class="list-group-item"><strong>' + item.payload.uuid + ':</strong> </span>');
      var $message = $('<span class="text" />').text(item.payload.text).html();
      $line.append($message)
      $('#chat-output').append($line);
      });
    }
  });

  pubnub.grant({
    channel: channel,
    auth_key: me.uuid,
    read: true,
    write: true,
    ttl: 0,
    callback: function() {
      
      pubnub.grant({
        channel: channel + '-pnpres',
        auth_key: me.uuid,
        read: true,
        write: true,
        ttl: 0,
        callback: function() {
          pubnub.subscribe({
            channel: channel,
            message: function(data) {
              if(data.type == 'chat') {    
                Users.get(data.payload.uuid).chat(data.payload.text, $output);
              }
            },
            presence: function(data) {
              console.log(data);
              if(data.action == "join") {
                Users.set(data.uuid).init();
              }
              if(data.action == "leave" || data.action == "timeout") {
                Users.remove(data.uuid);
              }
            }
          });

          
          $('#chat').submit(function() {
            pubnub.publish({
              channel: channel,
              message: {
                type: 'chat',
                payload: {
                    text: $input.val(),
                    uuid: me.uuid
                }
              }
            });
            $input.val('');
            return false;
          });
          $('#whoami').text(me.uuid);
        }
      });
    }
  });
}

App();