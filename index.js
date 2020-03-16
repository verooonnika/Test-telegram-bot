const TOKEN = '1130761603:AAHXziE5hJkYqxxGVDo8Op-eDX63SJpdiCM';
const TelegramBot = require('node-telegram-bot-api');
const options = {
  polling: true
};
const bot = new TelegramBot(TOKEN, options);





var r = '' ;
console.log(r);
var jsforce = require('jsforce');
var conn = new jsforce.Connection();
conn.login('expenseapplication@sccraft.com', 'asdfg123', function(err, res) {
  console.log('in login');
  if (err) { return console.error(err); }
  conn.query('SELECT Id, Name FROM Account LIMIT 1', function(err, res) {
    console.log('in query');
    if (err) { return console.error(err); }
    r = res.records[0].Name;
    console.log(r);
  });
});
console.log('hi');
/*bot.on('message', msg => {
  bot.sendMessage(msg.chat.id, `Veronika klubnika ${msg.from.first_name} bla bla ${r}`);
}) */

onText(/\/a/, function onAudioText(msg){
  const resp = r;
  bot.sendMessage(msg.chat.id, resp);

}


/*var respon1;
var q = 'SELECT Id, Name, FROM Account LIMIT 1';


org.query({ query: q }, function(err, resp){
respon1 = resp.records[0];
  if(!err && resp.records) {

    var acc = resp.records[0];
    acc.set('Name', 'Really Spiffy Cleaners');
    acc.set('Industry', 'Cleaners');

    org.update({ sobject: acc, oauth: oauth }, function(err, resp){
      if(!err) console.log('It worked!');
    });

  }
});*/


/*
// Matches /photo
bot.onText(/\/photo/, function onPhotoText(msg) {
  // From file path
  const photo = `${__dirname}/../test/data/photo.gif`;
  bot.sendPhoto(msg.chat.id, photo, {
    caption: "I'm a bot!"
  });
});


// Matches /audio
bot.onText(/\/audio/, function onAudioText(msg) {
  // From HTTP request
  const url = 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Example.ogg';
  const audio = request(url);
  bot.sendAudio(msg.chat.id, audio);
});


// Matches /love
bot.onText(/\/love/, function onLoveText(msg) {
  const opts = {
    reply_to_message_id: msg.message_id,
    reply_markup: JSON.stringify({
      keyboard: [
        ['Yes, you are the bot of my life ❤'],
        ['No, sorry there is another one...']
      ]
    })
  };
  bot.sendMessage(msg.chat.id, 'Do you love me?', opts);
});


// Matches /echo [whatever]
bot.onText(/\/echo (.+)/, function onEchoText(msg, match) {
  const resp = match[1];
  bot.sendMessage(msg.chat.id, resp);
});


// Matches /editable
bot.onText(/\/editable/, function onEditableText(msg) {
  const opts = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Edit Text',
            // we shall check for this value when we listen
            // for "callback_query"
            callback_data: 'edit'
          }
        ]
      ]
    }
  };
  bot.sendMessage(msg.from.id, 'Original Text', opts);
});


// Handle callback queries
bot.on('callback_query', function onCallbackQuery(callbackQuery) {
  const action = callbackQuery.data;
  const msg = callbackQuery.message;
  const opts = {
    chat_id: msg.chat.id,
    message_id: msg.message_id,
  };
  let text;

  if (action === 'edit') {
    text = 'Edited Text';
  }

  bot.editMessageText(text, opts);
});*/