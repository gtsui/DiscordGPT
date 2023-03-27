let promptTokens = 0;
let completionTokens = 0;

const updatePromptTokens = (newPromptTokens) => {
  promptTokens += newPromptTokens;
}

const updateCompletionTokens = (newCompletionTokens) => {
  completionTokens += newCompletionTokens;
}

const getCost = () => {
  // GPT-3.5-turbo costs
  return 0.002 * (promptTokens + completionTokens) / 1000;
}

const getCostSummary = () => {
  let cost = getCost();
  let costStr = cost.toFixed(5);
  
  return ("Prompt Tokens: " + promptTokens + "\nCompletion Tokens: " + completionTokens + "\nCumulative Cost: $" + costStr);
}

const splitMsgToChunks = (message, maxLength = 2000) {
  if (message.length <= maxLength) return [message];

  const messageParts = [];
  let currentPart = '';

  for (const word of message.split(' ')) {
    if (currentPart.length + word.length + 1 > maxLength) {
      messageParts.push(currentPart);
      currentPart = '';
    }

    if (currentPart.length > 0) {
      currentPart += ' ';
    }

    currentPart += word;
  }

  messageParts.push(currentPart);
  return messageParts;
}

exports.promptTokens = promptTokens;
exports.completionTokens = completionTokens;
exports.updatePromptTokens = updatePromptTokens;
exports.updateCompletionTokens = updateCompletionTokens;
exports.getCostSummary = getCostSummary;
exports.splitMsgToChunks = splitMsgToChunks;
