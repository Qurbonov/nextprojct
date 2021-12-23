const TelegramBot = require("node-telegram-bot-api");
var emoji = require("node-emoji").emoji;
var util = require("util");

const token = "5084352550:AAHOT5sR4IAGxkzslJwAXhEWOuOTBztN73U";

const bot = new TelegramBot(token, {
  polling: true,
  request: {
    proxy: "http://192.168.7.251:3128 ",
  },
});

bot.on("polling_error", console.log);

var answerCallbacks = {};
bot.on("message", function (message) {
  var callback = answerCallbacks[message.chat.id];
  if (callback) {
    delete answerCallbacks[message.chat.id];
    return callback(message);
  }
});

bot.onText(/^\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    emoji.house_with_garden + " Savdoda omad yor bo'lsin !"
  );
  bot
    .sendMessage(msg.chat.id, "Foydalanuvchi mobil telefon raqami ", option)
    .then(() => {
      bot.once("contact", (msg) => {
        ph_number = msg.contact.phone_number;
      });
    });
});

// bot.on("message", (msg) => {
//   console.log(msg.text);
//   var Hi = "Ism sharif kiritish";
//   if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
//     bot.sendMessage(msg.chat.id, "Hello dear user");
//   }
// });
// bot.sendMessage(
//   msg.chat.id,
// emoji.house_with_garden +
//   "Savdoda omad yor bo'lsin ! " +
//   "  " +
//   "/tuman tanlang.",
//   { parse_mode: "HTML" }
// );
// });
