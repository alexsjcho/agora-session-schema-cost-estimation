import { totalAggregateVideoResolution } from "./util/aggregateVideoResolution.js";
import {
  calculateVideoStreamingVariant,
  calculateVideoStreamingChargePerMin,
} from "./util/costBasedOnResolution.js";

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

  calculateCommunicationModeMaxSessionCost(hostVideoProfile) {
    let sessionTotalCost;
    let sessionAggregateVideoResolution;
    let videoStreamingVariant;
    let costPerUserPerMin;
    let communicationSessionTotalCost;

    if ((this.sessionMode = "communication")) {
      sessionAggregateVideoResolution =
        this.maxHostCount *
        totalAggregateVideoResolution(
          hostVideoProfile,
          this.maxHostCount,
          true
        );
      videoStreamingVariant = calculateVideoStreamingVariant(
        sessionAggregateVideoResolution
      );
      costPerUserPerMin = calculateVideoStreamingChargePerMin(
        sessionAggregateVideoResolution,
        videoStreamingVariant
      );
      communicationSessionTotalCost = costPerUserPerMin * this.maxHostCount;
    }

    return { communicationSessionTotalCost };
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
