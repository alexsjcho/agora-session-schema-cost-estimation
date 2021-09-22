import { RESOLUTION, AUDIENCETYPE } from "../constants/constants.js";
import { standardStreaming, premiumStreaming } from "../data/unitPrice.js";

export const calculateVideoStreamingVariant = (resolutionValue) => {
  if (resolutionValue <= 921600) {
    return RESOLUTION.HD;
  } else if (resolutionValue > 921600 && resolutionValue <= 2073600) {
    return RESOLUTION.FULLHD;
  } else if (resolutionValue > 2073600 && resolutionValue <= 3686400) {
    return RESOLUTION.TWOK;
  } else if (resolutionValue > resolutionValue && resolutionValue <= 35251200) {
    return RESOLUTION.TWOKPLUS;
  }
};

export const calculateVideoStreamingChargePerMin = (audience, resolution) => {
  console.log("audience value:", audience);
  console.log("resolution value:", resolution);

  switch (audience) {
    case AUDIENCETYPE.STANDARD:
      switch (resolution) {
        case RESOLUTION.HD:
          return standardStreaming.standardHdCost;
        case RESOLUTION.FULLHD:
          return standardStreaming.standardFullHDCost;
        case RESOLUTION.TWOK:
          return standardStreaming.standard2KCost;
        case RESOLUTION.TWOKPLUS:
          return standardStreaming.standard2KPlusCost;
        default:
          break;
      }
      break;
    case AUDIENCETYPE.PREMIUM:
      switch (resolution) {
        case RESOLUTION.HD:
          return premiumStreaming.premiumHdCost;
        case RESOLUTION.FULLHD:
          return premiumStreaming.premiumFullHdCost;
        case RESOLUTION.TWOK:
          return premiumStreaming.premium2KCost;
        case RESOLUTION.TWOKPLUS:
          return premiumStreaming.premium2KPlusCost;
        default:
          break;
      }
      break;
    default:
      break;
  }
};
