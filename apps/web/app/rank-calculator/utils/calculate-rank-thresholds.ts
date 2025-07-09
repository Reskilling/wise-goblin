import { RankStructure } from '@/app/schemas/rank-calculator';
import { Rank } from '@/config/enums';
import { rankProportions, StandardRank } from '@/config/ranks';

export const calculateRankThresholds = (
  totalPoints: number,
): Record<RankStructure, Partial<Record<Rank, number>>> => {
  const rankProportionsKeys = Object.entries(rankProportions) as [
    keyof typeof rankProportions,
    number,
  ][];

  const standardRankPoints = rankProportionsKeys.reduce(
    (acc, [rank, proportion]) => {
      const rankPoints = Math.ceil((totalPoints * proportion) / 1000) * 1000;

      acc[rank] = rankPoints;

      return acc;
    },
    {} as Record<Exclude<StandardRank, 'Helper' | 'Oracle'>, number>,
  );

  return {
    Standard: { Helper: 0, Oracle: 1, ...standardRankPoints },
    Legacy: { Legacy: 0 },
    Admin: {
      Prodigy: 0,
      Magician: standardRankPoints.Achiever,
      Zenyte: standardRankPoints.Raider,
      Wrath: standardRankPoints.Gamer,
      Destroyer: standardRankPoints.Adventurer,
      Myth: standardRankPoints.Bandosian,
    },
    Maxed: { Maxed: 0 },
    'Deputy Owner': { 'Deputy Owner': 0 },
    Owner: { Owner: 0 },
  };
};
