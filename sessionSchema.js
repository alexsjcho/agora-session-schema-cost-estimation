// import { hostTotalAggregateVideoResolution } from "./util/aggregateVideoResolution";

//TODO: convert to Typescript in the future
//TODO: fix import of totalResolutionForUser()

const sessionConfig = {
  //number
  duration: 0,
  //string: "communication", "broadcast"
  mode: "communication",
  //number
  hostCount: 1,
  //number
  audienceCount: 0,
  //number
  hostMaxAggregateVideoResolution: 921600,
  //number
  maxAudienceAggregateVideoResoltuion: 2073600,
};

const sessionUserConfig = {
  //number
  totalHostCount: 4,
  //number
  totalAudienceCount: 0,
  //number
  hostVideoProfile: 720,
  //string: "premium","standard"
  audienceStreamingType: null,
  //string: "premium"
  hostStreamingType: "premium",
};

const hostsTotalAggregateVideoResolution = (
  sessionUserConfig = { totalHostCount, hostVideoProfile }
) => {
  return totalResolutionForUser(videoProfile, totalUserCount);
};

const audienceTotalAggregateVideoResolution = (sessionUserConfig) => {
  return totalResolutionForUser(
    sessionUserConfig.hostVideoProfile,
    sessionUserConfig.totalHostCount,
    false
  );
};

const calculateSessionCost = function (
  sessionConfig,
  sessionUserConfig,
  hostsTotalAggregateVideoResolution
) {
  let hostCost, audienceCost;

  if ((sessionConfig.mode = "communication")) {
    hostCost =
      sessionUserConfig.totalHostCount * hostsTotalAggregateVideoResolution;
  } else {
    hostCost =
      sessionUserConfig.totalHostCount * hostsTotalAggregateVideoResolution;
    audienceCost =
      sessionUserConfig.totalAudienceCount *
      audiencesTotalAggregateVideoResolution;
  }
};

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

export default {
  sessionConfig,
  sessionUserConfig,
  calculateSessionCost,
  hostsTotalAggregateVideoResolution,
  audienceTotalAggregateVideoResolution,
};
