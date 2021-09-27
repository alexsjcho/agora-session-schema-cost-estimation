import Session from "./Session.js";
import { addCloudRecording } from "./addOn.js";
import { addSpeechToTextExtension } from "./extensions.js";

const liveVideoPodcastSession = new Session({
  sessionName: "liveVideoPodcastSession",
  maxMinuteDuration: 60,
  hostVideoProfile: 720,
  maxHostCount: 3,
  maxAudienceCount: 97,
  sessionMode: "communication",
  sessionCount: 100,
  audienceStreamingMode: "standard",
  isAudioOnly: false,
});

console.log("Initial Session value:", liveVideoPodcastSession);
console.log(
  `Get ${liveVideoPodcastSession} metric values:`,
  liveVideoPodcastSession.calculateSessionMetrics()
);
console.log(
  "Cloud Recording cost:",
  addCloudRecording(liveVideoPodcastSession)
);
console.log(
  "Add Extension costs:",
  addSpeechToTextExtension(liveVideoPodcastSession)
);
console.log("Updated Session Schema Values:", liveVideoPodcastSession);
