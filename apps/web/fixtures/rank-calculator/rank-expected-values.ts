import { RankCalculatorData } from '@/app/rank-calculator/hooks/point-calculator/use-rank-calculator';
import { CategoryFixture } from '@/types/testing';

// Recalculated on 2026-10-24 from the current point calculators: Wise Goblin ranks, and all of the category changes above

export const rankExpectedValues: CategoryFixture<RankCalculatorData> = {
  earlyGamePlayer: {
    fullScaling: {
      pointsAwarded: 30926,
      pointsAwardedPercentage: 0.9933,
      pointsRemaining: 74,
      rank: 'Armadylean',
      nextRank: 'Achiever',
    },
    fourMonthScaling: {
      pointsAwarded: 21647,
      pointsAwardedPercentage: 0.1497,
      pointsRemaining: 9353,
      rank: 'Armadylean',
      nextRank: 'Achiever',
    },
    twoMonthScaling: {
      pointsAwarded: 12370,
      pointsAwardedPercentage: 0.1522,
      pointsRemaining: 7630,
      rank: 'Quester',
      nextRank: 'Armadylean',
    },
    threeWeekScaling: {
      pointsAwarded: 5406,
      pointsAwardedPercentage: 0.901,
      pointsRemaining: 594,
      rank: 'Oracle',
      nextRank: 'Serenist',
    },
    noScaling: {
      pointsAwarded: 3092,
      pointsAwardedPercentage: 0.5153,
      pointsRemaining: 2908,
      rank: 'Oracle',
      nextRank: 'Serenist',
    },
  },
  midGamePlayer: {
    fullScaling: {
      pointsAwarded: 111383,
      pointsAwardedPercentage: 0.4514,
      pointsRemaining: 12617,
      rank: 'Raider',
      nextRank: 'Zarosian',
    },
    fourMonthScaling: {
      pointsAwarded: 77967,
      pointsAwardedPercentage: 0.8983,
      pointsRemaining: 2033,
      rank: 'Explorer',
      nextRank: 'Saradominist',
    },
    twoMonthScaling: {
      pointsAwarded: 44553,
      pointsAwardedPercentage: 0.0346,
      pointsRemaining: 15447,
      rank: 'Guthixian',
      nextRank: 'Explorer',
    },
    threeWeekScaling: {
      pointsAwarded: 19491,
      pointsAwardedPercentage: 0.9434,
      pointsRemaining: 509,
      rank: 'Quester',
      nextRank: 'Armadylean',
    },
    noScaling: {
      pointsAwarded: 11137,
      pointsAwardedPercentage: 0.0152,
      pointsRemaining: 8863,
      rank: 'Quester',
      nextRank: 'Armadylean',
    },
  },
  endGamePlayer: {
    fullScaling: {
      pointsAwarded: 234396,
      pointsAwardedPercentage: 0.6679,
      pointsRemaining: 16604,
      rank: 'Zamorakian',
      nextRank: 'Adventurer',
    },
    fourMonthScaling: {
      pointsAwarded: 164077,
      pointsAwardedPercentage: 0.1795,
      pointsRemaining: 36923,
      rank: 'Gamer',
      nextRank: 'Zamorakian',
    },
    twoMonthScaling: {
      pointsAwarded: 93758,
      pointsAwardedPercentage: 0.6551,
      pointsRemaining: 7242,
      rank: 'Saradominist',
      nextRank: 'Raider',
    },
    threeWeekScaling: {
      pointsAwarded: 41018,
      pointsAwardedPercentage: 0.7706,
      pointsRemaining: 2982,
      rank: 'Achiever',
      nextRank: 'Guthixian',
    },
    noScaling: {
      pointsAwarded: 23439,
      pointsAwardedPercentage: 0.3126,
      pointsRemaining: 7561,
      rank: 'Armadylean',
      nextRank: 'Achiever',
    },
  },
};
