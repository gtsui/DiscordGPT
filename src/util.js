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

exports.promptTokens = promptTokens;
exports.completionTokens = completionTokens;
exports.updatePromptTokens = updatePromptTokens;
exports.updateCompletionTokens = updateCompletionTokens;
exports.getCostSummary = getCostSummary;

