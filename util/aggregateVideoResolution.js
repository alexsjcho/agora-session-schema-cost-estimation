import { RESOLUTION } from "../constants/constants.js";

const totalResolutionForUser = (videoProfile, totalUserCount) => {
  let aggregateHostVideoResolution = 0;

  switch (videoProfile) {
    case 120:
      return (aggregateHostVideoResolution = 120 * 160 * totalUserCount);
    case 180:
      return (aggregateHostVideoResolution = 180 * 320 * totalUserCount);
    case 240:
      return (aggregateHostVideoResolution = 240 * 320 * totalUserCount);
    case 360:
      return (aggregateHostVideoResolution = 360 * 640 * totalUserCount);
    case 480:
      return (aggregateHostVideoResolution = 480 * 640 * totalUserCount);
    case 720:
      return (aggregateHostVideoResolution = 720 * 1280 * totalUserCount);
    case 1080:
      return (aggregateHostVideoResolution = 1080 * 1920 * totalUserCount);
    default:
      return (aggregateHostVideoResolution = 120 * 160 * totalUserCount);
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
  subtractLocalHostResolution
) => {
  const value = totalResolutionForUser(
    videoProfile,
    totalUserCount,
    subtractLocalHostResolution
  );
  const resolution = videoStreamingVariant(value);
  return resolution;
};
