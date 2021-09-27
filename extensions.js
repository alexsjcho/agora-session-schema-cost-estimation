import { calculateCostBasedOnMinutes } from "./util/costBasedOnMinutes.js";
import { speechToTextTranscriptionPerMinuteCost } from "./data/unitPrice.js";

export const addSpeechToTextExtension = (session) => {
  session.hasSpeechToTextExtension = true;
  const calculateExtensionCost = () => {
    let extensionCost = calculateCostBasedOnMinutes(
      session.maxMinuteDuration,
      speechToTextTranscriptionPerMinuteCost
    );
    return extensionCost;
  };
  session.speechToTextExtension = calculateExtensionCost();
};
