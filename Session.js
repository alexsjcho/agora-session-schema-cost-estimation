// import { hostTotalAggregateVideoResolution } from "./util/aggregateVideoResolution";

//TODO: convert to Typescript in the future
//TODO: fix import of totalResolutionForUser()

class Session {
  constructor(
    maxMinuteDuration,
    maxHostAggregateResolution,
    maxAudienceAggregateResolution,
    maxHostCount,
    maxAudienceCount,
    sessionMode,
    hostStreamingMode,
    audienceStreamingMode
  ) {
    this.maxMinuteDuration = maxMinuteDuration;
    this.maxHostAggregateResolution = maxHostAggregateResolution;
    this.maxAudienceAggregateResolution = maxAudienceAggregateResolution;
    this.maxHostCount = maxHostCount;
    this.maxAudienceCount = maxAudienceCount;
    //can be either "broadcast" or "communication"
    this.sessionMode = sessionMode;
    //host streaming mode is always premium for low latency
    this.hostStreamingMode = hostStreamingMode;
    //audence streaming mode can be either "premium" or "standard"
    this.audienceStreamingMode = audienceStreamingMode;
  }

  hostsTotalAggregateVideoResolution(
    sessionUserConfig = { totalHostCount, hostVideoProfile }
  ) {
    return totalResolutionForUser(videoProfile, totalUserCount);
  }

  audienceTotalAggregateVideoResolution(sessionUserConfig) {
    return totalResolutionForUser(
      sessionUserConfig.hostVideoProfile,
      sessionUserConfig.totalHostCount,
      false
    );
  }

  calculateMaxSessionCost(
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
  }

  totalResolutionForUser(videoProfile, totalUserCount, notSubLocalHostLogic) {
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
  }
}

export default Session;

/*
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




export default {
  sessionConfig,
  sessionUserConfig,
  calculateSessionCost,
  hostsTotalAggregateVideoResolution,
  audienceTotalAggregateVideoResolution,
};
*/
