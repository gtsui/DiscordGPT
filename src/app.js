const dotenv = require("dotenv");
dotenv.config();

const { client, openai, history } = require("./config.js");
const { promptTokens, completionTokens, getCost, getCostSummary } = require("./util.js");

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
  
  // Replace 'your-bot-prefix' with your desired bot prefix (e.g., !, ?, etc.)
  const PREFIX = '?';

  if (message.author.bot || !message.content.startsWith(PREFIX)){
    return;
  }
  
  const inputText = message.content.slice(PREFIX.length).trim();
  console.log(inputText);  
  
  // Retrieve conversation history for the current channel, or create a new one if it doesn't exist
  const channelId = message.channel.id;
  if (!history[channelId]) {
    history[channelId] = [];
  }

  // Command to delete conversation history
  if(message.content === "?HISTORY.CLEAR") {
    history[channelId] = {};
    message.channel.send("Conversation history cleared.");
  } else if(message.content === "?COST") {
    let costSummary = getCostSummary();
    message.channel.send(costSummary);
  }
  
  // Add user message to the conversation history
  history[channelId].push({ role: 'user', content: inputText });

  // Generate a response using the conversation history as context
  const response = await chatGPT(history[channelId]);

  // Add the bot's response to the conversation history
  history[channelId].push({ role: 'bot', content: response });

  const output = "[MODEL: gpt-3.5-turbo]\n" + response;
  
  message.channel.send(output);
});

async function chatGPT(history) {

  // Convert the conversation history into a formatted prompt for ChatGPT-4
  const prompt = history.map(msg => `${msg.role}: ${msg.content}`).join('\n') + '\nbot:';
  
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [ {role: "user", content: prompt }]
    });

    // Update token/cost usage
    let usage = response.data.usage;
    promptTokens += usage.prompt_tokens;
    completionTokens += usage.completionTokens;
    console.log(getCostSummary());
    
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error(error);
    return 'Error: Unable to communicate with ChatGPT-4.';
  }
}

client.login(process.env.DISCORD_BOT_TOKEN);
