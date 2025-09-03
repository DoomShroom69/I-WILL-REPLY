
import { Client, GatewayIntentBits } from "discord.js";
import OpenAI from "openai";

// Khởi tạo Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
});

// Kết nối OpenAI bằng API key (lưu trong Secrets)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Khi bot online
client.on("ready", () => {
  console.log(`✅ Bot đã đăng nhập: ${client.user.tag}`);
});

// Khi có tin nhắn mới
client.on("messageCreate", async (message) => {
  if (message.author.bot) return; // bỏ qua tin nhắn từ bot

  if (message.content.startsWith("!ask")) {
    const prompt = message.content.replace("!ask", "").trim();

    if (!prompt) {
      return message.reply("👉 Hãy nhập câu hỏi sau lệnh `!ask`");
    }

    try {
      // Gửi câu hỏi đến ChatGPT
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      });

      const reply = response.choices[0].message.content;
      message.reply(reply);
    } catch (err) {
      console.error("❌ Lỗi:", err);
      message.reply("⚠️ Có lỗi khi gọi ChatGPT!");
    }
  }
});

// Đăng nhập Discord bot
client.login(process.env.DISCORD_TOKEN);
