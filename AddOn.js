import { totalAggregateVideoResolution } from "./util/aggregateVideoResolution.js";
import { calculateCloudRecordingChargePerMin } from "./util/costBasedOnResolution.js";

// TODO: create AddOn Class that can append a feature like Cloud Recording to the Session Class

class AddOn {
  constructor({ session = {} }) {
    this.session = session;
  }

  addCloudRecording() {
    let cloudRecordingCost;
    let { hostVideoProfile, maxHostCount, maxMinuteDuration } = this.session;

    sessionTotalAggregateVideoResolutionValue = totalAggregateVideoResolution(
      hostVideoProfile,
      maxHostCount,
      true
    );

    sessionVideoStreamingCharge = calculateCloudRecordingChargePerMin(
      sessionTotalAggregateVideoResolutionValue
    );

    return (cloudRecordingCost =
      sessionVideoStreamingCharge * maxMinuteDuration);
  }
}
