import { RESOLUTION, AUDIENCETYPE } from "../constants/constants.js";

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
  switch (audience.type) {
    case AUDIENCETYPE.STANDARD:
      switch (resolution) {
        case RESOLUTION.HD:
          return standardHdCost;
        case RESOLUTION.FULLHD:
          return standardFullHDCost;
        case RESOLUTION.TWOK:
          return standard2KCost;
        case RESOLUTION.TWOKPLUS:
          return standard2KPlusCost, totalMonthlyMin;
        default:
          break;
      }
      break;
    case "premium":
      switch (resolution) {
        case RESOLUTION.HD:
          return premiumHdCost, totalMonthlyMin;
        case RESOLUTION.FULLHD:
          return premiumFullHdCost, totalMonthlyMin;
        case RESOLUTION.TWOK:
          return premium2KCost, totalMonthlyMin;
        case RESOLUTION.TWOKPLUS:
          return premium2KPlusCost, totalMonthlyMin;
        default:
          break;
      }
      break;
    default:
      break;
  }
};
