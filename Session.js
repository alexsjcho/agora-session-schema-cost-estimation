import { totalAggregateVideoResolution } from "./util/aggregateVideoResolution.js";
import { calculateVideoStreamingChargePerMin } from "./util/costBasedOnResolution.js";
//import AddOn from "./AddOn";

//TODO: convert to Typescript in the future
//TODO: fix import of totalResolutionForUser()

class Session {
  //using Builder design pattern
  constructor({
    sessionName,
    maxMinuteDuration,
    hostVideoProfile,
    maxHostCount,
    maxAudienceCount,
    sessionMode,
    sessionCount,
    audienceStreamingMode,
    isAudioOnly,
  } = {}) {
    this.sessionName = sessionName;
    this.maxMinuteDuration = maxMinuteDuration;
    this.hostVideoProfile = hostVideoProfile;
    this.maxHostCount = maxHostCount;
    this.maxAudienceCount = maxAudienceCount;
    //can be either "broadcast" or "communication"
    this.sessionMode = sessionMode;
    //number of sessions in a given month
    this.sessionCount = sessionCount;
    //host streaming mode is always premium for low latency
    this.hostStreamingMode = "premium";
    //audence streaming mode can be either "premium" or "standard"
    this.audienceStreamingMode = audienceStreamingMode;
    //boolean
    this.isAudioOnly = isAudioOnly;
  }

  //Get host's aggregate video resolution

  calculateHostAggregateVideoResolution() {
    let hostAggregateVideoResolution, optimizedHostVideoResolution;

    optimizedHostVideoResolution = this.maxHostCount - 1;

    hostAggregateVideoResolution = totalAggregateVideoResolution(
      this.hostVideoProfile,
      optimizedHostVideoResolution
    );

    return hostAggregateVideoResolution;
  }

  //Get audience's aggregate video resolution
  calculateAudienceAggregateVideoResolution() {
    let audienceAggregateVideoResolution;
    audienceAggregateVideoResolution = totalAggregateVideoResolution(
      this.hostVideoProfile,
      this.maxHostCount
    );

    return audienceAggregateVideoResolution;
    this.audidenceMaxAggregateVideoResolution =
      audienceAggregateVideoResolution;
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
      totalUserCount = hostCount;
    } else if ((this.sessionMode = "broadcast")) {
      hostCount = this.maxHostCount;
      audienceCount = this.maxAudienceCount;

      totalUserCount = hostCount + audienceCount;
    }
    return totalUserCount;
  }

  //Get max cost of the base session type
  calculateMaxSessionCost() {
    let sessionTotalAggregateVideoResolutionValue,
      sessionVideoStreamingCharge,
      sessionTotalCost,
      hostTotalCost;

    if ((this.sessionMode = "communication")) {
      sessionTotalAggregateVideoResolutionValue =
        this.calculateHostAggregateVideoResolution();
      console.log(
        "sessionTotalAggregateVideoResolutionValue",
        sessionTotalAggregateVideoResolutionValue
      );

      sessionVideoStreamingCharge = calculateVideoStreamingChargePerMin(
        this.hostStreamingMode,

        sessionTotalAggregateVideoResolutionValue
      );
      console.log(" this.hostStreamingMode:", this.hostStreamingMode);
      console.log("sessionVideoStreamingCharge", sessionVideoStreamingCharge);
      sessionTotalCost =
        this.maxHostCount *
        this.maxMinuteDuration *
        sessionVideoStreamingCharge;

      console.log("sessionTotalCost", sessionTotalCost);
    } else if ((this.sessionMode = "broadcast")) {
      let audienceTotalCost;
      hostTotalAggregateVideoResolutionValue =
        this.calculateHostAggregateVideoResolution();
      audienceTotalAggregateVideoResolution =
        this.calculateAudienceAggregateVideoResolution();

      hostSessionVideoStreamingCharge = calculateVideoStreamingChargePerMin(
        this.hostStreamingMode,
        hostTotalAggregateVideoResolutionValue
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

    return sessionTotalCost;
  }

  //Get all metrics of one session
  calculateSessionMetrics() {
    let sessionMetrics = {
      maxHostAggregateVideoResolution:
        this.calculateHostAggregateVideoResolution(),
      maxAudienceAggregateVideoResolution:
        this.calculateAudienceAggregateVideoResolution(),
      users: this.calculateSessionMaxUserCount(),
      minutes: this.calculateSessionMinuteUsage(),
      cost: this.calculateMaxSessionCost(),
    };

    return sessionMetrics;
  }

  //Get metrics for multiple sessions
  calculateMetricsFromSessionCount() {
    let totalUsers = this.calculateSessionMaxUserCount() * this.sessionCount;
    let totalMinutes = this.calculateSessionMinuteUsage() * this.sessionCount;
    let totalCosts = this.calculateMaxSessionCost() * this.sessionCount;

    let sessionCountMetrics = {
      maxHostAggregateVideoResolution:
        this.calculateHostAggregateVideoResolution(),
      maxAudienceAggregateVideoResolution:
        this.calculateAudienceAggregateVideoResolution(),
      users: totalUsers,
      minutes: totalMinutes,
      cost: totalCosts,
    };

    return sessionCountMetrics;
  }
}

export default Session;
