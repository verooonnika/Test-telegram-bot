const TOKEN = '1130761603:AAHXziE5hJkYqxxGVDo8Op-eDX63SJpdiCM';
const TelegramBot = require('node-telegram-bot-api');
const options = {
  polling: true
};
const bot = new TelegramBot(TOKEN, options);



var r = '' ;

var contactId = '';

var jsforce = require('jsforce');
var conn = new jsforce.Connection();
/*
conn.login('expenseapplication@sccraft.com', 'asdfg123', function(err, res) {

  if (err) { return console.error(err); }
  conn.query('SELECT Id, Name FROM Account LIMIT 1', function(err, res) {
    if (err) { return console.error(err); }
    r = res.records[0].Name;
  });
}); */

/*bot.on('message', msg => {
  bot.sendMessage(msg.chat.id, `Veronika klubnika ${msg.from.first_name} bla bla ${r}`);
});*/

// Matches /echo [whatever]
/*bot.onText(/\/name/, function onEchoText(msg) {
  conn.login('expenseapplication@sccraft.com', 'asdfg123', function(err, res) {

    if (err) { return console.error(err); }
    conn.query('SELECT Id, Name FROM Account LIMIT 1', function(err, res) {
      if (err) { return console.error(err); }
      r = res.records[0].Name;
      contactId = res.records[0].Id;
      console.log('sdkfjs');
    });
  });
  bot.sendMessage(msg.chat.id, r);
}); */


bot.onText(/\/start/, function onEchoText(msg) {
  var login = '';
  conn.login('expenseapplication@sccraft.com', 'asdfg123', function(err, res) {

    if (err) { return console.error(err); }
  });
  bot.sendMessage(msg.chat.id, 'Введите логин: ').then( msg => {
    bot.onText(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, msg => {
      login = msg.text;
      bot.sendMessage(msg.chat.id, 'Введите пароль: ').then(msg => {
        bot.on('message', msg => {
          var password = msg.text;
          console.log('login', login);
          console.log('password', password);
          conn.query(
            "SELECT Id, Name, Email FROM Contact " +
            "WHERE Email = '" + login + "' "  +
            "AND Password__c = '" + password + "' "  +
            "LIMIT 1", function (err, res) {
              if (err) {  bot.sendMessage(msg.chat.id, 'Invalid login or password ');
              return console.error('err', err); 
            } else { 
              console.log(res.records[0].Id);
            bot.sendMessage(msg.chat.id, 'Авторизация прошла успешно!' + res.records[0].Id); 
            }
          });

        })
      })
    })
  });
});

/*bot.onText(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, function onEchoText(msg) {

  console.log(msg.text);
  var login = msg.text;
  bot.sendMessage(msg.chat.id, 'Введите пароль: ');

  bot.on('message', msg => {

    var password = msg.text;

    conn.query(
      "SELECT Id, Name, Email FROM Contact " +
      "WHERE Email = '" + login + "' "  +
      "AND Password__c = '" + password + "' "  +
      "LIMIT 1", function (err, res) {
        if (err) {  bot.sendMessage(msg.chat.id, 'Invalid login or password ');
        return console.error('err', err); 
      }

        const opts = {
          reply_markup: JSON.stringify({
            inline_keyboard: [
              [{"text":"Текущий баланс","callback_data":"balance"},
              {"text":"Создать карточку","callback_data":"new-card"}]
            ] 
          })
      };
  
      bot.sendMessage(msg.chat.id, 'Авторизация прошла успешно!', opts); 

      });

});
});

bot.on('callback_query', callbackQuery => {
  var answer = callbackQuery.data;
  const msg = callbackQuery.message;
  if(answer == 'new-card'){
 console.log(answer);
    const opts = {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{"text":"Сегодня","callback_data":"today"},
          {"text":"Календарь","callback_data":"calendar"},
          {"text":"Отмена","callback_data":"cancel"}]
        ] 
      })
  };

  bot.sendMessage(msg.chat.id, 'На какой день желаете создать карточку?', opts); 

  bot.on('callback_query', callbackQuery => {
    var answer = callbackQuery.data;
    var cardDate;
    if(answer == 'today'){
      console.log(answer);
      cardDate = new Date('2020-03-19');
    } else if(answer == 'calendar'){
      console.log(answer);

    } else if(answer == 'cancel'){
      console.log(answer);

    }
    console.log(contactId);
    console.log(cardDate);
    conn.sobject("Expense_Card__c").create({ 
      Card_Keeper__c : contactId,
      Card_Date__c : cardDate
      //Amount__c : '10'
    }, function(err, ret) {
      if (err || !ret.success) { return console.error(err, ret); }
      console.log("Created record id : " + ret.id);
      // ...
    });
  })
  }


});

*/




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