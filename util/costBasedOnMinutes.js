export const calculateCostBasedOnMinutes = (session, productCost) => {
  let totalCost = session.maxMinuteDuration * productCost;
  return totalCost;
};
