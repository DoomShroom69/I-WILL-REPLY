
import { Client, GatewayIntentBits } from "discord.js";
import OpenAI from "openai";

// Khởi tạo Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,             // Cho phép bot kết nối server
    GatewayIntentBits.GuildMessages,      // Đọc tin nhắn trong server
    GatewayIntentBits.MessageContent      // Đọc nội dung tin nhắn
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
  // Bỏ qua tin nhắn của bot
  if (message.author.bot) return;

  // Lệnh bắt đầu bằng !ask
  if (
