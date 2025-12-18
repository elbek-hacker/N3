import { Markup, Telegraf } from "telegraf";
import axios from "axios";
import { config } from "dotenv";

config();

const bot = new Telegraf(process.env.BOT_TOKEN);
const WEATHER_API = process.env.WEATHER_API;

const userLang = {};

const cities = [
    { name: "Toshkent", value: "Tashkent" },
    { name: "Samarqand", value: "Samarqand" },
    { name: "Buxoro", value: "Bukhara" },
    { name: "Andijon", value: "Andijan" },
    { name: "Namangan", value: "Namangan" },
    { name: "Farg'ona", value: "Fergana" },
    { name: "Nukus", value: "Nukus" },
    { name: "Qarshi", value: "Qarshi" },
    { name: "Jizzax", value: "Jizzakh" },
    { name: "Termiz", value: "Termez" },
];
const weatherTranslate = {
    "clear sky": "ochiq osmon",
    "few clouds": "kam bulutli",
    "scattered clouds": "tarqoq bulutli",
    "broken clouds": "bulutli",
    "overcast clouds": "qalin bulutli",
    "light rain": "yengil yomg'ir",
    "moderate rain": "o'rtacha yomg'ir",
    "heavy intensity rain": "kuchli yomg'ir",
    "light snow": "yengil qor",
    "snow": "qor",
    "mist": "tuman",
    "fog": "qalin tuman"
}

const text = {
    uz: {
        chooseLang: "🌐 Tilni tanlang:",
        chooseCity: "📍 Viloyatni tanlang:",
        chooseType: "Qaysi ob-havoni ko'rmoqchisiz?",
        today: "Bugun",
        fiveDays: "5 kunlik",
        back: "Orqaga",
        sunrise: "Quyosh chiqishi",
        sunset: "Quyosh botishi",
        wind: "Shamol"
    },
    ru: {
        chooseLang: "🌐 Выберите язык:",
        chooseCity: "📍 Выберите город:",
        chooseType: "Какую погоду показать?",
        today: "Сегодня",
        fiveDays: "5 дней",
        back: "Назад",
        sunrise: "Восход солнца",
        sunset: "Закат солнца",
        wind: "Ветер"
    },
    en: {
        chooseLang: "🌐 Choose language:",
        chooseCity: "📍 Choose city:",
        chooseType: "Which weather?",
        today: "Today",
        fiveDays: "5 days",
        back: "Back",
        sunrise: "Sunrise",
        sunset: "Sunset",
        wind: "Wind"
    },
};

function formatTime(unix){
    return new Date(unix * 1000).toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit"
    });
}

function translate(desc, lang){
    if ( lang === "uz") return weatherTranslate[desc] || desc;
    return desc;
};

bot.start(async (ctx) =>{
    await ctx.reply(text.uz.chooseLang,
        Markup.inlineKeyboard([
            [Markup.button.callback("🇺🇿 O'zbek", "lang_uz")],
            [Markup.button.callback("🇷🇺 Русский", "lang_ru")],
            [Markup.button.callback("🇬🇧 English", "lang_en")],
        ])
    );
    console.log(ctx.message);
});

bot.action(/lang_(.+)/, async (ctx) => {
    const lang = ctx.match[1];
    userLang[ctx.chat.id] = lang;

    await ctx.editMessageText(
        text[lang].chooseCity,
        Markup.inlineKeyboard(
            cities.map((c) => [
                Markup.button.callback(c.name, `city_${c.value}`)
            ])
        )
    );
});

bot.action(/city_(.+)/, async (ctx) => {
  const city = ctx.match[1];
  const lang = userLang[ctx.chat.id] || "uz";

  await ctx.editMessageText(
    `📍 ${city}\n${text[lang].chooseType}`,
    Markup.inlineKeyboard([
      [
        Markup.button.callback(
          `🌞 ${text[lang].today}`,
          `today_${city}`
        ),
      ],
      [
        Markup.button.callback(
          `📅 ${text[lang].fiveDays}`,
          `5days_${city}`
        ),
      ],
      [Markup.button.callback(`🔙 ${text[lang].back}`, "back")],
    ])
  );
});

bot.action("back", async (ctx) => {
    const lang = userLang[ctx.chat.id] || "uz";
    await ctx.editMessageText(
        text[lang].chooseCity,
        Markup.inlineKeyboard(
        cities.map((c) => [
            Markup.button.callback(c.name, `city_${c.value}`),
        ])
        )
    );
});

bot.action(/(today|5days)_(.+)/, async (ctx) => {
    const type = ctx.match[1];
    const city = ctx.match[2];
    const lang = userLang[ctx.chat.id] || "uz";
  
    try {
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${WEATHER_API}&units=metric&lang=en`;
      const { data } = await axios.get(url);
  
      let msg = `📍 ${data.city.name}\n\n`;
  
      if (type === "today") {
        const d = data.list[0];
        msg += `🌡 ${d.main.temp}°C
  🌥 ${translate(d.weather[0].description, lang)}
   ${text[lang].wind}: ${d.wind.speed} m/s
  
  🌅 ${text[lang].sunrise}: ${formatTime(data.city.sunrise)}
  🌇 ${text[lang].sunset}: ${formatTime(data.city.sunset)}`;
      }
  
      if (type === "5days") {
        const days = data.list.filter((i) =>
          i.dt_txt.includes("12:00:00")
        );
  
        days.forEach((d) => {
          const date = new Date(d.dt_txt).toLocaleDateString(
            lang === "ru" ? "ru-RU" : lang === "en" ? "en-US" : "uz-UZ",
            { weekday: "long", day: "numeric", month: "long" }
          );
  
          msg += `🗓 ${date}
  🌡 ${d.main.temp}°C
  🌥 ${translate(d.weather[0].description, lang)}
   ${text[lang].wind}: ${d.wind.speed} m/s\n\n`;
        });
      }
  
      await ctx.editMessageText(
        msg,
        Markup.inlineKeyboard([
          [Markup.button.callback(`🔙 ${text[lang].back}`, "back")],
        ])
      );
    } catch (e) {
      await ctx.reply("❌ Xatolik yuz berdi");
    }
  });
  bot.help(async (ctx)=>{
      ctx.reply('Iltimos kuting, Aloqaga chiqamiz! yoki @KHAN_07_07 ga aloqaga chiqing!');
      console.log(ctx.message);
  })

bot.launch();
console.log("Bot ishga tushdi");