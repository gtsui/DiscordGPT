const Discord = require('discord.js');
const Openai = require('openai');
const dotenv = require("dotenv");

dotenv.config();

const { Client, GatewayIntentBits } = Discord;

const client = new Client(
  { intents:
    [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent
    ]
  }
);

// Replace 'your-openai-api-key' with your ChatGPT-4 API key
const configuration = new Openai.Configuration({
  apiKey: process.env.OPENAI_API_KEY
});

const openai = new Openai.OpenAIApi(configuration);

// Store conversation history for each channel
let history = {};

// Export necessary variables
exports.client = client;
exports.openai = openai;
exports.history = history;
