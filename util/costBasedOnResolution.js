import { RESOLUTION, AUDIENCETYPE } from "../constants/constants.js";
import {
  standardStreamingPrice,
  premiumStreamingPrice,
  cloudRecordingPrice,
} from "../data/unitPrice.js";

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
  switch (audience) {
    case AUDIENCETYPE.STANDARD:
      switch (resolution) {
        case RESOLUTION.HD:
          return standardStreamingPrice.standardHdCost;
        case RESOLUTION.FULLHD:
          return standardStreamingPrice.standardFullHDCost;
        case RESOLUTION.TWOK:
          return standardStreamingPrice.standard2KCost;
        case RESOLUTION.TWOKPLUS:
          return standardStreamingPrice.standard2KPlusCost;
        default:
          break;
      }
      break;
    case AUDIENCETYPE.PREMIUM:
      switch (resolution) {
        case RESOLUTION.HD:
          return premiumStreamingPrice.premiumHdCost;
        case RESOLUTION.FULLHD:
          return premiumStreamingPrice.premiumFullHdCost;
        case RESOLUTION.TWOK:
          return premiumStreamingPrice.premium2KCost;
        case RESOLUTION.TWOKPLUS:
          return premiumStreamingPrice.premium2KPlusCost;
        default:
          break;
      }
      break;
    default:
      break;
  }
};

export const calculateCloudRecordingChargePerMin = (resolution) => {
  switch (resolution) {
    case RESOLUTION.HD:
      return cloudRecordingPrice.recordingHdResolution;
    case RESOLUTION.FULLHD:
      return cloudRecordingPrice.recordingFullHdResolution;
    case RESOLUTION.TWOK:
      return cloudRecordingPrice.recording2kResolution;
    case RESOLUTION.TWOKPLUS:
      return cloudRecordingPrice.recording2kPlusResolution;
    default:
      break;
  }
};
