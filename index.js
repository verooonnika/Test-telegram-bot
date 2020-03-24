const TOKEN = '1130761603:AAHXziE5hJkYqxxGVDo8Op-eDX63SJpdiCM';
const TelegramBot = require('node-telegram-bot-api');
const options = {
  polling: true
};
const bot = new TelegramBot(TOKEN, options);

var contactId = '';

var jsforce = require('jsforce');
var conn = new jsforce.Connection();

bot.onText(/\/start/, msg => {
  conn.login('expenseapplication@sccraft.com', 'asdfg123', function(err, res) {

    if (err) { return console.error(err); }
    else {
      bot.sendMessage(msg.chat.id, 'Введите логин: ');
      bot.onText(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, msg => {
        var login = msg.text;
        console.log(login);
        bot.sendMessage(msg.chat.id, 'Введите пароль: ');
        bot.on('message', msg =>{
          var password = msg.text;
          conn.query(
            "SELECT Id, Name, Email FROM Contact " +
            "WHERE Email = '" + login + "' "  +
            "AND Password__c = '" + password + "' "  +
            "LIMIT 1", function (err, res) {
              if (err) {  bot.sendMessage(msg.chat.id, 'Invalid login or password ');
              return console.error('err', err); 
            }
            contactId = res.records[0].Id;
            console.log('contactId' + contactId);

            const opts = {
              reply_markup: JSON.stringify({
                inline_keyboard: [
                  [{"text":"Текущий баланс","callback_data":"balance"},
                  {"text":"Создать карточку","callback_data":"new-card"}]
                ] 
              })
          };
      
          bot.sendMessage(msg.chat.id, 'Авторизация прошла успешно!', opts); 

          bot.on('callback_query', callbackQuery => {
            var answer = callbackQuery.data;
            const msg = callbackQuery.message;
            console.log(answer);
            if(answer == 'new-card'){
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
              var amount;
              var description;
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


            bot.sendMessage(msg.chat.id, 'Введите сумму: ');

            })

            } else if (answer == 'balance'){
              console.log(answer);
            }

          })
           // return contactId;
          })
        })


      })
    }
  });
})

/*bot.on('callback_query', callbackQuery => {
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
    var amount;
    var description;
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


    bot.sendMessage(msg.chat.id, 'Введите сумму: ');
    bot.on('message', msg => {
      amount = msg.text; 
      console.log(amount);
      bot.sendMessage(msg.chat.id, 'Введите описание: ');
      bot.on('message', msg => {
        description = msg.text;
        console.log(amount);
        console.log(description);


        conn.sobject("Expense_Card__c").create({ 
          Card_Keeper__c : contactId,
          Card_Date__c : cardDate,
          Amount__c : amount,
          Description__c : description
    
        }, function(err, ret) {
          if (err || !ret.success) { return console.error(err, ret); }
          console.log("Created record id : " + ret.id + ret.Amount__c + ret.Description__c);
          // ...
        })
      })
      
    })

  })
  }


});

function trylogin(msg, login, password){
  console.log('in trylogin' + login + password);
  conn.query(
    "SELECT Id, Name, Email FROM Contact " +
    "WHERE Email = '" + login + "' "  +
    "AND Password__c = '" + password + "' "  +
    "LIMIT 1", function (err, res) {
      if (err) {  bot.sendMessage(msg.chat.id, 'Invalid login or password ');
      return console.error('err', err); 
    }

    contactId = res.records[0].Id;
    console.log('contactId' + contactId);
    return contactId;
  })
}


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