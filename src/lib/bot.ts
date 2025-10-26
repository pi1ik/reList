import { Telegraf, Markup } from "telegraf";

const BOT_TOKEN = process.env.BOT_TOKEN!;
const PUBLIC_APP_URL = process.env.PUBLIC_APP_URL!;

if (!BOT_TOKEN) throw new Error("BOT_TOKEN is not set");
if (!PUBLIC_APP_URL) throw new Error("PUBLIC_APP_URL is not set");

export const bot = new Telegraf(BOT_TOKEN);

bot.start(async (ctx) => {
  console.log("/start triggered", ctx.from?.username);
  await ctx.reply(
    "👋 Привет! Открыть Mini App можно по кнопке ниже. Тест бот тест бот",
    Markup.inlineKeyboard([
      Markup.button.webApp("Открыть Mini App", PUBLIC_APP_URL),
    ])
  );
});

bot.help((ctx) => ctx.reply("Используй /start, чтобы открыть Mini App"));
