import { totalAggregateVideoResolution } from "./util/aggregateVideoResolution.js";
import {
  calculateVideoStreamingVariant,
  calculateVideoStreamingChargePerMin,
} from "./util/costBasedOnResolution.js";

//TODO: convert to Typescript in the future
//TODO: fix import of totalResolutionForUser()

class Session {
  //using Builder design pattern
  constructor({
    maxMinuteDuration,
    hostVideoProfile,
    maxHostAggregateResolution,
    maxAudienceAggregateResolution,
    maxHostCount,
    maxAudienceCount,
    sessionMode,
    audienceStreamingMode,
    isAudioOnly,
  } = {}) {
    this.maxMinuteDuration = maxMinuteDuration;
    this.hostVideoProfile = hostVideoProfile;
    this.maxHostAggregateResolution = maxHostAggregateResolution;
    this.maxAudienceAggregateResolution = maxAudienceAggregateResolution;
    this.maxHostCount = maxHostCount;
    this.maxAudienceCount = maxAudienceCount;
    //can be either "broadcast" or "communication"
    this.sessionMode = sessionMode;
    //host streaming mode is always premium for low latency
    this.hostStreamingMode = "premium";
    //audence streaming mode can be either "premium" or "standard"
    this.audienceStreamingMode = audienceStreamingMode;
    //boolean
    this.isAudioOnly = isAudioOnly;
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

  calculateMaxSessionCost() {
    let sessionTotalAggregateVideoResolutionValue,
      sessionVideoStreamingVariant,
      sessionVideoStreamingCharge,
      sessionTotalCost;

    if ((this.sessionMode = "communication")) {
      sessionTotalAggregateVideoResolutionValue = totalAggregateVideoResolution(
        this.hostVideoProfile,
        this.maxHostCount,
        true
      );
      console.log(
        "sessionTotalAggregateVideoResolutionValue:",
        sessionTotalAggregateVideoResolutionValue
      );
      sessionVideoStreamingVariant = calculateVideoStreamingVariant(
        sessionTotalAggregateVideoResolutionValue
      );
      console.log(
        "sessionVideoStreamingVariant:",
        sessionVideoStreamingVariant
      );
      sessionVideoStreamingCharge = calculateVideoStreamingChargePerMin(
        this.hostStreamingMode,
        sessionTotalAggregateVideoResolutionValue
      );
      console.log("sessionVideoStreamingCharge:", sessionVideoStreamingCharge);
    }
    return { sessionVideoStreamingCharge };
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
