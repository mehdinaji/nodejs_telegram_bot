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
  const firstName = msg.from.first_name || "دوست عزیز"; 
  const now = new Date();

  const timeString = now.toLocaleTimeString("fa-IR", { timeZone: "Asia/Tehran" });

  bot.sendMessage(chatId, `سلام ${firstName} 👋\n⏰ زمان فعلی (ساعت ایران): ${timeString}`);
});
