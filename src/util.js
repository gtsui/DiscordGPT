let promptTokens = 0;
let completionTokens = 0;

const getCost = (newPromptTokens, newCompletionTokens) => {
  // GPT-3.5-turbo costs
  promptTokens += newPromptTokens;
  completionTokens += newCompletionTokens;
  return 0.002 * (promptTokens + completionTokens) / 1000;
}

const printCost = (newPromptTokens, newCompletionTokens) => {
  let cost = getCost(newPromptTokens, newCompletionTokens);
 
  console.log("Prompt Tokens: " + promptTokens);
  console.log("Completion Tokens: " + completionTokens);
  console.log("Cumulative Cost: $" + cost);
}


exports.promptTokens = promptTokens;
exports.completionTokens = completionTokens;
exports.getCost = getCost;
exports.printCost = printCost;
