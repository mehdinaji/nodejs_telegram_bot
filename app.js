require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
  console.error("❌ Error: TELEGRAM_BOT_TOKEN is missing in .env file!");
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name || "دوست عزیز"; 

  bot.sendMessage(chatId, `سلام ${firstName} 👋\nلطفاً انتخاب کنید:`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: "⏰ ساعت", callback_data: "time" }],
        [{ text: "📅 تاریخ", callback_data: "date" }]
      ]
    }
  });
});

bot.on("callback_query", (query) => {
  const chatId = query.message.chat.id;
  const now = new Date();

  if (query.data === "time") {
    const timeString = now.toLocaleTimeString("fa-IR", { timeZone: "Asia/Tehran" });
    bot.sendMessage(chatId, `⏰ ساعت فعلی (ایران): ${timeString}`);
  } else if (query.data === "date") {
    const dateString = now.toLocaleDateString("fa-IR", { timeZone: "Asia/Tehran" });
    bot.sendMessage(chatId, `📅 تاریخ امروز (ایران): ${dateString}`);
  }

  bot.answerCallbackQuery(query.id);
});
