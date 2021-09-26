import Session from "./Session.js";

const manyToManyVideoStream = new Session({
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
