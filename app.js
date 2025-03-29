require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
  console.error("❌ Error: TELEGRAM_BOT_TOKEN is missing in .env file!");
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/time/, (msg) => {
  const chatId = msg.chat.id;
  const now = new Date();
  const timeString = now.toLocaleTimeString("fa-IR");

  bot.sendMessage(chatId, `⏰ زمان فعلی: ${timeString}`);
});
