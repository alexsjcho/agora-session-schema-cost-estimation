import Session from "./Session.js";

const manyToManyVideoStream = new Session(
  //duration
  60,
  // host aggregate resolution
  921600,
  // audience resolution
  2073600,
  // host count
  3,
  // audience count
  97,
  // channel mode
  "communication",
  //host streaming type
  "premium",
  //audience streaming type
  "standard"
);

console.log(manyToManyVideoStream);
console.log(
  manyToManyVideoStream.calculateCommunicationModeMaxSessionCost(720)
);
