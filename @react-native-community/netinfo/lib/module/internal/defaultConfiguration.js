export default{reachabilityUrl:'https://clients3.google.com/generate_204',reachabilityTest:function reachabilityTest(response){return Promise.resolve(response.status===204);},reachabilityShortTimeout:5*1000,reachabilityLongTimeout:60*1000,reachabilityRequestTimeout:15*1000};
//# sourceMappingURL=defaultConfiguration.js.map