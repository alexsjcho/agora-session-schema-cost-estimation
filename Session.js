import { totalAggregateVideoResolution } from "./util/aggregateVideoResolution.js";
import { calculateVideoStreamingChargePerMin } from "./util/costBasedOnResolution.js";
//import AddOn from "./AddOn";

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

  //Get max session minute usage count
  calculateSessionMinuteUsage() {
    let totalMinuteUsage, hostTotalMinuteUsage, audienceTotalMinuteUsage;

    if ((this.sessionMode = "communication")) {
      hostTotalMinuteUsage = this.maxHostCount * this.maxMinuteDuration;
      totalMinuteUsage = hostTotalMinuteUsage;
    } else if ((this.sessionMode = "broadcast")) {
      hostTotalMinuteUsage = this.maxHostCount * this.maxMinuteDuration;
      audienceTotalMinuteUsage = this.maxAudienceCount * this.maxMinuteDuration;

      totalMinuteUsage = hostTotalMinuteUsage + audienceTotalMinuteUsage;
    }
    return totalMinuteUsage;
  }

  //Get session max user count
  calculateSessionMaxUserCount() {
    let hostCount, audienceCount, totalUserCount;

    if ((this.sessionMode = "communication")) {
      hostCount = this.maxHostCount;
    } else if ((this.sessionMode = "broadcast")) {
      hostCount = this.maxHostCount;
      audienceCount = this.maxAudienceCount;

      totalUserCount = hostCount + audienceCount;
    }
    return totalUserCount;
  }

  //Get metrics for multiple sessions

  calculateMaxSessionCost() {
    let sessionTotalAggregateVideoResolutionValue,
      sessionVideoStreamingCharge,
      sessionTotalCost,
      hostTotalCost,
      audienceTotalCost;

    if ((this.sessionMode = "communication")) {
      sessionTotalAggregateVideoResolutionValue = totalAggregateVideoResolution(
        this.hostVideoProfile,
        this.maxHostCount,
        true
      );

      sessionVideoStreamingCharge = calculateVideoStreamingChargePerMin(
        this.hostStreamingMode,
        sessionTotalAggregateVideoResolutionValue
      );
      sessionTotalCost =
        this.maxHostCount *
        this.maxMinuteDuration *
        sessionVideoStreamingCharge;
    } else if ((this.sessionMode = "broadcast")) {
      hostTotalAggregateVideoResolutionValue = totalAggregateVideoResolution(
        this.hostVideoProfile,
        this.maxHostCount,
        true
      );
      hostSessionVideoStreamingCharge = calculateVideoStreamingChargePerMin(
        this.hostStreamingMode,
        hostTotalAggregateVideoResolutionValue
      );

      audienceTotalAggregateVideoResolution = totalAggregateVideoResolution(
        this.hostVideoProfile,
        this.maxHostCount,
        false
      );

      audienceSessionVideoStreamingCharge = calculateVideoStreamingChargePerMin(
        this.audienceStreamingMode,
        audienceTotalAggregateVideoResolution
      );

      hostTotalCost =
        this.maxHostCount *
        this.maxMinuteDuration *
        sessionVideoStreamingCharge;
      audienceTotalCost =
        this.maxAudienceCount *
        this.maxMinuteDuration *
        audienceSessionVideoStreamingCharge;

      sessionTotalCost = hostTotalCost + audienceTotalcost;
    }

    return { sessionTotalCost };
  }

  //Get all metrics of one session
  calculateSessionMetrics(
    calculateSessionMaxUserCount,
    calculateSessionMinuteUsage,
    calculateMaxSessionCost
  ) {
    let sessionMetrics = {
      users: calculateSessionMaxUserCount(),
      minutes: calculateSessionMinuteUsage(),
      cost: calculateMaxSessionCost(),
    };

    return sessionMetrics;
  }
}

export default Session;
