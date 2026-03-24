import { z } from 'zod';
import { Rank } from './enums';

export const rankNames: Partial<Record<Rank, string>> = {
  General: 'Major',
  Admiral: 'General',
  Marshal: 'Field Marshal',
};

export const StandardRank = Rank.extract([
  'Helper',
  'Oracle',
  'Serenist',
  'Quester',
  'Armadylean',
  'Achiever',
  'Guthixian',
  'Explorer',
  'Saradominist',
  'Raider',
  'Zarosian',
  'Gamer',
  'Zamorakian',
  'Adventurer',
  'Bandosian',
]);

export type StandardRank = z.infer<typeof StandardRank>;

/**
 * The rank proportions are used to calculate the rank thresholds as a percentage of the total points.
 */
export const rankProportions = {
  Serenist: 0.01932929399,
  Quester: 0.03866245462,
  Armadylean: 0.07346214374,
  Achiever: 0.11599509711,
  Guthixian: 0.16626131473,
  Explorer: 0.22812742873,
  Saradominist: 0.305462,
  Raider: 0.38665934584,
  Zarosian: 0.47559188471,
  Gamer: 0.5993241127,
  Zamorakian: 0.77332255832,
  Adventurer: 0.96665416456,
  Bandosian: 1.198651,
} as const satisfies Record<Exclude<StandardRank, 'Helper' | 'Oracle'>, number>;
