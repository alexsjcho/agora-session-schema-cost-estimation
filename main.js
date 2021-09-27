import Session from "./Session.js";
import { addCloudRecording } from "./AddOn.js";

const manyToManyVideoStream = new Session({
  sessionName: "manyToManyVideoStream",
  maxMinuteDuration: 60,
  hostVideoProfile: 720,
  maxHostCount: 3,
  maxAudienceCount: 97,
  sessionMode: "communication",
  sessionCount: 100,
  audienceStreamingMode: "standard",
  isAudioOnly: false,
});

console.log(manyToManyVideoStream);
console.log(manyToManyVideoStream.calculateSessionMetrics());
console.log("Cloud Recording cost:", addCloudRecording(manyToManyVideoStream));
console.log(manyToManyVideoStream);
