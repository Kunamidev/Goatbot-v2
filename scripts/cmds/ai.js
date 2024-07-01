const axios = require('axios');

const Prefixes = [
  'AI',
  'ai',
  'aI',
  'Ai',
];

module.exports = {
  config: {
    name: "ai",
    version: 1.0,
    author: "Kaizenji",
    longDescription: "ai no prefix",
    category: "ai",
    guide: {
      en: "{p} ask",
    },
  },
  onStart: async function () {},
  onChat: async function ({ api, event, args, message }) {
    try {
      
      const prefix = Prefixes.find((p) => event.body && event.body.toLowerCase().startsWith(p));
      if (!prefix) {
        return; // Invalid prefix, ignore the command
      }
      const prompt = event.body.substring(prefix.length).trim();
      if (!prompt) {
        await message.reply("📝 𝐇𝐞𝐫𝐮 𝐁𝐥𝐚𝐤𝐜𝐛𝐨𝐱:\n\nHello! How can I assist you today.");
        return;
      }

      // Set searching reaction
      await api.setMessageReaction("⌛", event.messageID);

      // Inform user that the search is in progress
      await message.reply("Searching please wait...");

      const response = await axios.get(`https://blackbox-api-6bpp.onrender.com/api/blackbox?prompt=${encodeURIComponent(prompt)}`);
      const answer = response.data.answer;

      // Set fetched reaction
      await api.setMessageReaction("✅", event.messageID);

      await message.reply(`📝 𝐇𝐞𝐫𝐮 𝐁𝐥𝐚𝐤𝐜𝐛𝐨𝐱:\n\n${answer}`);

    } catch (error) {
      console.error("Error:", error.message);
    }
  }
};
