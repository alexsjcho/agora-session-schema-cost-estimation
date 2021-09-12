
import {hostTotalAggregateVideoResolution} from "./util/aggregateVideoResolution"

//TODO: convert to Typescript in the future

const sessionConfig = {
  //number
  duration: 0,
  //string: "communication", "broadcast"
  mode: "communication",
  //number
  hostCount: 1,
  //number
  audienceCount: 0,
  //number
  hostMaxAggregateVideoResolution: 921600,
  //number
  maxAudienceAggregateVideoResoltuion:2073600
}

const sessionUserConfig = {
  //number
  totalHostCount: 2
  //number
  totalAudienceCount: 0,
  //number
  hostVideoProfile: 720,
   //string: "premium","standard"
  audienceStreamingType: null,
  //string: "premium"
  hostStreamingType: "premium"
}


const hostsTotalAggregateVideoResolution = function (sessionUserConfig = {totalHostCount, hostVideoProfile}) {
  return {
    totalResolutionForUser(videoProfile, totalUserCount)
  }
}

const audiencesTotalAggregateVideoResolution = function (sessionUserConfig = totalHostCount, hostVideoProfile ){
  notSubLocalHostLogic = false
  return {
    totalResolutionForUser(totalHostCount, hostVideoProfile)
  }
}





