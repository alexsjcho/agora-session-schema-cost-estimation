import Session from "./Session.js";

const manyToManyVideoStream = new Session({
  maxMinuteDuration: 60,
  hostVideoProfile: 360,
  maxHostAggregateResolution: 921600,
  maxAudienceAggregateResolution: 2073600,
  maxHostCount: 3,
  maxAudienceCount: 97,
  sessionMode: "communication",
  audienceStreamingMode: "standard",
  isAudioOnly: false,
});

console.log(manyToManyVideoStream);
console.log(manyToManyVideoStream.calculateMaxSessionCost());
