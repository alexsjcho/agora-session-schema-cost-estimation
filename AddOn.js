import { totalAggregateVideoResolution } from "./util/aggregateVideoResolution.js";
import { calculateCloudRecordingChargePerMin } from "./util/costBasedOnResolution.js";

// TODO: create AddOn Class that can append a feature like Cloud Recording to the Session Class

export const addCloudRecording = (session) => {
  session.hasCloudRecording = true;
  const calculateCloudRecordingCosts = () => {
    let recordingCost,
      sessionTotalAggregateVideoResolutionValue,
      sessionVideoStreamingCharge;
    let { hostVideoProfile, maxHostCount, maxMinuteDuration } = session;

    sessionTotalAggregateVideoResolutionValue = totalAggregateVideoResolution(
      hostVideoProfile,
      maxHostCount
    );

    sessionVideoStreamingCharge = calculateCloudRecordingChargePerMin(
      sessionTotalAggregateVideoResolutionValue
    );
    recordingCost = sessionVideoStreamingCharge * maxMinuteDuration;
    return recordingCost;
  };

  session.cloudRecordingCost = calculateCloudRecordingCosts();
};
