import { calculateMaximumSkillingPoints } from './calculate-maximum-skilling-points';

export function calculateSkillingPoints(
  achievementDiaryPoints: number,
  ehpPoints: number,
  totalLevelPoints: number,
  achievementDiaryCapePoints: number,
  maxCapePoints: number,
  scaling: number,
) {
  const totalPointsAvailable = calculateMaximumSkillingPoints(scaling);

  const pointsAwardedWithEhp =
    achievementDiaryPoints +
    totalLevelPoints +
    achievementDiaryCapePoints +
    maxCapePoints +
    ehpPoints;

  const pointsAwardedWithoutEhp = Math.min(
    Math.floor(pointsAwardedWithEhp - ehpPoints),
    totalPointsAvailable,
  );
  const pointsRemaining = totalPointsAvailable - pointsAwardedWithoutEhp;
  const pointsAwardedPercentage =
    pointsAwardedWithoutEhp / totalPointsAvailable;

  return {
    pointsAwarded: Math.floor(pointsAwardedWithEhp),
    pointsAwardedPercentage,
    pointsRemaining,
  };
}
