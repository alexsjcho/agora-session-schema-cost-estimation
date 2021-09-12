class SessionSchema {
  //constants
  sessionName: string;
  duration: number;
  mode: string;
  hostCount: number;
  audienceCount: number;
  sessionCount: number;
  maxHostAggregateResolution: string;
  maxAudienceAggregateResolution: string;

  public constructor(
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

  createSchema(
    duration,
    mode,
    hostCount,
    audienceCount,
    sessionCount,
    maxHostAggregateResolution,
    maxAudienceAggregateResolution
  ) {
    return {
      duration,
      mode,
      hostCount,
      sessionCount,
      audienceCount,
      maxHostAggregateResolution,
      maxAudienceAggregateResolution,
    };
  }

  calculateSessionCost(session) {
    let totalHostCountAggregate;
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
