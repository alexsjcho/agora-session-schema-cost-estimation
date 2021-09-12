
import {RESOLUTION} from "./constants"
import {hostTotalAggregateVideoResolution} from "./util/aggregateVideoResolution"

class SessionSchema {

 constructor(
    duration,
    mode,
    hostCount,
    audienceCount,
    sessionCount,
    maxHostAggregateResolution,
    maxAudienceAggregateResolution
  ) {
    this.duration = duration;
    this.mode = mode;
    this.hostCount = hostCount;
    this.audienceCount = audienceCount;
    this.sessionCount = sessionCount;
    this.maxHostAggregateResolution = maxHostAggregateResolution;
    this.maxAudienceAggregateResolution = maxAudienceAggregateResolution;
  }


  hostTotalAggregateVideoResolution(videoProfile,totalHostCount, totalResolutionForUser) {
    let videoProfile = 720;
    let totalHostCount = 2;
    totalResolutionForUser(videoProfile, totalHostCount)
  }

}

let VideoConference = SessionSchema.createSchema(
  30,
  "communication",
  2,
  0,
  "Full HD",
  null
);

console.log(VideoConference);
