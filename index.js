const TelegramBot = require("node-telegram-bot-api");
var emoji = require("node-emoji").emoji;
var util = require("util");
require("dotenv").config();
const token = process.env.token;
console.log(process.env.token);
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

bot.onText(/\/start/, (msg) => {
  bot
    .sendMessage(
      msg.chat.id,
      emoji.house_with_garden + " Savdoda omad yor bo'lsin !!!"
    )
    .then(() => {
      bot
        .sendMessage(
          msg.chat.id,
          emoji.house_with_garden + "ism sharif kiriting !"
        )
        .then(() => {
          var option = {
            parse_mode: "HTML",
            parse_mode: "Markdown",
            reply_markup: {
              one_time_keyboard: true,
              resize_keyboard: true,
              keyboard: [
                [
                  {
                    text: "Telefon nomerni yuborish",
                    request_contact: true,
                  },
                ],
              ],
            },
          };
          bot
            .sendMessage(
              msg.chat.id,
              "Foydalanuvchi mobil telefon raqami ",
              option
            )
            .then(() => {
              bot.once("contact", (msg) => {
                ph_number = msg.contact.phone_number;

                bot.sendMessage(
                  msg.chat.id,
                  emoji.round_pushpin + "Hudud: Toshkent shahar",
                  {
                    reply_markup: {
                      resize_keyboard: true,
                      inline_keyboard: [
                        [
                          {
                            text: "Bektemir tumani",
                            callback_data: "Bektemir tumani",
                          },
                          {
                            text: "Chilonzor tumani",
                            callback_data: "Chilonzor tumani",
                          },
                        ],
                        [
                          {
                            text: "Yashnobod tumani",
                            callback_data: "Yashnobod tumani",
                          },
                          {
                            text: "Mirobod tumani",
                            callback_data: "Mirobod tumani",
                          },
                        ],
                        [
                          {
                            text: "Mirzo Ulugʻbek tumani",
                            callback_data: "Mirzo Ulugʻbek tumani",
                          },
                          {
                            text: "Sergeli tumani",
                            callback_data: "Sergeli tumani",
                          },
                        ],
                        [
                          {
                            text: "Shayxontohur tumani",
                            callback_data: "Shayxontohur tumani",
                          },
                          {
                            text: "Olmazor tumani[",
                            callback_data: "Olmazor tumani[",
                          },
                        ],
                        [
                          {
                            text: "Uchtepa tumani",
                            callback_data: "Uchtepa tumani",
                          },
                          {
                            text: "Yakkasaroy tumani",
                            callback_data: "Yakkasaroy tumani",
                          },
                        ],
                        [
                          {
                            text: "Yunusobod tumani",
                            callback_data: "Yunusobod tumani",
                          },
                          {
                            text: "Yangihayot tumani",
                            callback_data: "Yangihayot tumani",
                          },
                        ],
                      ],
                    },
                  }
                );
              });
              let tuman = "";
              bot.on("callback_query", (callbackQuery) => {
                tuman = callbackQuery.data;

                bot.answerCallbackQuery(callbackQuery.id).then(() =>
                  bot
                    .sendMessage(
                      msg.chat.id,
                      "Toshkent shahar, " +
                        callbackQuery.data +
                        ". <b> Uy manzilni kiriting: </b>",
                      { parse_mode: "HTML" }
                    )
                    .then(() => {
                      answerCallbacks[msg.chat.id] = function (answer) {
                        var uymanzil = answer.text;
                        bot
                          .sendMessage(
                            msg.chat.id,
                            "Toshkent shahar, " +
                              callbackQuery.data +
                              ", " +
                              uymanzil
                          )
                          .then(() => {
                            answerCallbacks[msg.chat.id] = function (answer) {
                              var option = {
                                parse_mode: "HTML",
                                parse_mode: "Markdown",
                                reply_markup: {
                                  one_time_keyboard: true,
                                  resize_keyboard: true,
                                  keyboard: [
                                    [
                                      {
                                        text: "Telefon nomerni yuborish",
                                        request_contact: true,
                                      },
                                    ],
                                  ],
                                },
                              };
                              bot.sendMessage(
                                msg.chat.id,
                                "Foydalanuvchi mobil telefon raqami ",
                                option
                              );

                              // console.log(msg.text);
                              // if (msg.text.includes("aloqa")) {
                              //   bot.sendMessage(msg.chat.id, "msg.contact.phone_number");
                              // }
                            };
                          });
                      };
                    })
                );
              });
            });
        });
    });
});
