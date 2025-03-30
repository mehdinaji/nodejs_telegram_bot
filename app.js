require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
  console.error("❌ Error: TELEGRAM_BOT_TOKEN is missing in .env file!");
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

const activeChats = new Set();

const getTime = () => new Date().toLocaleTimeString("fa-IR", { timeZone: "Asia/Tehran" });

setInterval(() => {
  activeChats.forEach(chatId => {
    bot.sendMessage(chatId, `⏰ ساعت فعلی (ایران): ${getTime()}`);
  });
}, 15 * 60 * 1000); 

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "سلام! 👋 برای استفاده از ربات، روی دکمه زیر کلیک کنید:", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "🚀 شروع", callback_data: "start_menu" }]
      ]
    }
  });
});

bot.on("callback_query", (query) => {
  const chatId = query.message.chat.id;
  
  if (query.data === "start_menu") {
    bot.sendMessage(chatId, "لطفاً یک گزینه را انتخاب کنید:", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "⏰ دریافت ساعت", callback_data: "time" }],
          [{ text: "📅 دریافت تاریخ", callback_data: "date" }],
          [{ text: "🔔 فعال‌سازی اعلان خودکار", callback_data: "start_auto" }],
          [{ text: "⏹ توقف اعلان", callback_data: "stop_auto" }]
        ]
      }
    });
  } else if (query.data === "time") {
    bot.sendMessage(chatId, `⏰ ساعت فعلی (ایران): ${getTime()}`);
  } else if (query.data === "date") {
    bot.sendMessage(chatId, `📅 تاریخ امروز (ایران): ${new Date().toLocaleDateString("fa-IR", { timeZone: "Asia/Tehran" })}`);
  } else if (query.data === "start_auto") {
    activeChats.add(chatId);
    bot.sendMessage(chatId, "✅ اعلان خودکار ساعت فعال شد. هر ۱۵ دقیقه ساعت برای شما ارسال خواهد شد.");
  } else if (query.data === "stop_auto") {
    activeChats.delete(chatId);
    bot.sendMessage(chatId, "⏹ اعلان خودکار ساعت متوقف شد.");
  }

  bot.answerCallbackQuery(query.id);
});