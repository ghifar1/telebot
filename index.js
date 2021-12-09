import { Telegraf, Markup, Scenes } from "telegraf";
import { config } from "dotenv";
config();

const bot = new Telegraf(process.env.BOT_TOKEN);

const scenarioTypeScene = new Scenes.BaseScene("SCENARIO_TYPE_SCENE_ID");

scenarioTypeScene.enter((ctx) => {
    ctx.session
  ctx.reply(
    "Test",
    Markup.inlineKeyboard([Markup.button.callback("MyParmad", "myparmad")])
  );
});

scenarioTypeScene.action(ctx=>{
    ctx.repl
})

const keyboard = Markup.inlineKeyboard([
  Markup.button.callback("MyParmad", "login"),
]);

bot.start((ctx) => ctx.reply("Selamat Datang!", keyboard));
bot.action("login", (ctx) => {
  ctx.reply("Masukkan NIM :");
  bot.on("message", ctx =>{
      console.log("ok")
  })
});

bot.on('callback_query', (ctx) => {
    // Explicit usage
    ctx.telegram.answerCbQuery(ctx.callbackQuery.id)

    // Using context shortcut
    ctx.answerCbQuery()
  })

  bot.on('inline_query', (ctx) => {
    const result = []
    // Explicit usage
    ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, result)

    // Using context shortcut
    ctx.answerInlineQuery(result)
  })

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
