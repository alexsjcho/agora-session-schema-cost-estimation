import { RESOLUTION } from "../constants/constants.js";

const totalResolutionForUser = (
  videoProfile,
  totalUserCount,
  notSubLocalHostLogic
) => {
  let aggregateHostVideoResolution = 0;
  if (notSubLocalHostLogic === true) {
    aggregateHostVideoResolution = totalUserCount - 1;
  } else {
    aggregateHostVideoResolution = totalUserCount;
  }
  switch (videoProfile) {
    case 120:
      return 120 * 160 * totalUserCount;
    case 180:
      return 180 * 320 * totalUserCount;
    case 240:
      return 240 * 320 * totalUserCount;
    case 360:
      return 360 * 640 * totalUserCount;
    case 480:
      return 480 * 640 * totalUserCount;
    case 720:
      return 720 * 1280 * totalUserCount;
    case 1080:
      return 1080 * 1920 * totalUserCount;
    default:
      return 120 * 160;
  }
};

const videoStreamingVariant = (resolutionValue) => {
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

export const totalAggregateVideoResolution = (
  videoProfile,
  totalUserCount,
  notSubLocalHostLogic
) => {
  const value = totalResolutionForUser(
    videoProfile,
    totalUserCount,
    notSubLocalHostLogic
  );
  const resolution = videoStreamingVariant(value);
  return resolution;
};
