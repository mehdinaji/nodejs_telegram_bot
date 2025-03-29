const TelegramBot = require('node-telegram-bot-api');

const token = '7742267767:AAHcptlWkEL1ceBmvH5H4FfPkOf40k27-tA';

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/time/, (msg) => {
  const chatId = msg.chat.id;
  const now = new Date();
  const timeString = now.toLocaleTimeString("fa-IR"); 

  bot.sendMessage(chatId, `⏰ زمان فعلی: ${timeString}`)
  });