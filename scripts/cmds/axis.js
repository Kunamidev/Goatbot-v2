const axios = require('axios');

module.exports = {
  config: {
    name: 'axis',
    version: '1.0',
    author: 'LiANE @nealianacagara',
    role: 0,
    category: 'Ai-Chat',
    shortDescription: {
      en: ` A custom artificial intelligence designed and created by Liane Cagara with purpose to interact with users like you in a personalized and informative manner. Trained on a vast amount of text data.`
    },
    longDescription: {
      en: ` A custom artificial intelligence designed and created by Liane Cagara with purpose to interact with users like you in a personalized and informative manner. Trained on a vast amount of text data.`
    },
    guide: {
      en: '{pn}axis [query]'
    },
  },

  onStart: async function ({ api, event, args, usersData }) {
    try {
      const query = args.join(" ") || "hello";
      const { name } = (await usersData.get(event.senderID));

      if (query) {
        api.setMessageReaction("⏳", event.messageID, (err) => console.log(err), true);
        const processingMessage = await api.sendMessage(
          `Asking 🤖 Axis (LLM). Please wait a moment...`,
          event.threadID
        );

        const apiUrl = `https://liaspark.chatbotcommunity.ltd/@LianeAPI_Reworks/api/axis?key=j86bwkwo-8hako-12C&userName=${encodeURIComponent(name || "a user")}&query=${encodeURIComponent(query)}`;
        const response = await axios.get(apiUrl);

        if (response.data && response.data.message) {
          const trimmedMessage = response.data.message.trim();
          api.setMessageReaction("✅", event.messageID, (err) => console.log(err), true);
          await api.sendMessage({ body: trimmedMessage }, event.threadID, event.messageID);

          console.log(`Sent 🤖 Axis (LLM)'s response to the user`);
        } else {
          throw new Error(`Invalid or missing response from 🤖 Axis (LLM) API`);
        }

        await api.unsendMessage(processingMessage.messageID);
      }
    } catch (error) {
      console.error(`❌ | Failed to get 🤖 Axis (LLM)'s response: ${error.message}`);
      const errorMessage = `❌ | An error occurred. You can try typing your query again or resending it. There might be an issue with the server that's causing the problem, and it might resolve on retrying.`;
      api.sendMessage(errorMessage, event.threadID);
    }
  },
};
