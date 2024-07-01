const axios = require('axios');

const Prefixes = [
  'heru',
  'rona',
];

module.exports = {
  config: {
    name: "ai2",
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
        await message.reply("📝 𝗛𝗲𝗿𝘂 𝗕𝗹𝗮𝗸𝗰𝗯𝗼𝘅:\n\nHello! How can I assist you today.");
        return;
      }

      const response = await axios.get(`https://blackbox-api-6bpp.onrender.com/api/blackbox?prompt=${encodeURIComponent(prompt)}`);
      const answer = response.data.answer;

      await message.reply(`📝 𝗛𝗲𝗿𝘂 𝗕𝗹𝗮𝗸𝗰𝗯𝗼𝘅:\n\n${answer}`);

    } catch (error) {
      console.error("Error:", error.message);
    }
  }
};
