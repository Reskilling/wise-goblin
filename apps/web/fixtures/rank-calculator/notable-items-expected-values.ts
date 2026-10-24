import { NotableItemsPointCalculatorData } from '@/app/rank-calculator/hooks/point-calculator/notable-items/use-notable-items-point-calculator';
import { CategoryFixture } from '@/types/testing';

// Recalculated on 2026-10-24 from the current point calculators: item points use 3 points per hour and the drop rates in drop-rates.json

export const notableItemsExpectedValues: CategoryFixture<
  Omit<NotableItemsPointCalculatorData, 'totalItems'>
> = {
  earlyGamePlayer: {
    fullScaling: {
      pointsAwarded: 665,
      pointsAwardedPercentage: 0.0123,
      pointsRemaining: 53484,
      itemsCollected: 5,
      percentageCollected: 0.0158,
    },
    fourMonthScaling: {
      pointsAwarded: 465,
      pointsAwardedPercentage: 0.0123,
      pointsRemaining: 37439,
      itemsCollected: 5,
      percentageCollected: 0.0158,
    },
    twoMonthScaling: {
      pointsAwarded: 266,
      pointsAwardedPercentage: 0.0123,
      pointsRemaining: 21393,
      itemsCollected: 5,
      percentageCollected: 0.0158,
    },
    threeWeekScaling: {
      pointsAwarded: 116,
      pointsAwardedPercentage: 0.0122,
      pointsRemaining: 9360,
      itemsCollected: 5,
      percentageCollected: 0.0158,
    },
    noScaling: {
      pointsAwarded: 66,
      pointsAwardedPercentage: 0.0122,
      pointsRemaining: 5348,
      itemsCollected: 5,
      percentageCollected: 0.0158,
    },
  },
  midGamePlayer: {
    fullScaling: {
      pointsAwarded: 5045,
      pointsAwardedPercentage: 0.0932,
      pointsRemaining: 49104,
      itemsCollected: 99,
      percentageCollected: 0.3123,
    },
    fourMonthScaling: {
      pointsAwarded: 3531,
      pointsAwardedPercentage: 0.0932,
      pointsRemaining: 34373,
      itemsCollected: 99,
      percentageCollected: 0.3123,
    },
    twoMonthScaling: {
      pointsAwarded: 2018,
      pointsAwardedPercentage: 0.0932,
      pointsRemaining: 19641,
      itemsCollected: 99,
      percentageCollected: 0.3123,
    },
    threeWeekScaling: {
      pointsAwarded: 882,
      pointsAwardedPercentage: 0.0931,
      pointsRemaining: 8594,
      itemsCollected: 99,
      percentageCollected: 0.3123,
    },
    noScaling: {
      pointsAwarded: 504,
      pointsAwardedPercentage: 0.0931,
      pointsRemaining: 4910,
      itemsCollected: 99,
      percentageCollected: 0.3123,
    },
  },
  endGamePlayer: {
    fullScaling: {
      pointsAwarded: 26276,
      pointsAwardedPercentage: 0.4853,
      pointsRemaining: 27873,
      itemsCollected: 210,
      percentageCollected: 0.6625,
    },
    fourMonthScaling: {
      pointsAwarded: 18393,
      pointsAwardedPercentage: 0.4853,
      pointsRemaining: 19511,
      itemsCollected: 210,
      percentageCollected: 0.6625,
    },
    twoMonthScaling: {
      pointsAwarded: 10510,
      pointsAwardedPercentage: 0.4852,
      pointsRemaining: 11149,
      itemsCollected: 210,
      percentageCollected: 0.6625,
    },
    threeWeekScaling: {
      pointsAwarded: 4598,
      pointsAwardedPercentage: 0.4852,
      pointsRemaining: 4878,
      itemsCollected: 210,
      percentageCollected: 0.6625,
    },
    noScaling: {
      pointsAwarded: 2627,
      pointsAwardedPercentage: 0.4852,
      pointsRemaining: 2787,
      itemsCollected: 210,
      percentageCollected: 0.6625,
    },
  },
};
