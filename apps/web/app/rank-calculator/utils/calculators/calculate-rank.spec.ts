import { calculateRank } from './calculate-rank';

// With 228,530 maximum points the Standard thresholds are:
// Helper 0, Oracle 1, Serenist 5,000 ... Adventurer 221,000, Bandosian 274,000
const maximumAvailablePoints = 228530;

it.each([
  [0, 'Helper', 'Oracle'],
  [1, 'Oracle', 'Serenist'],
  [4999, 'Oracle', 'Serenist'],
  [5000, 'Serenist', 'Quester'],
  [136999, 'Zarosian', 'Gamer'],
  [137000, 'Gamer', 'Zamorakian'],
  [273999, 'Adventurer', 'Bandosian'],
  [274000, 'Bandosian', null],
  [400000, 'Bandosian', null],
] as const)(
  'gives %i points the %s rank (next: %s)',
  (pointsAwarded, rank, nextRank) => {
    expect(
      calculateRank(maximumAvailablePoints, pointsAwarded, 'Standard'),
    ).toEqual({ rank, nextRank });
  },
);

it.each([
  [0, 'Captain', 'General'],
  [27000, 'General', 'Colonel'],
  [274000, 'Marshal', null],
] as const)(
  'gives %i points the %s admin rank (next: %s)',
  (pointsAwarded, rank, nextRank) => {
    expect(
      calculateRank(maximumAvailablePoints, pointsAwarded, 'Admin'),
    ).toEqual({ rank, nextRank });
  },
);
