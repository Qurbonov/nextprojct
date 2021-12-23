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

bot.onText(/^\/start/, (msg) => {});
